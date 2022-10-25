package com.example.sohee_family.domain.dto;

import lombok.Data;

@Data
public class Payment {
//    ==결제==
//     * 결제 관리 번호
//     * 결제 회원 관리 번호
//     * 결제 상품
//     * 결제 디자인 관리 번호
//     * 결제 날짜
//     * 총 결제 금액

    private Long paymentManageSeq;
    private Long payMemberManageSeq;
    private String payGoods;
    private Long payDesignManageSeq;
    private String date;
    private int totalPrice;

    public Payment(Long payMemberManageSeq, String payGoods, Long payDesignManageSeq, String date, int totalPrice) {
        this.payMemberManageSeq = payMemberManageSeq;
        this.payGoods = payGoods;
        this.payDesignManageSeq = payDesignManageSeq;
        this.date = date;
        this.totalPrice = totalPrice;
    }
}
