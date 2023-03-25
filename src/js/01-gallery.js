// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryListEl = document.querySelector('ul.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems).join('');

galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);

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
      class="gallery__image lazyload"
      data-src="${preview}"
      alt="${description}"
    />
  </a>
</li>
		`;
  });
}

if ('loading' in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll('[loading="lazy"]');

  lazyImages.forEach(image => {
    image.src = image.dataset.src;
  });
} else {
  const lazySizesScript = document.createElement('script');
  lazySizesScript.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  lazySizesScript.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  lazySizesScript.crossOrigin = 'anonymous';
  lazySizesScript.referrerPolicy = 'no-referrer';
  document.body.appendChild(lazySizesScript);
}
