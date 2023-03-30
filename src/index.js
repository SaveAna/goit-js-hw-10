// import Handlebars from 'handlebars/runtime';
// import listTpl from './templates/country-list.hbs';
//import { compile } from 'handlebars';
// import cardTpl from './templates/country-card.hbs';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  infoContainer: document.querySelector('.country-info'),
};

// fetch('./templates/country-card.hbs')
//   .then(response => response.text())
//   .then(countryCardTpl => {
//     const cardTpl = Handlebars.compile(countryCardTpl);

//     return fetch(
//       `https://restcountries.com/v3.1/name/deutschland?fields=name,capital,population,flags,languages`
//     )
//       .then(response => response.json())
//       .then(country => {
//         const markup = cardTpl(country);
//         refs.infoContainer.innerHTML = markup;
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   })
//   .catch(error => {
//     console.log(error);
//   });
