package com.example.sohee_family.controller.Login.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
@Data
public class LoginForm {
    @NotEmpty
    private String id;

    @NotEmpty
    private String pw;
}
