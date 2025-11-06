package com.backend.domain.member.input;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberJoinForm {
  private String username;
  private String password;
  private String email;
  private String nickname;
}
