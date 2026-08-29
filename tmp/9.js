export class PrefetchPump {
  constructor() {
    this.level = "L1";      // L1, L2, L3, AMP
    this.mode  = "linear";  // linear, page, pointer, adaptive
    this.force = 1.0;       // Pump‑Stärke
  }

  pump(addr) {
    return {
      addr,
      flag: this._flag(),
      level: this.level,
      force: this.force
    };
  }

  _flag() {
    switch(this.mode) {
      case "linear":   return "L1_NLP";
      case "page":     return "L1_NPP";
      case "pointer":  return "L1_AOPP";
      case "adaptive": return "AMP";
      default:         return "L1_IPP";
    }
  }
}
