import { Button, ButtonGroup, Container, Typography } from "@material-ui/core";
import React from "react";
import DataGridHI from "./dataGridHI";
import HaloDataGridMCC from "./dataGridMCC";


export default function HaloDataGrid() {

    const [game, setGame] = React.useState("Halo MCC")

    function setDataGrid(game) {

        return(game === "Halo MCC" ? <HaloDataGridMCC/> : <DataGridHI />)

    }

    return(
        <Container>
        <ButtonGroup variant="contained" style={{marginBottom: 10}}>
            <Button onClick={() => {setGame("Halo MCC")}}><Typography style={{fontWeight: "bold"}}>Halo MCC</Typography></Button>
            <Button onClick={() => {setGame("Halo Infinite")}}><Typography style={{fontWeight: "bold"}}>Halo Infinite</Typography></Button>
        </ButtonGroup>
        <Typography variant="h4">{game}</Typography>
        {setDataGrid(game)}
        </Container>
    )

}