import {animate, spin, slide,debounce, gravity} from './utilite-dom.js'

animate('p', {
  from: { transform: 'translateX(0)', color: 'red' },
  to: { transform: 'translateX(100px)', color: 'pink' }
}, {
  duration: 5000,
  easing: 'ease-in-out',
  repeat: Infinity,
  yoyo: true // Alternate direction
});

spin('h2')