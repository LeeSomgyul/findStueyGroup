package com.example.find_study_group.service;

import com.example.find_study_group.domain.User;
import com.example.find_study_group.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    //사용자 등록(회원가입) 메서드
    public User register(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));//비밀번호 암호와
        return userRepository.save(user);//사용자 정보를 데이터베이스에 저장
    }

    //이메일 중복확인 메서드
    public boolean isEmailDuplicated(String email){
        return userRepository.findByEmail(email) != null;
    }
}
