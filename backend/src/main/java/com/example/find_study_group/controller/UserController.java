package com.example.find_study_group.controller;

import com.example.find_study_group.domain.User;
import com.example.find_study_group.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    //이메일 중복 확인 API
    @GetMapping("/check-email")
    public ResponseEntity<String> checkEmail(@RequestParam String email){
        if(userService.isEmailDuplicated(email)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 이메일입니다.");
        }
        return ResponseEntity.ok("사용 가능한 이메일입니다.");
    }

    //전화번호 중복 확인 API
    @GetMapping("/check-phone")
    public ResponseEntity<String> checkPhone(@RequestParam String phone){
        if(userService.isPhoneDuplicate(phone)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 전화번호입니다.");
        }
        return ResponseEntity.ok("사용 가능한 전화번호입니다.");
    }

    //닉네임 중복 확인 API
    @GetMapping("/check-nickname")
    public ResponseEntity<String> checkNickname(@RequestParam String nickname){
        if(userService.isNicknameDuplicate(nickname)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 닉네임입니다.");
        }
        return ResponseEntity.ok("사용 가능한 닉네임입니다.");
    }

    //회원가입 페이지 이동
    @GetMapping("/join")
    public String showRegistrationForm(Model model){
        model.addAttribute("user", new User());
        return "join";
    }

    //회원가입 처리
    @PostMapping("/join")
    @ResponseBody
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user){
        try {
            userService.register(user);
            return ResponseEntity.ok(Collections.singletonMap("message", "가입이 완료되었습니다."));
        } catch (IllegalArgumentException e) {
            // 예외 메시지를 JSON 형식으로 클라이언트에 전달
            Map<String, String> errorResponse = new HashMap<>();
            if (e.getMessage().contains("이메일")) {
                errorResponse.put("field", "email");
                errorResponse.put("message", "이미 사용 중인 이메일입니다.");
            } else if (e.getMessage().contains("전화번호")) {
                errorResponse.put("field", "phone");
                errorResponse.put("message", "이미 사용 중인 전화번호입니다.");
            } else if (e.getMessage().contains("닉네임")) {
                errorResponse.put("field", "nickname");
                errorResponse.put("message", "이미 사용 중인 닉네임입니다.");
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    @GetMapping("/find-id")
    public String showFindIdPage(){
        return "findId";
    }

    @PostMapping("/find-id")
    @ResponseBody
    public ResponseEntity<Map<String, String>> findId(@RequestBody Map<String, String> request){
        String name = request.get("name");
        String phone = request.get("phone");

        String email = userService.findUserId(name, phone);

        if(email != null){
            Map<String, String> response = new HashMap<>();
            response.put("email", email);
            return ResponseEntity.ok(response);
        }else{
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "USER_NOT_FOUND");
            errorResponse.put("message", "입력하신 이름과 전화번호로 등록된 이메일을 찾을 수 없습니다. 입력 정보를 다시 확인해 주세요.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
