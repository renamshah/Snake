/**
 * Input Handler for Snake Game
 * Handles keyboard and touch input
 */

class InputHandler {
  constructor(game) {
    this.game = game;
    this.setupKeyboardInput();
    this.setupTouchInput();
  }

  /**
   * Setup keyboard event listeners
   */
  setupKeyboardInput() {
    document.addEventListener('keydown', (event) => {
      switch (event.key.toLowerCase()) {
        // Arrow keys
        case 'arrowup':
          this.game.setDirection(0, -1);
          event.preventDefault();
          break;
        case 'arrowdown':
          this.game.setDirection(0, 1);
          event.preventDefault();
          break;
        case 'arrowleft':
          this.game.setDirection(-1, 0);
          event.preventDefault();
          break;
        case 'arrowright':
          this.game.setDirection(1, 0);
          event.preventDefault();
          break;

        // WASD keys
        case 'w':
          this.game.setDirection(0, -1);
          event.preventDefault();
          break;
        case 's':
          this.game.setDirection(0, 1);
          event.preventDefault();
          break;
        case 'a':
          this.game.setDirection(-1, 0);
          event.preventDefault();
          break;
        case 'd':
          this.game.setDirection(1, 0);
          event.preventDefault();
          break;

        // Game controls
        case 'p':
          this.game.togglePause();
          event.preventDefault();
          break;
        case 'r':
          this.game.reset();
          event.preventDefault();
          break;
        case ' ':
          this.game.reset();
          event.preventDefault();
          break;
      }
    });
  }

  /**
   * Setup touch input for mobile devices
   */
  setupTouchInput() {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    });

    canvas.addEventListener('touchmove', (event) => {
      if (event.touches.length === 0) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      // Determine swipe direction (threshold: 30px)
      if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) {
            this.game.setDirection(1, 0); // Right
          } else {
            this.game.setDirection(-1, 0); // Left
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            this.game.setDirection(0, 1); // Down
          } else {
            this.game.setDirection(0, -1); // Up
          }
        }
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      }
    });
  }
}
