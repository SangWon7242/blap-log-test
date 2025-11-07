"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

/**
 * Alert 옵션 타입
 */
export interface AlertOptions {
  title: string;
  text?: string;
  icon?: string;
  html?: string;
}

/**
 * 성공 Alert
 */
export const showSuccessAlert = (options: AlertOptions) => {
  return MySwal.fire({
    ...options,
    icon: "success",
  });
};

/**
 * 실패 Alert
 */
export const showErrorAlert = (options: AlertOptions) => {
  return MySwal.fire({
    ...options,
    icon: "error",
  });
};
