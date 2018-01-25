const videoURL = "https://www.googleapis.com/youtube/v3/search";
const filmsURL = "https://swapi.co/api/films/?search=";
const peopleURL = "https://swapi.co/api/people/?search=";
const planetsURL = "https://swapi.co/api/planets/?search=";
const speciesURL = "https://swapi.co/api/species/?search=";
const starshipersURL = "https://swapi.co/api/starshipers/?search=";
const vehiclesURL = "https://swapi.co/api/vehicles/?search=";
const imgURL = "https://www.googleapis.com/customsearch/v1";

function startOp() {
    $('.splash').on('click', function(event) {
        $('.splash').fadeOut(500, function() {
            $('.splash').addClass('hidden');
            $('.navigate').fadeIn(500);
            $('.navigate').removeClass('hidden');
        });
    });
}


(function() {
    $('.submit-input.films').on('click', function() {
        let word = $('.search-item.films').val();
        getSWData(filmsURL, word, handleFilmsData);
        getDataVideo(word, displayVideoResults);
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
        $('.overlay').on('click', function() {
            $(this).removeClass('active');
            $('.swapi-results').empty();
            $('.youtube-results').empty();
        });

    //Toggle search bar under buttons
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

//Call Google Search API
function getIMGData(url, query, callback) {
    $.ajax({
        method: "GET",
        url: url + query
    }).done(callback);
};
// API key "AIzaSyB4g8c1vSsEIfHvEMCeWuFzvCIQTfGJdPc"

function handleFilmsData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        title: ${data.results[0].title}
        episode: ${data.results[0].episode_id}
        director: ${data.results[0].director}
        opening: ${data.results[0].opening_crawl}
    `);
}

function handlePeopleData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        name: ${data.results[0].name}
        birth year: ${data.results[0].birth_year}
        home planet: ${data.results[0].homeworld}
        species: ${data.results[0].species}
    `);
}

function handlePlanetsData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        name: ${data.results[0].name}
        climate: ${data.results[0].climate}
        population: ${data.results[0].population}
        terrain: ${data.results[0].terrain}
    `);
}

function handleSpeciesData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        name: ${data.results[0].name}
        classification: ${data.results[0].classification}
        language: ${data.results[0].language}
        homeworld: ${data.results[0].homeworld}
    `);
}

function handleStarshipsData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        name: ${data.results[0].name}
        model: ${data.results[0].model}
        class: ${data.results[0].starship_class}
        length: ${data.results[0].length}
        hyperdrive rating: ${data.results[0].hyperdrive_rating}
    `);
}

function handleVehiclesData(data) {
    $('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        name: ${data.results[0].name}
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
    <iframe id="youtube" width="400" height="225" src="https://www.youtube.com/embed/${result.id.videoId}?showinfo=0" frameborder="0" allowfullscreen></iframe>
    </div>`;
}

//Insert YT data results into blank space code
function displayVideoResults(data) {
  const videos = data.items.map((item,index) => blankVideoResults(item));
  $('.youtube-results').html(videos);
}
