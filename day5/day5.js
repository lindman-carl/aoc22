const fs = require("fs");

const getAnswer = (stacks) => {
  // get top item of all stacks and append to a string
  let answer = "";

  for (const stack of Object.values(stacks)) {
    const lastIndex = stack.length - 1;
    const lastItem = stack[lastIndex];
    if (lastItem) {
      answer += lastItem;
    }
  }

  return answer;
};

const addRowToStacks = (row, stacks) => {
  const newStacks = { ...stacks };

  for (let i = 1; i < row.length; i += 4) {
    if (row[i] === " ") {
      // skip blank
      continue;
    }
    // get column index
    const column = Math.floor(i / 4) + 1;

    // add to BOTTOM of stack
    if (newStacks.hasOwnProperty(column)) {
      newStacks[column] = [row[i], ...newStacks[column]];
    } else {
      newStacks[column] = [row[i]];
    }
  }

  return newStacks;
};

const createOriginalStacks = (rows) => {
  if (rows.length < 1) {
    return [];
  }

  let stacks = {};

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (!row.trim().startsWith("[")) {
      break;
    }

    stacks = addRowToStacks(row, stacks);
  }

  return stacks;
};

const getInstructions = (str) => {
  // get the 3 numbers from instructions
  return ([numberItems, sourceIndex, destinationIndex] = str
    .split(" ")
    .filter((el) => Number.isInteger(parseInt(el)))
    .map((el) => parseInt(el)));
};

const moveItems = (
  numberItems,
  sourceIndex,
  destinationIndex,
  stacks,
  retainOrder = false
) => {
  const itemsToMove = stacks[sourceIndex].slice(-numberItems);
  const newSourceStack = stacks[sourceIndex].slice(0, -numberItems);
  let newDestinationStack;

  if (retainOrder) {
    newDestinationStack = [...stacks[destinationIndex], ...itemsToMove];
  } else {
    // reverse items to simulate moving one item at a time
    const itemsToMoveReversed = [...itemsToMove].reverse();

    newDestinationStack = [...stacks[destinationIndex], ...itemsToMoveReversed];
  }

  // update stacks
  const newStacks = { ...stacks };
  newStacks[sourceIndex] = newSourceStack;
  newStacks[destinationIndex] = newDestinationStack;

  return newStacks;
};

const part1 = (rows, originalStacks) => {
  let stacks = { ...originalStacks };

  rows.forEach((row) => {
    // ignore rows that doesnt start with move
    if (!row.startsWith("m")) {
      return;
    }

    const [numberItems, sourceIndex, destinationIndex] = getInstructions(row);

    stacks = moveItems(
      numberItems,
      sourceIndex,
      destinationIndex,
      stacks,
      false
    );
  });

  return getAnswer(stacks);
};

const part2 = (rows, originalStacks) => {
  let stacks = { ...originalStacks };

  rows.forEach((row) => {
    // ignore rows that doesnt start with move
    if (!row.startsWith("m")) {
      return;
    }

    const [numberItems, sourceIndex, destinationIndex] = getInstructions(row);

    stacks = moveItems(
      numberItems,
      sourceIndex,
      destinationIndex,
      stacks,
      true
    );
  });

  return getAnswer(stacks);
};

const main = () => {
  fs.readFile("./input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const rows = data.split("\n");
    const originalStacks = createOriginalStacks(rows);

    const part1Answer = part1(rows, originalStacks);
    const part2Answer = part2(rows, originalStacks);

    console.log(part1Answer);
    console.log(part2Answer);
  });
};

main();
