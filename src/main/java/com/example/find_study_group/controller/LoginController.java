package com.example.find_study_group.controller;

import com.example.find_study_group.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    //[로그인]
    @GetMapping("/login")
    public String login(){
        return "login"; //login.html 페이지로 이동(로그인)
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> loginRequest, HttpSession session) {
        String loginId = loginRequest.get("loginId");
        String loginPassword = loginRequest.get("loginPassword");

        boolean isAuthenticated = userService.authenticateUser(loginId, loginPassword);

        Map<String, String> response = new HashMap<>();
        if (isAuthenticated) {
            session.setAttribute("user", loginId);//로그인 성공 시 세션에 사용자 정보 저장
            response.put("message", "로그인 성공");
            return ResponseEntity.ok(response); // HTTP 200 응답, JSON 포맷
        } else {
            response.put("message", "아이디(이메일) 또는 비밀번호를 정확히 입력해 주세요.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // HTTP 401 응답, JSON 포맷
        }
    }

    //[로그아웃]
    @GetMapping("/logout")
    public String logout(HttpSession session){
        System.out.println("로그아웃 요청 처리됨");
        session.invalidate();//세션 초기화(로그아웃 처리)
        return "redirect:/";
    }
}
