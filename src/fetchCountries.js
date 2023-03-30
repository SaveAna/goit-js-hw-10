function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,flags.svg,capital,population,languages`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error fetching data');
  });
}

export { fetchCountries };
