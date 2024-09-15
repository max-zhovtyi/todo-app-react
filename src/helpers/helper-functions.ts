/**
 * Generate random id of preset length.
 * 
 * @param length 
 * @returns randomId.
 */
export function makeId(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  let result = '';
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  
  return result;
}

/**
 * Delay function.
 * 
 * @param {$ms} $ms number
 * @returns Promise
 */
export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(null);
    }, ms);
  });
};