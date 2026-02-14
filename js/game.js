/**
 * Core Snake Game Logic
 * Handles game state, movement, collisions, and food spawning.
 */

class SnakeGame {
  constructor(gridWidth = 20, gridHeight = 20) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    
    // Initialize game state
    this.snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
    this.direction = {x: 1, y: 0}; // Moving right
    this.nextDirection = {x: 1, y: 0}; // Buffer for next direction
    this.food = this.spawnFood();
    this.score = 0;
    this.gameOver = false;
    this.paused = false;
  }

  /**
   * Spawn food at a random grid position not occupied by snake
   */
  spawnFood() {
    let food;
    let validPosition = false;
    
    while (!validPosition) {
      food = {
        x: Math.floor(Math.random() * this.gridWidth),
        y: Math.floor(Math.random() * this.gridHeight)
      };
      
      // Check if food collides with snake
      validPosition = !this.snake.some(segment => 
        segment.x === food.x && segment.y === food.y
      );
    }
    
    return food;
  }

  /**
   * Set the next direction the snake will move
   * Prevents 180-degree reversal (e.g., moving left when moving right)
   */
  setDirection(dx, dy) {
    if (this.gameOver || this.paused) return;
    
    // Prevent reversing into itself
    const isOpposite = dx === -this.direction.x && dy === -this.direction.y;
    if (!isOpposite) {
      this.nextDirection = {x: dx, y: dy};
    }
  }

  /**
   * Update game state for one tick
   */
  update() {
    if (this.gameOver || this.paused) return;

    // Apply buffered direction
    this.direction = this.nextDirection;

    // Calculate new head position
    const head = this.snake[0];
    const newHead = {
      x: (head.x + this.direction.x + this.gridWidth) % this.gridWidth,
      y: (head.y + this.direction.y + this.gridHeight) % this.gridHeight
    };

    // Check collision with self
    if (this.checkSelfCollision(newHead)) {
      this.gameOver = true;
      return;
    }

    // Add new head
    this.snake.unshift(newHead);

    // Check if food eaten
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score += 10;
      this.food = this.spawnFood();
    } else {
      // Remove tail if no food eaten
      this.snake.pop();
    }
  }

  /**
   * Check if the given position collides with the snake body
   */
  checkSelfCollision(head) {
    return this.snake.some(segment =>
      segment.x === head.x && segment.y === head.y
    );
  }

  /**
   * Get current game state (for rendering and testing)
   */
  getState() {
    return {
      snake: this.snake.map(s => ({...s})),
      food: {...this.food},
      score: this.score,
      gameOver: this.gameOver,
      paused: this.paused,
      direction: {...this.direction}
    };
  }

  /**
   * Reset the game to initial state
   */
  reset() {
    this.snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
    this.direction = {x: 1, y: 0};
    this.nextDirection = {x: 1, y: 0};
    this.food = this.spawnFood();
    this.score = 0;
    this.gameOver = false;
    this.paused = false;
  }

  /**
   * Toggle pause state
   */
  togglePause() {
    if (!this.gameOver) {
      this.paused = !this.paused;
    }
  }
}

// Export for use in browsers and for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SnakeGame;
}
