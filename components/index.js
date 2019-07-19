import { createFrame } from './container.js'
import { createPerson } from './person.js'
import { createShuriken } from './shuriken.js'
import { createStopwatch } from './stopwatch.js'

let interval = 5000;

const throwShuriken = () => {
  setTimeout(() => throwShuriken(), interval);
  createShuriken(app)
}

setInterval(() => {
  return interval <= 1000 ? interval = 1000 : interval = interval - 1000
}, 20001)

const app = createFrame();
const s = createShuriken(app)
createPerson(app, s);
createStopwatch();
setTimeout(() => throwShuriken(), 6000)