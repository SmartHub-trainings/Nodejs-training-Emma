const myFact = (n) => {
  if (n <= 1) {
    return 1;
  }

  let res = 1;
  for (let i = 2; i <= n; i++) {
    res = res * i;
  }

  return res;
};

// console.log(myFact(45));

const fact = (n) => {
  if (n == 1) return 1;
  return n * fact(n - 1);
};

console.log(fact(6));
