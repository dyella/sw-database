const ytURL = "https://www.googleapis.com/youtube/v3/search";
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
  $.getJSON(ytURL, swURL, callback);
}

function blankResults(result) {
  return `
  <br>
    <div>
      <img `
}

