import * as apiKey from "./configure/apiKey.json"
 
export var player = {

    allTime: {
        gamesPlayed: 0, 

        kills: {
            total: 0,
            melee: 0,
            grenades: 0,
            headshots: 0,
            powerWeapons: 0,
            betrayals: 0
        },

        assists: {
            total: 0,
            emp: 0,
            driver: 0,
            callouts: 0
        },

        deaths: 0,
        suicides: 0,
        vehicles: {
            destroys: 0,
            hijacks: 0,
        }, 

        killDeathRatio: 0,
        match: {
            wins: 0,
            losses: 0,
            left: 0,
            draws: 0

        },

        damage: {
            taken: 0,
            dealt: 0,
            average: 0,
        },

        shots: {
            fired: 0,
            landed: 0,
            missed: 0,
            accuracy: 0
        },

        totalScore: 0,
        medals: 0

    },
    user: {
        gamertag: "Spartan", 
        serviceTag: "", 
        emblemURL: "https://cryptum.halodotapi.com/games/hi/appearance/images/emblems/104-001-olympus-spart-f9bc88ce.png", 
        backDropURL: "https://cryptum.halodotapi.com/games/hi/appearance/images/backdrops/103-000-ui-background-f3dad3eb.png", 
    },
    good: Boolean

}

export async function getPlayerInfoHI(name) {

    let serviceRecordRP = await fetch("https://cryptum.halodotapi.com/games/hi/stats/players/" + name + "/service-record/top-100", {
        headers: {
          Authorization: "Cryptum-Token " + apiKey.default.data.access_token,
          "Content-Type": "application/json",
          "Cryptum-Api-Version": "2.3-alpha"
        }
    })

    let playerSR = await serviceRecordRP.json();

    let playerAppearenceRP = await fetch("https://cryptum.halodotapi.com/games/hi/appearance/players/" + name, {
        headers: {
            Authorization: "Cryptum-Token " + apiKey.default.data.access_token,
            "Content-Type": "application/json",
            "Cryptum-Api-Version": "2.3-alpha"
        }
    })

    let playerApp = await playerAppearenceRP.json();

    if(serviceRecordRP.ok && playerAppearenceRP.ok) {

        playerSR = playerSR.data;
        playerApp = playerApp.data;

        player.allTime.gamesPlayed = playerSR.matches_played;
        player.allTime.kills.total = playerSR.summary.kills;
        player.allTime.kills.melee = playerSR.breakdowns.kills.melee;
        player.allTime.kills.grenades = playerSR.breakdowns.kills.grenades;
        player.allTime.kills.headshots = playerSR.breakdowns.kills.headshots;
        player.allTime.kills.powerWeapons = playerSR.breakdowns.kills.power_weapons;
        player.allTime.kills.betrayals = playerSR.summary.betrayals;

        player.allTime.assists.total = playerSR.summary.assists;
        player.allTime.assists.emp = playerSR.breakdowns.assists.emp;
        player.allTime.assists.driver = playerSR.breakdowns.assists.driver;
        player.allTime.assists.callouts = playerSR.breakdowns.assists.callouts;

        player.allTime.deaths = playerSR.summary.deaths;
        player.allTime.suicides = playerSR.summary.suicides;

        //player.allTime.vehicles.destroys = playerSR.summary.vehicles.destroys;
        //player.allTime.vehicles.hijacks = playerSR.summary.vehicles.hijacks;

        player.allTime.vehicles = playerSR.summary.vehicles;

        player.allTime.killDeathRatio = playerSR.kdr;

        //player.allTime.match.wins = playerSR.matches.wins;
        //player.allTime.match.losses = playerSR.matches.losses;
        //player.allTime.match.draws = playerSR.matches.draws;
        //player.allTime.match.left = playerSR.matches.left;

        player.allTime.match = playerSR.breakdowns.matches

        //player.allTime.damage.taken = playerSR.damage.taken;
        //player.allTime.damage.dealt = playerSR.damage.dealt;
        //player.allTime.damage.average = playerSR.damage.average;
        
        player.allTime.damage = playerSR.damage;

        player.allTime.shots = playerSR.shots;

        player.allTime.totalScore = playerSR.total_score;
        player.allTime.medals = playerSR.summary.medals;

        player.user.gamertag = name.replace("%20", " ");
        player.user.serviceTag = playerApp.service_tag;
        player.user.emblemURL = playerApp.emblem_url;
        player.user.backDropURL = playerApp.backdrop_image_url;

        player.good = true;

    }

    return player;

}

