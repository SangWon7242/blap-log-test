import { useState, FormEvent, ChangeEvent } from "react";
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
    handleChange,
    handleSubmit,
  };
};
