package com.example.sohee_family.controller.payment;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import com.example.sohee_family.domain.dto.Design;
import com.example.sohee_family.domain.dto.Goods;
import com.example.sohee_family.domain.dto.Member;
import com.example.sohee_family.domain.dto.Payment;
import com.example.sohee_family.domain.repository.designRepository.inf.DesignRepository;
import com.example.sohee_family.domain.repository.goodsRepository.inf.GoodsRepository;
import com.example.sohee_family.domain.repository.memberRepository.inf.MemberRepository;
import com.example.sohee_family.domain.repository.paymentRepository.inf.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class PaymentController {
    private final DesignRepository designRepository;
    private final GoodsRepository goodsRepository;
    private final PaymentRepository paymentRepository;

    @PostMapping("/payment/{designManageSeq}")
    public String payment(HttpServletRequest request,
                          @PathVariable("designManageSeq") Long designManageSeq,
                          @SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm form) {
        if (form == null) {
            return "redirect:/login";
        }

        String selectbox = request.getParameter("selectbox");
        Optional<Design> design = designRepository.findDesignByManageSeq(designManageSeq);

        if (design.isEmpty() || selectbox == null) {
            return "redirect:/myPage";
        }
        Goods goods = goodsRepository.findAllGoods().stream()
                .filter(g -> g.getGoodsName().equals(request.getParameter("selectbox")))
                .findFirst().get();

        int totalPrice = design.get().getDesignPrice() + goods.getGoodsPrice();

        //success logic
        Date from = new Date();
        SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
        String date = transFormat.format(from);


        paymentRepository.save(new Payment(form.getMemberManageSeq(), selectbox, designManageSeq, date, totalPrice));

        return "redirect:/myPage";
    }

}
