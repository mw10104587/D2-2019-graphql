'use strict';

function getActorId(actor) {
  return 'actor' + actor.name.split(' ').pop();
}

function buildActorElement(actor) {
  return '\n<div class=\'actor\' id=\'' + getActorId(actor) + '\'>\n  <img src=\'' + actor.image + '\'/>\n  <div>\n    ' + actor.name + '\n  </div>\n</div>';
}

function getMovieId(movie) {
  return 'movie' + movie.title.split(' ').pop();
}

function buildMovieElement(movie) {
  return '\n<div class=\'movie\' id=\'' + getMovieId(movie) + '\'>\n  <img src=\'' + movie.image + '\'/>\n  <div>\n    <h2>' + movie.title + '</h2>\n  </div>\n  <div class=\'actors\'>\n  </div>\n</div>\n';
  return movie.title;
}

var API_URL = 'http://localhost:3000/movies';
var MOVIES_AND_ACTORS_URL = 'http://localhost:3000/moviesAndActors';

$(document).ready(function (_) {
  console.log('document ready');
  debugger;
  fetchDataV1(); //
  // fetchDataV2();
  // fetchDataV3();
});

function fetchDataV1() {
  $.get(API_URL, function (movieLinks) {
    movieLinks.forEach(function (movieLink) {
      $.get(movieLink.href, function (movie) {
        $('#movies').append(buildMovieElement(movie));
        $.get(movie.actors, function (actorLinks) {
          actorLinks.forEach(function (actorLink) {
            $.get(actorLink.href, function (actor) {
              var selector = '#' + getMovieId(movie) + ' .actors';
              var actorElement = buildActorElement(actor);
              $(selector).append(actorElement);
            });
          });
        });
      });
    });
  });
}

function fetchDataV2() {
  $.get(MOVIES_AND_ACTORS_URL, function (movies) {
    return renderRoot(movies);
  });
}

function renderRoot(movies) {
  movies.forEach(function (movie) {
    $('#movies').append(buildMovieElement(movie));
    movie.actors && movie.actors.forEach(function (actor) {
      var selector = '#' + getMovieId(movie) + ' .actors';
      var actorElement = buildActorElement(actor);
      $(selector).append(actorElement);
    });
  });
}

var query = '\n{\n  movies {\n    title\n    image\n    actors {\n      image\n      name\n    }\n  }\n}\n';

function fetchDataV3() {
  var url = 'http://localhost:5000?query=' + query;
  console.log(url);
  $.get(url, function (res) {
    console.log(res.data);
    renderRoot(res.data.movies);
  });
}