import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import makeStyles from '@material-ui/styles/makeStyles'
import { useHistory } from 'react-router';
import { Container } from '@material-ui/core';
import { getPlayerInfo } from './getData';

const useStyles = makeStyles({

    root: {
        background:'#AFC7D0'
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
    }

}, { name: 'MuiDataGrid'});

export default function HaloDataGrid() {

    const classes = useStyles();
    const history = useHistory();
    

    const [player, setPlayer] = React.useState([]);
    const [rows, setRows] = React.useState([]);

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

    return(
        <Container>
        <div style={{ display: 'flex'}}>
            <div style={{flexGrow: 1}}>
            <DataGrid 
                InputProps={{className: classes.row}}
                autoHeight 
                rows={rows} 
                columns={columns} 
                pageSize={10}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                disableColumnFilter 
                onRowDoubleClick={(params, event) => { history.push("/user/" + params.row.col1, player[params.id])}}
            />
            </div>
        </div>
        </Container>
    )
}