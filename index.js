const videoURL = "https://www.googleapis.com/youtube/v3/search";
const swURL = "https://swapi.co/api/";
let word = '';

function getData(searchWord, callback) {
  const settings = {
    part: 'snippet',
    chart: 'mostPopular',
    key: 'AIzaSyBWlaqRf5RJqSa4OqlSqdjdr_GaYUmpcuY',
    q: `${searchWord}`,
    per_page: 1,
  }
  $.getJSON(videoURL, settings, callback);
}

function blankResults(result) {
  return `
  <br>
    <div>
      <img data-videoId="${result.id.videoId}" class="thumbnail" src="${result.snippet.thumbnails.medium.url}"/>
    </div> 
      `;
}

function displayResults(data) {
  const videos = data.items.map((item,index) => blankResults(item));
  $('.search-results').html(videos);

  $('.thumbnail').on('click', function() {
    showLightbox();
    let videoId = $(this).attr('data-videoId');
    $('.lightbox iframe').attr('src', `https://www.youtube.com/embed/${videoId}?showinfo=0`)
  });
}

function showLightbox() {
  $('.lightbox').addClass('active');    
    $('.overlay').addClass('active'); 
}

function closeLightbox() {
  $('.lightbox').removeClass('active');    
  $('.overlay').removeClass('active'); 
}

function closeBtn () {
  $('.close-btn').on('click', function () {
    closeLightbox();
  });
}

function overlay() {
  $('.overlay').on('click', function() {
    closeLightbox();
  })
}

function submitButton() {
  $('.search-bar').submit(event => {
    event.preventDefault();
    const searchItem = $(event.currentTarget).find('.search-item');
    
    word = searchItem.val();
    getData(word, displayResults);
  });
}

function handleFunctions() {
  submitButton();
  overlay();
  closeBtn();
}

$(handleFunctions);