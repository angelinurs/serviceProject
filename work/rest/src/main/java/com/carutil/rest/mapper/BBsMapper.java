package com.carutil.rest.mapper;

import com.carutil.rest.vo.BBsVO;

public interface BBsMapper {

    // 현재 interface 들을 연결하고 있는 sql mapper xml 에 정의 되어있는
    // 각 query 들의 id 를 abstract method 로 정의 한다.

    int write(BBsVO vo);
}
