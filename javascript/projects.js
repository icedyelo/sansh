const albums = document.querySelectorAll('.album');
let previousTouch = undefined;

function updateElementPosition(element, event) {
  let movementX, movementY;

  if (event.type === 'touchmove') {
    const touch = event.touches[0];
    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }

  const elementY = parseInt(element.style.top || 0) + movementY;
  const elementX = parseInt(element.style.left || 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

function startDrag(element, event) {
  const updateFunction = (event) => updateElementPosition(element, event);
  const stopFunction = () => stopDrag({ update: updateFunction, stop: stopFunction });
  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction);
  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
}

function stopDrag(functions) {
  previousTouch = undefined;
  document.removeEventListener("mousemove", functions.update);
  document.removeEventListener("touchmove", functions.update);
  document.removeEventListener("mouseup", functions.stop);
  document.removeEventListener("touchend", functions.stop);
}

albums.forEach(album => {
  const range = 100;
  const randomX = Math.random() * (range * 2) - range;
  const randomY = Math.random() * (range * 2) - range;
  const randomRotate = Math.random() * (range / 2) - range / 4;
  
  album.style.top = `${randomY}px`;
  album.style.left = `${randomX}px`;
  album.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;

  const startFunction = (event) => startDrag(album, event);
  album.addEventListener("mousedown", startFunction);
  album.addEventListener("touchstart", startFunction);
});
