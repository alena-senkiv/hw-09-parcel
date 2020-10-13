import images from '../gallery-items.js';

const imageList = document.querySelector('.js-gallery'),
  lightboxRef = document.querySelector('.js-lightbox'),
  closeModalBtn = document.querySelector("button[data-action='close-lightbox']"),
  lightboxContentImgRef = document.querySelector('.lightbox__image'),
  overlay = document.querySelector('.lightbox__overlay'),
  listItemsMarkup = createGalleryItemsMarkup(images);

let currentImg;
imageList.innerHTML = listItemsMarkup;

imageList.addEventListener('click', onImgClick);
closeModalBtn.addEventListener('click', onCloseModal);
overlay.addEventListener('click', () => onCloseModal());

// функция создания разметки
function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
  >
    <img
    class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      />
      </a>
      </li>
      `;
    })
    .join('');
}

// функция фильтра кликов делегирования
function onImgClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  currentImg = e.target;

  e.preventDefault();
  addLightboxContent(currentImg);
  onOpenModal();
}

// функиция открытия модалки
function onOpenModal() {
  lightboxRef.classList.add('is-open');
  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('keyup', imageArrowsFlipping);
}

// функция закрытия модалки
function onCloseModal() {
  lightboxRef.classList.remove('is-open');
  document.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('keyup', imageArrowsFlipping);
}

// функция добавления url изображения в модалку
function addLightboxContent(url) {
  if (lightboxContentImgRef.src !== '') {
    lightboxContentImgRef.src = '';
  }
  lightboxContentImgRef.src = url.dataset.source;
  lightboxContentImgRef.alt = url.alt;
}

// функция закрытия по ESC
function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

// функция перелистывания стрелками
function imageArrowsFlipping(e) {
  const parrent = currentImg.closest('li');

  if (e.code === 'ArrowRight') {
    onNextKeyPress(parrent);
  } else if (e.code === 'ArrowLeft') {
    onPrevKeyPress(parrent);
  }
}

function onNextKeyPress(parrent) {
  currentImg = parrent.nextElementSibling.querySelector('img');
  addLightboxContent(currentImg);
}

function onPrevKeyPress(parrent) {
  currentImg = parrent.previousElementSibling.querySelector('img');
  addLightboxContent(currentImg);
}
