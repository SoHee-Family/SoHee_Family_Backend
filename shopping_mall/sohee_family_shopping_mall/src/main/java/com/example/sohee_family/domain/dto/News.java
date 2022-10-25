package com.example.sohee_family.domain.dto;

import lombok.Data;

@Data
public class News {
    /**
     * ==디자인==
     * 뉴스 관리 번호
     * 뉴스 이미지
     * 뉴스 서브 타이틀
     * 뉴스 내용
     */
    private Long newsManageSeq;

    private String tag;
    private String newsTitle;
    private String imageURL;
    private String newsSubTitle;
    private String text;

    public News(String tag, String newsTitle,String imageURL, String newsSubTitle, String text) {
        this.tag = tag;
        this.imageURL = imageURL;
        this.newsTitle = newsTitle;
        this.newsSubTitle = newsSubTitle;
        this.text = text;
    }
}
