package com.carutil.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carutil.rest.mapper.MemberMapper;
import com.carutil.rest.vo.MemberVO;

// @Service 라고 명시해야 bean 객체로 인식하고,
// MemberMapper interface 를 인식한다.
@Service
public class MemberService {

    @Autowired
    private MemberMapper mapper;

    public MemberVO login(String id, String pw) {

        return mapper.login(id, pw);
    }

    public int signup(MemberVO vo) {

        return mapper.signup(vo);
    }
}
