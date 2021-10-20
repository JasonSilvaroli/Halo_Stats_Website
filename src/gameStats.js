import { Grid, List, ListItem, Paper, Typography } from "@material-ui/core";


export default function GameStats(props) {

    const game = props.data;

    var paperStyle = game.won ? {marginTop: 10, background: "#BDE7BD"} : {marginTop: 10, background: "#FFB6B3"} 

    return (

        <Paper elevation={3} style={paperStyle}>
            
            <Grid container direction="row" alignContent="center" alignItems="center" justifyContent="flex-end">
                <Grid item xs={2} style={{marginBottom: 10}}>
                    <img src={game.game.logo} alt="logo" style={{width: 100, height: 100}}/>
                    <Typography>{game.gameType}</Typography>
                    <Typography>{game.map}</Typography>
                </Grid>
                <Grid item xs={2} style={{padding: 0, marginBottom: 10}}>
                    <List>
                        <ListItem>
                            <Typography style={{color: "black", marginRight: 5}}>{game.kills} /</Typography>
                            <Typography style={{color: "red"}}> {game.deaths}</Typography>
                            <Typography style={{color: "black", marginLeft: 5}}>/ {game.assists}</Typography>
                        </ListItem>
                        <ListItem alignItems="center">
                            <Typography style={{color: "black"}}>{game.killDeathRatio} KD</Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={3} style={{padding: 0, marginBottom: 10}}>
                    <List>
                        <ListItem>
                            <Typography align="center" style={{color: "black"}}>Headshots</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography align="right" style={{color: "black"}}>{game.headshots}</Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={4} style={{padding: 0, marginBottom: 10}}>
                    <List>
                        <ListItem>
                            <Typography component={'span'}  display="inline" style={{color: "black", float: "left"}}>Game Duration: </Typography>
                            <Typography component={'span'} display="inline" style={{marginLeft: 5, color: "black", float: "right"}}>{game.duration}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography display="inline" style={{color: "black", float: "left"}}>Score: </Typography>
                            <Typography display="inline" style={{color: "black", float: "right"}}>  {game.score}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography style={{color: "black"}}>{game.date}</Typography>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            
        </Paper>
    );
}