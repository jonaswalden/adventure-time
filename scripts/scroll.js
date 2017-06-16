const duration = 300;

export default function scrollTo (element, offset = 0, callback) {
  console.log("scrolling to", element);

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const start = window.pageYOffset;
  const startTime = getNow();

  let destinationOffset;
  const {top: y, height} = element.getBoundingClientRect();
  const offsetTop = y + pageYOffset;

  if ((height - offset) > windowHeight) {
    destinationOffset = offsetTop + offset;
  }
  else {
    destinationOffset = (offsetTop + height / 2) - (windowHeight / 2);
  }

  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  scroll();

  function scroll() {
    const now = getNow();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easingFn(time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) callback();
      return;
    }

    requestAnimationFrame(scroll);
  }
}

function getNow () {
  return 'now' in window.performance ? performance.now() : new Date().getTime();
}

function easingFn(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
