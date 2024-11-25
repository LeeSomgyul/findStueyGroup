package com.example.find_study_group.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/", "/join", "/css/**", "/images/**", "/js/**", "/check-email", "/check-phone", "/check-nickname").permitAll() // 인증 없이 접근 가능한 경로
                        .anyRequest().authenticated() // 그 외의 모든 요청은 인증 필요
                )
                .formLogin((form) -> form
                        .loginPage("/login") // 커스텀 로그인 페이지 설정
                        .permitAll()
                )
                .logout((logout) -> logout
                        .permitAll()
                );

        // CSRF 설정 (6.x 버전에 맞춘 설정)
        http.csrf(csrf -> csrf.disable()); // CSRF 보호를 비활성화 (개발 단계에서만 사용)

        return http.build();
    }

}