import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    function handleAddNewSong() {
        store.addNewSong();
    }

    return (
        <Box>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'scroll', maxHeight: '300px'}}
        >
            {
                store.currentList?.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         <Button
            disabled={!store.canAddNewSong()}
            id='add-song-button'
            onClick={handleAddNewSong}
            variant="contained"
            style={{ width: '100%',backgroundColor: '#003399'}}>
            <AddIcon />
        </Button>
        </Box>
    )
}

export default WorkspaceScreen;