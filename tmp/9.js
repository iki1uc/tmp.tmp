import { PrefetchPump } from "./3.js";

export class PrefetchPump9 {

  constructor() {
    this.pump = new PrefetchPump();
  }

  dispatch(zone, respo, addr) {
    // Zone → Pipeline
    this.pump.mode = this._modeForZone(zone);

    // Respo → SIMD
    this.pump.level = this._simdFor(respo);

    // Pump ausführen
    return this.pump.pump(addr);
  }

  _modeForZone(zone) {
    const z = zone[0];

    if (z === "d") return "linear";     // L1 IPP
    if (z === "e") return "linear";     // L1 NLP
    if (z === "i") return "page";       // L1 NPP
    if (z === "n") return "pointer";    // AOPP
    if (z === "o") return "page";       // LLCPP
    if (z === "r") return "adaptive";   // MLC/LLC Streamer
    if (z === "s") return "adaptive";   // AMP
    if (z === "u") return "page";       // TLB‑Prefetch
    if (z === "w") return "pointer";    // TIPRP

    return "linear";
  }

  _simdFor(respo) {
    if (respo <= 3) return "MMX";
    if (respo <= 9) return "SSE";
    if (respo <= 81) return "SSE2";
    if (respo <= 756) return "SSE3";
    if (respo <= 999) return "AVX2";
    return "DXM"; // DirectXMath
  }
}
