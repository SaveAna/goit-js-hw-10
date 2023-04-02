import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(name) {
  return fetch(
    //`https://restcountries.com/v2/name/${name}?fields=name,flags.svg,capital,population,languages`
    `https://restcountries.com/v2/name/${name}`
  )
    .then(response => {
      if (!response.ok) {
        throw Error(response.status);
        return Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
      Notify.failure(`${error} Oops, there is no country with that name`);
    });
}

export { fetchCountries };
