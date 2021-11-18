import { Accordion, AccordionDetails, Typography, AccordionSummary, Grid, List, ListItem, Paper } from "@material-ui/core";
import VerticalAlignBottomTwoToneIcon from '@material-ui/icons/MoreVert';

export default function GameSummaryHI(props) {

  const match = props.data;

  var kills = [

    {name: "Melee:", stat: match.stats.kills.melee},
    {name: "Grenade:", stat: match.stats.kills.grenades},
    {name: "Headshots:", stat: match.stats.kills.headshots},
    {name: "Power Weapon:", stat: match.stats.kills.powerWeapons},
    {name: "Other:", stat: match.stats.kills.total - match.stats.kills.melee - match.stats.kills.grenades - match.stats.kills.headshots - match.stats.kills.powerWeapons}

  ]

  var assists = [

    {name: "EMP:", stat: match.stats.assists.emp},
    {name: "Driver:", stat: match.stats.assists.driver},
    {name: "Callouts:", stat: match.stats.assists.callouts}

  ]

  var shots = [

    {name: "Fired:", stat: match.stats.shots.fired},
    {name: "Hit:", stat: match.stats.shots.landed},
    {name: "Missed:", stat: match.stats.shots.missed},
    {name: "Accuracy:", stat: match.stats.shots.accuracy + "%"},

  ]

  var damage = [

    {name: "Dealt:", stat: match.stats.damage.dealt},
    {name: "Taken:", stat: match.stats.damage.taken},

  ]

  var vehicle = [

    {name: "Destoryed: ", stat: match.stats.vehicles.destroys},
    {name: "Hijacks:", stat: match.stats.vehicles.hijacks},

  ]

  var paperStyle = match.outcome === "win" ? {marginTop: 10, background: "#BDE7BD"} : {marginTop: 10, background: "#FFB6B3"}

  var itemStyle = match.outcome === "win" ? {padding: 5, width: "100%", background: "#4F7942"} : {padding: 5, width: "100%", background: "#7B1818"}
  
  return (
      
      <Accordion style={paperStyle}>
        <AccordionSummary expandIcon={<VerticalAlignBottomTwoToneIcon />}>
          <Typography style={{fontWeight: 'bold', width: '30%', flexShrink: 0, textAlign: "left"}}>{match.gameType} - {match.map}</Typography>
          <Typography style={{fontWeight: "bold", width: '5%', flexShrink: 0, color: "#228b22"}}>{match.stats.kills.total}</Typography>
          <Typography style={{fontWeight: "bold"}}>-</Typography>
          <Typography style={{fontWeight: "bold", width: '5%', flexShrink: 0, color: "#8b0000 "}}>{match.stats.deaths}</Typography>
          <Typography style={{fontWeight: "bold"}}>-</Typography>
          <Typography style={{fontWeight: "bold", width: '5%', flexShrink: 0}}>{match.stats.assists.total}</Typography>
          <Typography style={{fontWeight: "bold", width: "20%", flexShrink: 0}}>{match.stats.totalScore}</Typography>
          <Typography style={{fontWeight: "bold", width: '30%', flexShrink: 0, textAlign: "right"}}>{match.playedAt}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Kills - {match.stats.kills.total}</Typography>
              <List>
                { kills.map((obj, index) => {
                  return(
                    <ListItem key={index}>
                      <Paper elevation={2} style={itemStyle}>
                        <Typography component={'span'} display="inline" style={{color: "white", float: "left"}}>{obj.name}</Typography>
                        <Typography component={'span'} display="inline" style={{color: "white", float: "right"}}>{obj.stat}</Typography>
                      </Paper>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Assists - {match.stats.assists.total}</Typography>
              <List>
                { assists.map((obj, index) => {
                  return(
                    <ListItem key={index}>
                      <Paper elevation={2} style={itemStyle}>
                        <Typography component={'span'} display="inline" style={{color: "white", float: "left"}}>{obj.name}</Typography>
                        <Typography component={'span'} display="inline" style={{color: "white", float: "right"}}>{obj.stat}</Typography>
                      </Paper>
                    </ListItem>
                  )
                })}
              </List>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Deaths - {match.stats.deaths}</Typography>
              <List>
                <ListItem>
                  <Paper elevation={2} style={itemStyle}>
                    <Typography component={'span'} display="inline" style={{color: "white", float: "left"}}>Suicides:</Typography>
                    <Typography component={'span'} display="inline" style={{color: "white", float: "right"}}>{match.stats.suicides}</Typography>
                  </Paper>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Shots</Typography>
              <List>
                {
                  shots.map((obj, index) => {
                    return(
                      <ListItem key={index}>
                        <Paper elevation={2} style={itemStyle}>
                          <Typography component={'span'} display="inline" style={{color: "white", float: "left"}}>{obj.name}</Typography>
                          <Typography component={'span'} display="inline" style={{color: "white", float: "right"}}>{obj.stat}</Typography>
                        </Paper>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Damage</Typography>
              <List>
                {
                  damage.map((obj, index) => {
                    return(
                      <ListItem key={index}>
                        <Paper elevation={2} style={itemStyle}>
                          <Typography component={'span'} display="inline" style={{color: "white", float: "left"}}>{obj.name}</Typography>
                          <Typography component={'span'} display="inline" style={{color: "white", float: "right"}}>{obj.stat}</Typography>
                        </Paper>
                      </ListItem>
                    )
                  })
                }
              </List>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>Vehicle</Typography>
              <List>
                {
                  vehicle.map((obj, index) => {
                    return(
                      <ListItem key={index}>
                        <Paper elevation={2} style={itemStyle}>
                          <Typography component={'span'} display="inline" style={{color: "white", float: "left"}}>{obj.name}</Typography>
                          <Typography component={'span'} display="inline" style={{color: "white", float: "right"}}>{obj.stat}</Typography>
                        </Paper>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
  )

}