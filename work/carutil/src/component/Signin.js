import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";


import { AccountCircle } from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

function Signin()   {
    return (
        <div className="Signin">
            <FormControl>
                {/* 
                    User ID
                 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle id="icon_id" sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="uid" label='User ID' variant="standard" />
                </Box>
                {/* User Password */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <VpnKeyIcon  id="icon_password" sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="upw"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                </Box>

            </FormControl>
        </div>
    );
}

export default Signin;