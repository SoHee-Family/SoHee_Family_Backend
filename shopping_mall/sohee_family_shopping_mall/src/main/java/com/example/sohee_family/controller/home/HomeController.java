package com.example.sohee_family.controller.home;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {
    @GetMapping("/")
    public String home(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                       Model model){
        if(sessionForm == null){
            return "mainPage";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "mainPage";
        }
    }

    @GetMapping("/about")
    public String about(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                        Model model){
        if(sessionForm == null){
            return "about";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "about";
        }
    }

    @GetMapping("/support")
    public String support(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                          Model model){
        if(sessionForm == null){
            return "support";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "support";
        }
    }

    @GetMapping("/news")
    public String news(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                       Model model){
        if(sessionForm == null){
            return "news";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "news";
        }
    }


}
