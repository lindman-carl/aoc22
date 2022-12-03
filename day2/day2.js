const fs = require("fs");

const handScore = {
  X: 1,
  Y: 2,
  Z: 3,
};

const win = {
  X: "C",
  Y: "A",
  Z: "B",
};

const draw = {
  X: "A",
  Y: "B",
  Z: "C",
};

const requiredResults = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const hands = {
  A: {
    lose: "Z",
    draw: "X",
    win: "Y",
  },
  B: {
    lose: "X",
    draw: "Y",
    win: "Z",
  },
  C: {
    lose: "Y",
    draw: "Z",
    win: "X",
  },
};

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const rows = data.split("\n");

  let score = 0;

  rows.forEach((el) => {
    const [enemy, , action] = el.split("");
    let tempScore = 0;

    switch (action) {
      case "X":
        // lose
        tempScore += handScore[hands[enemy].lose];
        break;
      case "Y":
        // draw
        tempScore += 3;
        tempScore += handScore[hands[enemy].draw];
        break;
      case "Z":
        // win
        tempScore += 6;
        tempScore += handScore[hands[enemy].win];
        break;
    }

    score += tempScore;
  });

  console.log(score);
});
