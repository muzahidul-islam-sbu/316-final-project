import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { Grid } from '@mui/material'
import RightWindow from './RightWindow'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn) {
        return (
        <Grid container spacing={0}>
            <Grid item xs={8}>
                <HomeScreen />
            </Grid>
            <Grid item xs={4}>
                <RightWindow />
            </Grid>
        </Grid>)
    }
    else {
        return (<SplashScreen />)
    }
}