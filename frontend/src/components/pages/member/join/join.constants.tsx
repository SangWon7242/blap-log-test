/**
 * 회원가입 폼 초기값
 */
export const initialFormData = {
  username: "",
  password: "",
  passwordConfirm: "",
  email: "",
  nickname: "",
} as const;

/**
 * 폼 필드 이름 상수
 */
export const formFields = {
  username: "username",
  password: "password",
  passwordConfirm: "passwordConfirm",
  email: "email",
  nickname: "nickname",
} as const;

/**
 * 유효성 검증 규칙
 */
export const validationRules = {
  username: {
    minLength: 4,
    maxLength: 20,
  },
  password: {
    minLength: 8,
  },
  nickname: {
    minLength: 2,
    maxLength: 20,
  },
} as const;

/**
 * 에러 메시지
 */
export const errorMessages = {
  username: {
    required: "아이디를 입력해주세요.",
    length: "아이디는 4~20자 사이여야 합니다.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: "비밀번호는 8자 이상이어야 합니다.",
  },
  passwordConfirm: {
    required: "비밀번호 확인을 입력해주세요.",
    notMatch: "비밀번호가 일치하지 않습니다.",
  },
  email: {
    required: "이메일을 입력해주세요.",
    invalid: "올바른 이메일 형식이 아닙니다.",
  },
  nickname: {
    required: "닉네임을 입력해주세요.",
    length: "닉네임은 2~20자 사이여야 합니다.",
  },
  api: {
    default: "회원가입에 실패했습니다.",
    network: "서버와의 통신 중 오류가 발생했습니다.",
  },
  success: {
    join: "회원가입이 완료되었습니다!",
  },
} as const;

/**
 * 입력 필드 플레이스홀더
 */
export const placeholders = {
  username: "4~20자의 아이디",
  password: "8자 이상의 비밀번호",
  passwordConfirm: "비밀번호 재입력",
  email: "example@email.com",
  nickname: "2~20자의 닉네임",
} as const;

/**
 * 입력 필드 레이블
 */
export const labels = {
  username: "아이디",
  password: "비밀번호",
  passwordConfirm: "비밀번호 확인",
  email: "이메일",
  nickname: "닉네임",
} as const;
