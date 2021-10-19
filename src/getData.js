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

            }
        }
    };

    let responseXp = await fetch("https://cryptum.halodotapi.com/games/hmcc/stats/players/" + name + "/xp", {
        headers: {
            Authorization: "Cryptum-Token 9ygHR2MqrnPkgNlnzxRjoTAFgtf2PR183FZYa23GElQlNS4ADKyLQCi9ygJIpCkk",
            "Content-Type": "application/json",
            "Cryptum-Api-Version": "2.3-alpha"
        }
    })

    let playerXP = await responseXp.json();

    player.user.gamertag = playerXP.additional.gamertag;
    player.user.rank.title = playerXP.data.level.title;
    player.user.rank.tour = playerXP.data.level.tour;
    player.user.rank.tier = playerXP.data.level.tier;
    player.user.rank.image_url = playerXP.data.image_url;
    player.user.rank.totalxp = playerXP.data.total;
    player.user.rank.remainingxp = playerXP.data.remaining;


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

    console.log(player.user.gamertag + " getData")

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
        this.duration = data.duration.human
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

    let responseRM = await response.json();

    responseRM.data.forEach((data, index) => {

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

        if(filtered) {

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

        if(obj.gameType.toString() === game.toString()) {

            matchGame.push(obj);

        }

    })

    console.log()
    return matchGame;

}