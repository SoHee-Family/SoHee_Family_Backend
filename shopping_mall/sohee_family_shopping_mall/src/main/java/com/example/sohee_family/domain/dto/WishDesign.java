package com.example.sohee_family.domain.dto;

import lombok.Data;

@Data
public class WishDesign {
    /**
     * ==찜목록 디자인==
     * 찜목록 관리 번호
     * 회원 관리 번호
     * 디자인 이름
     * 디자인 가격
     */
    private Long wishListManageSeq;
    private Long memberManageSeq;
    private Long designManageSeq;
    private String designName;
    private int designPrice;

    public WishDesign(Long memberManageSeq,Long designManageSeq, String designName, int designPrice) {
        this.memberManageSeq = memberManageSeq;
        this.designManageSeq = designManageSeq;
        this.designName = designName;
        this.designPrice = designPrice;
    }
}
