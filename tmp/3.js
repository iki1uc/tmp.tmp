class PrefetchPump {
  constructor() {
    this.level = "L1";      // L1, L2, L3, AMP
    this.mode  = "linear";  // linear, page, pointer, adaptive
    this.force = 1.0;       // Pump‑Stärke
  }

  pump(address) {
    _mm_prefetch(address, this._flag());
  }

  _flag() {
    switch(this.mode) {
      case "linear":   return _MM_HINT_T0;   // L1 NLP
      case "page":     return _MM_HINT_T1;   // L1 NPP
      case "pointer":  return _MM_HINT_T2;   // AOPP
      case "adaptive": return _MM_HINT_NTA;  // AMP
    }
  }
}
