/**
 * Snake Game Application
 * Initializes the game, handles the game loop, and manages UI updates
 */

class SnakeGameApp {
  constructor() {
    // Get canvas and resize to fit screen
    const canvas = document.getElementById('gameCanvas');
    this.resizeCanvas(canvas);

    // Initialize components with larger grid
    this.game = new SnakeGame(40, 40); // Larger grid for fullscreen
    this.renderer = new SnakeRenderer('gameCanvas', 40, 40);
    this.input = new InputHandler(this.game);

    // Game loop variables
    this.gameSpeed = 10; // ticks per second
    this.tickInterval = 1000 / this.gameSpeed;
    this.lastTickTime = 0;
    this.isRunning = false;

    // UI elements
    this.scoreDisplay = document.getElementById('score');
    this.speedDisplay = document.getElementById('difficulty');
    this.pauseBtn = document.getElementById('pauseBtn');
    this.restartBtn = document.getElementById('restartBtn');
    this.speedSlider = document.getElementById('speedSlider');
    this.speedValue = document.getElementById('speedValue');
    this.mobileControls = document.getElementById('mobileControls');

    // Setup event listeners
    this.setupEventListeners();

    // Detect touch device for showing/hiding mobile controls
    this.showMobileControlsIfNeeded();

    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas(canvas));

    // Start the game
    this.start();
  }

  /**
   * Resize canvas to fit screen
   */
  resizeCanvas(canvas) {
    const maxWidth = window.innerWidth - 40; // Leave margin
    const maxHeight = window.innerHeight - 40;
    
    // Maintain aspect ratio (square)
    const size = Math.min(maxWidth, maxHeight, 800);
    
    canvas.width = size;
    canvas.height = size;
    
    // Update renderer if already initialized
    if (this.renderer) {
      this.renderer.resizeCanvas(size, size);
    }
  }

  /**
   * Setup UI event listeners
   */
  setupEventListeners() {
    // Pause button
    this.pauseBtn.addEventListener('click', () => {
      this.game.togglePause();
      this.updatePauseButton();
    });

    // Restart button
    this.restartBtn.addEventListener('click', () => {
      this.game.reset();
      this.updateUI();
    });

    // Speed slider
    this.speedSlider.addEventListener('input', (e) => {
      this.gameSpeed = parseInt(e.target.value);
      this.tickInterval = 1000 / this.gameSpeed;
      this.updateSpeedDisplay();
    });

    // Mobile D-pad buttons
    this.setupMobileButtons();
  }

  /**
   * Setup mobile D-pad buttons
   */
  setupMobileButtons() {
    document.getElementById('upBtn').addEventListener('click', () => {
      this.game.setDirection(0, -1);
    });
    document.getElementById('downBtn').addEventListener('click', () => {
      this.game.setDirection(0, 1);
    });
    document.getElementById('leftBtn').addEventListener('click', () => {
      this.game.setDirection(-1, 0);
    });
    document.getElementById('rightBtn').addEventListener('click', () => {
      this.game.setDirection(1, 0);
    });
  }

  /**
   * Show mobile controls if touch device is detected
   */
  showMobileControlsIfNeeded() {
    const isTouchDevice = () => {
      return (
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)
      );
    };

    if (isTouchDevice()) {
      this.mobileControls.style.display = 'flex';
    } else {
      this.mobileControls.style.display = 'none';
    }
  }

  /**
   * Update speed display based on game speed value
   */
  updateSpeedDisplay() {
    let speedText = 'Normal';
    if (this.gameSpeed <= 5) speedText = 'Slow';
    else if (this.gameSpeed <= 10) speedText = 'Normal';
    else if (this.gameSpeed <= 15) speedText = 'Fast';
    else speedText = 'Very Fast';

    this.speedDisplay.textContent = speedText;
    this.speedValue.textContent = speedText;
  }

  /**
   * Update pause button text
   */
  updatePauseButton() {
    if (this.game.paused) {
      this.pauseBtn.textContent = 'RESUME (P)';
    } else {
      this.pauseBtn.textContent = 'PAUSE (P)';
    }
  }

  /**
   * Update all UI elements
   */
  updateUI() {
    const state = this.game.getState();
    this.scoreDisplay.textContent = state.score;
    this.updatePauseButton();
  }

  /**
   * Main game loop
   */
  gameLoop(currentTime) {
    // Calculate delta time since last update
    if (currentTime - this.lastTickTime >= this.tickInterval) {
      this.game.update();
      this.lastTickTime = currentTime;
    }

    // Always render
    const state = this.game.getState();
    this.renderer.render(state);
    this.updateUI();

    // Continue loop
    if (this.isRunning) {
      requestAnimationFrame((time) => this.gameLoop(time));
    }
  }

  /**
   * Start the game
   */
  start() {
    this.isRunning = true;
    this.lastTickTime = 0;
    this.updateUI();
    requestAnimationFrame((time) => this.gameLoop(time));
  }

  /**
   * Stop the game
   */
  stop() {
    this.isRunning = false;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.snakeApp = new SnakeGameApp();
});
