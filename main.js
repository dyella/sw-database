const videoURL = "https://www.googleapis.com/youtube/v3/search";
const filmsURL = "https://swapi.co/api/films/?search=";
const peopleURL = "https://swapi.co/api/people/?search=";
const planetsURL = "https://swapi.co/api/planets/?search=";
const speciesURL = "https://swapi.co/api/species/?search=";
const starshipsURL = "https://swapi.co/api/starships/?search=";
const vehiclesURL = "https://swapi.co/api/vehicles/?search=";

const imgArray = [
    {
        imgPath: 'images/luke_skywalker_1.jpg',
        keywords: ['luke', 'skywalker','Luke', 'Skywalker'],
        alt: 'luke skywalker'
    },

    {
        imgPath: 'images/leia_2.jpg',
        keywords: ['leia', 'princess', 'organa', 'Leia', 'Organa'],
        alt: 'princess leia'
    },

    {
        imgPath: 'images/han_solo_1.jpg',
        keywords: ['han', 'solo', 'Han', 'Solo'],
        alt: 'han solo'
    },

    {
        imgPath: 'images/new_hope.jpg',
        keywords: ['new', 'hope', '4', 'New' 'Hope'],
        alt: 'star wars episode 4: a new hope'
    },

    {
        imgPath: 'images/empire_strikes_back.jpg',
        keywords: ['strikes', 'empire', 'back', '5', 'Empire', 'Strikes', 'Back'],
        alt: 'star wars episode 5: revenge of the sith'
    },

    {
        imgPath: 'images/return_of_the_jedi.jpg',
        keywords: ['return', 'jedi', '6', 'Return', 'Jedi'],
        alt: 'star wars episode 6: return of the jedi'
    },

    {
        imgPath: 'images/tatooine.jpg',
        keywords: ['tatooine', 'Tatooine'],
        alt: 'tatooine'
    },

    {
        imgPath: 'images/hoth.jpg',
        keywords: ['hoth', 'Hoth'],
        alt: 'hoth'
    },

    {
        imgPath: 'images/naboo.jpg',
        keywords: ['naboo', 'Naboo'],
        alt: 'naboo'
    },

    {
        imgPath: 'images/hutt.jpg',
        keywords: ['hutt', 'Hutt'],
        alt: 'jabba the hutt'
    },

    {
        imgPath: 'images/rodian.jpg',
        keywords: ['rodian', 'Rodian'],
        alt: 'greedo'
    },

    {
        imgPath: 'images/wookie.jpg',
        keywords: ['wookie', 'Wookie'],
        alt: 'chewbacca'
    },

    {
        imgPath: 'images/death_star.png',
        keywords: ['death', 'death star', 'Death', 'Star'],
        alt: 'the death star'
    },

    {
        imgPath: 'images/m_falcon.png',
        keywords: ['millennium', 'falcon', 'Millennium', 'Falcon'],
        alt: 'the millennium falcon'
    },

    {
        imgPath: 'images/at-at.jpg',
        keywords: ['at-at', 'AT-AT', 'At-At'],
        alt: 'at-at'
    },

    {
        imgPath: 'images/x-wing.jpg',
        keywords: ['x-wing', 'x', 'wing', 'X-Wing', 'X', 'Wing'],
        alt: 'x-wing'
    },

    {
        imgPath: 'images/tie.jpeg',
        keywords: ['tie', 'Tie'],
        alt: 'tie fighter'
    }
];

let imgResults = [];

function searchImagesByKeyword (keyword) {
    imgResults = [];

    imgArray.forEach((image) => {
        if (image.keywords.indexOf(keyword) !== -1) {
            imgResults.push(image.imgPath);
            $('.image-results').attr('alt', image.alt)
        }
    });

    renderImageResults();
}

function renderImageResults() {
    let imageResultsHtml = '';

    imgResults.forEach((image) => {
        imageResultsHtml += `<img src="${image}"/>`
    });

    $('.image-results').html(imageResultsHtml);
}

