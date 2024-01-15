// return random integer btw min (inclusive) and max (exclusive)
function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// return n random integers btw min (inclusive) and max (exclusive)
export function getRandInts(n, min, max) {
  const ints = [];
  for (let i = 0; i < n; i++) {
    let int;
    do {
      int = getRandInt(min, max);
    } while (ints.includes(int));

    ints.push(int);
  }

  return ints;
}

// return shallow copy of input array with elements randomly shuffled
export function shuffleArray(array) {
  const shuffledArr = [...array];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
}
