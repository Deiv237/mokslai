function sumEvenNumbers(n) {
  let sum = 0;
  for (let i = 2; i <= n; i += 2) {
    sum += i;
  }
  return sum;
}

const n = 20;
console.log(sumEvenNumbers(n));