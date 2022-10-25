package com.example.sohee_family.domain.dto;

import lombok.Data;

@Data
public class Design {
    /**
     * ==디자인==
     * 디자인 관리번호
     * 디자인 이름
     * 디자인 가격
     * 디자인 이미지 URL
     * 리뷰 수
     * 별점
     */
    private  Long designManageSeq;
    private  String designName;
    private  int designPrice;
    private  String designImageURL;
    private String explain;
    private int reviewCount;
    private String star;


    public Design(String designName, int designPrice, String designImageURL,String explain, int reviewCount, String star) {
        this.designName = designName;
        this.designPrice = designPrice;
        this.designImageURL = designImageURL;
        this.explain = explain;
        this.reviewCount = reviewCount;
        this.star = star;
    }
}
