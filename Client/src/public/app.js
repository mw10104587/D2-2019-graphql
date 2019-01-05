"use strict";

const e = React.createElement;

function Actor(props) {
  return React.createElement(
    "div",
    { className: "actor", id: "actor-" + props.name.split(" ") },
    React.createElement("img", { src: props.image }),
    React.createElement("div", null, props.name)
  );
}

function Movie(props) {
  return React.createElement(
    "div",
    { className: "movie", id: "movie-" + props.title },
    React.createElement("img", { src: props.image }),
    React.createElement(
      "div",
      null,
      React.createElement("h2", null, props.title)
    ),
    React.createElement(
      "div",
      { className: "actors" },
      props.actors && props.actors.map(function(actor) {
        return React.createElement(Actor, {
          name: actor.name,
          id: actor.name,
          image: actor.image
        });
      })
    )
  );
}


const API_URL = 'http://localhost:3000/movies';
const MOVIES_AND_ACTORS_URL = 'http://localhost:3000/moviesAndActors';

$(document).ready( _ => {
  fetchDataREST(); // Fetch with RESTful API with different endpoints
  // fetchDataRESTCustomize(); // Customize endpoints for this application
  // fetchDataGraphQL(); // Fetch with GraphQL
});


function renderRoot(moviesData) {
  const movies = moviesData.map(
    movieData =>
    e(Movie,
      { actors: movieData.actors,
        id: movieData.title,
        image: movieData.image,
        title: movieData.title
      }));

  const domContainer = document.querySelector('#movies');
  ReactDOM.render(movies, domContainer);
}

async function fetchDataREST() {
  const response = await fetch(API_URL);
  const movieLinks = await response.json();

  const moviesData = movieLinks.map(async function(movieLink){
    // Get data of one movie
    const res = await fetch(movieLink.href);
    const movieData = await res.json();
    // Get Actors Resource href of the movie
    const actorLinksRes = await fetch(movieData.actors);
    const actorLinks = await actorLinksRes.json();

    // Get Actors for each given resource address
    const actors = actorLinks.map(async function(actorLink) {
      const res = await fetch(actorLink.href);
      return await res.json();
    });

    // Wait till data of all actors of this movie is loaded
    await Promise.all(actors).then((completed)=>{
      movieData.actors = completed;
    });

    // return one complete movie data
    return movieData;
  });

  // Wait till all movie data loaded
  await Promise.all(moviesData).then((completed)=>{
    renderRoot(completed);
  });
}

function fetchDataRESTCustomize() {
  fetch(MOVIES_AND_ACTORS_URL).then(response => {
    return response.json()
  })
  .then(data => {
    renderRoot(data);
  });
}

const query = `
{
  movies {
    title
    image
    actors {
      image
      name
    }
  }
}
`;

function fetchDataGraphQL() {
  const url = `http://localhost:5000?query=${query}`;
  fetch(url).then((response)=>{
    return response.json();
  }).then(res => {
    renderRoot(res.data.movies);
  });
}
