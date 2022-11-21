package com.carutil.rest.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberVO {
    private String m_idx;
    private String id;
    private String pw;
    private String email;
    private String name;
    private String birth;
    private String phone;
    private String snsAuth;
    private String snsID;
    private String manner_point;
    private String activate;
    private String grade;
    private String regDate;
}
