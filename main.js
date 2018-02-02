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
        keywords: ['luke', 'skywalker'],
        alt: 'luke skywalker'
    },

    {
        imgPath: 'images/leia_2.jpg',
        keywords: ['leia', 'princess', 'organa'],
        alt: 'princess leia'
    },

    {
        imgPath: 'images/han_solo_1.jpg',
        keywords: ['han', 'solo'],
        alt: 'han solo'
    },

    {
        imgPath: 'images/new_hope.jpg',
        keywords: ['new', 'hope', '4'],
        alt: 'star wars episode 4: a new hope'
    },

    {
        imgPath: 'images/revenge_of_the_sith.jpg',
        keywords: ['revenge', 'sith', '5'],
        alt: 'star wars episode 5: revenge of the sith'
    },

    {
        imgPath: 'images/return_of_the_jedi.jpg',
        keywords: ['return', 'jedi', '6'],
        alt: 'star wars episode 6: return of the jedi'
    },

    {
        imgPath: 'images/tatooine.jpg',
        keywords: 'tatooine',
        alt: 'tatooine'
    },

    {
        imgPath: 'images/hoth.jpg',
        keywords: 'hoth',
        alt: 'hoth'
    },

    {
        imgPath: 'images/naboo.jpg',
        keywords: 'naboo',
        alt: 'naboo'
    },

    {
        imgPath: 'images/hutt.pg',
        keywords: 'hutt',
        alt: 'jabba the hutt'
    },

    {
        imgPath: 'images/rodian.jpg',
        keywords: 'rodian',
        alt: 'greedo'
    },

    {
        imgPath: 'images/wookie.jpg',
        keywords: 'wookie',
        alt: 'chewbacca'
    },

    {
        imgPath: 'images/death_star.png',
        keywords: ['death', 'death star'],
        alt: 'the death star'
    },

    {
        imgPath: 'images/m_falcon.jpg',
        keywords: ['millennium', 'falcon'],
        alt: 'the millennium falcon'
    },

    {
        imgPath: 'images/at-at.jpg',
        keywords: 'at',
        alt: 'at-at'
    },

    {
        imgPath: 'images/x-wing.jpg',
        keywords: ['x', 'wing'],
        alt: 'x-wing'
    }
];

let searchTerm = $('.search-item').val();
let imgResults = [];

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
        getSWData(filmsURL, word, handleFilmsData);
    });
    
    $('.submit-input.people').on('click', function() {
        let word = $('.search-item.people').val();
        getSWData(peopleURL, word, handlePeopleData);
    });

    $('.submit-input.planets').on('click', function() {
        let word = $('.search-item.planets').val();
        getSWData(planetsURL, word, handlePlanetsData);
    });

    $('.submit-input.species').on('click', function() {
        let word = $('.search-item.species').val();
        getSWData(speciesURL, word, handleSpeciesData);
    });

    $('.submit-input.starships').on('click', function() {
        let word = $('.search-item.starships').val();
        getSWData(starshipsURL, word, handleStarshipsData);
    });
    
    $('.submit-input.vehicles').on('click', function() {
        let word = $('.search-item.vehicles').val();
        getSWData(vehiclesURL, word, handleVehiclesData);
    });

    //Close overlay and empty html results
        $('.close-btn').on('click', function() {
            $(this).addClass('hidden');
            $('.overlay').removeClass('active');
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
    //closeVid();

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
            <img>
            <h1 class="name">${data.results[0].title}</h1>
            <span class="director">Directed by ${data.results[0].director}</span><br/>
            <span class="crawl">"${data.results[0].opening_crawl}"</span>
        `);
    }
}

function handlePeopleData(data) {
    let word = $('.search-item.people').val();

    if (data.count === 0 || word === '') {
        $('.error.2').hide().html('No results found').slideDown(500);
    } else {
        getDataVideo(word, displayVideoResults);
        $('.overlay').addClass('active');
        $('.close-btn').removeClass('hidden');
        $('.swapi-results').html(`
            <h1 class="name">${data.results[0].name}</h1>
            birth year: ${data.results[0].birth_year}<br/>
            height: ${data.results[0].height}cm<br/>
            eye color: ${data.results[0].eye_color}<br/>
            home planet: ${data.results[0].homeworld}<br/>
            species: ${data.results[0].species}
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
            climate: ${data.results[0].climate}<br/>
            population: ${data.results[0].population}<br/>
            terrain: ${data.results[0].terrain}<br/>
        `);
    }
}

function handleSpeciesData(data) {

    let word = $('.search-item.species').val();
    if (data.count === 0 || word === '') {
        $('.error.4').hide().html('No results found').slideDown(500);
    } else {
        getDataVideo(word, displayVideoResults);
        $('.overlay').addClass('active');
        $('.close-btn').removeClass('hidden');
        console.log(data);
        $('.swapi-results').html(`
            <h1 class="name">${data.results[0].name}</h1>
            classification: ${data.results[0].classification}<br/>
            language: ${data.results[0].language}<br/>
            homeworld: ${data.results[0].homeworld}
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
            model: ${data.results[0].model}<br/>
            class: ${data.results[0].starship_class}<br/>
            length: ${data.results[0].length}m<br/>
            hyperdrive rating: ${data.results[0].hyperdrive_rating}
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
            model: ${data.results[0].model}<br/>
            length: ${data.results[0].length}m<br/>
            passengers: ${data.results[0].passengers}
        `);
    }
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
  //$('.overlay-video').addClass('active');
}

function closeLightbox() {
    $('.lightbox').removeClass('active'); 
  //$('.overlay-video').removeClass('active');
}

function closeBtn () {
    $('.close-video').on('click', function () {
        closeLightbox();
    });
}
/*
function closeVid() {
    $('.overlay-video').on('click', function() {
      closeLightbox();
    })
  }*/

/*
const imagesArray = [
  {
    imagePath: 'path/to/the/image.jpg',
    keywords: ['luke', 'skywalker', 'jedi']
  },

  {
    imagePath: 'path/to/the/image555.jpg',
    keywords: ['luke', 'skywalker', 'jedi']
  },

  {
    imagePath: 'path/to/the/image2.jpg',
    keywords: ['rey', 'lastname', 'jedi']
  }
];

let searchTerm = 'Luke';

let imageResultsArray = [];

imagesArray.forEach((image) => {
    if (image.keywords.indexOf(searchTerm)) {
      imageResultsArray.push(image.imagePath);
    }
});

imageResultsArray = ['path/to/the/image.jpg', 'path/to/the/image555.jpg'];*/