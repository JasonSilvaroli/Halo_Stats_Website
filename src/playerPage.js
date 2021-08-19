import { Container, CardMedia, Card } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HaloDataGrid from './dataGrid';


export default function PlayerPage(props) {

    const gamertag = useLocation().pathname.split('/')[2]

    const [user, setUser] = React.useState([]);

    function getInfo(name) {

        console.log(name);

        return (
            fetch('https://halo.api.stdlib.com/mcc@0.1.0/stats/?gamertag=' + name).then((res) => {

                res.json().then((data) => {

                    if(data !== undefined) {
                        setUser(data);
                    }
                    return;

                });
            })
        )
    };

    useEffect(() => {

        getInfo(gamertag);

    }, [])

    return(

        <Container >
            
            <HaloDataGrid></HaloDataGrid>
        </Container>
    )

}