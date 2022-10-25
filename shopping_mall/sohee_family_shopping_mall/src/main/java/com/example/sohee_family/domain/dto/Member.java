package com.example.sohee_family.domain.dto;

import lombok.Data;

@Data
public class Member {
    /**
     * ==회원==
     *
     * 관리번호
     * login ID
     * login PW
     * 사용자 이름
     * 전화번호
     * 주소
     * e_mail
     */
    private Long memberManageSeq;

    private String id;

    private String pw;

    private String name;

    private String tel;

    private String address;

    private String e_mail;

    public Member(String id, String pw, String name, String tel, String address, String e_mail) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.tel = tel;
        this.address = address;
        this.e_mail = e_mail;
    }
}
