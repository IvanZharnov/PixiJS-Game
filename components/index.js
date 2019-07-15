import { createFrame } from './container.js'
import { createPerson } from './person.js'
import { createShuriken } from './shuriken.js'
import { createStopwatch } from './stopwatch.js'

const app = createFrame();
createPerson(app);
setInterval(() => createShuriken(app), 3000);
createStopwatch()
