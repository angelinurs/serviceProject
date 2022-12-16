#### # 작업 일지 22.11.22~28
> ==bulletin board 만들기==

#### # 환경 구축
> == 상세 ==
> [ editor: quill 사용 ]
> 1. react-quilljs 설치
>> - `npm i react-quilljs`
> 2. doc ref ::
>> - [npm i redux redux-thunk @redux-devtools/extension next-redux-wrapper](https://www.npmjs.com/package/react-quilljs)
> 4. mui ( Material Use Interface ) design toolkit 설치
>> - `npm install @mui/material @emotion/react @emotion/styled`
>> - Icon material 사용할 경우 설치 
>>      - `npm install @mui/icons-material`
> 5. axios asynchronous library 설치
>> - `npm install axios`
> 6. nextjs 설치
>> - Automatic setup
>>      - `npx create-next-app@latest`
>> - Menual setup
>>      - `npm install next react react-dom`
> 7. project 생성
>> - `carutil/work$ npx create-next-app carutil`
>> - ==사실 위의 명령어 하나로 next, react, react-dom 의존성을 검사하여 자동 설치한다.==
> 8. 설치 완료 확인 명령어
>> - `npm run dev`
> 9. react-imask 설치 각종 문자열 서식 자동화 작업
>> - `npm i react-imask`
> 10. 달력 생성을 위한 Date picker 설치
>> - // Install component (community version)
>> - `npm install @mui/x-date-pickers`
>> - // Install date library (if not already installed)
>> - `npm install moment`
>> - // dayjs
>> - `npm i dayjs`