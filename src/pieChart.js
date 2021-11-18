import { PieChart, Pie, Cell, ResponsiveContainer} from 'recharts'

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
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
            <PieChart>
                <Pie
                    data={data}
                    cx={40}
                    cy={40}
                    labelLine={false}
                    outerRadius={40}
                    dataKey="value"
                    isAnimationActive={false}
                    label={renderCustomizedLabel}
                >
                    {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>

    )

}