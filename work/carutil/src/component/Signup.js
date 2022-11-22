import { useState } from "react";

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

const API_URL = "/member/signup"

function Signup()   {

    // Date-picker variable
    const [value, setValue] = useState( null );

    // signup parameters infomation
    const [userInfo, setUserInfo] = useState({
        id: '',
        pw: '',
        rpw: '',
        name: '',
        nick: '',
        birth: '',
        phone: '',
        phone1: '',
        phone2: '',
    });

    function changeParams(e) {
        setUserInfo({
            ...userInfo,
            [e.target.name] : e.target.value
        })
    };

    function signup() {
        axios.post(
            API_URL,
            null,
            {
                paramsSerializer
            }
        );
    }

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
                        <TextField id="id" label='User ID' variant="standard" />
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
                        />
                    </Box>                
                    {/* 
                        User name
                    */}
                    <Box>
                        <PersonPinTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="nick" label='Name' variant="standard" />
                    </Box>
                    {/* 
                        User Nickname
                    */}
                    <Box>
                        <SwitchAccountTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="nick" label='Nick Name' variant="standard" />
                    </Box>
                    {/* 
                        User Birth
                    */}
                    <Box>
                        <CakeTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={value}
                                
                                onChange={(newValue) => {
                                setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} id='birth' label="Birth day" variant="standard" sx={{width:200}}/>}
                            />
                        </LocalizationProvider>
                    </Box>
                    {/* 
                        User Phone
                    */}
                    <Box>
                        <PhoneIphoneTwoToneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="phone" variant="standard" sx={{width : 50 }} inputProps={{min: 0, style: { textAlign: 'center' }}}  placeholder='000' />
                        {' - '}
                        <TextField id="phone1" variant="standard" sx={{width : 60 }} inputProps={{min: 0, style: { textAlign: 'center' }}} placeholder='0000' />
                        {' - '}
                        <TextField id="phone2" variant="standard" sx={{width : 60 }} inputProps={{min: 0, style: { textAlign: 'center' }}} placeholder='0000' />
                    </Box>
                    {/* 
                        Summit Button
                     */}
                    <Box justifycontent="center">
                        <Button variant="contained" endIcon={<SendIcon />} 
                                sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, width: 200 }}>
                            Submit
                        </Button>
                    </Box>
                </Stack>                

            </FormControl>
        </div>
    );
}

export default Signup;