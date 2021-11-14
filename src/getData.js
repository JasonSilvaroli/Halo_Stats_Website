import { rankXP, rankNames } from "./rankXP";

export async function getPlayerInfo(name) {

    var player = {

        allTime: {
            timePlayed: String, 
            gamesPlayed: Number, 
            kills: Number,
            deaths: Number,
            assists: Number, 
            killDeathRatio: Number,
            wins: Number,
            losses: Number,
            winRatio: Number
        },
        user: {
            gamertag: String, 
            clanTag: String, 
            serviceTag: String, 
            emblem: String, 
            avatar: String, 
            rank: {
                title: String,
                tour: Number,
                tier: Number,
                image_url: String,
                totalxp: Number,
                remainingxp: Number,
                totalXPToRankUp: Number,

            }
        },
        good: Boolean
    };

    let responseXp = await fetch("https://cryptum.halodotapi.com/games/hmcc/stats/players/" + name + "/xp", {
        headers: {
            Authorization: "Cryptum-Token 9ygHR2MqrnPkgNlnzxRjoTAFgtf2PR183FZYa23GElQlNS4ADKyLQCi9ygJIpCkk",
            "Content-Type": "application/json",
            "Cryptum-Api-Version": "2.3-alpha"
        }
    })

    let playerXP = await responseXp.json()

    if(responseXp.ok) {

        console.log(playerXP)

        player.good = true;

        player.user.gamertag = playerXP.additional.gamertag;
        player.user.rank.title = rankNames[playerXP.data.rank.current %30]
        player.user.rank.tour = Number((playerXP.data.rank.current / 30).toFixed(0))
        player.user.rank.tier = playerXP.data.rank.current %30
        //player.user.rank.image_url = playerXP.data.image_url;
        player.user.rank.totalxp = playerXP.data.xp.total;

        console.log(playerXP.data.rank.current %30)

        if(player.user.rank.tour < 9) {

            player.user.rank.remainingxp = rankXP[Number((playerXP.data.rank.current / 30).toFixed(0))][playerXP.data.rank.current %30] - playerXP.data.xp.total;
            player.user.rank.totalXPToRankUp = rankXP[player.user.rank.tour][ player.user.rank.tier + 1] - rankXP[player.user.rank.tour][ player.user.rank.tier];

        } else {

            player.user.rank.remainingxp = "n"
            player.user.rank.totalXPToRankUp = "a"

        }
        let responseSR = await fetch("https://cryptum.halodotapi.com/games/hmcc/stats/players/" + name + "/service-record", {
            headers: {
                Authorization: "Cryptum-Token 9ygHR2MqrnPkgNlnzxRjoTAFgtf2PR183FZYa23GElQlNS4ADKyLQCi9ygJIpCkk",
                "Content-Type": "application/json",
                "Cryptum-Api-Version": "2.3-alpha"
            }
        })

        let playerSR = await responseSR.json();

        player.user.clanTag = playerSR.additional.appearance.clan_tag;
        player.user.emblem = playerSR.additional.appearance.emblem_url;
        player.user.avatar = playerSR.additional.appearance.avatar_url;
        player.allTime.timePlayed = playerSR.data.time_played.human;
        player.allTime.gamesPlayed = playerSR.data.multiplayer.total_matches;
        player.allTime.kills = playerSR.data.multiplayer.summary.kills;
        player.allTime.deaths = playerSR.data.multiplayer.summary.deaths;
        player.allTime.wins = playerSR.data.multiplayer.summary.wins;
        player.allTime.losses = playerSR.data.multiplayer.summary.losses;
        player.allTime.assists = playerSR.data.multiplayer.summary.assists;
        player.allTime.killDeathRatio = playerSR.data.multiplayer.kdr.toFixed(2);
        player.allTime.winRatio = (player.allTime.wins/player.allTime.gamesPlayed).toFixed(2);

        let responseName = await fetch("https://cryptum.halodotapi.com/games/hmcc/appearance/players/" + name, {
            headers: {
                Authorization: "Cryptum-Token 9ygHR2MqrnPkgNlnzxRjoTAFgtf2PR183FZYa23GElQlNS4ADKyLQCi9ygJIpCkk",
                "Content-Type": "application/json",
                "Cryptum-Api-Version": "2.3-alpha"
            }
        })

        let playerAp = await responseName.json();

        player.user.serviceTag = playerAp.data.service_tag;

        

    } else {

        player.good = false;
        player.user.gamertag = "Player Not Found";
        player.user.rank.title = rankNames[1]
        player.user.rank.tour = 0
        player.user.rank.tier = 0
        player.user.rank.totalxp = 0
        player.user.rank.remainingxp = 0
        player.user.rank.totalXPToRankUp = 0
        player.user.clanTag = ""
        player.user.emblem = "https://emblems.svc.halowaypoint.com/hmcc/emblems/green_brick_mjolnir-on-cyan_horizgradient";
        player.user.avatar = "https://content.halocdn.com/media/Default/games/Halo-Master-Chief-Collection/avatars/playeridavatar_006-9df1527d161f499e9895e382e02cde8b.jpg";
        player.allTime.timePlayed = "0d 00h 00m 00s";
        player.allTime.gamesPlayed = 0;
        player.allTime.kills = 0;
        player.allTime.deaths = 0;
        player.allTime.wins = 0;
        player.allTime.losses = 0;
        player.allTime.assists = 0;
        player.allTime.killDeathRatio = 0;
        player.allTime.winRatio = 0;

    }

    return player;

}

