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
  console.log(name);
  if (!name) {
    return;
  }

  fetchCountries(name)
    .then(response => {
      if (response.length > 10) {
        // cleanSearch();
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length === 1) {
        // refs.list.innerHTML = '';
        return (refs.infoContainer.innerHTML = renderCountryInfo(response));
      } else if (response.length >= 2 && response.length <= 10) {
        refs.list.innerHTML = renderCountryList(response);
      }
      // refs.infoContainer.innerHTML = '';
    })

    .catch(error => {
      cleanSearch();
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

function renderCountryInfo(countries) {
  return countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<img src='${flags.svg}' alt='${flags.alt}'/>
              <h1>${name.common}</h1>
              <ul class="country-info__list">
                <li class="country-info__item"><b>Capital:</b> ${capital}</li>
                <li class="country-info__item"><b>Population:</b> ${population}</li>
                <li class="country-info__item"><b>Languages:</b> ${Object.values(
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
