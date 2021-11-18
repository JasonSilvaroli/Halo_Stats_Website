import { Container, Grid, List, ListItem, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import GameStatsHI from "./gameStatsHI";
import GameSummaryHI from "./gameSummaryHI";
import { getMatchesHI, getPlayerInfoHI } from "./getDataInfinite";
import LineGraph from "./lineGraph";
import { player } from "./getDataInfinite";


export default function PlayerPageInfinite() {

    const [user, setUser] = React.useState(player)
    const [careerStats, setCareerStats] = React.useState([])
    const [matches, setMatches] = React.useState({});

    const [graphKD, setGraphKD] = React.useState([]);
    const [graphKills, setGraphKills] = React.useState([]);
    const [graphAccuracy, setGraphAccuracy] = React.useState([]);

    var name  = window.location.pathname.split('/')[3].replace("%20", " ");

    useEffect(() => {

        getPlayerInfoHI(name).then((res)=> {

            setUser(res);

            var winRate;

            if((res.allTime.match.losses + res.allTime.match.draws + res.allTime.match.left) === 0) {

                winRate = "100%";

            } else {

                winRate = (res.allTime.match.wins / (res.allTime.gamesPlayed) * 100).toFixed(0) + '%'

            }

            setCareerStats([
                {name: "Games Played:", stat: res.allTime.gamesPlayed},
                {name: "Kills:", stat: res.allTime.kills.total},
                {name: "Deaths:", stat: res.allTime.deaths},
                {name: "Kill Death Ratio:", stat: (res.allTime.killDeathRatio).toFixed(2)},
                {name: "Wins:", stat: res.allTime.match.wins},
                {name: "Losses:", stat: res.allTime.match.losses},
                {name: "Draws:", stat: res.allTime.match.draws},
                {name: "Left:", stat: res.allTime.match.left},
                {name: "Win %:", stat: winRate},
                {name: "Accuracy:" , stat: res.allTime.shots.accuracy.toFixed(2) + "%"},
                {name: "Total Medals:", stat: res.allTime.medals}
            ])

        })

        getMatchesHI(name).then((res)=> {

            setMatches(res);

            var reverseMatches = res.matches.reverse();

            var gKD = [];
            var gKills = [];
            var gAccuracy = [];

            reverseMatches.forEach((obj, index) => {

                gKD.push({name: index, stat: obj.stats.killDeathRatio})
                gKills.push({name: index, stat: obj.stats.kills.total})
                gAccuracy.push({name: index, stat: obj.stats.shots.accuracy})


            })

            setGraphKD(gKD);
            setGraphKills(gKills);
            setGraphAccuracy(gAccuracy);

        })

    }, [name])

    return(
        <Container>
            <Grid alignItems="center" direction="column" container>
                <Grid item style={{padding: 0}}>
                    {
                    // Header
                    }
                    <Paper elevation={3} style={{background: "#DCDCDC"}}>
                        <Grid direction="row" alignItems="center" container style={{padding: 10}}>
                            <Grid item xs={2} style={{position: 'relative'}}>
                                <img style={{maxWidth: "80%", height: "auto", zIndex: "1", position: 'absolute'}} src={user.user.emblemURL} alt="emblem"></img>
                                <img style={{maxWidth: "80%", height: "auto", zIndex: "2"}} src={user.user.backDropURL} alt="backdrop"></img>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" justifyContent="space-evenly" alignItems="flex-start">
                                    <Grid item><Typography variant="h3">{user.user.gamertag}</Typography></Grid>
                                    <Grid item><Typography variant="h5">{user.user.serviceTag}</Typography></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item container>
                {
                //Body
                }
                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={5}>
                        {
                        //Career Stats
                        }
                        <Grid item xs={3} direction="column" justifyContent="center" alignItems="stretch" container>
                            <Grid item>
                            <Paper elevation={3} style={{background: "#DCDCDC", marginTop: 10}}>
                                <Grid direction="column" justifyContent="center" alignItems="stretch" container >
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
                                </Grid>
                            </Paper>
                            </Grid>
                            <Grid item>
                            
                                <LineGraph stat={graphKD} name="Kill Death Ratio"></LineGraph>
                                <LineGraph stat={graphKills} name="Kills"></LineGraph>
                                <LineGraph stat={graphAccuracy} name="Accuracy %"></LineGraph>
                        
                            </Grid>
                            
                        </Grid>
                        {
                        // Recent Matches
                        }
                        <Grid item xs={9}>
                        <GameStatsHI data={user}/>
                            {
                            (matches.matches || []).map((obj, index) => {
                                
                                return(

                                    <GameSummaryHI data={obj} key={index}/>

                                )
                            })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}