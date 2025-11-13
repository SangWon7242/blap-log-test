package com.backend.domain.member.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
  private final JavaMailSender mailSender;

  /**
   * 6자리 인증번호 생성
   */
  public String generateVerificationCode() {
    Random random = new Random();
    int code = 100000 + random.nextInt(900000);
    return String.valueOf(code);
  }

  /**
   * 인증번호 이메일 발송 (비동기 처리)
   */
  @Async
  public void sendVerificationEmail(String toEmail, String verificationCode) {
    try {
      log.info("인증번호 이메일 발송 시작: {}", toEmail);
      
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

      helper.setTo(toEmail);
      helper.setSubject("[BLAP-LOG] 이메일 인증번호");

      String htmlContent = buildEmailContent(verificationCode);
      helper.setText(htmlContent, true);

      mailSender.send(message);
      log.info("인증번호 이메일 발송 완료: {}", toEmail);
    } catch (Exception e) {
      log.error("인증번호 이메일 발송 실패: {} - {}", toEmail, e.getMessage());
    }
  }

  /**
   * 이메일 HTML 콘텐츠 생성
   */
  private String buildEmailContent(String verificationCode) {
    return """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .header {
                    background-color: #4F46E5;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 30px;
                    background-color: #f9f9f9;
                }
                .code-box {
                    background-color: white;
                    border: 2px solid #4F46E5;
                    border-radius: 5px;
                    padding: 20px;
                    text-align: center;
                    margin: 20px 0;
                }
                .code {
                    font-size: 32px;
                    font-weight: bold;
                    color: #4F46E5;
                    letter-spacing: 5px;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    color: #666;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>이메일 인증</h1>
                </div>
                <div class="content">
                    <h2>안녕하세요!</h2>
                    <p>BLAP-LOG 회원가입을 위한 이메일 인증번호입니다.</p>
                    <p>아래의 인증번호를 회원가입 페이지에 입력해주세요.</p>
                    <div class="code-box">
                        <div class="code">%s</div>
                    </div>
        
                    <p><strong>※ 인증번호는 발송 시점으로부터 1분간 유효합니다.</strong></p>
                    <p>본인이 요청하지 않은 경우, 이 메일을 무시하셔도 됩니다.</p>
                </div>
                <div class="footer">
                    <p>본 메일은 발신전용 메일입니다.</p>
                    <p>&copy; 2025 BLAP-LOG. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """.formatted(verificationCode);
  }
}
