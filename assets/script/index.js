'use strict';
import { select, print } from './utils.js';

const movieInput = select('#movieInput');
const cityInput = select('#cityInput');
const movieList = select('.movieMatched');
const cityList = select('.cityMatched');

const url = './assets/script/cities.json';
const movieurl = './assets/script/movies.json';
const list = select('section');
let movieTitles = [];
let cityName = [];

function listMovies(array) {
    list.innerHTML = '';
    let movies = '';

    if (array.length > 0) {
        array.forEach(movie => {
            movies += ` <div class="movie">
            <img src="${movie.img}" class="template">
            <p class="title"> ${movie.title}</p>
          </div>`
        })
    } else {
        movies += `<li>Movies Not Found</li>`;
    }

    list.innerHTML = `${movies}`;
}
const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    mode: 'cors'
};

async function getMovies() {
    try {
        const response = await fetch(movieurl);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        movieTitles = data.results.map((movie) => movie.title);
        listMovies(data.results);
    } catch (error) {
        print(error.message);
    }
}

getMovies();

movieInput.addEventListener('keyup', (event) => {
    const input = event.target.value.toLowerCase();
    if (input.length === 0) {
        movieList.style.visibility = 'hidden';
    } else {
        const matchedMovies = movieTitles.filter((title) =>
            title.toLowerCase().startsWith(input)
        );
        movieList.innerHTML = '';
        if (matchedMovies.length === 0) {
            const notFoundDiv = document.createElement('h3');
            notFoundDiv.textContent = 'Movie Not Found';
            movieList.appendChild(notFoundDiv);
        } else {
            matchedMovies.forEach((title) => {
                const movieDiv = document.createElement('h4');
                movieDiv.textContent = title;
                movieDiv.addEventListener('click', () => {
                    movieInput.value = title;
                    movieList.style.visibility = 'hidden';
                });
                movieList.appendChild(movieDiv);
            });
        }
        movieList.style.visibility = 'visible';
    }
});

async function getCities() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`);
        }
        const data2 = await response.json();
        cityName = data2.cities.map((city) => city.name);
    } catch (error) {
        console.error(error.message);
    }
}

getCities();

cityInput.addEventListener('keyup', (event) => {
    const input = event.target.value.toLowerCase();
    if (input.length === 0) {
        cityList.style.visibility = 'hidden';
    } else {
        const matchedCities = cityName.filter((name) =>
            name.toLowerCase().startsWith(input)
        );

        cityList.innerHTML = '';
        if (matchedCities.length === 0) {
            const notFoundDiv = document.createElement('h3');
            notFoundDiv.textContent = 'Movie Not Found';
            cityList.appendChild(notFoundDiv);
        } else {
            matchedCities.forEach((name) => {
                const cityDiv = document.createElement('h4');
                cityDiv.textContent = name;
                cityDiv.addEventListener('click', () => {
                    cityInput.value = name;
                    cityList.innerHTML = '';
                });
                cityList.appendChild(cityDiv);
            });
        }
        cityList.style.visibility = 'visible';

    }
});

