const { readFile } = require("fs");

const isUpperCase = (c) => c === c.toUpperCase();

const getAlphaIndex = (c) => {
  if (isUpperCase(c)) {
    return c.toLowerCase().charCodeAt(0) - 70;
  } else {
    return c.charCodeAt(0) - 96;
  }
};

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetIndexMap = {};
alphabet.split("").forEach((el, index) => (alphabetIndexMap[el] = index + 1));

const getAlphaIndex2 = (c) => {
  return alphabetIndexMap[c];
};

const part1 = () => {
  readFile("./input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

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
          return false; // breaks out of .every
        }

        return true;
      });
    });

    // count score
    const score = duplicates.reduce(
      (acc, curr) => acc + getAlphaIndex2(curr),
      0
    );

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

    const rucksacks = data.split("\n");
    let groupUniqueItems = {};

    rucksacks.forEach((rucksack, index) => {
      // grouping by three
      if (index % 3 === 0) {
        groupUniqueItems = {}; // clear cache
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
            score += getAlphaIndex2(key);
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