export async function getRecentMatches(name, page = 1) {

    function Match(data) {

        this.won = data.victory
        this.map = data.details.map.name
        this.game = {
            name: data.details.engine.name,
            logo: data.details.engine.logo_url
        }
        this.gameType = data.details.category.name
        this.date = data.played_at
        this.duration = data.duration.human.split(" ").slice(1).join(" ")
        this.kills = data.stats.kills
        this.deaths = data.stats.deaths
        this.assists = data.stats.assists
        this.score = data.stats.score
        this.headshots = data.stats.headshots
        this.killDeathRatio = data.stats.kdr.toFixed(2)

    }

    var matchHistory = {

        matches: [],
        count: 0,
        totals: {

            kills: Number,
            deaths: Number,
            assists: Number,
            headshots: Number,
            wins: Number,
            losses: Number

        }

    }

    let response = await fetch("https://cryptum.halodotapi.com/games/hmcc/stats/players/" + name + "/recent-matches?page=" + page, {
        headers: {
            Authorization: "Cryptum-Token 9ygHR2MqrnPkgNlnzxRjoTAFgtf2PR183FZYa23GElQlNS4ADKyLQCi9ygJIpCkk",
            "Content-Type": "application/json",
            "Cryptum-Api-Version": "2.3-alpha"
        }
    })

    let responseRM = await response.json()

    responseRM.data.forEach((data, index) => {

        

        if(data.details.category.name === "Unknown") {

            data.details.category.name = "CTF"

        }

        var date = data.played_at.split("T")

        date[1] = date[1].split(".")[0];

        date[1] = date[1].split(":");

        date[1] = date[1][0] + ":" + date[1][1]

        data.played_at = date[0] + " " + date[1];

        const obj = new Match(data);
        matchHistory.matches[matchHistory.count + index] = obj;

    })

    matchHistory.count += responseRM.count;
    return matchHistory;

}

export async function getRecentMatchesGame(name, game) {

    var recentMatches = [];

    for(var i = 1; i < 5 && recentMatches.length < 10; i++) {

        let response = await getRecentMatches(name, i);

        let matches = await response;

        var filtered = filterMatches(matches.matches, game);

        if(filtered && recentMatches.length < 10) {

            filtered.forEach((obj) => {

                recentMatches.push(obj);

            })

        }
    
    }

    return await recentMatches;

}

function filterMatches(matches, game) {

    var matchGame = [];

    matches.forEach((obj) => {

        if(obj.gameType === game) {

            matchGame.push(obj);

        }

    })

    return matchGame;

}