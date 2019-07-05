import { createFrame } from './container.js'
import { createPerson } from './person.js'
import { createShuriken } from './shuriken.js'

const app = createFrame();

createPerson(app);
createShuriken(app);
