import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  infoContainer: document.querySelector('.country-info'),
};

refs.search.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function renderCountryList(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class="country-list__item">
              <img src="${flags.svg}" alt="Flag of ${name.official}" width = 40px height = 30px>
              <p class="country-list__name">${name.official}</p>
              </li>`;
    })
    .join('');
}

function renderCountryInfo(countries) {
  return countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<img src='${flags.svg}' alt='${flags.alt}'/>
              <h1>${name.common}</h1>
              <ul class="country-info__list">
                <li class="country-info__item"><p>Capital:</p> ${capital}</li>
                <li class="country-info__item"><p>Population:</p> ${population}</li>
                <li class="country-info__item"><p>Languages:</p> ${Object.values(
                  languages
                )}</li>
              </ul>`;
    })
    .join();
}
