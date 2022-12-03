const { readFile } = require("fs");

const isUpperCase = (c) => c === c.toUpperCase();

const getAlphaIndex = (c) => {
  if (isUpperCase(c)) {
    return c.toLowerCase().charCodeAt(0) - 70;
  } else {
    return c.charCodeAt(0) - 96;
  }
};

const part1 = () => {
  readFile("./input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let score = 0;
    const duplicates = [];

    const rucksacks = data.split("\n");

    rucksacks.forEach((rucksack) => {
      const midIndex = rucksack.length / 2;
      const firstCompartment = rucksack.slice(0, midIndex);
      const secondCompartment = rucksack.slice(midIndex);

      const cache = {};

      // cache first compartment
      firstCompartment.split("").forEach((el) => {
        cache[el] = true;
      });

      // check for duplicate in cache
      secondCompartment.split("").every((el) => {
        if (cache.hasOwnProperty(el)) {
          // found duplicate
          duplicates.push(el);
          return false;
        }

        return true;
      });
    });

    duplicates.forEach((el) => {
      score += getAlphaIndex(el);
    });

    console.log(score);
  });
};

const part2 = () => {
  readFile("./input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let score = 0;
    const badges = [];

    const rucksacks = data.split("\n");
    let groupUniqueItems = {};

    rucksacks.forEach((rucksack, index) => {
      // grouping by three
      if (index % 3 === 0) {
        groupUniqueItems = {};
      }

      // count all items
      rucksackItemCount = {};
      rucksack.split("").forEach((el) => {
        if (rucksackItemCount.hasOwnProperty(el)) {
          rucksackItemCount[el] += 1;
        } else {
          rucksackItemCount[el] = 1;
        }
      });

      // add unique items to group count
      for (let key in rucksackItemCount) {
        if (groupUniqueItems.hasOwnProperty(key)) {
          groupUniqueItems[key] += 1;
        } else {
          groupUniqueItems[key] = 1;
        }
      }

      // after the third rucksack
      // get the item that was found exactly three times
      if (index % 3 === 2) {
        for (let key in groupUniqueItems) {
          if (groupUniqueItems[key] === 3) {
            score += getAlphaIndex(key);
            break;
          }
        }
      }
    });

    console.log(score);
  });
};

part1();
part2();
