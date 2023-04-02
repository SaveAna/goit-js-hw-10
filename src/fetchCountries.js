function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export { fetchCountries };