//Close splash page
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
    type: 'video',
    maxResults: 6
  }
  $.getJSON(videoURL, settings, callback);
}


//Toggle error message
function slideError() {
    let errorMsg = $(this).parent().find('.error');
    $('.error').not(errorMsg).hide();

}

//Call Star Wars API
function getSWData(url, query, callback) {
    $.ajax({
        method: "GET",
        url: url + query
    }).done(callback);
};

//Category button functions, toggle search, and close overlay
(function() {
    $('.submit-input.films').on('click', function() {
        let word = $('.search-item.films').val();
        searchImagesByKeyword(word);
        getSWData(filmsURL, word, handleFilmsData);
    });
    
    $('.submit-input.people').on('click', function() {
        let word = $('.search-item.people').val();
        searchImagesByKeyword(word);
        getSWData(peopleURL, word, handlePeopleData);
    });

    $('.submit-input.planets').on('click', function() {
        let word = $('.search-item.planets').val();
        searchImagesByKeyword(word);
        getSWData(planetsURL, word, handlePlanetsData);
    });

    $('.submit-input.species').on('click', function() {
        let word = $('.search-item.species').val();
        searchImagesByKeyword(word);
        getSWData(speciesURL, word, handleSpeciesData);
    });

    $('.submit-input.starships').on('click', function() {
        let word = $('.search-item.starships').val();
        searchImagesByKeyword(word);
        getSWData(starshipsURL, word, handleStarshipsData);
    });
    
    $('.submit-input.vehicles').on('click', function() {
        let word = $('.search-item.vehicles').val();
        searchImagesByKeyword(word);
        getSWData(vehiclesURL, word, handleVehiclesData);
    });

    //Close overlay and empty html results
        $('.close-btn').on('click', function() {
            $(this).addClass('hidden');
            $('.overlay').removeClass('active');
            $('.planets-results').empty();
            $('.species-results').empty();
            $('.swapi-results').empty();
            $('.youtube-results').empty();
            slideError();
        });

    //Toggle search bars under buttons
        $('body').on('click', '.topic', function(event) {
            let slide = $(this).parent().find('.search-line');
            $('.search-line').not(slide).slideUp();
            $('.search-item').val('');
            slide.slideToggle();
            slideError();
        });

    startOp();
    closeBtn();

})();

//Callback functions for SWAPI
function handleFilmsData(data) {
    let word = $('.search-item.films').val(); 
      
    if (data.count === 0 || word === '') {
        $('.error.1').hide().html('No results found').slideDown(500);
    } else {        
        getDataVideo(word, displayVideoResults);
        $('.overlay').addClass('active');
        $('.close-btn').removeClass('hidden');
        $('.swapi-results').html(`
            <h1>Episode ${data.results[0].episode_id}</h1>
            <h1 class="name">${data.results[0].title}</h1>
            Directed by ${data.results[0].director}<br/>
            Release date: ${data.results[0].release_date}<br/>
            "${data.results[0].opening_crawl}"
        `);
    }
}

function handlePeopleData(data) {
    let word = $('.search-item.people').val();
    if (data.count === 0 || word === '') {
        $('.error.2').hide().html('No results found').slideDown(500);
    } else {
        getDataVideo(word, displayVideoResults);
        getSpecies(data.results[0].species);
        getPlanet(data.results[0].homeworld);
        $('.overlay').addClass('active');
        $('.close-btn').removeClass('hidden');
        $('.swapi-results').html(`
            <h1 class="name">${data.results[0].name}</h1>
            Birth year: ${data.results[0].birth_year}<br/>
            Gender: ${data.results[0].gender}<br/>
            Height: ${data.results[0].height}cm<br/>
        `);
    }
}

