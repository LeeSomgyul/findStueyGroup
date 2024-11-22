package com.example.find_study_group.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(){
        return "home"; //home.html 페이지로 이동(홈)
    }

    @GetMapping("/find-study")
    public String study(){
        return "findStudy"; //study.html 페이지로 이동(스터디 찾기)
    }

    @GetMapping("/my-space")
    public String mySpace(){
        return "mySpace"; //mySpace.html 페이지로 이동(나의 학습 공간)
    }

    @GetMapping("/community")
    public String community(){
        return "community"; //community.html 페이지로 이동(커뮤니티)
    }

    @GetMapping("/event")
    public String event(){
        return "event"; //event.html 페이지로 이동(이벤트)
    }

    @GetMapping("/login")
    public String login(){
        return "login"; //login.html 페이지로 이동(로그인)
    }


}
