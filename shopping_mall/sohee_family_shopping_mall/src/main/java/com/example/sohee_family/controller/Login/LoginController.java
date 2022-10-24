package com.example.sohee_family.controller.Login;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import com.example.sohee_family.controller.Login.form.LoginForm;
import com.example.sohee_family.domain.dto.Member;
import com.example.sohee_family.service.login.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    @GetMapping("/login")
    public String loginPage(@ModelAttribute("loginForm")LoginForm form){
        return "login";
    }

    @PostMapping("/login")
    public String login(@Valid @ModelAttribute("loginForm")LoginForm form,
                        BindingResult bindingResult,
                        HttpServletRequest request,
                        @RequestParam(defaultValue = "/")String redirectURL) {
        if(bindingResult.hasErrors()){
            return "login";
        }

        Member member = loginService.login(form.getId(), form.getPw());
        if(member == null){
            log.info("로그인 실패 로그 [id : {}][pw :{}]",form.getId(),form.getPw());

            bindingResult.reject("loginFail","ID 혹은 PW가 일치하지 않습니다.");
            log.info("bindingResult {}",bindingResult);
            return "login";
        }
        //Login Success
        HttpSession session = request.getSession();
        SessionForm sessionForm = new SessionForm(member.getId(), member.getName());
        session.setAttribute(SessionConst.LOGIN_SESSION_KEY, sessionForm);
        return "redirect:"+redirectURL;
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return "redirect:/";
    }

}
