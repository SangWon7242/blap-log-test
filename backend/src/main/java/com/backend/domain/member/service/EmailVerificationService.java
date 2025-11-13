package com.backend.domain.member.service;

import com.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailVerificationService {
    private final EmailService emailService;
    private final MemberRepository memberRepository;
    
    // 이메일별 인증번호와 만료시간을 저장하는 임시 저장소
    private final Map<String, VerificationData> verificationStore = new ConcurrentHashMap<>();
    
    /**
     * 인증번호 발송 및 저장
     */
    public String sendVerificationCode(String email) {
        // 이메일 중복 체크
        if (memberRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        
        // 인증번호 생성
        String verificationCode = emailService.generateVerificationCode();
        
        // 이메일 발송
        emailService.sendVerificationEmail(email, verificationCode);
        
        // 인증번호와 만료시간 저장 (3분)
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(3);
        verificationStore.put(email, new VerificationData(verificationCode, expiryTime));
        
        log.info("인증번호 저장 완료 - 이메일: {}, 만료시간: {}", email, expiryTime);
        
        return verificationCode;
    }
    
    /**
     * 인증번호 검증
     */
    public boolean verifyCode(String email, String code) {
        VerificationData data = verificationStore.get(email);
        
        if (data == null) {
            log.warn("인증번호 없음 - 이메일: {}", email);
            return false;
        }
        
        // 만료 시간 체크
        if (LocalDateTime.now().isAfter(data.expiryTime)) {
            log.warn("인증번호 만료 - 이메일: {}", email);
            verificationStore.remove(email);
            return false;
        }
        
        // 인증번호 일치 여부 확인
        boolean isValid = data.code.equals(code);
        
        if (isValid) {
            log.info("인증 성공 - 이메일: {}", email);
            verificationStore.remove(email); // 인증 성공 시 제거
        } else {
            log.warn("인증번호 불일치 - 이메일: {}", email);
        }
        
        return isValid;
    }
    
    /**
     * 인증번호 데이터 클래스
     */
    private record VerificationData(String code, LocalDateTime expiryTime) {}
}
