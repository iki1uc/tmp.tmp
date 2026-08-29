PREFETCH_3 = {
  POS: {
    MODE: "ULTRA-U",
    LAYER: "1 / 2 / 3",
    RELATION: "1x3 → 3e3D → 3x3"
  },

  ENGINE: {
    MODE: "ULTRA-KERNEL",
    CTRL: true,
    BIND: "3x3 + 1x3 + 3e3D"
  },

  "3x3": {
    IN: "horizontal",
    OUT: "vertikal",
    BREITE: 3,
    TIEFE: 3,
    MYSTER: "aktiv",

    AXIOM: ["DA", "NE", "BEN"],
    ZOOM: "1 → 3"
  },

  "3e3D": {
    ABLEITUNG: "U",
    KERNEL: "Tiefen-Kernel",
    ZOOM: "3 → 6 → 9"
  },

  SYNC: {
    ALL: true,
    ULTRA: true,
    ENGINE: true
  }
};
