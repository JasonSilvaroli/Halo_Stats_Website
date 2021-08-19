import { Paper, Table, TableHead, TableCell, TableContainer, TableRow, Link, TableBody } from '@material-ui/core';
import React, { useEffect } from 'react';

export default function DisplayPlayer() {

    const users = ["Not Ajtiger2", "Flyingcow10", "ShantiPanti", "GrumpierCone733", "nutmusprime", "KiingBooty", "Garth Tim"];

    const [player, setPlayer] = React.useState([]);
    
    function getInfo(name) {

        console.log(name);

        return (
            fetch('https://halo.api.stdlib.com/mcc@0.1.0/stats/?gamertag=' + name).then((res) => {

                res.json().then((data) => {

                    if(data !== undefined) {

                    data.killDeathRatio = Number(data.killDeathRatio.toFixed(2));
                    data.streak = String(data.streak.toUpperCase())

                    setPlayer(player => [...player, data])
                    }
                    return;

                });
            })
        )
    };

    useEffect(() => {


        users.forEach((user) => {

            var same = false;

            player.forEach((element) => {if(element.gamertag === user) { same = true}})

            if (!same) {

                getInfo(user);

            } else {

                console.log("not going")
                
            }

        })

    }, [])

    return(

        <TableContainer component={Paper} style={{background: "#799FCB", color: "#EEF1E6", width: 802}}>
            <Table size="small"></Table>
            <TableHead style={{background: "#F9665E"}}>
                <TableRow >
                    <TableCell style={{color: "white"}}>Player</TableCell>
                    <TableCell style={{color: "white"}}>Play Time</TableCell>
                    <TableCell style={{color: "white"}}>Games Played</TableCell>
                    <TableCell style={{color: "white"}}>Wins</TableCell>
                    <TableCell style={{color: "white"}}>Losses</TableCell>
                    <TableCell style={{color: "white"}}>Kills</TableCell>
                    <TableCell style={{color: "white"}}>Deaths</TableCell>
                    <TableCell style={{color: "white"}}>KDR</TableCell>
                    <TableCell style={{color: "white"}}>Streak</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    player.map(obj => {

                        return (
                        
                        <TableRow key={obj.gamertag}>
                            <TableCell style={{color: "white"}}><Link style={{color: "#EEF1E6"}} href={"/user/" + obj.gamertag}>{obj.gamertag}</Link></TableCell>
                            <TableCell style={{color: "white"}}>{obj.playtime}</TableCell>
                            <TableCell style={{color: "white"}}>{obj.gamesPlayed}</TableCell>
                            <TableCell style={{color: "white"}}>{obj.wins}</TableCell>
                            <TableCell style={{color: "white"}}>{obj.losses}</TableCell>
                            <TableCell style={{color: "white"}}>{obj.kills}</TableCell>
                            <TableCell style={{color: "white"}}>{obj.deaths}</TableCell>
                            <TableCell style={{color: "white"}}>{obj.killDeathRatio}</TableCell>
                            <TableCell style={{color: "white"}}>{obj.streak}</TableCell>
                        </TableRow>
                    )})
                }
            </TableBody>
        </TableContainer>
    );
}