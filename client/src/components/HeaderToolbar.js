import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import Input from '@mui/material/Input';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useContext, useEffect } from 'react';
import { ScreenNames } from '../store';
import GlobalStoreContext from '../store';

export default function HeaderToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // Swap between sort menuitems to refresh
    useEffect(() => {
        if (store.currentScreen === ScreenNames.HOME) {
            store.loadUserPlaylists()
        } else {
            store.searchByQuery()
        }
    }, [store.sortCriteria])

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        setAnchorEl(null);
    };

    const handleMenuSelect = (event) => {
        console.log(event.target.innerText)
        store.setSortCriteria(event.target.innerText);
    }

    const handleInputSubmit = (event) => {
        if (event.key === 'Enter') {
            store.searchByQuery();
            console.log('what')
        }
      };

    const sortByMenu = (
        store.currentScreen === ScreenNames.HOME ?
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuSelect}
        >
            <MenuItem onClick={handleMenuClose}>By Creation Date (Old-New)</MenuItem>
            <MenuItem onClick={handleMenuClose}>By Last Edit Date (New-Old)</MenuItem>
            <MenuItem onClick={handleMenuClose}>By Name (A-Z)</MenuItem>
        </Menu> :
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuSelect}
        >
            <MenuItem onClick={handleMenuClose}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes (High - Low)</MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box >
                        <Button
                            variant="contained"
                            onClick={() => store.setScreen(ScreenNames.HOME)}>
                            <HomeIcon />
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => store.setScreen(ScreenNames.ALL)}>
                            <GroupsIcon />
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => store.setScreen(ScreenNames.USERS)}>
                            <PersonIcon />
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
                        <Input placeholder="Search" sx={{ backgroundColor: 'white', width: '800px'}} 
                        onChange={(event) => store.setSearchQuery(event.target.value)}
                        onKeyDown={handleInputSubmit}/>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems:'center', justifyContent:'center'}}>
                        <Typography>Sort By</Typography>
                        <Button
                            variant="contained"
                            onClick={handleSortMenuOpen}>
                            <MenuIcon />
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {sortByMenu}
        </Box>
    )
}