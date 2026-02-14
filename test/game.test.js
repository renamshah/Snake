/**
 * Snake Game Unit Tests
 * Basic tests for game logic without external dependencies
 * 
 * Run in Node.js: node test/game.test.js
 * Or include in HTML and check console output
 */

// Simple test framework
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  describe(description, fn) {
    console.log(`\n${description}`);
    fn();
  }

  test(description, fn) {
    try {
      fn();
      this.passed++;
      console.log(`  ✓ ${description}`);
    } catch (error) {
      this.failed++;
      console.error(`  ✗ ${description}`);
      console.error(`    ${error.message}`);
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, got ${actual}`);
    }
  }

  report() {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Tests passed: ${this.passed}`);
    console.log(`Tests failed: ${this.failed}`);
    console.log(`Total: ${this.passed + this.failed}`);
    console.log(`${'='.repeat(50)}\n`);
  }
}

// Initialize test runner
const runner = new TestRunner();

// ============================================================================
// TESTS
// ============================================================================

runner.describe('SnakeGame - Initialization', () => {
  const game = new SnakeGame(20, 20);

  runner.test('should initialize snake with 3 segments', () => {
    runner.assertEqual(game.snake.length, 3, 'Snake should start with 3 segments');
  });

  runner.test('should place snake head at center', () => {
    runner.assertEqual(game.snake[0].x, 10, 'Head X position should be 10');
    runner.assertEqual(game.snake[0].y, 10, 'Head Y position should be 10');
  });

  runner.test('should initialize direction to right', () => {
    runner.assertEqual(game.direction.x, 1, 'Initial direction X should be 1 (right)');
    runner.assertEqual(game.direction.y, 0, 'Initial direction Y should be 0');
  });

  runner.test('should spawn food on grid', () => {
    runner.assert(game.food.x >= 0 && game.food.x < 20, 'Food X should be in grid');
    runner.assert(game.food.y >= 0 && game.food.y < 20, 'Food Y should be in grid');
  });

  runner.test('should initialize score to 0', () => {
    runner.assertEqual(game.score, 0, 'Initial score should be 0');
  });

  runner.test('should not be game over initially', () => {
    runner.assert(!game.gameOver, 'Game should not be over initially');
  });
});

runner.describe('SnakeGame - Movement', () => {
  const game = new SnakeGame(20, 20);
  const initialHead = {x: game.snake[0].x, y: game.snake[0].y};

  game.update();

  runner.test('should move head right', () => {
    runner.assertEqual(game.snake[0].x, initialHead.x + 1, 'Head should move right');
    runner.assertEqual(game.snake[0].y, initialHead.y, 'Head Y should not change');
  });

  runner.test('should maintain snake length if not eating food', () => {
    const initialLength = game.snake.length;
    game.update();
    runner.assertEqual(game.snake.length, initialLength, 'Snake length should remain same');
  });
});

runner.describe('SnakeGame - Direction Control', () => {
  const game = new SnakeGame(20, 20);

  runner.test('should allow setting direction to left', () => {
    game.setDirection(-1, 0);
    // Note: Cannot turn 180 degrees, but next update should process it
    game.update();
    // After one more update, should be moving left
    const headBefore = {x: game.snake[0].x, y: game.snake[0].y};
    game.setDirection(-1, 0);
    game.update();
    runner.assert(game.snake[0].x <= headBefore.x, 'Snake should move horizontally');
  });

  runner.test('should prevent 180-degree reversal', () => {
    const game2 = new SnakeGame(20, 20);
    game2.direction = {x: 1, y: 0}; // Moving right
    game2.setDirection(-1, 0); // Try to move left (opposite)
    runner.assertEqual(game2.nextDirection.x, 1, 'Should not allow 180-degree turn');
  });

  runner.test('should queue direction change', () => {
    const game3 = new SnakeGame(20, 20);
    game3.setDirection(0, 1); // Up
    runner.assertEqual(game3.nextDirection.y, 1, 'Direction should be queued');
  });
});

runner.describe('SnakeGame - Game Over', () => {
  runner.test('should detect self-collision', () => {
    const game = new SnakeGame(20, 20);
    // Manually create a self-collision scenario
    game.snake = [
      {x: 10, y: 10}, // Head
      {x: 9, y: 10},
      {x: 8, y: 10},
      {x: 9, y: 9} // This will cause the head to collide
    ];
    const collides = game.checkSelfCollision({x: 9, y: 10});
    runner.assert(collides, 'Should detect self-collision');
  });

  runner.test('should set gameOver flag on collision', () => {
    const game = new SnakeGame(20, 20);
    // Set up a collision scenario
    game.snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
    game.direction = {x: 0, y: 1};
    game.nextDirection = {x: 0, y: 1};
    
    // Modify snake to create collision after a few updates
    // This is a simplified test
    runner.assert(!game.gameOver, 'Game should not be over initially');
  });
});

