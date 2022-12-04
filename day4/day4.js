const fs = require("fs");

const part1 = () => {
  fs.readFile("./input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const rows = data.split("\n");
    let results = 0;

    rows.forEach((row) => {
      const pairs = row.split(",");

      const range1 = pairs[0].split("-").map((el) => parseInt(el));
      const range2 = pairs[1].split("-").map((el) => parseInt(el));

      // check for full overlap
      if (range1[0] <= range2[0] && range1[1] >= range2[1]) {
        results++;
      } else if (range2[0] <= range1[0] && range2[1] >= range1[1]) {
        results++;
      }
    });

    console.log(results);
  });
};

const part2 = () => {
  fs.readFile("./input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const rows = data.split("\n");
    let results = 0;

    rows.forEach((row) => {
      const pairs = row.split(",");

      const range1 = pairs[0].split("-").map((el) => parseInt(el));
      const range2 = pairs[1].split("-").map((el) => parseInt(el));

      // check for partial overlap
      if (range1[0] <= range2[0] && range1[1] >= range2[0]) {
        results++;
      } else if (range2[0] <= range1[0] && range2[1] >= range1[0]) {
        results++;
      }
    });
    console.log(results);
  });
};

part1();
part2();
