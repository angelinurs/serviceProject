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

// ui 를 활용할 nextjs 와의 충돌 설정
@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/rest/member")
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

    // @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @RequestMapping("/signup")
    public Map<String, String> signup(String id, String pw, String email, String name, String nick, String birth,
            String phone, String regDate) {

        // request parameter check code
        StringBuilder sb = new StringBuilder();
        sb.append("id : ").append(id).append("\n")
                .append("pw : ").append(pw).append("\n")
                .append("name : ").append(name).append("\n")
                .append("nick : ").append(nick).append("\n")
                .append("birth : ").append(birth).append("\n")
                .append("email : ").append(email).append("\n")
                .append("phone : ").append(phone).append("\n");

        System.out.println(sb.toString());

        // insert 준비
        MemberVO vo = new MemberVO(null, id, pw, email, name, nick, birth, phone,
                null, null, null, null, null, regDate);

        int succ = m_service.signup(vo);

        // respoonse signup result
        Map<String, String> map = new HashMap<>();

        if (succ != 0) {
            map.put("succ", "1");
        } else {
            map.put("fail", "0");
        }

        return map;
    }

}
