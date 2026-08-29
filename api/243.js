import { baseDQF } from "./3.js";
import { extendedDQF } from "./81.js";
import { XyX } from "./XyX.js";

function generateState(x, y, z) {

  if (x === 9 || y === 9 || z === 9) {
    return XyX(x, y, z);
  }

  const dqf = (x + y + z) > 20
    ? extendedDQF(x, y, z)
    : baseDQF(x, y, z);

  return {
    x: x * x,
    y: y * 2,
    z: z + 7,
    meta: `Zustand (${x},${y},${z})`,
    dqf
  };
}

function getState(id) {
  const [x, y, z] = id.split(',').map(Number);
  return generateState(x, y, z);
}

export const stateProxy = new Proxy({}, {
  get(_, prop) {
    return getState(prop);
  }
});
