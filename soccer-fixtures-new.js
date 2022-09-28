// Blocks for Displaying Teams
const homeTeamContainer = document.getElementById('home-team-container');
const awayTeamContainer = document.getElementById('away-team-container');

// Showing Team Score Content in Blocks
const quoteText = document.getElementById('quote');
const homeTeamScore = document.getElementById('home-team-score');
const awayTeamScore = document.getElementById('away-team-score');
const homeTeamName = document.getElementById('home-team-name');
const awayTeamName = document.getElementById('away-team-name');
const homeTeamLogo = document.getElementById('home-team-logo');
const awayTeamLogo = document.getElementById('away-team-logo');

// Inputs from User
const homeTeamInput = document.getElementById('homeTeamInput');
const awayTeamInput = document.getElementById('awayTeamInput');
const chooseSeason = document.getElementById('chooseSeason');
const seasonForm = document.getElementById('seasonForm');

// Test - Use Dropdowns for Input
const homeTeamDropdown = document.getElementById('homeTeamDropdown');
const awayTeamDropdown = document.getElementById('awayTeamDropdown');
const dropdownButton = document.getElementById('dropdownButton');

const loader = document.getElementById('loader');

// Am I still using these?
const apiURL = 'https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=33-34';
const headers = {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "46b9f7d98amsh7f2eee4baab0d59p13d1eajsn49aa8d47d116"
};

let fixtureOne = [];
let fixtureTwo = [];

// Getting User Input on Teams and Season

seasonForm.addEventListener('submit',getValue);
// homeTeamDropdown.addEventListener('change',getValueDropdown);
// awayTeamDropdown.addEventListener('change',getValueDropdown);

function getValueDropdown(e) {
    e.preventDefault();
    if (homeTeamDropdown.value != "none" && awayTeamDropdown.value != "none" && chooseSeason.value) {    
        let homeTeam = homeTeamDropdown.value;
        let awayTeam = awayTeamDropdown.value;
        getTeamIDs(homeTeam,awayTeam,chooseSeason.value);
}
    // let homeTeam = e.target.value;

    // let season = chooseSeason.value;
    // let homeTeam = homeTeamInput.value;
    // let awayTeam = awayTeamInput.value;
    // getTeamIDs(homeTeam,awayTeam,season);
}

function getValue(e) {
    e.preventDefault();
    // console.log(chooseSeason.value);
    let season = chooseSeason.value;
    // let homeTeam = homeTeamInput.value;
    // let awayTeam = awayTeamInput.value;
    let homeTeam = homeTeamDropdown.value;
    let awayTeam = awayTeamDropdown.value;
    getTeamIDs(homeTeam,awayTeam,season);
}

// Call API to get team IDs
async function getTeamIDs(homeTeam,awayTeam,season) {

    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "46b9f7d98amsh7f2eee4baab0d59p13d1eajsn49aa8d47d116");
    myHeaders.append("x-rapidapi-host", "api-football-v1.p.rapidapi.com");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const responseTestHome = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?name=${homeTeam}`, requestOptions);  
    responseHome = await responseTestHome.json();
    homeTeamId = responseHome.response[0].team.id;
    
    const responseTestAway = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?name=${awayTeam}`, requestOptions);     
    responseAway = await responseTestAway.json();
    awayTeamId = responseAway.response[0].team.id;

    getFixtures(homeTeamId,awayTeamId,season)
}

// Call API to get scores of two teams + season inputted
async function getFixtures(homeId, awayId, season) {
    // showLoadingSpinner();

    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "46b9f7d98amsh7f2eee4baab0d59p13d1eajsn49aa8d47d116");
    myHeaders.append("x-rapidapi-host", "api-football-v1.p.rapidapi.com");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    try {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=${homeId}-${awayId}&season=${season}`, requestOptions);  
        fixtures = await response.json();
        fixtureOne = fixtures.response[0];
        fixtureTwo =  fixtures.response[1];

        // console.log(fixtureOne);
        // console.log(fixtureTwo);

        // For First Fixture
        teamHomeName = fixtureOne.teams.home.name;
        teamAwayName = fixtureOne.teams.away.name;

        logoHome = fixtureOne.teams.home.logo;
        logoAway = fixtureOne.teams.away.logo;

        scoreHome = fixtureOne.score.fulltime.home.toString();
        scoreAway = fixtureOne.score.fulltime.away.toString();

        // For Second Fixture
        teamHomeNameTwo = fixtureTwo.teams.home.name;
        teamAwayNameTwo = fixtureTwo.teams.away.name;

        logoHomeTwo = fixtureTwo.teams.home.logo;
        logoAwayTwo = fixtureTwo.teams.away.logo;

        scoreHomeTwo = fixtureTwo.score.fulltime.home.toString();
        scoreAwayTwo = fixtureTwo.score.fulltime.away.toString();
        
        fixturesShowOne(teamHomeName, teamAwayName,logoHome,logoAway,scoreHome,scoreAway);
        fixturesShowTwo(teamHomeNameTwo, teamAwayNameTwo,logoHomeTwo,logoAwayTwo,scoreHomeTwo,scoreAwayTwo);
    }
    catch(error) {
        console.log('error: ',error);
    }
}

// Show Loader
function showLoadingSpinner() {
    loader.hidden = false;
    awayBlock.hidden = true;
}
// Hide Loader
function completeLoadingSpinner() {
    awayBlock.hidden = false;
    loader.hidden = true;
}

function fixturesShowOne(home, away, homeLogo, awayLogo, homeScore, awayScore) {
    // showLoadingSpinner();
    // console.log('function called: ',away," ",awayScore);

    homeTeamContainer.hidden = false;
    awayTeamContainer.hidden = false;

    homeTeamName.textContent = home;
    awayTeamName.textContent = away;

    homeTeamLogo.src = homeLogo;
    awayTeamLogo.src = awayLogo;

    homeTeamScore.textContent = homeScore;
    awayTeamScore.textContent = awayScore;

    // completeLoadingSpinner();
}

function fixturesShowOne(home, away, homeLogo, awayLogo, homeScore, awayScore) {
    // showLoadingSpinner();
    // console.log('function called: ',away," ",awayScore);

    homeTeamContainer.hidden = false;
    awayTeamContainer.hidden = false;

    homeTeamName.textContent = home;
    awayTeamName.textContent = away;

    homeTeamLogo.src = homeLogo;
    awayTeamLogo.src = awayLogo;

    homeTeamScore.textContent = homeScore;
    awayTeamScore.textContent = awayScore;

    // completeLoadingSpinner();
}

// Creating elements

function createElements() {
    
}
