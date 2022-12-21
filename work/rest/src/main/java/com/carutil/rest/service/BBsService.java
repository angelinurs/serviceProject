package com.carutil.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carutil.rest.mapper.BBsMapper;
import com.carutil.rest.vo.BBsVO;

// @Service 라고 명시해야 bean 객체로 인식하고,
// MemberMapper interface 를 인식한다.
@Service
public class BBsService {

    @Autowired
    private BBsMapper mapper;

    public int write(BBsVO vo) {

        return mapper.write(vo);
    }
}
