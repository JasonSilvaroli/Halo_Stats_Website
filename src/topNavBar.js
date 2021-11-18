import { AppBar, Button, Container, Grid, makeStyles, Menu, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';
import { GridMenuIcon } from '@material-ui/data-grid';
import React from 'react';
import { Link, } from 'react-router-dom';
import Icon from '@material-ui/icons/Search';

const useStyles = makeStyles ({

    root: {
        color: 'white'
    }

}, [ 'MuiTextField' ])

export default function NavBar() {

    const classes = useStyles();

    const [openMenu, setOpenMenu] = React.useState(null);
    const [search, setSearch] = React.useState("");

    var game = "MCC"

    const menuClose = () => {

        setOpenMenu(null);

    }

    const handleChange = (event) => {

        setSearch(event.target.value);

    }

    return(
        <Container style={{paddingBottom: 100}}>
            <AppBar>
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
                            <Link to="/home" style={{color: "white", textDecoration: 'none'}}>
                                <Typography variant="h6" style={{textAlign: "left"}}>
                                    The Domain
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={2}>
                                <TextField inputProps={{className: classes.root}} placeholder="Search..." value={search} onChange={handleChange}></TextField>
                                <Link to={"/" + game + "/user/" + search} style={{color: "white", textDecoration: 'none'}}>
                                    <Icon></Icon>
                                </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Container>
    )
}