// Blocks for Displaying Teams
const homeTeamContainer = document.getElementById('home-team-container');
const awayTeamContainer = document.getElementById('away-team-container');
const fullContainer = document.getElementById('full-container');

// Inputs from User - Issue with this is it involves user to enter it correctly. First round could just use dropdowns to show proof of concept.
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

// Getting User Input on Teams and Season
function getValue(e) {
    e.preventDefault();
    let season = chooseSeason.value;
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

        let fixtureList = fixtures.response;

        fixtureList.forEach((fixture) => {
            console.log("Fixture: ",fixture);
            const teamContainerEl = document.createElement('div');
            teamContainerEl.classList.add('team-container');
            const fixtureContainerEl = document.createElement('div');
            fixtureContainerEl.classList.add('fixture-container');

            // Setting location and date for fixture
            const fixtureDateEl = document.createElement('div');
            fixtureDateEl.classList.add('fixture-date-location');
            const fixtureLocationEl = document.createElement('div');           
            fixtureLocationEl.classList.add('fixture-date-location');

            fixtureDateEl.textContent = `Date: ${fixture.fixture.date.split("T")[0]}`;
            fixtureLocationEl.textContent = `Venue: ${fixture.fixture.venue.name}`;
            console.log(fixtureDateEl.textContent," at ",fixtureLocationEl.textContent);

            // Add location and date for fixture to team container
            fixtureContainerEl.append(fixtureLocationEl);
            fixtureContainerEl.append(fixtureDateEl);

            // Home Team Block Elements
            const scoreHomeEl = document.createElement('div');
            scoreHomeEl.textContent = fixture.score.fulltime.home.toString();
            scoreHomeEl.classList.add('score');
            const nameHomeEl = document.createElement('div');
            nameHomeEl.textContent = fixture.teams.home.name;
            nameHomeEl.classList.add('team-name');
            const logoHomeEl = document.createElement('img');
            logoHomeEl.src = fixture.teams.home.logo;
            const teamHomeBlockEl = document.createElement('div');
            teamHomeBlockEl.classList.add('team-block');

            // Put home block together
            teamHomeBlockEl.append(logoHomeEl);
            teamHomeBlockEl.append(nameHomeEl);
            teamHomeBlockEl.append(scoreHomeEl);
            teamContainerEl.append(teamHomeBlockEl);

            // Away Team Block Elements
            const scoreAwayEl = document.createElement('div');
            scoreAwayEl.textContent = fixture.score.fulltime.away.toString();
            scoreAwayEl.classList.add('score');
            const nameAwayEl = document.createElement('div');
            nameAwayEl.textContent = fixture.teams.away.name;
            nameAwayEl.classList.add('team-name');
            const logoAwayEl = document.createElement('img');
            logoAwayEl.src = fixture.teams.away.logo;
            const teamAwayBlockEl = document.createElement('div');
            teamAwayBlockEl.classList.add('team-block');

            // Put away block together
            teamAwayBlockEl.append(logoAwayEl);
            teamAwayBlockEl.append(nameAwayEl);
            teamAwayBlockEl.append(scoreAwayEl);
            teamContainerEl.append(teamAwayBlockEl);



            // Append to main container
            fixtureContainerEl.append(teamContainerEl);
            fullContainer.append(fixtureContainerEl);
        });
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

// Event Listener
seasonForm.addEventListener('submit',getValue);
