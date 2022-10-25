package com.example.sohee_family.controller.login.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
@Data
public class LoginForm {
    @NotEmpty
    private String id;

    @NotEmpty
    private String pw;
}
