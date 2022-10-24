package com.example.sohee_family.service.login;

import com.example.sohee_family.domain.dto.Member;
import com.example.sohee_family.domain.repository.memberRepository.inf.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class LoginService {
    private final MemberRepository memberRepository;

    public Member login(String loginId, String password) {
        return memberRepository.findMemberByLoginId(loginId)
                .filter(m -> m.getPw().equals(password))
                .orElse(null);
    }


}
