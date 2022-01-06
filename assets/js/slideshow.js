const IMG_COUNT = 46;
const audio = document.getElementById("audio");
const headline = document.getElementById('headline');
const initialHeadlineText = headline.innerText;
const finalHeadlineText = "Home at last with Stan..."
const sliderOptions = {
  container: "#slider",
  items: 1,
  speed: 300,
  autoplay: true,
  loop: false,
  autoplayTimeout: (audio.duration / IMG_COUNT) * 1000,
  swipeAngle: false,
  controlsPosition: 'bottom',
  nav: false,
  arrowKeys: true,
  lazyload: true,
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
    img.classList.add('slide');
    img.classList.add('tns-lazy-img');
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    img.dataset.src = 'assets/img/slides/' + count + '.jpg';
    slideItem.appendChild(img);

    slider.appendChild(slideItem);
  }

  document.getElementById('slider-wrapper').appendChild(slider);
}

function startWithMusic(slider) {
  slider.goTo('first');
  slider.play();
  audio.play();
}

function startWithoutMusic(slider) {
  slider.goTo('first');
  slider.play();
  audio.pause();
  audio.currentTime = 0
}

function pause(slider) {
  audio.pause();
  slider.pause();
}

function restart(slider) {
  slider.pause();
  slider.goTo('first');
  slider.play();
  audio.currentTime = 0
}

function onSlideTransition(slider, info, eventName) {
  if (info.index === info.slideCount) {
    headline.innerText = finalHeadlineText;
    audio.pause();
    slider.pause();
    setTimeout(() => {
      slider.goTo('first')
      headline.innerText = initialHeadlineText;
    }, 10 * 1000);
  }
}

function init(){
  appendImages();
  const slider = tns(sliderOptions);

  // pause slideshow at first to let user decide which action to take
  slider.pause();

  document.getElementById('music').addEventListener('click', () => startWithMusic(slider));
  document.getElementById('pause').addEventListener('click', () => pause(slider));
  document.getElementById('restart').addEventListener('click', () => restart(slider));
  document.getElementById('start').addEventListener('click', () => startWithoutMusic(slider));
  slider.events.on('transitionEnd', onSlideTransition.bind(null, slider))
}

document.addEventListener('DOMContentLoaded', init);