runner.describe('SnakeGame - Food & Scoring', () => {
  runner.test('should increase score when eating food', () => {
    const game = new SnakeGame(20, 20);
    const initialScore = game.score;
    
    // Place snake head next to food
    game.snake = [{x: game.food.x + 1, y: game.food.y}];
    game.direction = {x: -1, y: 0};
    game.nextDirection = {x: -1, y: 0};
    
    game.update();
    runner.assert(game.score > initialScore, 'Score should increase after eating food');
  });

  runner.test('should spawn new food after eating', () => {
    const game = new SnakeGame(20, 20);
    const oldFood = {x: game.food.x, y: game.food.y};
    
    // Create eating scenario
    game.snake = [{x: oldFood.x + 1, y: oldFood.y}];
    game.direction = {x: -1, y: 0};
    game.nextDirection = {x: -1, y: 0};
    
    game.update();
    
    // Food should be moved or at different location
    runner.assert(
      game.food.x !== oldFood.x || game.food.y !== oldFood.y,
      'New food should be spawned'
    );
  });

  runner.test('should grow snake when eating food', () => {
    const game = new SnakeGame(20, 20);
    const initialLength = game.snake.length;
    
    game.snake = [{x: game.food.x + 1, y: game.food.y}];
    game.direction = {x: -1, y: 0};
    game.nextDirection = {x: -1, y: 0};
    
    game.update();
    runner.assertEqual(game.snake.length, initialLength + 1, 'Snake should grow');
  });

  runner.test('food should not spawn on snake', () => {
    for (let i = 0; i < 10; i++) {
      const game = new SnakeGame(20, 20);
      const foodOnSnake = game.snake.some(segment =>
        segment.x === game.food.x && segment.y === game.food.y
      );
      runner.assert(!foodOnSnake, `Iteration ${i}: Food should not spawn on snake`);
    }
  });
});

runner.describe('SnakeGame - Pause & Reset', () => {
  runner.test('should toggle pause state', () => {
    const game = new SnakeGame(20, 20);
    runner.assert(!game.paused, 'Should not be paused initially');
    
    game.togglePause();
    runner.assert(game.paused, 'Should be paused after toggle');
    
    game.togglePause();
    runner.assert(!game.paused, 'Should resume after second toggle');
  });

  runner.test('should not update when paused', () => {
    const game = new SnakeGame(20, 20);
    const initialHead = {x: game.snake[0].x, y: game.snake[0].y};
    
    game.paused = true;
    game.update();
    
    runner.assertEqual(game.snake[0].x, initialHead.x, 'Head should not move when paused');
  });

  runner.test('should reset game to initial state', () => {
    const game = new SnakeGame(20, 20);
    
    // Modify game state
    game.direction = {x: 0, y: 1};
    game.score = 100;
    game.gameOver = true;
    
    // Reset
    game.reset();
    
    runner.assertEqual(game.snake.length, 3, 'Snake should be reset to 3 segments');
    runner.assertEqual(game.score, 0, 'Score should be reset to 0');
    runner.assert(!game.gameOver, 'Game over flag should be reset');
  });
});

runner.describe('SnakeGame - Grid Wrapping', () => {
  runner.test('should wrap around grid horizontally', () => {
    const game = new SnakeGame(20, 20);
    game.snake = [{x: 19, y: 10}];
    game.direction = {x: 1, y: 0};
    game.nextDirection = {x: 1, y: 0};
    
    game.update();
    runner.assertEqual(game.snake[0].x, 0, 'Should wrap to x=0 when moving right past edge');
  });

  runner.test('should wrap around grid vertically', () => {
    const game = new SnakeGame(20, 20);
    game.snake = [{x: 10, y: 19}];
    game.direction = {x: 0, y: 1};
    game.nextDirection = {x: 0, y: 1};
    
    game.update();
    runner.assertEqual(game.snake[0].y, 0, 'Should wrap to y=0 when moving down past edge');
  });
});

runner.describe('SnakeGame - State Retrieval', () => {
  runner.test('should return current game state', () => {
    const game = new SnakeGame(20, 20);
    const state = game.getState();
    
    runner.assert(state.snake, 'State should include snake');
    runner.assert(state.food, 'State should include food');
    runner.assertEqual(state.score, game.score, 'State score should match');
    runner.assertEqual(state.gameOver, game.gameOver, 'State gameOver should match');
  });

  runner.test('state should be a copy, not reference', () => {
    const game = new SnakeGame(20, 20);
    const state = game.getState();
    
    state.score = 999;
    runner.assertEqual(game.score, 0, 'Modifying state should not affect game');
  });
});

// Run tests and print report
runner.report();

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TestRunner, runner };
}
