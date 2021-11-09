import { Paper, Typography } from "@material-ui/core";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";


export default function LineGraph(props) {

    var data = props.stat

    console.log(props.stat.length)

    if(props.stat.length > 0) {

    } else {

        return(
            <Paper elevation={3} style={{padding: 10, background: "#DCDCDC", width: 355, height: 294}}>
                <Typography style={{paddingTop: 15}}>Loading</Typography>
            </Paper>
        )

    }

    return(

        <Paper elevation={3} style={{padding: 10, background: "#DCDCDC", width: 355, marginTop: 20}}>
            <Typography>{props.name}</Typography>
            <LineChart
                width={340}
                height={250}
                data={data}
            >
                <CartesianGrid />
                <XAxis dataKey="name" tick={{fontSize: 15}}/>
                <YAxis dataKey="stat" tick={{fontSize: 15}}/>
                <Line type="monotone" dataKey="stat" stroke="grey" />
            </LineChart>
        </Paper>

    )

}