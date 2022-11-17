// Blocks for Displaying Teams
const homeTeamContainer = document.getElementById('home-team-container');
const awayTeamContainer = document.getElementById('away-team-container');
const fullContainer = document.getElementById('full-container');

// Inputs from User - Issue with this is it involves user to enter it correctly. First round could just use dropdowns to show proof of concept.
const homeTeamInput = document.getElementById('homeTeamInput');
const awayTeamInput = document.getElementById('awayTeamInput');
const chooseSeason = document.getElementById('chooseSeason');
const seasonForm = document.getElementById('seasonForm');
const resetButton = document.getElementById('resetBtn');

// Test - Use Dropdowns for Input
const homeTeamDropdown = document.getElementById('homeTeamDropdown');
const awayTeamDropdown = document.getElementById('awayTeamDropdown');
const dropdownButton = document.getElementById('dropdownButton');

const loader = document.getElementById('loader');

// Setting upper limit on date picker
const date = new Date();
let thisYear = date.getFullYear();

// Am I still using these?
const apiURL = 'https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=33-34';
const headers = {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "46b9f7d98amsh7f2eee4baab0d59p13d1eajsn49aa8d47d116"
};

// Getting User Input on Teams and Season
function getValue(e) {
    e.preventDefault();
    let season = chooseSeason.value;
    let homeTeam = homeTeamDropdown.value;
    let awayTeam = awayTeamDropdown.value;
    if (homeTeam !== awayTeam && season >= 2010 && season <= thisYear) {
    getTeamIDs(homeTeam,awayTeam,season);
    }
    else {
        alert('Please select two different teams and a season after 09/10.');
    }
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

        let fixtureList = fixtures.response;
        
        fixtureList.forEach((fixture) => {
            
            // Variables for fixtures
            let fixtureDate = fixture.fixture.date.split("T")[0];
            let fixtureVenue = fixture.fixture.venue.name;
            let league = fixture.league.name;
            let homeTeam = fixture.teams.home.name;
            let homeScore = fixture.score.fulltime.home.toString();
            let homeTeamLogo = fixture.teams.home.logo;
            let awayTeam = fixture.teams.away.name;
            let awayScore = fixture.score.fulltime.away.toString();
            let awayTeamLogo = fixture.teams.away.logo;
            
            const teamContainerEl = document.createElement('div');
            teamContainerEl.classList.add('team-container');
            const fixtureContainerEl = document.createElement('div');
            fixtureContainerEl.classList.add('fixture-container');

            // Setting location and date for fixture
            const fixtureContainerInfoEl = document.createElement('div');
            fixtureContainerInfoEl.classList.add('fixture-info');

            const fixtureDateEl = document.createElement('div');
            fixtureDateEl.classList.add('fixture-date-location');
            const fixtureLocationEl = document.createElement('div');           
            fixtureLocationEl.classList.add('fixture-date-location');
            const fixtureTournamentEl = document.createElement('div');
            fixtureTournamentEl.classList.add('fixture-date-location');

            fixtureDateEl.textContent = `Date: ${fixtureDate}`;
            fixtureLocationEl.textContent = `Venue: ${fixtureVenue}`;
            fixtureTournamentEl.textContent = `Tournament: ${league}`

            // Add location and date for fixture to team container
            fixtureContainerInfoEl.append(fixtureLocationEl);
            fixtureContainerInfoEl.append(fixtureDateEl);
            fixtureContainerInfoEl.append(fixtureTournamentEl);

            fixtureContainerEl.append(fixtureContainerInfoEl);

            // Home Team Block Elements
            const scoreHomeEl = document.createElement('div');
            scoreHomeEl.textContent = homeScore;
            scoreHomeEl.classList.add('score');
            const nameHomeEl = document.createElement('div');
            nameHomeEl.textContent = homeTeam;
            nameHomeEl.classList.add('team-name');
            const logoHomeEl = document.createElement('img');
            logoHomeEl.src = homeTeamLogo;
            const teamHomeBlockEl = document.createElement('div');
            teamHomeBlockEl.classList.add('team-block');

            // Put home block together
            teamHomeBlockEl.append(logoHomeEl);
            teamHomeBlockEl.append(nameHomeEl);
            teamHomeBlockEl.append(scoreHomeEl);
            teamContainerEl.append(teamHomeBlockEl);

            // Away Team Block Elements
            const scoreAwayEl = document.createElement('div');
            scoreAwayEl.textContent = awayScore;
            scoreAwayEl.classList.add('score');
            const nameAwayEl = document.createElement('div');
            nameAwayEl.textContent = awayTeam;
            nameAwayEl.classList.add('team-name');
            const logoAwayEl = document.createElement('img');
            logoAwayEl.src = awayTeamLogo;
            const teamAwayBlockEl = document.createElement('div');
            teamAwayBlockEl.classList.add('team-block');

            // Put away block together
            teamAwayBlockEl.append(logoAwayEl);
            teamAwayBlockEl.append(nameAwayEl);
            teamAwayBlockEl.append(scoreAwayEl);
            teamContainerEl.append(teamAwayBlockEl);

            const summaryEl = document.createElement('div');
            summaryEl.classList.add('summary-info');
            
            summaryEl.textContent = fixture.teams.away.winner === true ? `${awayTeam} won ${awayScore} to ${homeScore} away to ${homeTeam}.` : fixture.teams.away.winner === false ? `${homeTeam} won ${homeScore} to ${awayScore} at home to ${awayTeam}.` : `The game ended in a ${homeScore} - ${awayScore} draw at ${fixtureVenue}.`;

            // Append to main container
            fixtureContainerEl.append(teamContainerEl);
            fixtureContainerEl.append(summaryEl);

            fullContainer.append(fixtureContainerEl);
        });
        resetButton.hidden = false;
    }
    catch(error) {
        console.log('error: ',error);
    }
}

function resetPage() {
    let nodeList = document.getElementsByClassName('fixture-container');
    
    while (nodeList.length > 0) {
        nodeList[0].remove();
    }

    homeTeamDropdown.selectedIndex = 0;
    awayTeamDropdown.selectedIndex = 0;
    chooseSeason.value = '';
    resetButton.hidden = true;
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

// Event Listener
seasonForm.addEventListener('submit',getValue);
resetButton.addEventListener('click',resetPage);

// Get List of Teams
async function listTeamIDs() {

    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "46b9f7d98amsh7f2eee4baab0d59p13d1eajsn49aa8d47d116");
    myHeaders.append("x-rapidapi-host", "api-football-v1.p.rapidapi.com");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const responseTestHome = await fetch('https://live-score-api.p.rapidapi.com/teams/list.json?secret=5TOc5AKj4lAedIcOsCuA17R1Yg0iEQ1J&key=BJqF8oDh0RoZjoQJ', requestOptions);  
    responseTeams = await responseTestHome.json();
    
}