function handlePlanetsData(data) {
    let word = $('.search-item.planets').val();
    
    if (data.count === 0 || word === '') {
        $('.error.3').hide().html('No results found').slideDown(500);
    } else {
        getDataVideo(word, displayVideoResults);
        $('.overlay').addClass('active');
        $('.close-btn').removeClass('hidden');
        console.log(data);
        $('.swapi-results').html(`
            <h1 class="name">${data.results[0].name}</h1>
            Diameter: ${data.results[0].diameter}km<br/>
            Climate: ${data.results[0].climate}<br/>
            Population: ${data.results[0].population}<br/>
            Terrain: ${data.results[0].terrain}<br/>
        `);
    }
}

function handleSpeciesData(data) {

    let word = $('.search-item.species').val();
    if (data.count === 0 || word === '') {
        $('.error.4').hide().html('No results found').slideDown(500);
    } else {
        getDataVideo(word, displayVideoResults);
        getPlanet(data.results[0].homeworld);
        $('.overlay').addClass('active');
        $('.close-btn').removeClass('hidden');
        console.log(data);
        $('.swapi-results').html(`
            <h1 class="name">${data.results[0].name}</h1>
            Classification: ${data.results[0].classification}<br/>
            Average height: ${data.results[0].average_height}cm<br/>
            Language: ${data.results[0].language}
        `);
    }
}

function handleStarshipsData(data) {
    
    let word = $('.search-item.starships').val();
    if (data.count === 0 || word === '') {
        $('.error.5').hide().html('No results found').slideDown(500);
    } else {
        getDataVideo(word, displayVideoResults);
        $('.overlay').addClass('active');
        $('.close-btn').removeClass('hidden');
        console.log(data);
        $('.swapi-results').html(`
            <h1 class="name">${data.results[0].name}</h1>
            Model: ${data.results[0].model}<br/>
            Class: ${data.results[0].starship_class}<br/>
            Length: ${data.results[0].length}m<br/>
            Hyperdrive rating: ${data.results[0].hyperdrive_rating}
        `);
    }
}

function handleVehiclesData(data) {
    let word = $('.search-item.vehicles').val();

    if (data.count === 0 || word === '') {
        $('.error.6').hide().html('No results found').slideDown(500);
    } else {
        getDataVideo(word, displayVideoResults);
        $('.overlay').addClass('active');
        $('.close-btn').removeClass('hidden');
        console.log(data);
        $('.swapi-results').html(`
            <h1 class="name">${data.results[0].name}</h1>
            Model: ${data.results[0].model}<br/>
            Length: ${data.results[0].length}m<br/>
            Max crew: ${data.results[0].crew}<br/>
            Passengers: ${data.results[0].passengers}
        `);
    }
}

//Chain API call for home planet
function getPlanet(planet) {
    $.ajax({
        method: 'GET',
        url: planet
    }).done((data) => {
        console.log(data);
        $('.planets-results').append(`Home Planet: ${data.name}`);
    })
}

//Chain API call for species
function getSpecies(species) {
    species.forEach((speciesUrl) => {
        $.ajax({
            method: 'GET',
            url: speciesUrl
        }).done((data) => {
            console.log(data);
            $('.species-results').append(`Species: ${data.name}`);
        })
    })
}

//Blank space code for results
function blankVideoResults(result) {
  return `
    <div class="thumbnail-container">
        <img data-videoid="${result.id.videoId}" class="thumbnail" src="${result.snippet.thumbnails.medium.url}"/>
    </div>`;
}

//Insert YT data results into blank space code
function displayVideoResults(data) {
  const videos = data.items.map((item,index) => blankVideoResults(item));
  $('.youtube-results').html(videos);

  $('.thumbnail').on('click', function () {
    showLightbox();
    $('.close-video').removeClass('hidden')
    let videoId = $(this).attr('data-videoid');
    $('.lightbox iframe').attr('src', `https://www.youtube.com/embed/${videoId}?showinfo=0`)
  });
}

function showLightbox() {
    $('.lightbox').addClass('active'); 
}

function closeLightbox() {
    $('.lightbox').removeClass('active');
    $('iframe').attr('src',''); 
}

function closeBtn () {
    $('.close-video').on('click', function () {
        closeLightbox();
    });
}
