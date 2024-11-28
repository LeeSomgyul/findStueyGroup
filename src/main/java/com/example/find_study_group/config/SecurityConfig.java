package com.example.find_study_group.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/", "/join", "/login", "/logout", "/css/**", "/images/**", "/js/**", "/check-email", "/check-phone", "/check-nickname").permitAll()
                        .anyRequest().authenticated()
                )
                .logout((logout) -> logout
                        .disable() // Spring Security 로그아웃 비활성화
                )
                .csrf(csrf -> csrf.disable()); // CSRF 비활성화 (개발 환경에서만)


        // CSRF 설정 (6.x 버전에 맞춘 설정)
        http.csrf(csrf -> csrf.disable()); // 개발 단계에서만 CSRF 비활성화

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}