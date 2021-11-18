import { AppBar, Button, Container, Grid, makeStyles, Menu, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';
import { GridMenuIcon } from '@material-ui/data-grid';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const useStyles = makeStyles ({

    root: {
        color: 'white'
    }

}, [ 'MuiTextField' ])

export default function NavBar() {

    const classes = useStyles();

    const [redirectTo, setRedirectTo] = React.useState(false);
    const [path, setPath] = React.useState("");
    const [openMenu, setOpenMenu] = React.useState(null);

    const keyPress = (e) => {

        if(e.keyCode === 13) {
            setPath("/mcc/user/" + e.target.value)
            setRedirectTo(true)
        }

    }

    const menuClose = () => {

        setOpenMenu(null);

    }

    if(!redirectTo) {

        return(
            <Container style={{paddingBottom: 100}}>
                <AppBar className="container-fluid">
                    <Toolbar style={{background: "#616161"}}>
                        <Grid container spacing={4} direction={"row"} alignItems={"center"}>
                            <Grid item xs={1}>
                                <Button onClick={(e) => setOpenMenu(e.currentTarget)}>
                                    <GridMenuIcon />
                                </Button>
                                <Menu anchorEl={openMenu} keepMounted open={Boolean(openMenu)} onClose={menuClose} >
                                    <Link onClick={() => menuClose()} style={{color: "#000000", textDecoration: 'none'}} to="/home"><MenuItem >Home</MenuItem></Link>
                                    <Link onClick={() => menuClose()} style={{color: "#000000", textDecoration: 'none'}} to="/about"><MenuItem >About</MenuItem></Link>
                                    <Link onClick={() => menuClose()} style={{color: "#000000", textDecoration: 'none'}} to="/search"><MenuItem >Search</MenuItem></Link>
                                </Menu>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h6" style={{textAlign: "left"}}>
                                    The Domain
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                    <TextField inputProps={{className: classes.root}} placeholder="Search..." onKeyDown={keyPress}></TextField>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Container>
        )
    } else {

        return (

            <Redirect to={{pathname: path}}></Redirect>

        )

    }

}