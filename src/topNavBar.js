import { AppBar, Button, Container, makeStyles, Menu, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';
import { GridMenuIcon } from '@material-ui/data-grid';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles ({

    root: {
        color: 'white'
    }

}, [ 'MuiTextField' ])

export default function NavBar() {

    const classes = useStyles();

    const [openMenu, setOpenMenu] = React.useState(null);
    const history = useHistory();

    const keyPress = (e) => {

        if(e.keyCode === 13) {
            history.push('/user/' + e.target.value)
        }

    }

    const menuClose = () => {

        setOpenMenu(null);

    }

    const goTo = (obj) => {

        history.push("/" + obj)

    }

    return(
        <Container style={{paddingBottom: 100}}>
            <AppBar className="container-fluid">
                <Toolbar>
                        <Button onClick={(e) => setOpenMenu(e.currentTarget)}>
                            <GridMenuIcon />
                        </Button>
                        <Menu anchorEl={openMenu} keepMounted open={Boolean(openMenu)} onClose={menuClose} >
                            <MenuItem onClick={goTo("")}>Home</MenuItem>
                        </Menu>
                    <Typography variant="h6" noWrap style={{width: 300}}>
                        PC Master Race Halo
                    </Typography>
                    <div style={{marginLeft: 1300, marginTop: 10}}>
                        <TextField inputProps={{className: classes.root}} placeholder="Search..." onKeyDown={keyPress}></TextField>
                    </div>
                </Toolbar>
            </AppBar>
        </Container>
    )

}