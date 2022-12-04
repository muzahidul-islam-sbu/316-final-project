import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;

    function handleCreateNewList() {
        store.createNewList();
    }

    return (
        // <div id="playlister-statusbar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        //     <Typography variant="h4">{text}</Typography>
        // </div>
        <Box sx={{textAlign:'center', alignItems:'center', justifyContent:'center', display:'flex'}}>    
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2">Your Lists</Typography>
        </Box>
    );
}

export default Statusbar;