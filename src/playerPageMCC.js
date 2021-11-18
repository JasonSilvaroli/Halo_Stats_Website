import { Container, Typography, Grid, Paper, List, ListItem, Tabs, Tab, Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import GameStats from './gameStats';
import GameSummary from './gameSummary';
import { getPlayerInfo, getRecentMatches, getRecentMatchesGame } from './getDataMCC';
import LineGraph from './lineGraph';
import ProgressBar from './progressBar';

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

export default function PlayerPage() {

    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useState({})
    const [matches, setMatches] = React.useState({})
    const [loaded, setLoaded] = React.useState(false);
    const [careerStats, setCareerStats] = React.useState([]);
    
    const [graphKD, setGraphKD] = React.useState([]);
    const [graphKills, setGraphKills] = React.useState([]);
    const [graphStreak, setGraphStreak] = React.useState([]);
    const [name, setName] = React.useState("");

    const handleChange = (event, newValue) => {

        setValue(newValue);
        setLoaded(false);

    };

    useEffect(() => {

        setName(window.location.pathname.split('/')[3])

        const gameModes = ["Slayer", "CTF", "Extraction", "King Of The Hill", "Assault"];

        getPlayerInfo(name).then((obj) => {

            setUser(obj);

            setCareerStats([
                {name: "Playtime:", stat: obj.allTime.timePlayed},
                {name: "Games Played:", stat: obj.allTime.gamesPlayed},
                {name: "Kills:", stat: obj.allTime.kills},
                {name: "Deaths:", stat: obj.allTime.deaths},
                {name: "Kill Death Ratio:", stat: obj.allTime.killDeathRatio},
                {name: "Wins:", stat: obj.allTime.wins},
                {name: "Losses:", stat: obj.allTime.losses},
                {name: "Win %:", stat: (obj.allTime.winRatio * 100).toFixed(0) + '%'},
            ])

        })

        getRecentMatchesGame(name, gameModes[value]).then((obj) => {

            setMatches(obj);
            setLoaded(true);

        })

        if(user.good) {

            getRecentMatches(name).then((obj) => {

                var streak = 0;

                var gStreak = [];
                var gKD = [];
                var gKills = [];

                gStreak.push({name: 0, stat: 0});
                gKills.push({name: 0, stat: 0})
                gKD.push({name: 0, stat: 0})

                obj.matches.reverse().forEach((obj, index) => {
                    
                    if(obj.won) {

                        streak++;

                    } else {

                        streak--;

                    }

                    gStreak.push({name: index, stat: streak});
                    gKills.push({name: index, stat: obj.kills})
                    gKD.push({name: index, stat: obj.killDeathRatio})

                    

                })

                setGraphStreak(gStreak)
                setGraphKD(gKD)
                setGraphKills(gKills)

            })
        }


    }, [value, name, user.good])

    return(

        <Container>
            { user.user !== undefined &&
            <div>
            <Paper elevation={3} style={{background: "#DCDCDC"}}>
                <Grid container spacing={4} direction={"row"} alignItems={"center"}>
                    <Grid item xs={2}>
                        <img src={user.user.emblem} alt="emblem" style={{height: 120, paddingTop: 20}}></img>
                    </Grid>
                    <Grid item xs={6} >
                        <Typography style={{color: "black"}}variant="h2">{user.user.gamertag}</Typography>
                        <Typography style={{color: "black"}}variant="h4">{user.user.clanTag}</Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <img src={user.user.avatar} alt="avatar" style={{maxHeight: 120, paddingTop: 20}}></img>
                    </Grid>
                </Grid>
            </Paper>
            
            <Grid container spacing={4} direction={"row"} style={{marginTop: 20}}>
                <Grid item xs={4}>
                    <Grid item>
                    <Paper elevation={3} style={{background: "#DCDCDC"}}>
                        <List>
                            <ListItem>
                                <Paper elevation={2} style={{padding: 5, width: "100%"}}>
                                    <Typography style={{color: "black"}}>Career Stats</Typography>
                                </Paper>
                            </ListItem>
                            {
                            careerStats.map((obj, index) => {

                                return(

                                    <ListItem key={index}>
                                        <Paper elevation={2} style={{padding: 5, width: "100%"}}>
                                            <Typography component={'span'} display="inline" style={{color: "black", float: "left"}}>{obj.name} </Typography>
                                            <Typography component={'span'} display="inline" style={{color: "black", float: "right"}}>{obj.stat}</Typography>
                                        </Paper>
                                    </ListItem>

                                    )
                                })
                            }
                        </List>
                    </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={3} style={{background: "#DCDCDC", paddingTop: 1, marginTop: 20}}>
                            <Typography style={{marginTop: 10}}>Rank</Typography>
                            <Typography style={{marginTop: 10}}>{user.user.rank.title}, Tour {user.user.rank.tour}, Tier {user.user.rank.tier}</Typography>
                            <Typography style={{marginTop: 10, paddingBottom: 5}}>XP Remaining</Typography>
                            <ProgressBar key={"1"} bgcolor="#0000FF" completed={(user.user.rank.remainingxp/user.user.rank.totalXPToRankUp)*100}/>
                            <Typography style={{color: "black"}}>{user.user.rank.remainingxp}/{user.user.rank.totalXPToRankUp}</Typography>

                        </Paper>
                    </Grid>
                    <Grid item>
                        <LineGraph stat={graphKD} name="Kill Death Ratio"></LineGraph>
                        <LineGraph stat={graphKills} name="Kills"></LineGraph>
                        <LineGraph stat={graphStreak} name="Wins"></LineGraph>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <Paper style={{background: "#D3D3D3"}}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Slayer"></Tab>
                            <Tab label="CTF"></Tab>
                            <Tab label="Extraction"></Tab>
                            <Tab label="King Of The Hill"></Tab>
                            <Tab label="Assault"></Tab>
                        </Tabs>
                        {loaded && user.good &&
                        <div>
                            <TabPanel value={value} index={0}>
                                <GameSummary gamertag={user.user.gamertag} game={"Slayer"}></GameSummary>
                                {user.good &&

                                    matches.map((obj) => {

                                        return(<GameStats data={obj} key={obj.date}/>)

                                    })
                                }
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <GameSummary gamertag={user.user.gamertag} game={"CTF"}></GameSummary>
                                {user.good &&

                                    matches.map((obj) => {

                                        return(<GameStats data={obj} key={obj.date}/>)

                                    })
                                }
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <GameSummary gamertag={user.user.gamertag} game={"Extraction"}></GameSummary>
                                {user.good &&

                                    matches.map((obj) => {

                                        return(<GameStats data={obj} key={obj.date}/>)

                                    })
                                }
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <GameSummary gamertag={user.user.gamertag} game={"King Of The Hill"}></GameSummary>
                                {user.good &&
                                    matches.map((obj) => {

                                        return(<GameStats data={obj} key={obj.date}/>)

                                    })
                                }
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <GameSummary gamertag={user.user.gamertag} game={"Assault"}></GameSummary>
                                {user.good &&

                                    matches.map((obj) => {

                                        return(<GameStats data={obj} key={obj.date}/>)

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