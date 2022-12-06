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

    let sortedIdNamePairs = store.idNamePairs;
    if (store.sortCriteria === 'By Creation Date (Old-New)') {
        sortedIdNamePairs = sortedIdNamePairs.sort((l1, l2) => {
            if (new Date(l1.createdAt).getTime() < new Date(l2.createdAt).getTime()) {
                return -1;
            }
            if (new Date(l1.createdAt).getTime() > new Date(l2.createdAt).getTime()) {
                return 1;
            }
            return 0;
        })
    } else if (store.sortCriteria === 'By Last Edit Date (New-Old)') {
        sortedIdNamePairs = sortedIdNamePairs.sort((l1, l2) => {
            if (new Date(l1.updatedAt).getTime() > new Date(l2.updatedAt).getTime()) {
                return -1;
            }
            if (new Date(l1.updatedAt).getTime() < new Date(l2.updatedAt).getTime()) {
                return 1;
            }
            return 0;
        })
    } else if (store.sortCriteria === 'By Name (A-Z)' || store.sortCriteria === 'Name (A-Z)') {
        sortedIdNamePairs = sortedIdNamePairs.sort((l1, l2) => {
            if (l1.name < l2.name) {
                return -1;
            }
            if (l1.name > l2.name) {
                return 1;
            }
            return 0;
        })
    } else if (store.sortCriteria === 'Publish Date (Newest)') {
        sortedIdNamePairs = sortedIdNamePairs.sort((l1, l2) => {
            if (l1.publishedDate > l2.publishedDate) {
                return -1;
            }
            if (l1.publishedDate < l2.publishedDate) {
                return 1;
            }
            return 0;
        })
    } else if (store.sortCriteria === 'Listens (High - Low)') {
        sortedIdNamePairs = sortedIdNamePairs.sort((l1, l2) => {
            if (l1.listens > l2.listens) {
                return -1;
            }
            if (l1.listens < l2.listens) {
                return 1;
            }
            return 0;
        })
    } else if (store.sortCriteria === 'Likes (High - Low)') {
        sortedIdNamePairs = sortedIdNamePairs.sort((l1, l2) => {
            if (l1.likes.length > l2.likes.length) {
                return -1;
            }
            if (l1.likes.length < l2.likes.length) {
                return 1;
            }
            return 0;
        })
    } else if (store.sortCriteria === 'Dislikes (High - Low)') {
        sortedIdNamePairs = sortedIdNamePairs.sort((l1, l2) => {
            if (l1.dislikes.length > l2.dislikes.length) {
                return -1;
            }
            if (l1.dislikes.length < l2.dislikes.length) {
                return 1;
            }
            return 0;
        })
    }   

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