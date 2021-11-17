export async function getPlayerInfoHI(name) {

    var player = {

        allTime: {
            gamesPlayed: Number, 

            kills: {
                total: Number,
                melee: Number,
                grenades: Number,
                headshots: Number,
                powerWeapons: Number,
                betrayals: Number
            },

            assists: {
                total: Number,
                emp: Number,
                driver: Number,
                callouts: Number
            },

            deaths: Number,
            suicides: Number,
            vehicles: {
                destroys: Number,
                hijacks: Number,
            }, 

            killDeathRatio: Number,
            match: {
                wins: Number,
                losses: Number,
                left: Number,
                draws: Number

            },

            damage: {
                taken: Number,
                dealt: Number,
                average: Number,
            },

            shots: {
                fired: Number,
                landed: Number,
                missed: Number,
                accuracy: Number
            },

            totalScore: Number,
            medals: Number

        },
        user: {
            gamertag: String, 
            serviceTag: String, 
            emblemURL: String, 
            backDropURL: String, 
        },
        good: Boolean

    }

    let serviceRecordRP = await fetch("https://cryptum.halodotapi.com/games/hi/stats/players/" + name + "/service-record/top-100", {
        headers: {
          Authorization: "Cryptum-Token 9ygHR2MqrnPkgNlnzxRjoTAFgtf2PR183FZYa23GElQlNS4ADKyLQCi9ygJIpCkk",
          "Content-Type": "application/json",
          "Cryptum-Api-Version": "2.3-alpha"
        }
    })

    let playerSR = await serviceRecordRP.json();

    let playerAppearenceRP = await fetch("https://cryptum.halodotapi.com/games/hi/appearance/players/" + name, {
        headers: {
            Authorization: "Cryptum-Token 9ygHR2MqrnPkgNlnzxRjoTAFgtf2PR183FZYa23GElQlNS4ADKyLQCi9ygJIpCkk",
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

        player.user.gamertag = name;
        player.user.serviceTag = playerApp.service_tag;
        player.user.emblemURL = playerApp.emblem_url;
        player.user.backDropURL = playerApp.backdrop_image_url;

        player.good = true;

    }

    return player;

}

export async function getMatchesHI(name) {

    function Match(data) {

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
          Authorization: "Cryptum-Token 9ygHR2MqrnPkgNlnzxRjoTAFgtf2PR183FZYa23GElQlNS4ADKyLQCi9ygJIpCkk",
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

            const obj = new Match(data);

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

    return ("0" + obj.getDate()).slice(-2) + "/" + ("0" + obj.getMonth()).slice(-2) + "/" + obj.getFullYear() + " - " + ("0" + obj.getHours()).slice(-2) + ":" + ("0" + obj.getMinutes()).slice(-2)

}