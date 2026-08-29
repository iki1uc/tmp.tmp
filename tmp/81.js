import { PrefetchPump9 } from "./9.js";

export class PrefetchContinuum81 {

  constructor() {
    this.dispatcher = new PrefetchPump9();
  }

  run(zone, respo, addr) {
    const result = this.dispatcher.dispatch(zone, respo, addr);

    return {
      continuum: true,
      zone,
      respo,
      addr,
      result
    };
  }
}
