export function extendedDQF(x, y, z) {
  return {
    D: `Dim9(${(x + y + z) * 9})`,
    Q: (x * y * z) % 9,
    F: `FX-${(x + 1) * (y + 1)}`
  };
}
