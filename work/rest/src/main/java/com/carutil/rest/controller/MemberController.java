package com.carutil.rest.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carutil.rest.service.MemberService;
import com.carutil.rest.vo.MemberVO;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.RequestMethod;

// ui 를 활용할 nextjs 와의 충돌 설정
@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/rest/member")
public class MemberController {

    @Autowired
    private MemberService m_service;

    @RequestMapping("/signin")
    public Map<String, Object> login(String id, String pw) {

        MemberVO mvo = m_service.login(id, pw);

        Map<String, Object> resMap = new HashMap<>();

        // Case 01.
        // 요청 받은 곳으로 반환할 준비 해야함. ( json 으로 보낼 준비 )
        // ex> { "chk" : 1, "user" : { "m_id" : "test", "m_pw" : "1111" } }
        /*
         * if( mvo == null ) {
         * resMap.put("chk", 0);
         * } else {
         * resMap.put("chk", 1);
         * resMap.put("user", mvo);
         * }
         * 
         * return resMap;
         */

        // Case 02.
        /*
         * 아래는 object 를 ( 여기서는 vo ) Map 으로 변환해주는 다른 방법이다.
         * - sign in 을 하고 나서 전달 해주어야 할 사용자 정보가 생각보다 많기 때문에
         * - 한번에 변환한후 민감한 key 값( password 같은.. )만 소거해주는 방식이다.
         * 
         * - Map 추가할 것보다 삭제할 항목이 더 적은 경우 추천한다.
         */
        ObjectMapper objectMapper = null;
        Map<String, Object> voMap = null;
        if (mvo == null) {
            resMap.put("chk", 0);
        } else {
            objectMapper = new ObjectMapper();
            voMap = objectMapper.convertValue(mvo, Map.class);

            System.out.println(voMap);
            System.out.println(voMap.values());

            // log_in 할때 소거할 키 항목
            final String[] removeKey = { "m_idx", "pw", "snsAuth", "snsID" };

            for (String key : removeKey) {
                voMap.remove(key);
            }
            System.out.println(voMap);

            resMap.put("chk", 1);
            resMap.put("user", voMap);
        }

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
