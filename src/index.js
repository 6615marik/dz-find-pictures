import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import 'notiflix/dist/notiflix-3.2.5.min.css';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchContry } from './fetchCountries';
const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
input.addEventListener('input', debounce(nameContry, DEBOUNCE_DELAY));
function nameContry() {
  const name = input.value.trim();
  fetchContry(name)
    .then(countyList)
    .catch(error => {
      if (name !== '') {
        input.value = '';
        ul.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
      }
    });
  // .finally(());
}
function CountriInfo(countries) {
  ul.innerHTML = '';
  iteam = countries
    .map(
      country =>
        //   console.log(country);
        ` <div class="country">
        <img class="country_img" src="${country.flags.svg}" />

        <div class="country_body">
          <h2>${country.name.official}</h3>
          <p>
            <b>Region: </b> ${country.region}
          </p>
          <p>
            <b>Capital: </b> ${country.capital}
          </p>
          <p>
            <b>Population: </b> ${country.population}
          </p>
          <p>
            <b>Languages: </b> ${Object.values(country.languages)}
          </p>
        </div>
      </div>`
    )
    .join('');
  div.innerHTML = iteam;
}

function countyList(countries) {
  div.innerHTML = '';
  if (countries.length !== 1) {
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');

      iteam = countries
        .map(country => `<li>${country.name.official}</li>`)
        .join('');
      ul.innerHTML = iteam;
    } else if (countries.length > 2 && countries.length < 10) {
      countryListSmal(countries);
    }
  } else {
    CountriInfo(countries);
  }
}
function countryListSmal(countries) {
  iteam = countries
    .map(
      country => ` <li class = 'country'>
                        <img src = '${country.flags.svg}' />
                        <p>${country.name.official}</p>
                    </li>
                `
    )
    .join('');
  ul.innerHTML = iteam;
}
