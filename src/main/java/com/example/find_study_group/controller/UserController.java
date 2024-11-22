package com.example.find_study_group.controller;

import com.example.find_study_group.domain.User;
import com.example.find_study_group.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
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
