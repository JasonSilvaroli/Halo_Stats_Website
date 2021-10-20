import { useEffect, React } from "react";
import GameStats from "./gameStats";
import { getRecentMatchesGame } from "./getData";


export default function ShowGameStat(props) {

    const name = props.gamertag;
    const game = props.game;

    const [gameMode, setGamemode] = React.useState([]);

    console.log(props)

    useEffect(() => {

        console.log("here1")
        getRecentMatchesGame(name, game).then((obj) => {

            setGamemode(obj);
            console.log("here")

        })

    }, []);

    return(
        gameMode.map((obj) => { return(<GameStats data={obj} />) } )        
    )

}