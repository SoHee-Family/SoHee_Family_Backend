package com.example.sohee_family.controller.myPage;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import com.example.sohee_family.controller.myPage.form.PaymentList;
import com.example.sohee_family.domain.dto.Payment;
import com.example.sohee_family.domain.repository.designRepository.inf.DesignRepository;
import com.example.sohee_family.domain.repository.goodsRepository.inf.GoodsRepository;
import com.example.sohee_family.domain.repository.paymentRepository.inf.PaymentRepository;
import com.example.sohee_family.domain.repository.wishListRepository.inf.WishListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MyPageController {
    private final PaymentRepository paymentRepository;
    private final DesignRepository designRepository;
    private final WishListRepository wishListRepository;

    @GetMapping("/myPage")
    public String myPage(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm form, Model model) {
        if (form == null) {
            return "redirect:/login";
        }


        model.addAttribute("sessionForm", form);
        // 구매 목록 필요
        List<Payment> payments = paymentRepository.findPaymentByMemberManageSeq(form.getMemberManageSeq());
        List<PaymentList> paymentList = new ArrayList<>();
        for(Payment payment : payments){
            paymentList.add(new PaymentList(
                    designRepository.findDesignByManageSeq(payment.getPayDesignManageSeq()).get().getDesignName(),
                    payment.getPayDesignManageSeq(),
                    payment.getPayGoods(),
                    payment.getDate(),
                    payment.getTotalPrice()));
        }

        model.addAttribute("payments", paymentList);

        //찜 목록
        model.addAttribute("wishList", wishListRepository.findByMemberManageSeq(form.getMemberManageSeq()));

        return "myPage";




    }
}
