import * as React from 'react';
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const TopLogo = () =>  {
    return (
        <div className="TopLogo">
            <Stack direction="row" justifyContent="center">
            
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
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

            </Stack>
        </div>
    );
}

export default TopLogo;