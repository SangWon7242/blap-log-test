"use client";

import FormField from "./components/FormField";
import { useJoinForm } from "./hooks/useJoinForms";

export default function JoinPage() {
  const { formData, errors, isLoading, apiError, handleChange, handleSubmit } =
    useJoinForm();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            새로운 계정을 만들어보세요
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {/* 아이디 */}
            <FormField
              id="username"
              name="username"
              type="text"
              label="아이디"
              placeholder="4~20자의 아이디"
              value={formData.username}
              error={errors.username}
              onChange={handleChange}
            />

            {/* 비밀번호 */}
            <FormField
              id="password"
              name="password"
              type="password"
              label="비밀번호"
              placeholder="8자 이상의 비밀번호"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
            />
            <FormField
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호 재입력"
              value={formData.passwordConfirm}
              error={errors.passwordConfirm}
              onChange={handleChange}
            />

            <FormField
              id="email"
              name="email"
              type="email"
              label="이메일"
              placeholder="example@email.com"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
            />

            <div className="flex gap-2 items-center">
              <FormField
                id="verificationCode"
                name="verificationCode"
                type="email"
                label="인증번호"
                placeholder="인증번호"
                value={formData.verificationCode}
                error={errors.verificationCode}
                onChange={handleChange}
              />
              <button
                type="button"
                className="mt-5 rounded-md border border-transparent px-4 py-1 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                인증번호 발송
              </button>
            </div>

            {/* 닉네임 */}
            <FormField
              id="nickname"
              name="nickname"
              type="text"
              label="닉네임"
              placeholder="2~20자의 닉네임"
              value={formData.nickname}
              error={errors.nickname}
              onChange={handleChange}
            />
          </div>

          {/* API 에러 메시지 */}
          {apiError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{apiError}</p>
            </div>
          )}

          {/* 제출 버튼 */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "가입 중..." : "가입하기"}
            </button>
          </div>

          {/* 로그인 링크 */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <a
                href="/member/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                로그인
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