export var Match = 
{
    "map": "Map Name",
    "gameType": "GameType",
    "outcome": "win",
    "playedAt": "01/01/2000 - 12:00",
    "duration": "00h 00m 00s",
    "rank": 0,
    "rounds": {
        "won": 0,
        "lost": 0,
        "tied": 0
    },
    "stats": {
        "kills": {
            "total": 0,
            "melee": 0,
            "grenades": 0,
            "headshots": 0,
            "powerWeapons": 0,
            "betrayals": 0
        },
        "assists": {
            "total": 0,
            "emp": 0,
            "driver": 0,
            "callouts": 0
        },
        "deaths": 0,
        "suicides": 0,
        "vehicles": {
            "destroys": 0,
            "hijacks": 0
        },
        "killDeathRatio": 0,
        "damage": {
            "taken": 0,
            "dealt": 0
        },
        "shots": {
            "fired": 0,
            "landed": 0,
            "missed": 0,
            "accuracy": 0
        },
        "totalScore": 0,
        "medals": 0
    }
}

export var matchHistory = {

    matches: [],
    count: 0,
    totals: {

        kills: 0,
        deaths: 0,
        assists: 0,
        headshots: 0,
        wins: 0,
        losses: 0

    }

}

export async function getMatchesHI(name) {

    function setMatch(data) {
        
        if(data.details.map.name !== "Unknown") {

            this.map = data.details.map.name;

        } else if(data.details.map.asset.id === "c494ef7c-d203-42a9-9c0f-b3f576334501") {

            this.map = "Hightower"

        } else if(data.details.map.asset.id === "08607bf4-6abe-4a5b-9547-290a6cc1433e"){

            this.map = "Deadlock"

        }

        this.gameType = data.details.category.name;
        this.outcome = data.outcome;
        this.playedAt = data.played_at;
        this.duration = data.duration.human;
        this.rank = data.rank;
        this.rounds = data.stats.rounds;
        this.stats = {
            kills: {
                total: data.stats.summary.kills,
                melee: data.stats.breakdowns.kills.melee,
                grenades: data.stats.breakdowns.kills.grenades,
                headshots: data.stats.breakdowns.kills.headshots,
                powerWeapons: data.stats.breakdowns.kills.power_weapons,
                betrayals: data.stats.summary.betrayals
            },
            assists: {
                total: data.stats.summary.assists,
                emp: data.stats.breakdowns.assists.emp,
                driver: data.stats.breakdowns.assists.driver,
                callouts: data.stats.breakdowns.assists.callouts
            },
            deaths: data.stats.summary.deaths,
            suicides: data.stats.summary.suicides,
            vehicles: data.stats.summary.vehicles,
            killDeathRatio: data.stats.kdr,
            damage: data.stats.damage,
            shots: data.stats.shots,
            totalScore: data.stats.score,
            medals: data.stats.summary.medals
        }

        return this;

    }

    var matchHistory = {

        matches: [],
        count: 0,
        totals: {

            kills: 0,
            deaths: 0,
            assists: 0,
            headshots: 0,
            wins: 0,
            losses: 0

        }

    }

    let matchRP = await fetch("https://cryptum.halodotapi.com/games/hi/stats/players/" + name + "/matches", {
        headers: {
            Authorization: "Cryptum-Token " + apiKey.default.data.access_token,
          "Content-Type": "application/json",
          "Cryptum-Api-Version": "2.3-alpha"
        }
    })

    let matches = await matchRP.json();

    if(matchRP.ok) {

        matches = matches.data;

        matchHistory.count = 0;

        matches.forEach((data, index) => {

            data.played_at = splitDateTime(data.played_at);

            const obj = setMatch(data);

            matchHistory.matches[matchHistory.count++] = obj;

            matchHistory.totals.kills += data.stats.summary.kills;
            matchHistory.totals.deaths += data.stats.summary.deaths;
            matchHistory.totals.assists += data.stats.summary.assists;
            matchHistory.totals.headshots += data.stats.breakdowns.kills.headshots;

            if(data.outcome === 'win') {

                matchHistory.totals.wins++;

            } else {

                matchHistory.totals.losses++;

            }

        })

    }

    return matchHistory;

}

function splitDateTime(obj) {

    var dateTime = {
        date: "",
        time: ""
    }

    dateTime.date = obj.split("T")[0];
    dateTime.time = obj.split("T")[1].split(".")[0];

    obj = new Date(dateTime.date + " " + dateTime.time + " GMT");

    return ("0" + obj.getDate()).slice(-2) + "/" + ("0" + (obj.getMonth() + 1)).slice(-2) + "/" + obj.getFullYear() + " - " + ("0" + obj.getHours()).slice(-2) + ":" + ("0" + obj.getMinutes()).slice(-2)

}