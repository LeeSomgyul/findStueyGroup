package com.example.find_study_group.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(HttpSession session, Model model){
        Object loggedInUser = session.getAttribute("user");//세션에서 로그인한 사용자 정보 가져오기
        if(loggedInUser != null){
            model.addAttribute("isLoggedIn", true);
            return "home";
        }else{
            model.addAttribute("isLoggedIn", false);
            return "home";
        }
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




}
