package com.example.sohee_family.controller.menu;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
public class MenuController {

    @GetMapping("/menu")
    public String menu(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                       Model model) {
        if(sessionForm == null){
            return "menu";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "menu";
        }
    }
}
