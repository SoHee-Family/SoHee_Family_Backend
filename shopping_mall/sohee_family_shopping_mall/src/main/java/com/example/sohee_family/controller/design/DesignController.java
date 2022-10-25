package com.example.sohee_family.controller.design;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import com.example.sohee_family.domain.repository.designRepository.inf.DesignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequiredArgsConstructor
public class DesignController {

    private final DesignRepository designRepository;

    @GetMapping("/design/{designManageSeq}")
    public String design(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm form,
            @PathVariable("designManageSeq")Long designManageSeq, Model model) {
        model.addAttribute("design", designRepository.findDesignByManageSeq(designManageSeq).get());
        model.addAttribute("sessionForm", form);
        return "goodsDetail";
    }
}
