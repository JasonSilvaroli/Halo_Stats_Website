import { Grid, List, ListItem, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { getRecentMatchesGame } from "./getData";
import WinPieChart from "./pieChart";

export default function GameSummary(props) {

    const name = props.gamertag;
    const game = props.game;
    const [gameMode, setGamemode] = React.useState([]);
    const [summary, setSummary] = React.useState({});
    const [loaded, setLoaded] = React.useState(false)

    useEffect(() => {

        getRecentMatchesGame(name, game).then((obj) => {

            setGamemode(obj);

            var sum = summaryOfGames(obj);

            setSummary(sum);

            setLoaded(true);

        })

    }, [game, name])

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

    if(!loaded) {
        
        return (

            <Paper elevation={3} style={{marginTop: 10, background: "#DCDCDC", paddingBottom: 20}}>
                <Typography style={{color: "black", margin: 5, paddingTop: 10}}>Loading...</Typography>
            </Paper>

        )
        } else {
        return(

            <Paper elevation={3} style={{marginTop: 10, background: "#DCDCDC", paddingBottom: 20}}>
                <Typography style={{color: "black", margin: 5, paddingTop: 10}}>Summary of {gameMode.length} {game} games</Typography>
                <Grid container direction={"row"}>
                    <Grid item xs={3} style={{padding: 0}}>
                        <List style={{padding: 0}}>
                            <ListItem alignItems="center" style={{padding: 0}}>
                                <WinPieChart data={{wins: summary.wins, losses: summary.losses}} style={{width: 100, padding: 0}}></WinPieChart>
                                <Typography style={{color: "black", width: 100}}>{summary.wins}W {summary.losses}L</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2}>
                    <List>
                        <ListItem style={{width: 700}}>
                            <Typography style={{color: "black", float: "left"}}> K: { summary.kills}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography style={{color: "black", float: "right"}}> KPG: { summary.killsPerGame}</Typography>
                        </ListItem>
                    </List>
                    </Grid>
                    <Grid item xs={2}>
                        <List>
                            <ListItem style={{width: 700}}>
                                <Typography style={{color: "black"}}> D: { summary.deaths}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography style={{color: "black"}}> DPG: { summary.deathsPerGame}</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2}>
                        <List>
                            <ListItem style={{width: 700}}>
                                <Typography style={{color: "black"}}> A: { summary.assists}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography style={{color: "black"}}> APG: { summary.assistsPerGame}</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2}>
                        <List>
                            <ListItem style={{width: 700}}>
                                <Typography style={{color: "black"}}> H%: { Number(summary.headshotRate).toFixed(2)}%</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography style={{color: "black"}}> HPG: { summary.headshotsPerGame}</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}