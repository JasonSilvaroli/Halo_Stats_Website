import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import makeStyles from '@material-ui/styles/makeStyles'
import { Redirect } from 'react-router';
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getPlayerInfo } from './getDataMCC';


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
    },

}, { name: 'MuiDataGrid'});

export default function HaloDataGrid() {

    const classes = useStyles();

    const [player, setPlayer] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [redirect, setRedirect] = React.useState(false);
    const [user, setUser] = React.useState([]);

    const [count, setCount] = React.useState(10);

    const columns = [

        { field: 'col1', headerName: 'Player', width: 200, sortable: false },
        { field: 'col2', headerName: 'Play Time', width: 150, sortable: false},
        { field: 'col3', headerName: 'Games Played', width: 170, type: "number" },
        { field: 'col4', headerName: 'Wins', width: 110, type: "number" },
        { field: 'col5', headerName: 'Losses', width: 125, type: "number" },
        { field: 'col6', headerName: 'Kills', width: 110, type: "number" },
        { field: 'col7', headerName: 'Deaths', width: 125, type: "number" },
        { field: 'col8', headerName: 'KDR', width: 110, type: "number" },
        { field: 'col9', headerName: 'KPG', width: 110, type: "number" }

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

        users.forEach((user, index) => {

            getPlayerInfo(user).then((obj) => {

                if(obj.allTime.gamesPlayed !== 0) {

                    var kpg = (obj.allTime.kills/obj.allTime.gamesPlayed).toFixed(2)

                    var row = {
                        id: index, 
                        col1: obj.user.gamertag, 
                        col2: obj.allTime.timePlayed, 
                        col3: obj.allTime.gamesPlayed, 
                        col4: obj.allTime.wins, 
                        col5: obj.allTime.losses, 
                        col6: obj.allTime.kills, 
                        col7: obj.allTime.deaths, 
                        col8: obj.allTime.killDeathRatio,
                        col9: kpg
                    }

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

    const handleChangeCount = (event) => {

        setCount(event.target.value)

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
                    onRowDoubleClick={(params, event) => { setPath(params.row.col1, player[params.id])}}
                />
                </div>
            </div>
            <FormControl style={{color: "#E0E0E0"}}>
                <InputLabel style={{background: "#424242", fontSize: 20, width: 150, color: "#E0E0E0"}}>Page Count</InputLabel>
                <Select
                style={{background: "#424242", color: "#E0E0E0"}}
                    value={count}
                    label={count}
                    onChange={handleChangeCount}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
            <Button href="/hi/user/Flyingcow10">
                test
            </Button>
        </Container>
    )
    } else {

        console.log(user);

        return(
            <Redirect to={{pathname: "/mcc/user/" + user[0], state: {player: player[user[1]]}}}></Redirect>
        )

    }
}