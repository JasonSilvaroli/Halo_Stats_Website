import { Container } from '@material-ui/core';
import { PieChart, Pie, Cell} from 'recharts'

export default function WinPieChart(props) {

    const COLORS = ["#0088FE", "#FF8042"];

    const wins = props.data.wins;
    const losses = props.data.losses;
    
    const data = [
        {name: "Wins", value: wins},
        {name: "Losses", value: losses}
    ]
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, index,
      }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{fontSize: 15, fontWeight: "500"}}>{index === 0 ? wins : losses}</text>
        );
      }

    return(
        <Container style={{paddingRight: 0}}>
            <PieChart width={100} height={100}>
                <Pie
                    data={data}
                    cx={40}
                    cy={40}
                    labelLine={false}
                    outerRadius={40}
                    dataKey="value"
                    label={renderCustomizedLabel}
                >
                    {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
            </PieChart>
        </Container>

    )

}