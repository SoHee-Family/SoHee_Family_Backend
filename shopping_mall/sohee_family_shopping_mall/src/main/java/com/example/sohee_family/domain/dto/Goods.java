package com.example.sohee_family.domain.dto;

import lombok.Data;

@Data
public class Goods {
    /**
     * ==상품==
     * <p>
     * 상품 관리번호
     * 상품 이름
     * 상품 가격
     * 상품 이미지 URL
     */
    private  Long goodsManageSeq;
    private  String goodsName;
    private  int goodsPrice;
    private  String goodsImageURL;

    public Goods(String goodsName, int goodsPrice, String goodsImageURL) {
        this.goodsName = goodsName;
        this.goodsPrice = goodsPrice;
        this.goodsImageURL = goodsImageURL;
    }
}
