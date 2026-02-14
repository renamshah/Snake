/**
 * Snake Game Renderer
 * Handles rendering the game state to a canvas element
 */

class SnakeRenderer {
  constructor(canvasId, gridWidth = 20, gridHeight = 20) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    
    // Calculate cell size based on canvas dimensions
    this.cellWidth = this.canvas.width / gridWidth;
    this.cellHeight = this.canvas.height / gridHeight;

    // Colors
    this.colors = {
      background: '#111',
      gridLine: '#222',
      snake: '#00ff00',
      snakeHead: '#00aa00',
      food: '#ff3333',
      text: '#fff',
      gameOverBg: 'rgba(0, 0, 0, 0.7)',
      gameOverText: '#ff6666'
    };
  }

  /**
   * Render the current game state
   */
  render(gameState) {
    // Clear canvas with background
    this.ctx.fillStyle = this.colors.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    this.drawGrid();

    // Draw food
    this.drawFood(gameState.food);

    // Draw snake
    this.drawSnake(gameState.snake);

    // Draw pause overlay if paused
    if (gameState.paused) {
      this.drawPauseOverlay();
    }

    // Draw game over screen if game is over
    if (gameState.gameOver) {
      this.drawGameOverOverlay(gameState.score);
    }
  }

  /**
   * Draw grid lines for reference
   */
  drawGrid() {
    this.ctx.strokeStyle = this.colors.gridLine;
    this.ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = 0; x <= this.gridWidth; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * this.cellWidth, 0);
      this.ctx.lineTo(x * this.cellWidth, this.canvas.height);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= this.gridHeight; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * this.cellHeight);
      this.ctx.lineTo(this.canvas.width, y * this.cellHeight);
      this.ctx.stroke();
    }
  }

  /**
   * Draw the snake
   */
  drawSnake(snake) {
    snake.forEach((segment, index) => {
      const x = segment.x * this.cellWidth;
      const y = segment.y * this.cellHeight;
      const padding = 1;

      // Head is brighter
      if (index === 0) {
        this.ctx.fillStyle = this.colors.snakeHead;
      } else {
        this.ctx.fillStyle = this.colors.snake;
      }

      this.ctx.fillRect(
        x + padding,
        y + padding,
        this.cellWidth - 2 * padding,
        this.cellHeight - 2 * padding
      );
    });
  }

  /**
   * Draw the food
   */
  drawFood(food) {
    const x = food.x * this.cellWidth;
    const y = food.y * this.cellHeight;
    const padding = 2;

    this.ctx.fillStyle = this.colors.food;
    this.ctx.fillRect(
      x + padding,
      y + padding,
      this.cellWidth - 2 * padding,
      this.cellHeight - 2 * padding
    );
  }

  /**
   * Draw pause overlay and message
   */
  drawPauseOverlay() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = this.colors.text;
    this.ctx.font = 'bold 32px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);

    this.ctx.font = '16px Arial';
    this.ctx.fillText('Press P to Resume', this.canvas.width / 2, this.canvas.height / 2 + 40);
  }

  /**
   * Draw game over overlay and final score
   */
  drawGameOverOverlay(score) {
    this.ctx.fillStyle = this.colors.gameOverBg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = this.colors.gameOverText;
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 40);

    this.ctx.fillStyle = this.colors.text;
    this.ctx.font = 'bold 32px Arial';
    this.ctx.fillText('Score: ' + score, this.canvas.width / 2, this.canvas.height / 2 + 20);

    this.ctx.font = '16px Arial';
    this.ctx.fillText('Press R to Restart or SPACE for New Game', this.canvas.width / 2, this.canvas.height / 2 + 70);
  }

  /**
   * Resize canvas if needed (for responsive design)
   */
  resizeCanvas(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.cellWidth = width / this.gridWidth;
    this.cellHeight = height / this.gridHeight;
  }
}
