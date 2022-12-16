import { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';

import { deepOrange, deepPurple } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { SignpostOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import * as accountAction from '../../lib/store/module/account';
import { Link } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Signout'];

function TopMenuBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const router = useRouter();

  // Case 01.
  // const chk = useSelector( ({account}) => account.chk );
  // const user = useSelector( ({account}) => account.user );

  // Case 02.
  // const user = useSelector((state)=>state.account.user);
  // const chk = useSelector((state)=>state.account.chk);  

  // Case 03.
  const {chk, user} = useSelector( state => ({
    chk: state.account.chk,
    user: state.account.user
  }));

  console.log( 'top menu bar user value : ' );
  console.log( user.name );

  const dispatch = useDispatch();

  // checkout reducer 를 useCallBack 으로 함수 선언
  const checkout = useCallback(() =>
    dispatch( accountAction.checkout()),[dispatch]
    );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    
    if( e.currentTarget.id == 'Signout' ) {
      checkout();
    }

    setAnchorElUser(null);
  };

  const toSignIn = () => (
    router.push( './signin' )
  );
    
  const toSingUp = () => (
    router.push( './signup' )
  );
  
  const toHome = () => (
    router.push( '/' )
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* 화면 축소 이전 */}
          <LocalCarWashIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Link color="inherit" component="button" onClick={toHome} variant='h6' underline='none'>

            <Typography
              variant="h6"
              noWrap
              // component="a"
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


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* 화면 축소시 */}
          <LocalCarWashIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Button color="inherit" onClick={toHome}>
            Dashboard
          </Button>
{/* 
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Dashboard
          </Typography>
*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            { chk && 
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/*                 
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  */}
                  <Avatar alt={user.id} sx={{ bgcolor: deepOrange[500] }}>{user.id.slice(0,2)}</Avatar>
                </IconButton>
              </Tooltip>
            }
            { !chk && 
              <>
                <Button color="inherit" onClick={toSignIn}>
                  sign-In
                </Button>
                {' / '}
                <Button color="inherit" onClick={toSingUp}>
                  sign-Up
                </Button>
              </>
            }


            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} id={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopMenuBar;