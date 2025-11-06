package com.backend.domain.member.entity;

import com.backend.global.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true) // BaseEntity의 toString()도 호출
public class Member extends BaseEntity {
  @Column(unique = true)
  private String username;

  @JsonIgnore // Json에서 비번 노출 방지
  private String password;

  @Column(unique = true)
  private String email;

  private String nickname;
}
