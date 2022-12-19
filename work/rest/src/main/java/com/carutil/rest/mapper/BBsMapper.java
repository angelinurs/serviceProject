package com.carutil.rest.mapper;

import org.apache.ibatis.annotations.Param;

import com.carutil.rest.vo.BBsVO;

public interface BBsMapper {

    // 현재 interface 들을 연결하고 있는 sql mapper xml 에 정의 되어있는
    // 각 query 들의 id 를 abstract method 로 정의 한다.

    BBsVO write(
        @Param("subject") String subject,
        @Param("id") String id,        
        @Param("nick") String nick,        
        @Param("content") String content,        
        @Param("file_name") String file_name,        
        @Param("ori_name") String ori_name,
        @Param("write_date") String write_date,
        @Param("ip") String ip,
        @Param("bname") String bname,
        @Param("etc") String etc        
        );
}
