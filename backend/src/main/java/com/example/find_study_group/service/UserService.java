package com.example.find_study_group.service;

import com.example.find_study_group.domain.User;
import com.example.find_study_group.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // [회원가입]
    //사용자 등록(회원가입) 메서드
    public User register(User user){
        if(isEmailDuplicated(user.getEmail()) || isPhoneDuplicate(user.getPhone()) || isNicknameDuplicate(user.getNickname())) {
            throw new IllegalArgumentException("DB에 중복된 정보가 있습니다.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));//비밀번호 암호와
        return userRepository.save(user);//사용자 정보를 데이터베이스에 저장
    }

    //이메일 중복확인 메서드
    public boolean isEmailDuplicated(String email){
        return userRepository.findByEmail(email) != null;
    }

    //전화번호 중복 확인 메서드
    public boolean isPhoneDuplicate(String phone){
        return userRepository.findByPhone(phone) != null;
    }

    //닉네임 중복 확인 메서드
    public boolean isNicknameDuplicate(String nickname){
        return userRepository.findByNickname(nickname) != null;
    }

    //[로그인]
    //사용자를 이메일로 찾는 메서드
    public Optional<User> findByEmail(String email){
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    // 사용자가 입력한 아이디(이메일)과 비밀번호를 데이터베이스와 비교해보는 메서드
    public boolean authenticateUser(String email, String rawPassword){
        User user = userRepository.findByEmail(email);
        if (user != null){
            return passwordEncoder.matches(rawPassword, user.getPassword());//비밀번호 맞다면 true
        }
        return false;//비밀번호 틀리면 false
    }

    //[아이디 찾기]
    //이름, 전화번호로 아이디(이메일) 찾는 메서드
    public String findUserId(String name, String phone){
        User user = userRepository.findByNameAndPhone(name, phone);
        return user != null ? user.getEmail() : null;
    }
}
