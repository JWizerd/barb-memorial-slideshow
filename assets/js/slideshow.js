const IMG_COUNT = 31;
const audio = document.getElementById("audio");
const headline = document.getElementById('headline');
const initialHeadlineText = headline.innerText;
const finalHeadlineText = "Home at last with Stan..."
const SLIDE_DURATION = (audio.duration / IMG_COUNT) * 1000;
let isAutoPlaying = false;
const sliderOptions = {
  container: "#slider",
  items: 1,
  speed: 300,
  autoplay: true,
  loop: true,
  autoplayTimeout: SLIDE_DURATION,
  swipeAngle: false,
  controlsPosition: 'bottom',
  nav: false,
  arrowKeys: true,
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

function handleFinalSlideTransition(slider, info, eventName) {
  if (info.index === info.slideCount && isAutoPlaying) {
    headline.innerText = finalHeadlineText;
    audio.pause();
    slider.pause();

    setTimeout(() => {
      restart(slider);
    }, 10 * 1000);
  }
}

function showArrowBtns() {
  const arrowBtns = document.querySelectorAll('.tns-controls button');
  arrowBtns.forEach(btn => btn.classList.remove('hide'));
}

function hideArrowBtns() {
  const arrowBtns = document.querySelectorAll('.tns-controls button');
  arrowBtns.forEach(btn => btn.classList.add('hide'));
}

function playSlideshow(slider) {
  isAutoPlaying = true;
  slider.goTo(0);
  slider.play();
  audio.play();
  document.getElementById('slideshow').classList.add('hide');
  hideArrowBtns();
  slider.events.on('transitionEnd', handleFinalSlideTransition.bind(null, slider))
}

function pause(slider) {
  audio.pause();
  slider.pause();
}

function restart(slider) {
  isAutoPlaying = false;
  slider.pause();
  slider.goTo(0);
  showArrowBtns();
  audio.pause();
  headline.innerText = initialHeadlineText;
  audio.currentTime = 0;
  slider.events.off('transitionEnd');
  document.getElementById('slideshow').classList.remove('hide');
}

function init(){
  appendImages();
  const slider = tns(sliderOptions);

  // pause slideshow at first to let user decide which action to take
  slider.pause();

  document.getElementById('slideshow').addEventListener('click', () => playSlideshow(slider));
  document.getElementById('pause').addEventListener('click', () => pause(slider));
  document.getElementById('restart').addEventListener('click', () => restart(slider));
}

document.addEventListener('DOMContentLoaded', init);