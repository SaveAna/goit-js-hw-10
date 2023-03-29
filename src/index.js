import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  infoContainer: document.querySelector('.country-info'),
};

// search.addEventListener('input', fetchCountries);

// function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v3.1/name/${name}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(country => {
//       console.log(country);
//     });
// }

// function renderCountryCard(country) {
// const markup
// }
// ===============================
return fetch(
  `https://restcountries.com/v3.1/name/deutschland?fields=name,capital,population,flags,languages`
)
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
    const markup = countryCard(country);
    refs.infoContainer.innerHTML = markup;
  })
  .catch(error => {
    console.log(error);
  });
