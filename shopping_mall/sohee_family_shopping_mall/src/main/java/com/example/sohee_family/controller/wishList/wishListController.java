package com.example.sohee_family.controller.wishList;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import com.example.sohee_family.domain.dto.Design;
import com.example.sohee_family.domain.dto.WishDesign;
import com.example.sohee_family.domain.repository.designRepository.inf.DesignRepository;
import com.example.sohee_family.domain.repository.wishListRepository.inf.WishListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.SessionAttribute;


@Controller
@RequiredArgsConstructor
public class wishListController {
    private final DesignRepository designRepository;
    private final WishListRepository wishListRepository;

    @GetMapping("/wishList/{designManageSeq}")
    public String wishList(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                           @PathVariable("designManageSeq") Long designManageSeq, Model model) {

        if(sessionForm == null){
            return "redirect:/";
        }

        Design design = designRepository.findDesignByManageSeq(designManageSeq).get();
        wishListRepository.save(new WishDesign(sessionForm.getMemberManageSeq(),design.getDesignManageSeq(), design.getDesignName(), design.getDesignPrice()));
        return "redirect:/myPage";
    }

    @GetMapping("/wishList/remove/{wishListManageSeq}")
    public String wishListRemove(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                           @PathVariable("wishListManageSeq") Long wishListManageSeq) {

        if(sessionForm == null){
            return "redirect:/";
        }

        wishListRepository.delete(wishListManageSeq);
        return "redirect:/myPage";
    }




}
