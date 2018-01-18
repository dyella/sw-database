const videoURL = "https://www.googleapis.com/youtube/v3/search";
const filmsURL = "https://swapi.co/api/films/?search=";
const peopleURL = "https://swapi.co/api/people/?search=";
const planetsURL = "https://swapi.co/api/planets/?search=";
const speciesURL = "https://swapi.co/api/species/?search=";
const starshipersURL = "https://swapi.co/api/starshipers/?search=";
const vehiclesURL = "https://swapi.co/api/vehicles/?search=";
let word = '';

//Call YouTube API
function getDataVideo(searchWord, callback) {
  const settings = {
    part: 'snippet',
    channelId: 'UCZGYJFUizSax-yElQaFDp5Q',
    key: 'AIzaSyBWlaqRf5RJqSa4OqlSqdjdr_GaYUmpcuY',
    q: `${searchWord}`,
    maxResults: 3,
  }
  $.getJSON(videoURL, settings, callback);
}

//Call Star Wars API
function getSWData(url, query, callback) {
    $.ajax({
        method: "GET",
        url: url
    }).done(callback);
};

function searchButtons() {

    function filmsSearchButton() {
        $('.topic films').on('click', function() {
            getSWData(filmsURL, word, handleFilmsData);
        });
    }

    function peopleSearchButton() {
        $('.topic people').on('click', function() {
            getSWData(peopleURL, '', handlePeopleData);
        });
    }

    function planetsSearchButton() {
        $('.topic planets').on('click', function() {
            getSWData(planetsURL, '',handlePlanetsData);
        });
    }

    function speciesSearchButton() {
        $('.topic species').on('click', function() {
            getSWData(speciesURL, '',handleSpeciesData);
        });
    }

    function starshipsSearchButton() {
        $('.topic starships').on('click', function() {
            getSWData(starshipsURL, '',handleStarshipsData);
        });
    }

    function vehiclesSearchButton() {
        $('.topic vehicles').on('click', function() {
            getSWData(vehiclesURL, '',handleVehiclesData);
        });
    }
}

function handleFilmsData(data) {
    $('.search-results').html(data);
}

//Toggle search bar under buttons
function searchToggle() {
    $('body').on('click', '.topic', function(event) {
        let slide = $(this).parent().find('.search-line');
        $('.search-line').not(slide).slideUp();
        slide.slideToggle();
    });
}

//Blank space code for results
function blankResults(result) {
  return `
  <br>
    <div>
    <iframe id="youtube" width="960" height="540" src="https://www.youtube.com/embed/${result.id.videoId}?showinfo=0" frameborder="0" allowfullscreen></iframe>
    </div>`;
}

//Insert data results into blank space code
function displayResults(data) {
  const videos = data.items.map((item,index) => blankResults(item));
  $('.search-results').html(videos);
}

function closeBtn () {
  $('.close-btn').on('click', function () {
    $(this).removeClass('active');
  });
}

function openOverlay() {
    $('.overlay').on('click', function() {
        $(this).addClass('active');
    });
}

function closeOverlay() {
  $('.overlay').on('click', function() {
    $(this).removeClass('active');
  });
}

function submitButton() {
  $('.submit-input').submit(event => {
    openOverlay();
    //$('.overlay').toggleClass();
    event.preventDefault();
    const searchItem = $(event.currentTarget).find('.search-item');
    //const searchTopic = $().val();

    const word = searchItem.val();
    getDataVideo(word, displayResults);
    });
}

function handleFunctions() {
  submitButton();
  closeOverlay();
  closeBtn();
  searchToggle();
  searchButtons();
  handleFilmsData();
}

handleFunctions();

//<iframe id="youtube" width="960" height="540" src="https://www.youtube.com/embed/${result.id.videoId}?showinfo=0" frameborder="0" allowfullscreen></iframe>