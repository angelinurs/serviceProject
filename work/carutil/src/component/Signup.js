import { useEffect, useState } from "react";

import axios from 'axios';

import { Button, Divider, FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

// icons
import { AccountCircle, LineAxisOutlined } from "@mui/icons-material"; // id icon
import HttpsTwoToneIcon from '@mui/icons-material/HttpsTwoTone'; // password icon
import LockClockTwoToneIcon from '@mui/icons-material/LockClockTwoTone'; // re password icon
import PersonPinTwoToneIcon from '@mui/icons-material/PersonPinTwoTone'; // name icon
import SwitchAccountTwoToneIcon from '@mui/icons-material/SwitchAccountTwoTone'; // nick name icon
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone'; // birth day icon
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone'; // phone icon

import SendIcon from '@mui/icons-material/Send'; // send icon

// color
import { orange } from "@mui/material/colors"; // color pick

// DateOcker ( calendar )
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"; // @mui/x-date-pickers 설치
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // dayjs 설치
import dayjs from "dayjs";

const API_URL = "/member/signup"
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

const Signup = () =>   {
    
    useEffect(() => {
        localStorage.clear();
    });

    // Date-picker variable
    const [value, setValue] = useState( null );

    // signup parameters infomation
    const [userInfo, setUserInfo] = useState({
        id: '',
        pw: '',
        rpw: '',
        name: '',
        nick: '',
        birth: null,
        phone: '',
        phone1: '',
        phone2: '',
    });    

    // password 같은 지 확인하는 variable
    var pwChk = 0;

    // axios cors 문제 header 설정
    const header = {"Content-type":"application/json"};

    const list = [];

    function changeInfo(e) {
        setUserInfo({
            ...userInfo,
            [e.target.id] : e.target.value,
        });
    };

    function checkPassword(e) {
        // var item = { [e.target.id] : e.target.value }; 

        // useState 사용시 동기화 문제 해결 안됨.
        // localStorage 사용함.
        // 이후 submit 넘어갈때 관련 item 삭제 해주어야 함.
        changeInfo(e);
        localStorage.setItem( e.target.id, e.target.value );

        var pw = localStorage.getItem( 'pw' );
        var rpw = localStorage.getItem( 'rpw' );

        console.log( 'pw : ' + pw );
        console.log( 'rpw : ' + rpw );
        
        if( pw != null && rpw != null ) {

            if( pw.length > 7 && rpw.length > 7 && pw == rpw ) {
                pwChk = 1;
                console.log( '일치합니다. password check : ' + pwChk );
            } else {
                pwChk = 0;
            }

        }

        console.log( localStorage );
        
    };

    function signup() {
        // if( pwChk != 1 ) {}

        axios.post(
            // 'http://localhost:8080/member/signup',
            API_URL,
            null,
            {
                // params : userInfo
                params : {
                    id: userInfo.id,
                    pw: userInfo.pw,
                    name: userInfo.name,
                    nick: userInfo.nick,
                    birth: userInfo.birth,
                    phone: userInfo.phone + '-' 
                         + userInfo.phone1 + '-' 
                         + userInfo.phone2,
                },
                headers: {"Access-Control-Allow-Origin": "*"},
                withCredentials: true,            
                // headers: {"Content-type":"application/json"},
            }
        ).then( res => {
            console.log( res.data );
        });
    };

    return (
        <div className="Signin">
            <FormControl  justifycontent="center">
                <Stack spacing={2}>
                    <Box >
                    
                        {/* <Button color="secondary" fullWidth sx={{ display: 'flex', alignItems: 'flex-end' }} disableTouchRipple> */}
                            <Typography
                                variant="h5"
                                noWrap
                                sx={{
                                    marginLeft: 8,
                                    fontFamily: 'monospace',
                                    fontWeight: 900,
                                    letterSpacing: '.2rem',
                                    color: orange[500],
                                    textDecoration: 'none',
                            }}
                            >
                                Sign Up
                            </Typography>
                        {/* </Button> */}
                    </Box>
                    <Divider />
                    {/* 
                        User ID
                    */}
                    <Box>                                                            
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="id" label='User ID' variant="standard" onChange={changeInfo} />
                    </Box>
                    {/* 
                        User Password 
                    */}
                    <Box>
                        <HttpsTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            id="pw"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            onChange={checkPassword}
                            helperText="at least 8 characters"
                        />
                    </Box>                
                    {/* 
                        User Password check
                    */}
                    <Box>
                        <LockClockTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            id="rpw"
                            label="re input Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            onChange={checkPassword}
                            helperText="at least 8 characters"
                            color="warning"
                        />
                    </Box>                
                    {/* 
                        User name
                    */}
                    <Box>
                        <PersonPinTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="name" label='Name' variant="standard" onChange={changeInfo} />
                    </Box>
                    {/* 
                        User Nickname
                    */}
                    <Box>
                        <SwitchAccountTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="nick" label='Nick Name' variant="standard" onChange={changeInfo} />                
                    </Box>
                    {/* 
                        User Birth
                    */}
                    <Box>
                        <CakeTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={value}
                                // onChange={(newValue) => {
                                //     setValue(newValue);
                                // }}                                
                                onChange={(newValue) =>{
                                    setValue(newValue);
                                    setUserInfo({
                                        ...userInfo,
                                        ['birth'] : dayjs(newValue).format('DD-MM-YYYY') ,
                                    });

                                }}
                                renderInput={(params) => <TextField {...params} id='birth' label="Birth day" variant="standard" sx={{width:200}} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    {/* 
                        User Phone
                    */}
                    <Box>
                        <PhoneIphoneTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="phone" variant="standard" sx={{width : 50 }} inputProps={{min: 0, style: { textAlign: 'center' }} }  placeholder='000'  onChange={changeInfo}/>
                        {' - '}
                        <TextField id="phone1" variant="standard" sx={{width : 60 }} inputProps={{min: 0, style: { textAlign: 'center' }}} placeholder='0000'  onChange={changeInfo}/>
                        {' - '}
                        <TextField id="phone2" variant="standard" sx={{width : 60 }} inputProps={{min: 0, style: { textAlign: 'center' }}} placeholder='0000' onChange={changeInfo} />
                    </Box>
                    {/* 
                        Summit Button
                     */}
                    <Box justifycontent="center">
                        <Button variant="contained" endIcon={<SendIcon />} 
                                sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, width: 200 }}
                                onClick={signup}
                                >
                            Submit
                        </Button>
                    </Box>
                </Stack>                

            </FormControl>
        </div>
    );
}

export default Signup;