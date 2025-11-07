package com.backend.domain.member.service;

import com.backend.domain.member.entity.Member;
import com.backend.domain.member.input.MemberJoinForm;
import com.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;

  public Member join(MemberJoinForm memberJoinForm) {
    // 비밀번호 암호화
    String encodedPassword = passwordEncoder.encode(memberJoinForm.getPassword());

    Member member = Member.builder()
        .username(memberJoinForm.getUsername())
        .password(encodedPassword)
        .email(memberJoinForm.getEmail())
        .nickname(memberJoinForm.getNickname())
        .build();

    memberRepository.save(member);

    return member;
  }
}
