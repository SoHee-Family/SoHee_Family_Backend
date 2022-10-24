package com.example.sohee_family.config;

import com.example.sohee_family.domain.dto.Member;
import com.example.sohee_family.domain.repository.memberRepository.impl.MemoryMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class initData {
    private final MemoryMemberRepository memberRepository;

    @PostConstruct
    public void init() {
        memberRepository.save(new Member("kim", "kim", "김지용", "010-6277-0650", "서울시 구로구 오류2동", "colorful8315@naver.com"));
    }
}
