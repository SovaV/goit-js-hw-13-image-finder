import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');

import cardImgTMPL from '../templates/card.hbs';
import apiService from './new-service';
import loadMoreBtn from './load-more-btn';

const imgCardRef = document.querySelector('.gallery');
const searchFormRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('[data-action="load-more"]');

searchFormRef.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  apiService.resetPage();
  apiService.query = e.currentTarget.query.value.trim();
  apiService.selectValueData = e.currentTarget.select.value;
  clearInput();
  if (apiService.inputValueData) {
    onLoadMore();
  } else {
    enterLetters();
  }
}

function onLoadMore() {
  loadMoreBtn.disable();
  apiService
    .fetchContent()
    .then(img => {
      renderingImgCard(img);
    })
    .catch(enterLetters);
}

function renderingImgCard(hits) {
  if (hits.length !== 0) {
    imgCardRef.insertAdjacentHTML('beforeend', cardImgTMPL(hits));
    loadMoreBtn.show();
    loadMoreBtn.enable();

    if (hits.length < 12) {
      loadMoreBtn.hide();
    }

    if (apiService.page) {
      scroll();
    }
  } else {
    enterLetters();
  }
}

function enterLetters() {
  clearInput();
  loadMoreBtn.hide();
  error({
    text: '← Введіть правильну назву',
    delay: 2000,
  });
}

function clearInput() {
  searchFormRef.query.value = '';
  imgCardRef.innerHTML = '';
}
function scroll() {
  loadMoreBtnRef.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
