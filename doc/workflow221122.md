#### # 작업 일지 22.11.22
> ==login 관련 simple nextjs ui with mui 만들기.==

#### # 환경 구축
> == 상세 ==
> [ windows ]
> 1. nodejs 설치 ( chocoratey package install )
> 2. react-router-dom version 6 설치
>> - `npm install react-router-dom@6`
> 3. reduxjs/toolkit 설치
>> - `npm install @reduxjs/toolkit`
> 4. mui ( Material Use Interface ) design toolkit 설치
>> - `npm install @mui/material @emotion/react @emotion/styled`
> 4. axios asynchronous library 설치
>> - `npm install axios`
> 5. nextjs 설치
>> - Automatic setup
>>      - `npx create-next-app@latest`
>> - Menual setup
>>      - `npm install next react react-dom`
> 6. project 생성
>> - `carutil/work$ npx create-next-app carutil`
>> - ==사실 위의 명령어 하나로 next, react, react-dom 의존성을 검사하여 자동 설치한다.==
> 7. 설치 완료 확인 명령어
>> `npm run dev`

#### # UI 작업 일정
> == 상세 ==
> 1. document view type 설정
> 2. menu bar 만들기
> 3. login / logout 기능 spring boot rest server 와 연동해보기
> 4. 회원 가입
> ... 구성해보고 남는 시간에 bbs 작업 돌입.