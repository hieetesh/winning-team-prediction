import React from 'react';
import '../styles/home.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


import Button from '@mui/material/Button';

import teams from '../Common/teams.js';
import scheduledWeeks from '../Common/scheduledWeeks';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));

function Home(props) {

    const [homeTeamWon, setHomeTeamWon] = React.useState(null)
    const [playOff, setPlayOff] = React.useState(true);
    const [homeTeam, setHomeTeam] = React.useState(teams[0]);
    const [awayTeam, setAwayTeam] = React.useState(teams[1]);
    const [scheduledWeek, setScheduledWeek] = React.useState(scheduledWeeks[0]);
    const [homeTeamLogo, setHomeTeamLogo] = React.useState('/Logos/Arizona Cardinals.png');
    const [awayTeamLogo, setAwayTeamLogo] = React.useState('/Logos/Atlanta Falcons.png');


    const handlePredictClick = async() => {
        try {
            const result = await fetch("http://127.0.0.1:5000/predict", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                homeTeamId: homeTeam.team_id,
                homeTeamName: homeTeam.team_name,
                awayTeamId: awayTeam.team_id,
                awayTeamName: awayTeam.team_name,
                scheduledWeek: scheduledWeek.id,
                playOff: playOff
              }),
            }).then((res) => res.json());

            console.log("result", result);

            if(result.prediction === 1){
                setHomeTeamWon(1)
            }else{
                console.log("hre",result.prediction )
                setHomeTeamWon(0)
            }
          } catch (error) {
            console.log(error)
          }
    }

    const handleChangeHomeTeam = (event) => {
        let teamData = event.target.value;
        setHomeTeamLogo('/Logos/'+teamData.team_name+'.png')
        setHomeTeam(teamData);
        setHomeTeamWon(null);
    };

    const handleChangeAwayTeam = (event) => {
        let teamData = event.target.value;
        setAwayTeamLogo('/Logos/'+teamData.team_name+'.png')
        setAwayTeam(teamData);
        setHomeTeamWon(null);
    };

    const handlePlayOffChange = (e) => {
        setPlayOff(e.target.checked);
        setHomeTeamWon(null);
    }

    const handleChangeSwTeam = (e) => {
        setScheduledWeek(e.target.value)
        setHomeTeamWon(null);
    }

    return (
        <div className="container">
            <div className="team-container">
            <AppBar style={{backgroundColor: "#4B0082"}} position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        NFL Predictor
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className="card-container">
                <div className="card">
                    <img src={homeTeamLogo} width="300" height="300"/>
                    <h2>{homeTeam.team_name}</h2>
                    <h3>Home Team</h3>
                </div>
                <h1 style={{display: "inline-block"}}>VS</h1>
                <div className="card">
                    <img src={awayTeamLogo} width="300" height="300"/>
                    <h2>{awayTeam.team_name}</h2>
                    <h3>Away Team</h3>
                </div>
            </div>
            </div>
            <div className="feature-container">
                <div className="select-team">
                    <div className="team-dropdown">
                        <Box sx={{ minWidth: 300 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Home Team</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={homeTeam}
                                    label="HomeTeam"
                                    onChange={handleChangeHomeTeam}
                                >
                                {
                                    teams.map((team) => {
                                        return <MenuItem key={team.team_id} value={team}>{team.team_name}</MenuItem>
                                    })
                                }
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="team-dropdown">
                        <Box sx={{ minWidth: 300 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Away Team</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={awayTeam}
                                    label="AwayTeam"
                                    onChange={handleChangeAwayTeam}
                                >
                                {
                                    teams.map((team) => {
                                        return <MenuItem key={team.team_id} value={team}>{team.team_name}</MenuItem>
                                    })
                                }
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className="feature-flags">
                    <div className="feature-dropdown" style={{position: "relative", right: "130px"}}>
                        <Box sx={{ minWidth: 300 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Scheduled Week</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={scheduledWeek}
                                    label="Scheduled Week"
                                    onChange={handleChangeSwTeam}
                                >
                                {
                                    scheduledWeeks.map((week) => {
                                        return <MenuItem key={week.id} value={week}>{week.value}</MenuItem>
                                    })
                                }
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="feature-playoff">
                        <div className="toggle-playoff">
                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked color="secondary" onChange={handlePlayOffChange} />} label="PlayOff" />
                            </FormGroup>
                        </div>
                    </div>


                </div>
            </div>
            <div style={{textAlign:"center", margin: "20px", marginBottom: '50px'}}>
            <Button variant="contained" style={{backgroundColor:"#4B0082"}} onClick={()=>{handlePredictClick()}}>Predict</Button>
            <h1>
                {
                    homeTeamWon == 1 && "Home Team will win the game" ||
                    homeTeamWon == 0 && "Away team will win the game."
                }
            </h1>
            </div>
            <div style={{width: "100%", height: "50px"}}>

            </div>
        </div>
    );
}

export default Home;