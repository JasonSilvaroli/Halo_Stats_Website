import * as playerInfo from "./test.json";

async function getPlayer(name) {

    await fetch('https://halo.api.stdlib.com/mcc@0.1.0/stats/?gamertag=' + name).then((res) => {

        res.json().then((data) => {

            console.log("here", data);
            var dataArr = [];
            dataArr[0] = data;
            return dataArr;

        });

    });

}

export function getInfo(name) {

    return getPlayer(name);

}