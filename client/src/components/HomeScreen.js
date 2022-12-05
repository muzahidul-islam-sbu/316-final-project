import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { ScreenNames } from '../store';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        if (store.currentScreen === ScreenNames.HOME) {
            store.loadUserPlaylists();
            console.log('in home screen')
        } else {
            store.loadEmptyLists();
        }
    }, [store.currentScreen]);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '2%', bgcolor: 'background.paper', overflow: 'scroll', maxHeight: '600px', height: '600px'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    // id="playlist-selector"
    // id="list-selector-heading"
    // id = #list-selector-list
    return (
        <Box>
            {
                listCard
            }
            <MUIDeleteModal />
        </Box>)
}

export default HomeScreen;