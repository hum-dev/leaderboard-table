const rankingBody = document.querySelector("#ranking > tbody");

function loadRanking () {
    const request = new XMLHttpRequest ();

    request.open("get", /*link*/);
    request.onload = () => {
        try{
            const json = JSON.parse(request.responseText);
            populateRanking(json);
        } catch (e) {
            console.warn("could not load rankings!");
        }
    };
    request.send();
}

function populateRanking (json) {
    json.forEach((row) => {
        const tr = document.createElement("tr");

        row.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        rankingBody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadRanking ();
});
$("#search-leaderboard").keyup(function() {
    var value = this.value;

    $("table").find("tr").each(function(index) {
        if (index === 0) return;

        var if_td_has = false;
        $(this).find('td').each(function() {
            if_td_has = if_td_has ||
            $(this).text().indexOf(value) !== -1;
        });
        $(this).toggle(if_td_has);
    });
});