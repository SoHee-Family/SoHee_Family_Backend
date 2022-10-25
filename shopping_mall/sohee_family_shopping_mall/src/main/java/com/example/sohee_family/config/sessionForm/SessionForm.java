package com.example.sohee_family.config.sessionForm;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class SessionForm {
    private String id;
    private String name;
    private Long memberManageSeq;
}
