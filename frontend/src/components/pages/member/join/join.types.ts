export interface FormData {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  verificationCode: string;
  nickname: string;
}

export interface FormErrors {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  email?: string;
  verificationCode?: string;
  nickname?: string;
}

export interface JoinRequest {
  username: string;
  password: string;
  email: string;
  nickname: string;
}

export interface JoinResponse {
  message?: string;
  error?: string;
}

export interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
