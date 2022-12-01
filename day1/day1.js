fs = require("fs");
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  const rows = data.split("\n");
  const elfSums = [];

  let runningSum = 0;
  rows.forEach((el) => {
    if (el === "") {
      elfSums.push(runningSum);
      runningSum = 0;
      return;
    }

    runningSum += Number.parseInt(el);
  });

  const sortedElfSums = elfSums.sort((a, z) => z - a);
  const largestElfSums = sortedElfSums.slice(0, 3);
  const total = largestElfSums.reduce((acc, curr) => acc + curr);

  console.log(sortedElfSums);
  console.log(total);
});
