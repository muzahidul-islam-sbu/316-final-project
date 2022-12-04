import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Grid, Typography, Button } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import WorkspaceScreen from './WorkspaceScreen';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [expanded, setExpanded] = useState(false);

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    useEffect(() => {
        if (store.currentList?._id !== idNamePair._id && expanded === true) {
            setExpanded(false);
        }
    }, [store.currentList])

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '20pt', backgroundColor:'#eeeedd', borderRadius: '13px' }}
            button
            disableRipple
        >
            {/* <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box> */}
            <Grid container spacing={0}>
                <Grid item xs={8}>
                    <Typography variant='h5'>
                    {idNamePair.name}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <IconButton size='large' onClick={(event) => {event.preventDefault()}}>
                        <ThumbUpOffAltIcon fontSize='large'/>
                    </IconButton>
                    <IconButton size='large'>
                        <ThumbDownOffAltIcon fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item xs={8}>
                    By: {idNamePair.username}
                </Grid>
                <Grid item xs={4}>
                </Grid>
                {expanded &&
                    <>
                    <Grid item xs={12}>
                        <WorkspaceScreen />
                    </Grid>
                    <Grid container spacing={3} style={{marginTop: '.1rem'}}>
                    <Grid item xs={2}>
                      <Button fullWidth variant="contained">Undo</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button fullWidth variant="contained">Redo</Button>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={2}>
                      <Button fullWidth variant="contained">Publish</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button fullWidth variant="contained">Delete</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button fullWidth variant="contained">Duplicate</Button>
                    </Grid>
                  </Grid>
                  </>
                }
                <Grid item xs={8}>
                    Published: 
                </Grid>
                <Grid item xs={4}>
                    Listens:
                    {expanded === false &&
                        <IconButton size='large' onClick={() => {
                            setExpanded(true)
                            store.setCurrentList(idNamePair._id);
                        }}>
                            <KeyboardDoubleArrowDownIcon fontSize='large'/>
                        </IconButton>
                    }
                    {expanded === true &&
                        <IconButton size='large' onClick={() => {
                            setExpanded(false)
                            store.setCurrentList(idNamePair._id);
                        }}>
                            <KeyboardDoubleArrowUpIcon fontSize='large'/>
                        </IconButton>
                    }
                </Grid>
            </Grid>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;