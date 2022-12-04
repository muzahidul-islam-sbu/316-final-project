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
import { useState } from 'react';

export default function HeaderToolbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortByMenu = (
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
                            variant="contained">
                            <HomeIcon />
                        </Button>
                        <Button
                            variant="contained">
                            <GroupsIcon />
                        </Button>
                        <Button
                            variant="contained">
                            <PersonIcon />
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
                        <Input placeholder="Search" sx={{ backgroundColor: 'white', width: '800px'}}/>
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