import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import pixayCardTp from '../templates/card.hbs';
import apiService from './news-service';
import loadMoreBtn from './load-more-btn';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('[data-action="load-more"]');
const apiServiceTg = new apiService();

searchForm.addEventListener('submit', hendlerInput);
loadMoreBtnRef.addEventListener('click', onLoadMore);

// const loadMoreBtnTg = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
function hendlerInput(e) {
  e.preventDefault();

  clearInput();
  apiServiceTg.query = e.currentTarget.elements.query.value.trim();
  // if (!apiServiceTg) {
  //   return;
  // }

  loadMoreBtn.show();
  // apiServiceTg.resetPage();
  fetchCards();
  if (apiServiceTg.query === '') {
    clearInput();
    return enterLetters();
  }
}

function fetchCards() {
  return apiServiceTg.fetchImage().then(cards => {
    renderPixay(cards);
  });
}
function enterLetters() {
  error({
    text: '← Введіть щось для пошуку',
    delay: 2000,
  });
}
function onLoadMore() {
  fetchCards();
}
function clearInput() {
  gallery.innerHTML = '';
}
function renderPixay(hits) {
  gallery.insertAdjacentHTML('beforeend', pixayCardTp(hits));
}
