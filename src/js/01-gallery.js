import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'lazysizes';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryListEl = document.querySelector('ul.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems).join('');

galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);

lazyImagesBrowserDetection();

const lightBoxGallery = new SimpleLightbox('ul.gallery li a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryMarkup(photos) {
  return photos.map(({ preview, original, description }) => {
    return `
		<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
		loading="lazy"
      class="gallery__image"
      data-src="${preview}"
      alt="${description}"
    />
  </a>
</li>
		`;
  });
}

function lazyImagesBrowserDetection() {
  const lazyImages = document.querySelectorAll('[loading="lazy"]');

  lazyImages.forEach(image => {
    if ('loading' in HTMLImageElement.prototype) {
      image.src = image.dataset.src;
    } else {
      image.classList.add('lazyload');
    }
  });
}
