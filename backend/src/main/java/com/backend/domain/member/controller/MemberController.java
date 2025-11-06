package com.backend.domain.member.controller;

import com.backend.domain.member.entity.Member;
import com.backend.domain.member.input.MemberJoinForm;
import com.backend.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {
  private final MemberService memberService;

  @PostMapping("/join")
  public Member join(MemberJoinForm MemberJoinForm) {

    Member member = memberService.join(MemberJoinForm);

    return member;
  }
}
