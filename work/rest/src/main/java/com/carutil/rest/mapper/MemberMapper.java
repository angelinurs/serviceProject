package com.carutil.rest.mapper;

import org.apache.ibatis.annotations.Param;

import com.carutil.rest.vo.MemberVO;

public interface MemberMapper {

    // 현재 interface 들을 연결하고 있는 sql mapper xml 에 정의 되어있는
    // 각 query 들의 id 를 abstract method 로 정의 한다.

    MemberVO login(@Param("id") String id,
            @Param("pw") String pw);

    int signup(MemberVO vo);
}
