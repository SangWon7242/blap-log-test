import { FormData, FormErrors } from "./join.types";
import { validationRules, errorMessages } from "./join.constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // 아이디 검증
  if (!formData.username) {
    errors.username = errorMessages.username.required;
  } else if (
    formData.username.length < validationRules.username.minLength ||
    formData.username.length > validationRules.username.maxLength
  ) {
    errors.username = errorMessages.username.length;
  }

  // 비밀번호 검증
  if (!formData.password) {
    errors.password = errorMessages.password.required;
  } else if (formData.password.length < validationRules.password.minLength) {
    errors.password = errorMessages.password.minLength;
  }

  // 비밀번호 확인 검증
  if (!formData.passwordConfirm) {
    errors.passwordConfirm = errorMessages.passwordConfirm.required;
  } else if (formData.password !== formData.passwordConfirm) {
    errors.passwordConfirm = errorMessages.passwordConfirm.notMatch;
  }

  // 이메일 검증
  if (!formData.email) {
    errors.email = errorMessages.email.required;
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = errorMessages.email.invalid;
  }

  // 인증번호 검증
  if (!formData.verificationCode) {
    errors.verificationCode = errorMessages.verificationCode.required;
  }

  // 닉네임 검증
  if (!formData.nickname) {
    errors.nickname = errorMessages.nickname.required;
  } else if (
    formData.nickname.length < validationRules.nickname.minLength ||
    formData.nickname.length > validationRules.nickname.maxLength
  ) {
    errors.nickname = errorMessages.nickname.length;
  }

  return errors;
};

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0;
};
