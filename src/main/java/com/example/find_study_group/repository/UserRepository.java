package com.example.find_study_group.repository;

import com.example.find_study_group.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String name);//사용자 정보를 이메일로 조회할 수 있는 메서드
}