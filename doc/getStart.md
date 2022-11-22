#### # final project : car util ( 세차하기 좋은 날 )
> ==Description==
> 날씨 정보를 기반으로 세차 하기 좋은 날 추천
> - 기타. 자동차 관련 정보 제공 ( dash board 기능 )

##### # 1-1. api 정리 표 ( 221116 오전에 폐기됨 )
<details><summary>just see</summary>

```code
##### # 1-1. api 정리 표

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
```

</details>

---
##### # 1-2. api 정리 표
| 기관| url | description|
|-|-|-|
| ==**날씨**== |  |  |
| 기상청_단기예보 ((구)_동네예보) 조회서비스 |  |  |
| 기상청_중기예보 조회서비스 |  |  |
| 한국환경공단_에어코리아_대기오염정보 |  |  |
| ==**지역코드**== |  |  |
| 행정안전부_행정표준코드_법정동코드 |  |  |
| ==**주정차 관련**== |  |  |
| 전국주정차금지(지정)구역표준데이터 |  |  |
| 전국주차장정보표준데이터 |  |  |
| ==**세차장 관련**== |  |  |
| 행정안전부_세차장정보 |  |  |
| **세차장정보** | https://www.localdata.go.kr/lif/lifeCtacDataView.do?opnEtcSvcId=12_04_05_E  |  |
| ==**생활 밀착 데이터**== |
| 세차장정보  |  |  |
| 과속방지턱정보 |  |  |
| 무료와이파이정보  |  |  |
| CCTV정보 |  |  |
| 무인민원발급기정보 |  |  |
| 모범음식점정보 |  |  |
| ==**병원 약국 정보**== |
| 건강보험심사평가원_병원정보서비스 |  |  |
| 건강보험심사평가원_약국정보서비스 |  |  |
| 건강보험심사평가원 병원약국찾기 정보 |  |  |
| ==**식품 의약품 안전**== |
| 식품의약품안전처_의약품 낱알식별 정보 |  |  |
| 환경부 국립환경과학원_먹는샘물 수질검사결과 정보 |  |  |
| ==**기타**== |
| 전국미용업소표준데이터 |  |  |

---

##### # 2-1. 임시 구성 ( 221116 오전에 폐기됨 )
<details><summary>just see</summary>
```code
##### # 2-1. 임시 구성
> 1. 캠핑장 위치
> 2. Community
> 3. 중고거래( 캠핑 중고 거래 )
>> - 중고거래 테이블 따로 만들지 고민해보기
> 4. 응급의료
>> - 병원위치, 약국 ( 지도 위치 ) -> 주변의료시설 및 약국 현황
```
</details>

---
##### # 2-2. 임시 화면 구성
> 1. 회원 가입 및 로그인 로그아웃
> 2. 현재 접속 한 ip 를 기반으로 세차장 위치 보여주기 ( 지도 api )
> 3. 차량 등록 위치로 세차장 위치 보여주기 ( 지도 api )
>> - carousel 모바일 swipe (옆으로 쓸기) 이벤트 넣을지 고민해보기
>> - 참고 사이트 : http://lazcreative.com/blog/adding-swipe-support-to-bootstrap-carousel-3-0/
> 4. 세차장 주변 주차장 ( map 에 같이 표시 해주면 좋을 듯 )
> 5. 세차장 주변 주정차금지(지정)구역 ( map 에 같이 표시 해주면 좋을 듯 )
> 6. community 게시판 1 ( 자유 게시판 용도 )
> 7. community 게시판 2 ( 자신의 차량 소개 )
> 8. 교통 법규 관련 공지글
> 9. 자동차 보험 관련
> 10. 기타 생활 정보 ( dashboard :: 무료와이파이 정보, cctv 정보, 공중 화장실 정보 )
> 11. 국토교통부_CCTV 화상자료 원하는 위치
> == 1~8 번 까지는 기간내에 구현하기
> 12. 날씨 알려주면서 지역 광고 해주기( 날씨가 좋네요, ** 미용실 어때요?, 비가 온데요. ** 카페 어때요? )

---
##### # 3. Database 및 table scheme 구성

> __0. database__
>> - carutil
```sql
CREATE DATABASE `carutil`;
```

> __1. user__
>> - naru
```sql
CREATE USER naru IDENTIFIED BY '3013';
GRANT ALL PRIVILEGES ON `carutil` TO 'naru'@'%';
FLUSH PRIVILEGES;
```

