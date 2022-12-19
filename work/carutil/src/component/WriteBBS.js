import { useEffect, useState } from "react";

import axios from 'axios';

import { Button, Divider, FormControl, Grid, Hidden, Stack, TextField, Typography } from "@mui/material";
import { Box, height } from "@mui/system";

// icons
import TitleIcon from '@mui/icons-material/Title'; // title icon
import { AccountCircle, LineAxisOutlined } from "@mui/icons-material"; // id icon

import SendIcon from '@mui/icons-material/Send'; // send icon

// color
import { orange } from "@mui/material/colors"; // color pick

// DateOcker ( calendar )
import dayjs from "dayjs";
import QuillBoard from "./QuillBoard";
import { useSelector } from "react-redux";
import Image from "next/image";

const API_URL = "/rest/member/signup"

const WriteBBS = ( props ) =>   {
    
    const {chk, user} = useSelector( state => ({
        chk: state.account.chk,
        user: state.account.user
    }));

    const {post, setPost} = useState({
        title : '',
        content : '',
        date :''
    });

    function changeInfo(e) {
        setPost({
            ...post,
            [e.target.id] : e.target.value,
        });
    };

    const doit = (e) => {
        let now = dayjs();
        setPost({
            ...post,
            date : now.format('YYYY-MM-DD HH:mm:ss'),
        });        
    };

    /* *
    * Image upload
    * - begin
    */
    const [ image, setImage ] = useState( null );

    const [createObjectURL, setCreateObjectURL ] = useState( null );

    const uploadToClient = ( e ) => {
        if( e.target.files && e.target.files[0] ) {
            const index = e.target.files[0];

            setImage( index );
            setCreateObjectURL( URL.createObjectURL( index ) );
        }
    };

    const uploadToServer = async () => {
        const body = new FormData();
        body.append( "file", image );

        const response = await fetch( '/api/file', {
            method: 'POST',
            body
        });
    };
    /* *
    * Image upload
    * - End
    */

    return (
        <div className="WriteBBS">
            <FormControl  justifycontent="center">
                <Stack spacing={2}>
                    <Box>                    
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
                                {props.section}
                            </Typography>
                        {/* </Button> */}
                    </Box>
                    <Divider />
                    { chk && <>
                    {/* 
                        BBS : User ID
                    */}                    
                    <Box>                                                            
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                            id="writer" 
                            label='Writer' 
                            variant="standard"
                            defaultValue={user.id} 
                            InputProps={{
                                readOnly: true,
                                // remove underline
                                disableUnderline: true
                            }} 
                        />
                    </Box>
                    </>
                    }
                    {/* 
                        BBS : Title
                    */}
                    <Box>                                                            
                        <TitleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="title" label='Title' required variant="standard" sx={{minWidth:550}} onChange={changeInfo} />
                    </Box>
                    {/* 
                        BBS : User name
                    */}
                    <Box>
                        <QuillBoard />
                    </Box>
                    <Box sx={{height: 40,}}>
                        <Hidden />
                    </Box>
                    {/* 
                        BBS : Image upload
                     */}
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Button 
                                variant="contained" 
                                component="label"
                                sx={{width:170}}
                            >
                                Select to Image
                                <input hidden accept="image/*" multiple type="file" onChange={uploadToClient} />
                            </Button>
                        </Grid>
                        <Grid item xs={6} alignItems="center">
                            { createObjectURL !== null 
                            ? <Image src={createObjectURL} 
                                    width={350}
                                    height={200}
                                />
                            : <Image 
                                    src='https://fakeimg.pl/200x100/?retina=1&text=No Image&font=noto' 
                                    width={350}
                                    height={200}
                                />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                variant="contained" 
                                component="label"
                                className='btn btn-primary'
                                type='submit'
                                sx={{width:170}}
                                onClick={uploadToServer}
                            >
                                Send to Image
                            </Button>
                        </Grid>
                        
                    </Grid>
                    {/* 
                        BBS : Summit Button
                     */}
                    <Box justifycontent="center">
                        <Button variant="contained" endIcon={<SendIcon />} 
                                sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, width: 200 }}
                                onClick={doit}
                                >
                            Done
                        </Button>
                    </Box>
                </Stack>                

            </FormControl>
        </div>
    );
}

export default WriteBBS;