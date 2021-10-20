import { Container, Typography, Grid, Paper, List, ListItem, Tabs, Tab, Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import GameStats from './gameStats';
import GameSummary from './gameSummary';
import { getPlayerInfo, getRecentMatchesGame } from './getData';

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

    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useState({})
    const [matches, setMatches] = React.useState({})
    const [loaded, setLoaded] = React.useState(false);

    const gameModes = ["Slayer", "CTF", "Extraction", "Dominion", "Assault"]

    var name  = window.location.pathname.split('/')[2];

    const handleChange = (event, newValue) => {

        setValue(newValue);
        setLoaded(false);

    };

    useEffect(() => {

        getPlayerInfo(name).then((obj) => {

            setUser(obj);
            
        })

        getRecentMatchesGame(name, gameModes[value]).then((obj) => {

            setMatches(obj);
            setLoaded(true);

        })

    }, [value])

    return(

        <Container >
            { user.user !== undefined &&
            <div>
            <Paper elevation={3} style={{background: "#DCDCDC"}}>
                <Grid container spacing={4} direction={"row"} alignItems={"center"}>
                    <Grid item xs={2}>
                        <img src={user.user.emblem} alt="emblem" style={{height: 120, paddingTop: 20}}></img>
                    </Grid>
                    <Grid item xs={3} >
                        <Typography style={{color: "black"}}variant="h2">{user.user.gamertag}</Typography>
                        <Typography style={{color: "black"}}variant="h4">{user.user.clanTag}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={4} direction={"row"} style={{marginTop: 20}}>
                <Grid item xs={4}>
                    <Paper elevation={3} style={{width: 270, background: "#DCDCDC"}}>
                        <List>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: 250}}>
                                    <Typography style={{color: "black"}}>Career Stats</Typography>
                                </Paper>
                            </ListItem>
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
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Slayer"></Tab>
                            <Tab label="CTF"></Tab>
                            <Tab label="Extraction"></Tab>
                            <Tab label="Dominion"></Tab>
                            <Tab label="Assault"></Tab>
                        </Tabs>
                        {loaded && 
                        <div>
                            <TabPanel value={value} index={0}>
                                <GameSummary gamertag={user.user.gamertag} game={"Slayer"}></GameSummary>
                                {
                                    matches.map((obj) => {

                                        return(<GameStats data={obj} />)

                                    })
                                }
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <GameSummary gamertag={user.user.gamertag} game={"CTF"}></GameSummary>
                                {
                                    matches.map((obj) => {

                                        return(<GameStats data={obj} />)

                                    })
                                }
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <GameSummary gamertag={user.user.gamertag} game={"Extraction"}></GameSummary>
                                {
                                    matches.map((obj) => {

                                        return(<GameStats data={obj} />)

                                    })
                                }
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <GameSummary gamertag={user.user.gamertag} game={"Dominion"}></GameSummary>
                                {
                                    matches.map((obj) => {

                                        return(<GameStats data={obj} />)

                                    })
                                }
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <GameSummary gamertag={user.user.gamertag} game={"Assault"}></GameSummary>
                                {
                                    matches.map((obj) => {

                                        return(<GameStats data={obj} />)

                                    })
                                }
                            </TabPanel>
                        </div>
                        }
                    </Paper>
                </Grid>
            </Grid>
            </div> }  
        </Container>
    )

}