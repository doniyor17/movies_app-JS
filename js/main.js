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
    movieClone.querySelector('.modal__content-text').textContent = movie.summary;
    movieClone.querySelector('.movie__genres').textContent = movie.genres;
    movieClone.querySelector('.movie__trailer-link').href += movie.youtube_id;

    var movieFragment = document.createDocumentFragment();
    movieFragment.appendChild(movieClone);
    elMoviesResultsHolder.appendChild(movieFragment);
    elSearchInput.value = '';
  });

  var ESC__KEYCODE = 27;
  var elMovieSummaryButton = document.querySelector('.movie__summary-button');
  var elModal = document.querySelector('.modal');
  var elModalContent = document.querySelector('.modal__content');
  var elModalCloseButton = document.querySelector('.close-button');

  var removeEventListeners = function () {
    document.removeEventListener('keyup', onModalKeyupClick);
    elModal.removeEventListener('click', onModalClick);
    elModalCloseButton.removeEventListener('click', onModalCloseButtonClick);
  };

  var addEventListeners = function () {
    document.addEventListener('keyup', onModalKeyupClick);
    elModal.addEventListener('click', onModalClick);
    elModalCloseButton.addEventListener('click', onModalCloseButtonClick);
  };

  var closeModal = function () {
    elModal.classList.remove('modal--shown');
    removeEventListeners();
  };

  var onModalClick = function (evt) {
    if (evt.target.matches('.modal')) {
      closeModal();
    }
  };

  var onModalKeyupClick = function (evt) {
    if (evt.keyCode === ESC__KEYCODE) {
      closeModal();
    }
  };

  var onModalCloseButtonClick = function () {
    closeModal();
  };

  var showModal = function () {
    elModal.classList.add('modal--shown');
    addEventListeners();
  };

  var onModalOpenButtonClick = function () {
    showModal();

  };
  elMovieSummaryButton.addEventListener('click', onModalOpenButtonClick);

});