const videoURL = "https://www.googleapis.com/youtube/v3/search";
const filmsURL = "https://swapi.co/api/films/?search=";
const peopleURL = "https://swapi.co/api/people/?search=";
const planetsURL = "https://swapi.co/api/planets/?search=";
const speciesURL = "https://swapi.co/api/species/?search=";
const starshipersURL = "https://swapi.co/api/starshipers/?search=";
const vehiclesURL = "https://swapi.co/api/vehicles/?search=";

//Call YouTube API
function getDataVideo(searchWord, callback) {
  const settings = {
    part: 'snippet',
    channelId: 'UCZGYJFUizSax-yElQaFDp5Q',
    key: 'AIzaSyBWlaqRf5RJqSa4OqlSqdjdr_GaYUmpcuY',
    q: `${searchWord}`,
    maxResults: 3
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

(function() {
    $('.submit-input.films').on('click', function() {
        let word = $('.search-item.films').val();
        getSWData(filmsURL, word, handleFilmsData);
        //getDataVideo(word, displayVideoResults);
    });
    
    $('.submit-input.people').on('click', function() {
        let word = $('.search-item.people').val();
        getSWData(peopleURL, word, handlePeopleData);
        //getDataVideo(word, displayVideoResults);
    });

    $('.submit-input.planets').on('click', function() {
        let word = $('.search-item.planets').val();
        getSWData(peopleURL, word, handlePlanetsData);
        //getDataVideo(word, displayVideoResults);
    });

    $('.submit-input.species').on('click', function() {
        let word = $('.search-item.species').val();
        getSWData(peopleURL, word, handleSpeciesData);
        //getDataVideo(word, displayVideoResults);
    });

    $('.submit-input.species').on('click', function() {
        let word = $('.search-item.species').val();
        getSWData(peopleURL, word, handleSpeciesData);
        //getDataVideo(word, displayVideoResults);
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

})();

function handleFilmsData(data) {
    //$('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        title: ${data.results[0].title}
        director: ${data.results[0].director}
    `);
}

function handlePeopleData(data) {
    //$('.overlay').addClass('active');
    console.log(data);
    $('.swapi-results').html(`
        name: ${data.results[0].name}
    `);
}

function handlePlanetsData(data) {
    //$('.overlay').addClass('active');
    console.log(data);
}

function handleSpeciesData(data) {
    //$('.overlay').addClass('active');
    console.log(data);
}

function handleStarshipsData(data) {
    //$('.overlay').addClass('active');
    console.log(data);
}

function handleVehiclesData(data) {
    //$('.overlay').addClass('active');
    console.log(data);
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
