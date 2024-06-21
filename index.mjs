import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const maxDistance = (positions, m) => {
  positions.sort((a, b) => a - b);

  const canPlaceBalls = (minDist) => {
    let count = 1; // Place the first ball at the first position
    let lastPos = positions[0];

    for (let i = 1; i < positions.length; i++) {
      if (positions[i] - lastPos >= minDist) {
        count++;
        lastPos = positions[i];
        if (count === m) return true;
      }
    }
    return false;
  };

  let low = 1;
  let high = positions[positions.length - 1] - positions[0];
  let best = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canPlaceBalls(mid)) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return best;
};

const start = () => {
  rl.question('Enter positions array in this format [1, 2, 3, ...]: ', (arrayInput) => {
    rl.question('Enter the number of balls: ', (ballsInput) => {
      const positions = JSON.parse(arrayInput);
      const m = parseInt(ballsInput, 10);
      const result = maxDistance(positions, m);
      console.log(`The maximum minimum distance is: ${result}`);
      rl.close();
    });
  });
};

start();
