export function baseDQF(x, y, z) {
  return {
    D: `Dim(${x + y + z})`,
    Q: (x * y * z) % 3,
    F: `F-${Math.abs(x - y)}`
  };
}
