package com.backend.domain.member.service;

import com.backend.domain.member.entity.Member;
import com.backend.domain.member.input.MemberJoinForm;
import com.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;

  public Member join(MemberJoinForm memberJoinForm) {
    Member member = Member.builder()
        .username(memberJoinForm.getUsername())
        .password(memberJoinForm.getPassword())
        .email(memberJoinForm.getEmail())
        .nickname(memberJoinForm.getNickname())
        .build();

    memberRepository.save(member);

    return member;
  }
}
