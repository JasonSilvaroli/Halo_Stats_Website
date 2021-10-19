import { Grid, List, ListItem, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { getPlayerInfo, getRecentMatches, getRecentMatchesGame } from "./getData";
import WinPieChart from "./pieChart";



export default function GameSummary(props) {

    const name = props.gamertag;
    const game = props.game;
    const [gameMode, setGamemode] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [summary, setSummary] = React.useState({});
    const [loaded, setLoaded] = React.useState(false)

    useEffect(() => {

        getRecentMatchesGame(name, game).then((obj) => {
            
            setGamemode(obj);

            var sum = summaryOfGames(obj);

            setSummary(sum);

            setLoaded(true);

        })

    }, [])

    function summaryOfGames(matches) {

        var headshots = 0;

        var sum = {
            wins: 0,
            losses: 0,
            kills: 0,
            killsPerGame: 0,
            deaths: 0,
            deathsPerGame: 0,
            assists: 0,
            assistsPerGame: 0,
            headshotRate: 0,
            headshotsPerGame: 0
        }

        matches.forEach(obj => {

            sum.wins += Number(obj.won)
            sum.losses += !Number(obj.won)
            sum.kills += obj.kills;
            sum.deaths += obj.deaths;
            sum.assists += obj.assists;
            headshots += obj.headshots; 
        });

        sum.killsPerGame = (sum.kills/matches.length).toFixed(2);
        sum.deathsPerGame = (sum.deaths/matches.length).toFixed(2);
        sum.assistsPerGame = (sum.assists/matches.length).toFixed(2);
        sum.headshotRate = (headshots/sum.kills).toFixed(2);
        sum.headshotsPerGame = (headshots/matches.length).toFixed(2);

        return sum;

    }

    return(

        <Paper elevation={3} style={{marginTop: 10, background: "#DCDCDC"}}>
            {loaded &&
            <div>
                <Typography component={'span'} style={{color: "black", margin: 5, paddingTop: 10}}>Summary of {gameMode.length} {game} games</Typography>
                <Grid container direction={"row"}>
                    <Grid item xs={3} style={{padding: 0}}>
                        <List style={{padding: 0}}>
                            <ListItem alignItems="center" style={{padding: 0}}>
                                <WinPieChart data={{wins: summary.wins, losses: summary.losses}} style={{width: 100, padding: 0}}></WinPieChart>
                                <Typography component={'span'} style={{color: "black", margin: 5, width: 100}}>{summary.wins}W {summary.losses}L</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2}>
                    <List>
                        <ListItem style={{width: 700}}>
                            <Typography component={'span'} style={{color: "black", margin: 5, float: "left"}}> K: { summary.kills}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography component={'span'} style={{color: "black", margin: 5, float: "right"}}> KPG: { summary.killsPerGame}</Typography>
                        </ListItem>
                    </List>
                    </Grid>
                    <Grid item xs={2}>
                        <List>
                            <ListItem style={{width: 700}}>
                                <Typography component={'span'} align={"left"} style={{color: "black", margin: 5}}> D: { summary.deaths}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component={'span'} align={"left"} style={{color: "black", margin: 5}}> DPG: { summary.deathsPerGame}</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2}>
                        <List>
                            <ListItem style={{width: 700}}>
                                <Typography component={'span'} align={"left"} style={{color: "black", margin: 5}}> A: { summary.assists}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component={'span'} align={"left"} style={{color: "black", margin: 5}}> APG: { summary.assistsPerGame}</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2}>
                        <List>
                            <ListItem style={{width: 700}}>
                                <Typography component={'span'} align={"left"} style={{color: "black", margin: 5}}> H%: { Number(summary.headshotRate).toFixed(2)}%</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component={'span'} align={"left"} style={{color: "black", margin: 5}}> HPG: { summary.headshotsPerGame}</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </div>
            }
        </Paper>
    )

}