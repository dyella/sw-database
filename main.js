const videoURL = "https://www.googleapis.com/youtube/v3/search";
const filmsURL = "https://swapi.co/api/films/?search=";
const peopleURL = "https://swapi.co/api/people/?search=";
const planetsURL = "https://swapi.co/api/planets/?search=";
const speciesURL = "https://swapi.co/api/species/?search=";
const starshipsURL = "https://swapi.co/api/starships/?search=";
const vehiclesURL = "https://swapi.co/api/vehicles/?search=";

function startOp() {
    $('.splash').on('click', function(event) {
        $('.splash').fadeOut(600, function() {
            $('.splash').addClass('hidden');
            $('.navigate').fadeIn(600);
            $('.navigate').removeClass('hidden');
        });
    });
}

//Call YouTube API
function getDataVideo(searchWord, callback) {
  const settings = {
    part: 'snippet',
    channelId: 'UCZGYJFUizSax-yElQaFDp5Q',
    key: 'AIzaSyBWlaqRf5RJqSa4OqlSqdjdr_GaYUmpcuY',
    q: `${searchWord}, star wars`,
    maxResults: 5
  }
  $.getJSON(videoURL, settings, callback);
}


//Category button functions, toggle search, and close overlay
(function() {
    $('.submit-input.films').on('click', function() {
        let word = $('.search-item.films').val();
        getSWData(filmsURL, word, handleFilmsData);
    });
    
    $('.submit-input.people').on('click', function() {
        let word = $('.search-item.people').val();
        getSWData(peopleURL, word, handlePeopleData);
        getDataVideo(word, displayVideoResults);
    });

    $('.submit-input.planets').on('click', function() {
        let word = $('.search-item.planets').val();
        getSWData(planetsURL, word, handlePlanetsData);
        getDataVideo(word, displayVideoResults);
    });

    $('.submit-input.species').on('click', function() {
        let word = $('.search-item.species').val();
        getSWData(speciesURL, word, handleSpeciesData);
        getDataVideo(word, displayVideoResults);
    });

    $('.submit-input.starships').on('click', function() {
        let word = $('.search-item.starships').val();
        getSWData(starshipsURL, word, handleStarshipsData);
        getDataVideo(word, displayVideoResults);
    });
    
    $('.submit-input.vehicles').on('click', function() {
        let word = $('.search-item.vehicles').val();
        getSWData(vehiclesURL, word, handleVehiclesData);
        getDataVideo(word, displayVideoResults);
    });

    //Close overlay and empty html results
        $('.close-btn').on('click', function() {
            $('.overlay').removeClass('active');
            $('.swapi-results').empty();
            $('.youtube-results').empty();
        });

    //Toggle search bars under buttons
        $('body').on('click', '.topic', function(event) {
            let slide = $(this).parent().find('.search-line');
            $('.search-line').not(slide).slideUp();
            $('.search-item').val('');
            slide.slideToggle();
        });

    startOp();

})();


//Call YouTube API
function getDataVideo(searchWord, callback) {
  const settings = {
    part: 'snippet',
    channelId: 'UCZGYJFUizSax-yElQaFDp5Q',
    key: 'AIzaSyBWlaqRf5RJqSa4OqlSqdjdr_GaYUmpcuY',
    q: `${searchWord}`,
    maxResults: 5
  }
  $.getJSON(videoURL, settings, callback);
}

//Call Star Wars API
function getSWData(url, query, callback) {
    $.ajax({
        method: "GET",
        url: url + query
    }).done(callback);
};

function handleFilmsData(data) {

    if (data.count === 0) {
        alert('test error');
        console.log('test');
    } else {
        
    let word = $('.search-item.films').val();
    getDataVideo(word, displayVideoResults);
    $('.overlay').addClass('active');
    console.log('test2');
    $('.swapi-results').html(`
        <h1>Episode ${data.results[0].episode_id}</h1>
        <h1 class="name">${data.results[0].title}</h1>
        <span class="director">Directed by ${data.results[0].director}</span><br/>
        <span class="crawl">${data.results[0].opening_crawl}</span>
    `);
    }
}

function handlePeopleData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    let thisPlanet = data.results[0].homeworld
    $('.swapi-results').html(`
        <h1 class="name>name: ${data.results[0].name}</h1>
        birth year: ${data.results[0].birth_year}
        height: ${data.results[0].height}cm
        eye color: ${data.results[0].eye_color}
        home planet: 
        species: ${data.results[0].species}
    `);
}

function handlePlanetsData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        <h1 class="name>name: ${data.results[0].name}</h1>
        climate: ${data.results[0].climate}
        population: ${data.results[0].population}
        terrain: ${data.results[0].terrain}
    `);
}

function handleSpeciesData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        <h1 class="name>name: ${data.results[0].name}</h1>
        classification: ${data.results[0].classification}
        language: ${data.results[0].language}
        homeworld: ${data.results[0].homeworld}
    `);
}

function handleStarshipsData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        <h1 class="name>name: ${data.results[0].name}</h1>
        model: ${data.results[0].model}
        class: ${data.results[0].starship_class}
        length: ${data.results[0].length}m
        hyperdrive rating: ${data.results[0].hyperdrive_rating}
    `);
}

function handleVehiclesData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        <h1 class="name>name: ${data.results[0].name}</h1>
        model: ${data.results[0].model}
        length: ${data.results[0].length}m
        passengers: ${data.results[0].passengers}
    `);
}

//Blank space code for results
function blankVideoResults(result) {
  return `
  <br>
    <div>
    <iframe id="youtube" width="800" height="450" src="https://www.youtube.com/embed/${result.id.videoId}?showinfo=0" frameborder="0" allowfullscreen></iframe>
    </div>`;
}

//Insert YT data results into blank space code
function displayVideoResults(data) {
  const videos = data.items.map((item,index) => blankVideoResults(item));
  $('.youtube-results').html(videos);
}