import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_PLAYER_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('[id="vimeo-player"]');
const videoPlayer = new Vimeo(iframe);
const savedPlayerTime = JSON.parse(
  localStorage.getItem(LOCALSTORAGE_PLAYER_KEY)
);

videoPlayer.setCurrentTime(savedPlayerTime || 0);

videoPlayer.on('timeupdate', throttle(onPlay, 1000));

function onPlay(currentTime) {
  localStorage.setItem(
    LOCALSTORAGE_PLAYER_KEY,
    JSON.stringify(currentTime.seconds)
  );
}
