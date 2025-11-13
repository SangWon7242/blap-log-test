import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormData, FormErrors, JoinRequest, JoinResponse } from "../join.types";
import { validateForm, isFormValid } from "../join.validation";
import { initialFormData, errorMessages } from "../join.constants";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/common/sweetalert/sweetalert.utils";

export const useJoinForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // 타이머 로직
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 해당 필드의 에러 제거
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSendVerification = async () => {
    // 이메일 유효성 검사
    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: errorMessages.email.required,
      }));
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "올바른 이메일 형식이 아닙니다.",
      }));
      return;
    }

    try {
      // 백엔드 API 호출
      const response = await fetch(
        "http://localhost:8080/api/v1/member/send-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();

      // 디버깅을 위한 상세 로깅
      console.log("=== 인증번호 발송 API 응답 ===");
      console.log("Status:", response.status);
      console.log("Response data:", data);

      if (response.ok && data.success) {
        setIsVerificationSent(true);
        setRemainingTime(180); // 3분 = 180초
        showSuccessAlert({
          title: "인증번호 발송",
          text:
            data.message || "인증번호가 발송되었습니다. 이메일을 확인해주세요.",
        });
      } else {
        console.error("인증번호 발송 실패:", data);
        showErrorAlert({
          title: "발송 실패",
          text: data.message || "인증번호 발송에 실패했습니다.",
        });
      }
    } catch (error) {
      console.error("인증번호 발송 오류:", error);
      showErrorAlert({
        title: "오류 발생",
        text: "인증번호 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    // 유효성 검증
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) {
      return;
    }

    setIsLoading(true);

    try {
      const requestData: JoinRequest = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        nickname: formData.nickname,
      };

      const response = await fetch("http://localhost:8080/api/v1/member/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data: JoinResponse = await response.json();

      if (response.ok) {
        showSuccessAlert({
          title: "회원가입 성공",
          text: data.message || errorMessages.success.join,
        });
        router.push("/member/login");
      } else {
        showErrorAlert({
          title: "회원가입 실패",
          text: data.error || errorMessages.api.default,
        });
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setApiError(errorMessages.api.default);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    apiError,
    isVerificationSent,
    remainingTime,
    handleChange,
    handleSubmit,
    handleSendVerification,
  };
};
