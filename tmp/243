import { PrefetchPump9 } from "./9.js";
import { PrefetchContinuum81 } from "./81.js";

export class PrefetchDepth243 {

  constructor() {
    this.dispatcher = new PrefetchPump9();
    this.continuum  = new PrefetchContinuum81();
  }

  run(respo, zone, addr) {

    // 1) Norm 8→9 prüfen
    const normValid = this._normCheck(respo);

    // 2) Continuum‑Pipeline aktivieren
    const cont = this.continuum.run(zone, respo, addr);

    // 3) Tiefe‑Pump (243‑Stufe)
    const deep = this.dispatcher.dispatch(zone, respo, addr);

    return {
      depth243: true,
      norm: normValid,
      continuum: cont,
      pump: deep
    };
  }

  _normCheck(respo) {
    // 8→9 Norm
    return respo >= 8 && respo <= 9;
  }
}
