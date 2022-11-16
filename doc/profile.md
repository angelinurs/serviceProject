---
#### final project : **I'm Camper**

---
##### # 1. api 정리 표
| 기관| url | description|
|-|-|-|
| 한국 관광 공사 | https://api.visitkorea.or.kr/#/ |
| 오픈뱅킹 | https://www.openbanking.or.kr/apt/content/openapi | 
| 기상청 기상자료 개방포털| https://data.kma.go.kr/api/selectApiList.do?pgmNo=42 |
| 한국 지능정보 사회 진흥원 | https://www.wififree.kr/pu/oa/L01.do | **공공 와이파이 DB** | 
| 식품의약품 안전처 | http://www.foodsafetykorea.go.kr/api/howToUseApi.do?menu_grp=MENU_GRP34&menu_no=687 |
| 한국 지능정보 사회 진흥원 | https://www.aihub.or.kr/ | **AI 학습 데이터** |
| 한국 건강 증진 개발원 | https://www.khealth.or.kr:8090/mhcOpenAPI/pageNavi.do?menuCd=OCM220 | **보건소 모바일 헬쓰케어( 디바이스 연동 오픈 API )** |
| 중앙 응급 의료 센터 | https://www.e-gen.or.kr/nemc/open_api.do?viewPage=application | **전국 병의원 , 약국, 응급 의료 기관 조회 open API** |

---
##### # 2. 임시 구성
> 1. 캠핑장 위치
> 2. Community
> 3. 중고거래( 캠핑 중고 거래 )
>> - 중고거래 테이블 따로 만들지 고민해보기
> 4. 응급의료
>> - 병원위치, 약국 ( 지도 위치 ) -> 주변의료시설 및 약국 현황

---
##### # 3. Database 및 table scheme 구성
> __1. database__
>> - imcamper

> __2. 회원정보 table__
>> - **member**
>> - no ( 회원번호 ), id, pw, email, birth, phone, snsAuth( 소셜 로그인 ), snsID( 소셜 로그인 아이디 ), manner_point, activate( 활동/탈퇴 여부 ), grade( 등급 ), regDate( 가입 날짜 )
>> - activate 와 grade 를 통합할건지?
```sql
DROP TABLE `imcamper`.`member`;
CREATE TABLE IF NOT EXISTS `imcamper`.`member` (
    `m_idx` INT NOT NULL AUTO_INCREMENT, -- primary key
    `id` VARCHAR(256) NOT NULL,
    `pw` VARCHAR(256) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `birth` date NOT NULL,
    `phone` VARCHAR(256) NOT NULL,
    `snsAuth` VARCHAR(256) DEFAULT 'local', -- social login ex) google, naver
    `snsID` VARCHAR(256),
    `manner_point` INT DEFAULT 0,
    `activate` INT DEFAULT 0, -- 유효 회원( 활동/탈퇴 여부 )
    `grade` INT DEFAULT 0, -- 회원 등급 ( 관리자 9 )
    `regDate`date NOT NULL, -- 가입 날짜 ( 이전에 없던 필드 )
    
    constraint Pk_Member primary key( no )
);
```
> __3. 게시판 table__
>> - **bbs**
>> - b_idx, subject, writer, content, file_name, ori_name, write_date, ip, hit, status, bname, like
```sql
DROP TABLE `imcamper`.`bbs`;
CREATE TABLE `imcamper`.`bbs` (
  `b_idx` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(50) DEFAULT NOT NULL,
  `writer` VARCHAR(20) DEFAULT NOT NULL,
  `content` text,
  `file_name` VARCHAR(50) DEFAULT NULL,
  `ori_name` VARCHAR(50) DEFAULT NULL,
  `write_date` date DEFAULT NOT NULL,
  `ip` VARCHAR(30) DEFAULT NOT NULL,
  `hit` INT DEFAULT 0, -- 게시물 조회수
  `bname` VARCHAR(10) DEFAULT 'BBS',
  `like` INT DEFAULT 0, -- 게시물 좋아요 기능
  `status` INT DEFAULT 0,  -- 게시물 삭제 여부

  PRIMARY KEY (`b_idx`)
);
```
> __4. 댓글 table__
>> - **comment**
>> - c_idx, writer, content, write_date, ip, b_idx, like, status
```sql
DROP TABLE `imcamper`.`comment`;
CREATE TABLE `imcamper`.`comment` (
  `c_idx` INT NOT NULL AUTO_INCREMENT,
  `writer` VARCHAR(20) DEFAULT NULL,
  `content` text,
  `write_date` date DEFAULT NULL,
  `ip` VARCHAR(30) DEFAULT NULL,
  `b_idx` INT DEFAULT NULL, -- foreign key default null 이 맞음.
  `like` INT DEFAULT 0, -- 댓글 좋아요 기능
  `status` INT DEFAULT 0,  -- 댓글 삭제 여부 ( 기존에 없던 필드, !!회의때 검토 )

  PRIMARY KEY (`c_idx`),
  KEY `comment_fk` (`b_idx`),
  CONSTRAINT `comment_fk` FOREIGN KEY (`b_idx`) REFERENCES `bbs` (`b_idx`)
);
```

---
##### # 4. 화면구성

---
##### # 5. 캠핑장 api 분석해보고 사용가능한 api 더 알아보기

---
##### # 6. spring server 구성하기
> - site : https://start.spring.io/ 
> - Project : Maven Project
> - Language : Java
> - Spring Boot : ==2.7.5==
> - Project Metadata
>   - Group : com.imcamper
>   - Artifact : rest
>   - Name : rest
>   - Description : imcamper project for Spring Boot ( rest api server )
>   - Package name : com.imcamper.rest
>   - java : ==11==
> - Dependencies
>   - Developer Tools :: *Spring Boot Dev Tools, Lombok, Spring configuration processor, Spring Web*
>   - SQL :: *JDBC API, MyBatis Framework, MySQL Driver*

---
##### # 7. openjdk 11 구성
> - site : https://openjdk.org/projects/jdk/11/