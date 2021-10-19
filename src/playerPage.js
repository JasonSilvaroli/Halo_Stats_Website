import { Container, Typography, Grid, Paper, List, ListItem, Tabs, Tab, Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameSummary from './gameSummary';
import { getPlayerInfo, getRecentMatches } from './getData';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export default function PlayerPage(props) {

    const [value, setValue] = React.useState(0)
    const [matches, setMatches] = React.useState([]);
    const [user, setUser] = React.useState({})

    var name  = window.location.pathname.split('/')[2];

    const handleChange = (event, newValue) => {

        setValue(newValue);

    };

    useEffect(() => {

        //setUser(getPlayerInfo(name));

        getPlayerInfo(name).then((obj) => {

            setUser(obj);
            
        })

    }, [])

    return(

        <Container >
            { user.user !== undefined &&
            <div>
            <Paper elevation={3} style={{background: "#DCDCDC"}}>
                <Grid container spacing={4} direction={"row"} alignItems={"center"}>
                    <Grid item xs={3}>
                        <img src={user.user.emblem} alt="emblem" style={{height: 240, paddingTop: 20}}></img>
                    </Grid>
                    <Grid item xs={3} style={{marginBottom: 75}}>
                        <Typography style={{color: "black"}}variant="h2">{user.user.gamertag}</Typography>
                        <Typography style={{color: "black"}}variant="h4">{user.user.clantag}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={4} direction={"row"} style={{marginTop: 20}}>
                <Grid item xs={4}>
                    <Paper elevation={3} style={{width: 270, background: "#DCDCDC"}}>
                        <List>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left"}}>Playtime: </Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right"}}>{user.allTime.timePlayed}</Typography>
                                </Paper>
                            </ListItem>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left"}}>Games Played: </Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right"}}>{user.allTime.gamesPlayed}</Typography>
                                </Paper>
                            </ListItem>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left"}}>Kills: </Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right"}}>{user.allTime.kills}</Typography>
                                </Paper>
                            </ListItem>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left"}}>Deaths: </Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right"}}>{user.allTime.deaths}</Typography>
                                </Paper>
                            </ListItem>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left"}}>Kill Death Ratio: </Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right"}}>{user.allTime.killDeathRatio}</Typography>
                                </Paper>
                            </ListItem>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left"}}>Wins: </Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right"}}>{user.allTime.wins}</Typography>
                                </Paper>
                            </ListItem>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left"}}>Losses: </Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right"}}>{user.allTime.losses}</Typography>
                                </Paper>
                            </ListItem>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography display="inline" style={{color: "black", float: "left"}}>Win %: </Typography>
                                    <Typography display="inline" style={{color: "black", float: "right"}}>{user.allTime.winRatio * 100}%</Typography>
                                </Paper>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper style={{background: "#D3D3D3"}}>
                        <Tabs sx={{ borderBottom: 1, borderColor: 'divider'}} value={value} onChange={handleChange}>
                            <Tab label="Slayer"></Tab>
                            <Tab label="CTF"></Tab>
                            <Tab label="Extraction"></Tab>
                            <Tab label="Dominion"></Tab>
                            <Tab label="Assault"></Tab>
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <GameSummary gamertag={user.user.gamertag} game={"Slayer"}></GameSummary>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <GameSummary gamertag={user.gamertag} game={"CTF"}></GameSummary>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <GameSummary gamertag={user.gamertag} game={"Extraction"}></GameSummary>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <GameSummary gamertag={user.gamertag} game={"Dominion"}></GameSummary>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <GameSummary gamertag={user.gamertag} game={"Assault"}></GameSummary>
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
            </div> }  
        </Container>
    )

}