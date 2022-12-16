// ui logic import
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// business logic import
import axios from 'axios';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import * as accountAction from '../../lib/store/module/account';

const theme = createTheme();

const API_URL = '/rest/member/signin';

const Signin = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    // checkin reducer 를 useCallBack 으로 함수 선언
    // const checkin = useCallback((value) => {
    //     dispatch( accountAction.checkin(value) );
    // }, [dispatch]);
    const checkin = (value) =>
        dispatch( accountAction.checkin(value) );
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        // console.log( data.get('email'));

        axios.post(
            API_URL,
            null,
            {
                params : {
                    // id : parameters.id,
                    // pw : parameters.pw
                    id : data.get('email'),
                    pw : data.get('password'),
                },
                withCredentials: true,
            }
        ).then( res => {
            // console.log( res.data );
            data.delete('password');

            if( res.data.chk == 1 ) {
                checkin( res.data.user );
                
                router.push( '/' );
            } else {
                router.push( '/signin');
            }            
        });
    }
    
    return (
        <div className="Signin">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="ID or Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            />

                        {/* 
                        <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        />
                        */}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Sign In
                        </Button>

                        {/* 
                        <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        </Grid> 
                        */}

                    </Box>
                    </Box>

                </Container>
            </ThemeProvider>

        </div>
    );
}

export default Signin;