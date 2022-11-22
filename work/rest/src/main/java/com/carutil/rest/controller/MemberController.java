package com.carutil.rest.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carutil.rest.service.MemberService;
import com.carutil.rest.vo.MemberVO;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

// ui 를 활용할 nextjs 와의 충돌 설정
@CrossOrigin(originPatterns = "http://localhost:3000 ")
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService m_service;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map<String, Object> login(String id, String pw) {

        MemberVO mvo = m_service.login(id, pw);

        StringBuilder sb = new StringBuilder();
        sb.append("id : ").append(id).append("\n")
                .append("pw : ").append(pw);

        // 요청 받은 곳으로 반환할 준비 해야함. ( json 으로 보낼 준비 )
        // ex> { "chk" : 1, "user" : { "m_id" : "test", "m_pw" : "1111" } }

        Map<String, Object> resMap = new HashMap<>();

        resMap.put("chk", (mvo != null) ? 1 : 0);
        resMap.put("user", mvo);

        return resMap;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public Map<String, String> signup(String id, String pw, String name, String nick, String birth, String phone,
            String phone1, String phone2) {

        Map<String, String> map = new HashMap<>();

        StringBuilder sb = new StringBuilder();
        sb.append("id : ").append(id).append("\n")
                .append("pw : ").append(pw).append("\n")
                .append("name : ").append(name).append("\n")
                .append("nick : ").append(nick).append("\n")
                .append("birth : ").append(birth).append("\n")
                .append("phone : ").append(phone).append("-")
                .append(phone1).append("-")
                .append(phone2).append("\n");

        System.out.println(sb.toString());

        map.put("succ", "1");

        return map;
    }

}
