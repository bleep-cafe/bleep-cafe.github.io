export const distribute = (min, max, n, i) =>
    min + ((i + 1) * (max - min)) / (n + 1)

export const mean = (...xs) => xs.reduce((a, b) => a + b) / xs.length
