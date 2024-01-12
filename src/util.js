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
    } while(ints.includes(int));

    ints.push(int);
  }

  return ints;
}
