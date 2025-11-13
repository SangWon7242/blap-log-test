package com.backend.domain.member.controller;

import com.backend.domain.member.dto.EmailVerificationRequest;
import com.backend.domain.member.dto.EmailVerificationResponse;
import com.backend.domain.member.entity.Member;
import com.backend.domain.member.input.MemberJoinForm;
import com.backend.domain.member.service.EmailVerificationService;
import com.backend.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Controller
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {
  private final MemberService memberService;
  private final EmailVerificationService emailVerificationService;

  @PostMapping("/join")
  public ResponseEntity<Member> join(@RequestBody MemberJoinForm MemberJoinForm) {

    Member member = memberService.join(MemberJoinForm);

    return ResponseEntity.ok(member);
  }

  @PostMapping("/send-verification")
  public ResponseEntity<EmailVerificationResponse> sendVerificationCode(
      @RequestBody EmailVerificationRequest request) {
    try {
      String email = request.getEmail();
      
      if (email == null || email.trim().isEmpty()) {
        return ResponseEntity.badRequest()
            .body(new EmailVerificationResponse(false, "이메일을 입력해주세요."));
      }
      
      // 이메일 형식 검증
      if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
        return ResponseEntity.badRequest()
            .body(new EmailVerificationResponse(false, "올바른 이메일 형식이 아닙니다."));
      }
      
      emailVerificationService.sendVerificationCode(email);
      
      return ResponseEntity.ok(
          new EmailVerificationResponse(true, "인증번호가 발송되었습니다. 이메일을 확인해주세요."));
      
    } catch (IllegalArgumentException e) {
      log.warn("인증번호 발송 실패: {}", e.getMessage());
      return ResponseEntity.badRequest()
          .body(new EmailVerificationResponse(false, e.getMessage()));
    } catch (Exception e) {
      log.error("인증번호 발송 중 오류 발생", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new EmailVerificationResponse(false, "인증번호 발송에 실패했습니다. 잠시 후 다시 시도해주세요."));
    }
  }
}
