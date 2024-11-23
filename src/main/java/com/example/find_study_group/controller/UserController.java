package com.example.find_study_group.controller;

import com.example.find_study_group.domain.User;
import com.example.find_study_group.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    //이메일 중복 확인 API
    @GetMapping("/check-email")
    @ResponseBody
    public String checkEmail(@RequestParam("email") String email){
        boolean isDuplicate = userService.isEmailDuplicated(email);
        if(isDuplicate){
            return "{\"message\": \" 이미 존재하는 아이디입니다.\"}";
        }
        return "{\"message\": \" 사용 가능한 아이디입니다.\"}";
    }

    //회원가입 페이지 이동
    @GetMapping("/join")
    public String showRegistrationForm(Model model){
        model.addAttribute("user", new User());
        return "join";
    }

    //회원가입 처리
    @PostMapping("/join")
    public String registerUser(@ModelAttribute User user){
        userService.register(user);
        return "redirect:/login";//가입 완료 후 로그인 페이지로 이동
    }
}
