const fs = require("fs");

const getFirstMarkerIndex = (markerLength, data) => {
  // using a queue data structure
  // check for when all values in the queue are unique
  let queue = [];
  for (let i = 0; i < data.length; i++) {
    // check queue
    const uniqueValues = [...new Set(queue)];
    if (uniqueValues.length === markerLength) {
      // look for when all values are unique
      return i;
    }

    // keep queue at markerLength
    if (queue.length < markerLength) {
      queue = [...queue, data[i]];
    } else {
      // when full, dequeue first
      queue = [...queue.slice(1), data[i]];
    }
  }
};

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const part1 = getFirstMarkerIndex(4, data);
  const part2 = getFirstMarkerIndex(14, data);

  console.log(part1, part2);
});
