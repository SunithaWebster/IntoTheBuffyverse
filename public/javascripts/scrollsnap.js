import createScrollSnap from 'scroll-snap';

const body = document.body;

createScrollSnap(body, {
snapDestinationX: '0%',
snapDestinationY: '90%',
timeout: 100,
duration: 300,
threshold: 0.2,
snapStop: false,
easing: easeInOutQuad,
}, () => console.log('snapped'))