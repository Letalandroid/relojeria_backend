export const generateRandomCode = (length) =>
  Array.from(
    { length },
    () => String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
