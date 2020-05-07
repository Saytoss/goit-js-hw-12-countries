import fetchCountries from './js/fetchCountries';
import templateCountriesList from './templates/countriesList.hbs';
import templateCountryInfo from './templates/countryInfo.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import './styles.css';

const debounce = require('lodash.debounce');
const refs = {
  searchInput: document.querySelector('#input'),
  countryInfoBox: document.querySelector('#country__info'),
  searchList: document.querySelector('#country__list'),
};

refs.searchInput.addEventListener('input', debounce(searchQuery, 500));

function searchQuery(e) {
  const value = e.target.value;
  fetchCountries(value).then(data => {
    if (data.length === 1) {
      removeInfo();
      refs.countryInfoBox.insertAdjacentHTML(
        'afterbegin',
        templateCountryInfo(data[0]),
      );
    } else if (data.length > 1 && data.length < 11) {
      removeInfo();
      refs.searchList.insertAdjacentHTML(
        'afterbegin',
        templateCountriesList(data),
      );
    } else if (data.length > 11) {
      PNotify.error({
        text: 'Too many matches found, enter more specific query',
        delay: 1000,
      });
    }
  });
}
function removeInfo() {
  refs.countryInfoBox.innerHTML = '';
  refs.searchList.innerHTML = '';
}
