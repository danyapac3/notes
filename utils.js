export function generateUniqueId() {
  let timestampPart = Date.now().toString(36);
  let randomPart = '';
  for (let i = 0; i < 8; i++)
    randomPart += Math.floor(Math.random() * 36).toString(36);

  return `${randomPart}-${timestampPart}`;
}
