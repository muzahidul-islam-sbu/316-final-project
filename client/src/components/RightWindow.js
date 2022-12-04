import Box from '@mui/material/Box';
import YouTubePlayerExample from './PlaylisterYouTubePlayer';
import { Button, Typography } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';

export default function RightWindow() {
    return (
        <Box>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Player
            </Button>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Comments
            </Button>
            <YouTubePlayerExample />
            <Box>
                <Typography variant="h6">Playlist:</Typography>
                <Typography variant="h6">Song #:</Typography>
                <Typography variant="h6">Title:</Typography>
                <Typography variant="h6">Artist:</Typography>
                <Box sx={{textAlign:'center', alignItems:'center', justifyContent:'center', display:'flex', backgroundColor:'#eeeedd'}}>
                    <Button >
                        <FastRewindIcon fontSize='large' onCli/>
                    </Button>
                    <Button >
                        <StopIcon fontSize='large'/>
                    </Button>
                    <Button >
                        <PlayArrowIcon fontSize='large'/>
                    </Button>
                    <Button >
                        <FastForwardIcon fontSize='large'/>
                    </Button>
                </Box>
            </Box>    
        </Box>
    )
}