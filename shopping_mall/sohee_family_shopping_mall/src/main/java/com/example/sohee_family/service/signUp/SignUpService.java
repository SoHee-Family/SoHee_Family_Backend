package com.example.sohee_family.service.signUp;

import com.example.sohee_family.controller.signUp.form.SignUpForm;
import com.example.sohee_family.domain.repository.memberRepository.inf.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SignUpService {
    private final MemberRepository memberRepository;

    public Boolean signUpCheck(SignUpForm signUpForm){
        return memberRepository.findMemberByLoginId(signUpForm.getId()).isEmpty();

    }

}
