const IMG_COUNT = 51;
const audio = document.getElementById("audio");
const headline = document.getElementById('headline');
const initialHeadlineText = headline.innerText;
const SLIDE_DURATION = Math.floor(((audio.duration / IMG_COUNT) * 1000));
const finalHeadlineText = "Home at last with Stan..."
const sliderOptions = {
  container: "#slider",
  items: 1,
  slideBy: 1,
  speed: 300,
  loop: false,
  nav: false,
  swipeAngle: false,
  controlsPosition: 'bottom',
  controlsText: [
    '<i class="fa fa-chevron-left"></i>',
    '<i class="fa fa-chevron-right"></i>'
  ]
}

function appendImages(imgCount = IMG_COUNT) {
  const slider = document.createElement('div');
  slider.id = 'slider';

  for (let count = 1; count <= imgCount; count++) {
    const slideItem = document.createElement('div');
    slideItem.className = 'item';

    const img = document.createElement('img');
    img.className = 'slide';
    img.src = 'assets/img/slides/' + count + '.jpg';
    slideItem.appendChild(img);

    slider.appendChild(slideItem);
  }

  document.getElementById('slider-wrapper').appendChild(slider);
}

function showArrowBtns() {
  const arrowBtns = document.querySelectorAll('.tns-controls button');
  arrowBtns.forEach(btn => btn.classList.remove('hidden'));
}

function hideArrowBtns() {
  const arrowBtns = document.querySelectorAll('.tns-controls button');
  arrowBtns.forEach(btn => btn.classList.add('hidden'));
}

function playSlideshow(slider) {
  const audio = document.getElementById("audio");
  const DURATION = Math.floor(((audio.duration / IMG_COUNT) * 1000));
  audio.play();

  let idx = 1;
  const autoplay = setInterval(() => {
    slider.goTo(idx);
    idx++;

    // this check allows the last image to run for 2x DURATION
    // which allows for the final text to display longer
    if (idx === IMG_COUNT) clearInterval(autoplay)
  }, DURATION);

  hidePlayButton();
  hideArrowBtns();
}

function restart() {
  location.reload();
}

function hidePlayButton() {
  document.getElementById('slideshow').classList.add('hide');
}

function init(){
  appendImages();
  const slider = tns(sliderOptions);
  document.getElementById('slideshow').addEventListener('click', () => playSlideshow(slider));
  document.getElementById('restart').addEventListener('click', restart);
  document.querySelectorAll('.tns-controls button').forEach(btn => btn.addEventListener('click', hidePlayButton));

  audio.onended = function() {
    headline.innerText = finalHeadlineText;

    setTimeout(() => {
      restart();
    }, 10 * 1000);
  }
}

document.addEventListener('DOMContentLoaded', init);