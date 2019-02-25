/**
 * @description Shuffle the data of an array.
 * @param {*} array 
 */
export const shuffleArray = (array) => {
  let ctr = array.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = array[ctr];
      array[ctr] = array[index];
      array[index] = temp;
  }
  return array;
}

/**
 * @description Capitalize fist letter of a string.
 * @param {string} str 
 */
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}