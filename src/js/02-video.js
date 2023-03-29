import Vimeo from '@vimeo/player';

const LOCALSTORAGE_PLAYER_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('[id="vimeo-player"]');
const videoPlayer = new Vimeo(iframe);
const savedPlayerTime = JSON.parse(
  localStorage.getItem(LOCALSTORAGE_PLAYER_KEY)
);

videoPlayer.setCurrentTime(savedPlayerTime || 0);

videoPlayer.on('timeupdate', onPlay);

function onPlay(currentTime) {
  localStorage.setItem(
    LOCALSTORAGE_PLAYER_KEY,
    JSON.stringify(currentTime.seconds)
  );
}
