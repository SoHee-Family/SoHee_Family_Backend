package com.example.sohee_family.controller.signUp.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class SignUpForm {
    @NotEmpty
    private String id;
    @NotEmpty
    private String pw;
    @NotEmpty
    private String name;
    @NotEmpty
    private String tel;
    @NotEmpty
    private String address;
    @NotEmpty
    private String e_mail;


}
