import * as React from 'react';
import { Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from 'next/router';

const TopLogo = () =>  {
    const router = useRouter();

    const toHome = () => (
        router.push( '/' )
    );

    return (
        <div className="TopLogo">
            <Stack direction="row" justifyContent="center">

                <Link color="inherit" component="button" onClick={toHome} variant='h6' underline='none'>

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        
                        }}
                    >
                        Dashboard
                    </Typography>
            
                </Link>

            </Stack>
        </div>
    );
}

export default TopLogo;