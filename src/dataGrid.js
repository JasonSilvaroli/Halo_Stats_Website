import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import makeStyles from '@material-ui/styles/makeStyles'
import { useHistory } from 'react-router';

const useStyles = makeStyles({

    row: {
        color: '#EEF1E6',
        '&:nth-of-type(odd)': {
            background:'#799FCB'
        },
        '&:nth-of-type(even)': {
            background: '#F9665E'
        }
    }

}, { name: 'MuiDataGrid'});

export default function HaloDataGrid() {

    const classes = useStyles();
    const history = useHistory();

    const rows = [
        {id: 1, col1: 'Not Ajtiger2', col2: '23', col3: Number(3306), col4: '2185', col5: '1121', col6: Number(38936)},
        {id: 2, col1: 'ShantiPanti', col2: '23', col3: '3110', col4: '2019', col5: '1091', col6: Number(34271)},
        {id: 3, col1: 'Flyingcow10', col2: '12', col3: '1689', col4: '1121', col5: '568', col6: Number(30617)},
        {id: 4, col1: 'GrumpierCone733', col2: '33', col3: '4359', col4: '2896', col5: '1463', col6: Number(62968)},
        {id: 5, col1: 'KiingBooty', col2: '61', col3: '8890', col4: '6169', col5: '2721', col6: Number(234751)},
        {id: 6, col1: 'nutmusprime', col2: '48', col3: '6728', col4: '4018', col5: '2710', col6: Number(69329)},
        {id: 7, col1: 'Garth Tim', col2: '15', col3: '2201', col4: '1520', col5: '681', col6: Number(24486)},        
    ];

    const columns = [

        { field: 'col1', headerName: 'Player', width: 200 },
        { field: 'col2', headerName: 'Play Time', width: 150 },
        { field: 'col3', headerName: 'Games Played', width: 170 },
        { field: 'col4', headerName: 'Wins', width: 110 },
        { field: 'col5', headerName: 'Losses', width: 125 },
        { field: 'col6', headerName: 'Kills', width: 110 },
        { field: 'col7', headerName: 'Deaths', width: 125 },
        { field: 'col8', headerName: 'KDR', width: 110 },
        { field: 'col9', headerName: 'Streak', width: 120 },

    ]

    return(
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
                onRowDoubleClick={(params, event) => { history.push('/')}}
            />
            </div>
        </div>
    )
}