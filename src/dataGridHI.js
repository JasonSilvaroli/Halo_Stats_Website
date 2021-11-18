import { Button, ButtonGroup, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { Redirect } from 'react-router';
import { getPlayerInfoHI } from './getDataInfinite';

const useStyles = makeStyles({

    root: {
        background:'#AFC7D0',
        color: "#E0E0E0",
    },
    row: {
        color: '#EEF1E6',
        '&:nth-of-type(odd)': {
            background:'#799FCB'
        },
        '&:nth-of-type(even)': {
            background: '#F9665E'
        },
        textAlign: "center",
        cursor: "pointer"
    },

}, { name: 'MuiDataGrid'});

export default function DataGridHI(props) {

    const classes = useStyles();

    const [player, setPlayer] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [redirect, setRedirect] = React.useState(false);
    const [user, setUser] = React.useState([]);

    const [count, setCount] = React.useState(10);

    const columns = [

        { field: 'col1', headerName: 'Player', flex: 0.8, sortable: false },
        { field: 'col2', headerName: 'Games Played', flex: 0.76, type: "number"},
        { field: 'col3', headerName: 'Wins', flex: 0.5, type: "number" },
        { field: 'col4', headerName: 'Losses', flex: 0.5, type: "number" },
        { field: 'col5', headerName: 'Kills', flex: 0.4, type: "number" },
        { field: 'col6', headerName: 'Deaths', flex: 0.5, type: "number" },
        { field: 'col7', headerName: 'KDR', flex: 0.5, type: "number" },
        { field: 'col8', headerName: 'KPG', flex: 0.5, type: "number" },
        { field: 'col9', headerName: 'Accuracy %', flex: 0.6, type: "number"}

    ]

    React.useEffect(() => {

        const users = [
            "Not Ajtiger2", 
            "Flyingcow10", 
            "ShantiPanti", 
            "nutmusprime", 
            "KiingBooty", 
            "Garth Tim", 
            "Neon Space 2788", 
            "Loopszs", 
            "CantoeKnees", 
            "GrumpierCone733", 
            "Cook5953",
            "AJR808",
            "QueenBoooty"
        ];

        setPlayer([]);
        setRows([]);

        var counter = 0;

        users.forEach((user, index) => {

            getPlayerInfoHI(user).then((obj) => {

                

                if(obj.allTime.gamesPlayed !== 0) {

                    console.log(obj)

                    var kpg = Number(obj.allTime.kills.total/obj.allTime.gamesPlayed).toFixed(2)

                    var row = {
                        id: counter, 
                        col1: obj.user.gamertag, 
                        col2: obj.allTime.gamesPlayed, 
                        col3: obj.allTime.match.wins, 
                        col4: obj.allTime.match.losses, 
                        col5: obj.allTime.kills.total, 
                        col6: obj.allTime.deaths, 
                        col7: obj.allTime.killDeathRatio, 
                        col8: kpg,
                        col9: obj.allTime.shots.accuracy
                    }

                    counter++;
                    
                    setPlayer(player => [...player, obj])
                    setRows(rows => [...rows, row]);

                }
            })
        })

    }, [])

    function setPath(name, id) {

        setUser([name, id]);
        setRedirect(true);

    }

    if(!redirect) {

    return(

        <Container>
            <div style={{ display: 'flex'}}>
                <div style={{flexGrow: 1}}>
                <DataGrid 
                    style={{background: "#424242", color: "#E0E0E0"}}
                    InputProps={{className: classes.row}}
                    autoHeight 
                    rows={rows} 
                    columns={columns} 
                    pageSize={count}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    disableColumnFilter 
                    disableColumnMenu
                    onRowDoubleClick={(params, event) => { setPath(params.row.col1, player[params.id])}}
                />
                </div>
            </div>
            <Paper style={{width: '20%', background: "#424242"}}>
                <Typography style={{color: "white", marginTop: 10}}>Page Size</Typography>
                <ButtonGroup variant="contained" style={{background: "#BDBDBD"}}>
                    <Button disabled={count === 10} onClick={() => setCount(10)}>10</Button>
                    <Button disabled={count === 20} onClick={() => setCount(20)}>20</Button>
                    <Button disabled={count === 50} onClick={() => setCount(50)}>50</Button>
                </ButtonGroup>
            </Paper>
        </Container>

    )

    } else {

        return(
            <Redirect to={{pathname: "/hi/user/" + user[0], state: {player: player[user[1]]}}}></Redirect>
        )

    }

}