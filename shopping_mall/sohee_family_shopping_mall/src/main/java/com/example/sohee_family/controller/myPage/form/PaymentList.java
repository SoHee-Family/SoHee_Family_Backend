package com.example.sohee_family.controller.myPage.form;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentList {
    private String designName;
    private Long designManageSeq;
    private String goodsName;
    private String date;
    private int totalPrice;
}
