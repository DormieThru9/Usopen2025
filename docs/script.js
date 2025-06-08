// Placeholder golfers by category
const golfers = {
  cat1: ["Scottie Scheffler", "Rory McIlroy", "Xander Schauffele"],
  cat2: ["Jon Rahm", "Brooks Koepka", "Matt Fitzpatrick"],
  cat3: ["Tommy Fleetwood", "Min Woo Lee", "Adam Scott"],
  cat4: ["Patrick Cantlay", "Tony Finau", "Jordan Spieth"],
  cat5: ["Dustin Johnson", "Billy Horschel", "Sahith Theegala"]
};

const form = document.getElementById("poolForm");
const leaderboardBody = document.getElementById("leaderboard-body");

// Populate dropdowns
["cat1", "cat2", "cat3", "cat4", "cat5"].forEach(cat => {
  const select = form.elements[cat];
  golfers[cat].forEach(player => {
    const option = document.createElement("option");
    option.value = player;
    option.textContent = player;
    select.appendChild(option);
  });
});

// Dummy leaderboard data
let entries = [
  {
    name: "John Smith",
    roster: ["Scheffler", "Koepka", "Fleetwood", "Cantlay", "Johnson"],
    totalPrize: 3500000,
    scoreToPar: -6,
    owgrAvg: 4
  },
  {
    name: "Jane Doe",
    roster: ["McIlroy", "Rahm", "Min Woo Lee", "Finau", "Theegala"],
    totalPrize: 2900000,
    scoreToPar: -4,
    owgrAvg: 7
  }
];

// Handle entry submission
form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const roster = ["cat1", "cat2", "cat3", "cat4", "cat5"].map(cat => formData.get(cat));
  const tiebreaker = formData.get("tiebreaker");

  entries.push({
    name,
    roster,
    totalPrize: Math.floor(Math.random() * 5000000), // Placeholder prize
    scoreToPar: parseInt(tiebreaker),
    owgrAvg: Math.floor(Math.random() * 20) // Placeholder OWGR
  });

  renderLeaderboard();
  form.reset();
});

function renderLeaderboard() {
  leaderboardBody.innerHTML = "";
  entries.sort((a, b) => b.totalPrize - a.totalPrize);

  entries.forEach(entry => {
    const row = document.createElement("tr");

    const scoreClass = entry.scoreToPar < 0 ? "red" :
                       entry.scoreToPar === 0 ? "green" : "black";

    row.innerHTML = `
      <td>${entry.name}</td>
      <td>$${entry.totalPrize.toLocaleString()}</td>
      <td class="${scoreClass}">${entry.scoreToPar}</td>
      <td>${entry.owgrAvg}</td>
      <td>${entry.roster.join(", ")}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}

renderLeaderboard();