> __2. 회원정보 table__
>> - **member**
>> - no ( 회원번호 ), id, pw, email, birth, phone, snsAuth( 소셜 로그인 ), snsID( 소셜 로그인 아이디 ), manner_point, activate( 활동/탈퇴 여부 ), grade( 등급 ), regDate( 가입 날짜 )
>> - activate 와 grade 를 통합할건지?
```sql
DROP TABLE `carutil`.`member`;
CREATE TABLE IF NOT EXISTS `carutil`.`member` (
    `m_idx` INT NOT NULL AUTO_INCREMENT, -- primary key
    `id` VARCHAR(256) NOT NULL,
    `pw` VARCHAR(256) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `nick` VARCHAR(256) NOT NULL, -- nick name
    `birth` date NOT NULL,
    `phone` VARCHAR(256) NOT NULL,
    `snsAuth` VARCHAR(256) DEFAULT 'local', -- social login ex) google, naver
    `snsID` VARCHAR(256),
    `manner_point` INT DEFAULT 0,
    `activate` INT DEFAULT 0, -- 유효 회원( 활동/탈퇴 여부 )
    `grade` INT DEFAULT 0, -- 회원 등급 ( 관리자 9 )
    `regDate`date NOT NULL, -- 가입 날짜 ( 이전에 없던 필드 )
    
    constraint Pk_Member primary key( m_idx )
);
```
> __3. 게시판 table__
>> - **bbs**
>> - b_idx, subject, writer, content, file_name, ori_name, write_date, ip, hit, status, bname, like
```sql
DROP TABLE `carutil`.`bbs`;
CREATE TABLE `carutil`.`bbs` (
  `b_idx` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(50) NOT NULL,
  `id` VARCHAR(20) NOT NULL,
  'nick' VARCHAR(20) NOT NULL,
  `content` text,
  `file_name` VARCHAR(50) NULL,
  `ori_name` VARCHAR(50) NULL,
  `write_date` date NOT NULL,
  `ip` VARCHAR(30) NOT NULL,
  `hit` INT DEFAULT 0, -- 게시물 조회수
  `bname` VARCHAR(10) DEFAULT 'BBS',
  `like` INT DEFAULT 0, -- 게시물 좋아요 기능
  `status` INT DEFAULT 0,  -- 게시물 삭제 여부
  `etc` VARCHAR(50) NULL, -- 여분의 필드

  PRIMARY KEY (`b_idx`)
);
```
> __4. 댓글 table__
>> - **comment**
>> - c_idx, writer, content, write_date, ip, b_idx, like, status
```sql
DROP TABLE `carutil`.`comment`;
CREATE TABLE `carutil`.`comment` (
  `c_idx` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(20) NOT NULL,
  'nick' VARCHAR(20) NOT NULL,
  `content` text,
  `write_date` date NULL,
  `ip` VARCHAR(30) NULL,
  `b_idx` INT NULL, -- foreign key NULL 이 맞음.
  `like` INT DEFAULT 0, -- 댓글 좋아요 기능
  `status` INT DEFAULT 0,  -- 댓글 삭제 여부 ( 기존에 없던 필드, !!회의때 검토 )

  PRIMARY KEY (`c_idx`),
  KEY `comment_fk` (`b_idx`),
  CONSTRAINT `comment_fk` FOREIGN KEY (`b_idx`) REFERENCES `bbs` (`b_idx`)
);
```

---
##### # 4. 화면구성
> 1. 현재 접속 한 ip 를 기반으로 세차장 위치 보여주기 ( 지도 api )
>> % carousel(캐러셀) UI
>>    - carousel 모바일 swipe (옆으로 쓸기) 이벤트. 
>>    - http://lazcreative.com/blog/adding-swipe-support-to-bootstrap-carousel-3-0/
> 2. 차량 등록 위치로 세차장 위치 보여주기 ( 지도 api )
>> 일반 ui ( car list )
>> - 세차장 주변 주차장 ( map 에 같이 표시 해주면 좋을 듯 )
> 3. 주정차금지(지정)구역 ( map 에 같이 표시 해주면 좋을 듯 )
> 4. 교통 법규 관련 공지글.
> 5. 자동차 보험 관련 
> 6. 썰 관련 올리기 게시판
> 7. 회원 가입 및 로그인 로그아웃
> 8. 기타 생활 정보 ( dashboard :: 무료와이파이 정보, cctv 정보, 공중 화장실 정보 )
> 9. 국토교통부_CCTV 화상자료 원하는 위치

---
##### # 5. carutil api 분석해보고 사용가능한 api 더 알아보기

---
##### # 6. spring server 구성하기
> - site : https://start.spring.io/ 
> - Project : Maven Project
> - Language : Java
> - Spring Boot : ==2.7.5==
> - Project Metadata
>   - Group : com.carutil
>   - Artifact : rest
>   - Name : rest
>   - Description : carutil project for Spring Boot ( rest api server )
>   - Package name : com.carutil.rest
>   - java : ==11==
> - Dependencies
>   - Developer Tools :: *Spring Boot Dev Tools, Lombok, Spring configuration processor, Spring Web*
>   - SQL :: *JDBC API, MyBatis Framework, MySQL Driver*
>   - tomcat version 9.0 ( aws 에서 8.5 지원 문제 있음. )
---
##### # 7. openjdk 11 구성
> - site : https://openjdk.org/projects/jdk/11/