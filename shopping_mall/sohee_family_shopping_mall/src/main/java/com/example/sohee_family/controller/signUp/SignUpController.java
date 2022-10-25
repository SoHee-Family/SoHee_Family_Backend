package com.example.sohee_family.controller.signUp;

import com.example.sohee_family.controller.signUp.form.SignUpForm;
import com.example.sohee_family.domain.dto.Member;
import com.example.sohee_family.domain.repository.memberRepository.inf.MemberRepository;
import com.example.sohee_family.service.signUp.SignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SignUpController {

    private final SignUpService signUpService;
    private final MemberRepository memberRepository;

    @GetMapping("/signUp")

    public String signUpPage(@ModelAttribute("signUpForm") SignUpForm form) {
        return "signUp";
    }

    @PostMapping("/signUp")
    public String signUp(@Valid @ModelAttribute("signUpForm") SignUpForm form,
                         BindingResult bindingResult,
                         HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return "signUp";
        }

        if(!signUpService.signUpCheck(form)){
            bindingResult.reject("signUpFail","이미 존재하는 ID 입니다.");
            return "signUp";
        }

        //signUp success
        memberRepository.save(new Member(
                form.getId(),
                form.getPw(),
                form.getName(),
                form.getTel(),
                form.getAddress(),
                form.getE_mail()
        ));


        return "redirect:/login";
    }

}
