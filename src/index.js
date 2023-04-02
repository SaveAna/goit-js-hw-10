import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  infoContainer: document.querySelector('.country-info'),
};

refs.search.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let name = event.target.value.trim();
  cleanSearch();
  if (!name) {
    return;
  }

  fetchCountries(name)
    .then(response => {
      if (response.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length === 1) {
        console.log(response);
        return (refs.infoContainer.innerHTML = renderCountryInfo(response));
      } else if (response.length >= 2 && response.length <= 10) {
        refs.list.innerHTML = renderCountryList(response);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryList(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class="country-list__item">
              <img src="${flags.svg}" alt="Flag of ${name.official}" width = 40px>
              <p class="country-list__name">${name.official}</p>
              </li>`;
    })
    .join('');
}

function renderCountryInfo(country) {
  return country
    .map(({ flags, name, capital, population, languages }) => {
      return `<div class="container"> 
                <img src='${flags.svg}' alt='${flags.alt}' width = 60px>
                <h1 class="country-info__name">${name.common}</h1>
              </div>
              <ul class="country-info__list">
                <li class="country-info__item"><p>Capital:</p> ${capital}</li>
                <li class="country-info__item"><p>Population:</p> ${population}</li>
                <li class="country-info__item"><p>Languages:</p> ${Object.values(
                  languages
                )}</li>
              </ul>`;
    })
    .join('');
}

function cleanSearch() {
  refs.list.innerHTML = '';
  refs.infoContainer.innerHTML = '';
}
