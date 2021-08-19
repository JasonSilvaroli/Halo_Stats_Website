import React from 'react';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/styles/makeStyles'
import { Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({

    multilineColor:{
        color:'grey'
    }

});

export default function Calculator() {

    const classes = useStyles();

    const [score, setScore] = React.useState(0);
    const [assists, setAssists] = React.useState(0);
    const [deaths, setDeaths] = React.useState(0);
    const [total, setTotal] = React.useState(0); 

   // var scoreTemp = 0;
   // var assistsTemp = 0;
    //var deathsTemp = 0;

    function calculateScore() {


        setTotal((Number(score) + Number(assists)) / Number(deaths));

        console.log(score);
        console.log(assists);
        console.log(deaths);

        return total;

    };

    const handleScore = (event) => {

        setScore(event.target.value);
        //score = event.target.value;

    }

    const handleAssists = (event) => {

        setAssists(event.target.value/5);
       //assists = event.target.value;
    }

    const handleDeaths = (event) => {

        setDeaths(event.target.value);
      //deaths = event.target.value;
    }

    return(
        <Container>
            <Grid direction="row" container justifyContent="center" alignItems="center">
                <p style={{color:'grey', marginRight: 10}}>( </p>
                <TextField InputProps={{className: classes.multilineColor}} color="secondary" label="Score" defaultValue={score} onChange={handleScore}/>
                <p style={{color:'grey', marginRight: 10}}>+(</p>
                <TextField InputProps={{className: classes.multilineColor}} label="Assists" defaultValue={assists} onChange={handleAssists}/>
                <p style={{color:'grey', marginRight: 10}}>/5)) / </p>
                <TextField InputProps={{className: classes.multilineColor}} label="Deaths" defaultValue={deaths} onChange={handleDeaths}/>
                <p style={{color:'grey', marginRight: 10}}>) =</p>
                <p style={{color:'grey', marginRight: 10}}> {total}</p>
                <Button onClick={() => {calculateScore()}}>Calculate</Button>
            </Grid>
            <p>{score} {assists} {deaths}</p>
        </Container>

    );

}