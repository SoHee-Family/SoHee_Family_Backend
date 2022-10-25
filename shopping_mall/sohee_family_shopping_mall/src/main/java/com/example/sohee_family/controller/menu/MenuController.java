package com.example.sohee_family.controller.menu;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import com.example.sohee_family.domain.dto.Design;
import com.example.sohee_family.domain.repository.designRepository.inf.DesignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MenuController {
    private final DesignRepository designRepository;

    @GetMapping("/menu")
    public String menu(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                       Model model) {
        List<Design> designList = designRepository.findAllDesign();
        model.addAttribute("designList", designList);
        model.addAttribute("sessionForm", sessionForm);
        return "menu";

    }
}
