var movies = movies.map(function (movie) {
  return {
    title: movie.Title,
    year: movie.movie_year,
    genres: movie.Categories.split('|'),
    runtime: movie.runtime,
    summary: movie.summary,
    language: movie.language,
    imdb_rating: movie.imdb_rating,
    youtube_id: movie.ytid
  }
});

var elSearchInput = document.querySelector('.search-input');
var elSearchButton = document.querySelector('.search-button');
var elMoviesResultsHolder = document.querySelector('.movies-box');
var elMovieTemplate = document.querySelector('#movie-template').content;

elSearchButton.addEventListener('click', function(){
  var newRegex = new RegExp(elSearchInput.value, 'gi');

  var results = movies.filter( function(movie){
    return movie.title.toString().match(newRegex);
  });

  if (results.length === 0) {
    elMoviesResultsHolder.innerHTML = 'Not found';
    return;
  }

  elMoviesResultsHolder.innerHTML = '';
  
  results.forEach(function(movie){
    var movieClone = document.importNode(elMovieTemplate, true);
    movieClone.querySelector('.movie__title').textContent = movie.title;
    movieClone.querySelector('.movie__rating').textContent = movie.imdb_rating;
    movieClone.querySelector('.movie__year').textContent = movie.year;
    movieClone.querySelector('.movie__genres').textContent = movie.genres;
    movieClone.querySelector('.movie__trailer-link').href += movie.youtube_id;

    var movieFragment = document.createDocumentFragment();
    movieFragment.appendChild(movieClone);
    elMoviesResultsHolder.appendChild(movieFragment);
    elSearchInput.value = '';
  });

});