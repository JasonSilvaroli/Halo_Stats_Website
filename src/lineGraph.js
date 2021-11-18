import { Paper, Typography } from "@material-ui/core";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


export default function LineGraph(props) {

    var data = props.stat

    if(props.stat.length > 0) {

    } else {

        return(
            <Paper elevation={3} style={{padding: 10, background: "#DCDCDC", width: "80%", height: 294}}>
                <Typography style={{paddingTop: 15}}>Loading</Typography>
            </Paper>
        )

    }

    return(
        <Paper elevation={3} style={{padding: 10, background: "#DCDCDC", marginTop: 20}}>
            <Typography>{props.name}</Typography>
            <ResponsiveContainer width='100%' aspect={4.0/3.0}>
            
                <LineChart
                    data={data}
                >
                    <CartesianGrid />
                    <XAxis dataKey="name" tick={{fontSize: 15}}/>
                    <YAxis dataKey="stat" tick={{fontSize: 15}}/>
                    <Line type="monotone" dataKey="stat" stroke="grey" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    )

}