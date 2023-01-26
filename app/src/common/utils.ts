
export const shuffleRange = (range:number) => {
  let array:number[] = Array.from({ length: range + 1 }, (_, i) => i)

  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export function* range(start:number, end:number) {
  for (let i = start; i <= end; i++) {
      yield i;
  }
}
