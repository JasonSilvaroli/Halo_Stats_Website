import { Grid, List, ListItem, Paper, Typography } from "@material-ui/core";
import WinPieChart from "./pieChart";

export default function GameStatsHI(props) {
    
    const col1 = [
        {name: "Kills", stat: props.data.allTime.kills.total},
        {name: "Deaths", stat: props.data.allTime.deaths},
        {name: "Assists", stat: props.data.allTime.assists.total}

    ]

    const col2 = [
        {name: "KDR", stat: props.data.allTime.killDeathRatio.toFixed(2)},
        {name: "Accuracy", stat: props.data.allTime.shots.accuracy.toFixed(2)},
        {name: "Total Medals", stat: props.data.allTime.medals}

    ]

    const col3 = [
        {name: "Total Score", stat: props.data.allTime.totalScore},
        {name: "Headshots", stat: props.data.allTime.kills.headshots},
        {name: "Melee Kills", stat: props.data.allTime.kills.melee}

    ]

    return(

        <Paper elevation={3} style={{marginTop: 10, background: "#DCDCDC", paddingBottom: 0}}>
            <Typography style={{color: "black", margin: 5, paddingTop: 10}}>Summary of {props.data.allTime.gamesPlayed} Halo Infinite Games</Typography>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <Grid item xs style={{marginLeft: 20}}>
                    <WinPieChart data={{wins: props.data.allTime.match.wins, losses: (props.data.allTime.match.losses + props.data.allTime.match.left + props.data.allTime.match.draws)}}></WinPieChart>
                </Grid>
                <Grid item xs>
                    <List>
                        {
                            col1.map((obj, index) => 

                            <ListItem key={index}>
                                <Paper elevation={2} style={{width: "80%", padding: 2, background: "#EEE"}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left", paddingLeft: 5}}>{obj.name}</Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right", paddingRight: 5}}>{obj.stat}</Typography>
                                </Paper>
                            </ListItem>

                            )
                        }
                    </List>
                </Grid>
                <Grid item xs>
                    <List>
                    {
                            col2.map((obj, index) => 

                            <ListItem key={index}>
                                <Paper elevation={2} style={{width: "80%", padding: 2, background: "#EEE"}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left", paddingLeft: 5}}>{obj.name}</Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right", paddingRight: 5}}>{obj.stat}</Typography>
                                </Paper>
                            </ListItem>

                            )
                        }
                    </List>
                </Grid>
                <Grid item xs>
                    <List>
                    {
                            col3.map((obj, index) => 

                            <ListItem key={index}>
                                <Paper elevation={2} style={{width: "80%", padding: 2, background: "#EEE"}}>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "left", paddingLeft: 5}}>{obj.name}</Typography>
                                    <Typography component={'span'} display="inline" style={{color: "black", float: "right", paddingRight: 5}}>{obj.stat}</Typography>
                                </Paper>
                            </ListItem>

                            )
                        }
                    </List>
                </Grid>
            </Grid>
        </Paper>

    )

}