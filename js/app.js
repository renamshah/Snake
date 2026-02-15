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

    // Player management
    this.players = this.loadPlayers();
    this.currentPlayer = this.loadCurrentPlayer();

    // Best score tracking
    this.bestScore = this.getCurrentPlayerBestScore();

    // UI elements
    this.scoreDisplay = document.getElementById('score');
    this.bestScoreDisplay = document.getElementById('bestScore');
    this.playerNameDisplay = document.getElementById('playerName');
    this.speedDisplay = document.getElementById('difficulty');
    this.pauseBtn = document.getElementById('pauseBtn');
    this.restartBtn = document.getElementById('restartBtn');
    this.speedSlider = document.getElementById('speedSlider');
    this.speedValue = document.getElementById('speedValue');
    this.mobileControls = document.getElementById('mobileControls');
    this.playerSelectBtn = document.getElementById('playerSelectBtn');

    // Setup event listeners
    this.setupEventListeners();

    // Detect touch device for showing/hiding mobile controls
    this.showMobileControlsIfNeeded();

    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas(canvas));

    // Update player display
    this.updatePlayerDisplay();

    // Start the game
    this.start();
  }

  /**
   * Load all players from localStorage
   */
  loadPlayers() {
    const saved = localStorage.getItem('snakeGamePlayers');
    return saved ? JSON.parse(saved) : {};
  }

  /**
   * Save all players to localStorage
   */
  savePlayers() {
    localStorage.setItem('snakeGamePlayers', JSON.stringify(this.players));
  }

  /**
   * Load current player name from localStorage
   */
  loadCurrentPlayer() {
    return localStorage.getItem('snakeGameCurrentPlayer') || 'Guest';
  }

  /**
   * Save current player name to localStorage
   */
  saveCurrentPlayer(playerName) {
    this.currentPlayer = playerName;
    localStorage.setItem('snakeGameCurrentPlayer', playerName);
  }

  /**
   * Get best score for current player
   */
  getCurrentPlayerBestScore() {
    if (!this.players[this.currentPlayer]) {
      return 0;
    }
    return this.players[this.currentPlayer].bestScore || 0;
  }

  /**
   * Add or switch to a player
   */
  setCurrentPlayer(playerName) {
    playerName = playerName.trim() || 'Guest';
    
    // Create player if doesn't exist
    if (!this.players[playerName]) {
      this.players[playerName] = { bestScore: 0, lastPlayed: new Date().toISOString() };
    } else {
      // Update last played
      this.players[playerName].lastPlayed = new Date().toISOString();
    }
    
    this.saveCurrentPlayer(playerName);
    this.savePlayers();
    this.bestScore = this.getCurrentPlayerBestScore();
    this.updatePlayerDisplay();
  }

  /**
   * Get list of all player names
   */
  getAllPlayerNames() {
    return Object.keys(this.players).filter(name => name !== 'Guest');
  }

  /**
   * Delete a player
   */
  deletePlayer(playerName) {
    delete this.players[playerName];
    this.savePlayers();
    
    if (this.currentPlayer === playerName) {
      this.setCurrentPlayer('Guest');
    }
  }

  /**
   * Display best score in UI
   */
  displayBestScore() {
    if (this.bestScoreDisplay) {
      this.bestScoreDisplay.textContent = this.bestScore;
    }
  }

  /**
   * Update player name display
   */
  updatePlayerDisplay() {
    if (this.playerNameDisplay) {
      this.playerNameDisplay.textContent = this.currentPlayer;
    }
    this.displayBestScore();
  }

  /**
   * Show player selection modal
   */
  showPlayerSelect() {
    const playerNames = this.getAllPlayerNames();
    const html = `
      <div class="player-modal-overlay" id="playerModalOverlay">
        <div class="player-modal">
          <h2>Select Player</h2>
          <div class="player-list">
            <button class="player-item" onclick="window.snakeApp.setCurrentPlayer('Guest')">
              👤 Guest
            </button>
    `;
    
    playerNames.forEach(name => {
      const score = this.players[name].bestScore;
      html += `
            <div class="player-item-wrapper">
              <button class="player-item" onclick="window.snakeApp.setCurrentPlayer('${name}')">
                👤 ${name} (Best: ${score})
              </button>
              <button class="player-delete" onclick="window.snakeApp.deletePlayer('${name}'); window.snakeApp.showPlayerSelect()">✕</button>
            </div>
      `;
    });

    html += `
          </div>
          <div class="player-input-group">
            <input type="text" id="newPlayerInput" placeholder="Enter player name" maxlength="20">
            <button onclick="window.snakeApp.addNewPlayer()">Add Player</button>
          </div>
          <button class="close-btn" onclick="document.getElementById('playerModalOverlay').remove(); window.snakeApp.updatePlayerDisplay()">Close</button>
        </div>
      </div>
    `;

    // Remove existing modal if any
    const existing = document.getElementById('playerModalOverlay');
    if (existing) existing.remove();

    // Create and show modal
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container.firstChild);

    // Focus input
    setTimeout(() => {
      const input = document.getElementById('newPlayerInput');
      if (input) input.focus();
    }, 0);
  }

  /**
   * Add a new player
   */
  addNewPlayer() {
    const input = document.getElementById('newPlayerInput');
    if (!input) return;
    
    const playerName = input.value.trim();
    if (!playerName) {
      alert('Please enter a player name');
      return;
    }

    this.setCurrentPlayer(playerName);
    document.getElementById('playerModalOverlay').remove();
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
    // Player select button
    if (this.playerSelectBtn) {
      this.playerSelectBtn.addEventListener('click', () => {
        this.showPlayerSelect();
      });
    }

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
    const upBtn = document.getElementById('upBtn');
    const downBtn = document.getElementById('downBtn');
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');

    if (upBtn) {
      upBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.game.setDirection(0, -1);
      });
      upBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.game.setDirection(0, -1);
      });
    }

    if (downBtn) {
      downBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.game.setDirection(0, 1);
      });
      downBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.game.setDirection(0, 1);
      });
    }

    if (leftBtn) {
      leftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.game.setDirection(-1, 0);
      });
      leftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.game.setDirection(-1, 0);
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.game.setDirection(1, 0);
      });
      rightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.game.setDirection(1, 0);
      });
    }
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

    // Always show mobile controls for accessibility
    // They work with both mouse clicks and touch
    this.mobileControls.style.display = 'flex';
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
    this.displayBestScore();
    
    // Check if game is over and save best score
    if (state.gameOver && state.score > 0) {
      if (state.score > this.bestScore) {
        this.bestScore = state.score;
        
        // Save to current player
        if (!this.players[this.currentPlayer]) {
          this.players[this.currentPlayer] = { bestScore: 0, lastPlayed: new Date().toISOString() };
        }
        this.players[this.currentPlayer].bestScore = this.bestScore;
        this.savePlayers();
        
        // Flash best score display
        this.bestScoreDisplay.style.color = '#ffaa00';
        this.bestScoreDisplay.style.textShadow = '0 0 10px rgba(255, 170, 0, 0.8)';
        setTimeout(() => {
          this.bestScoreDisplay.style.color = '';
          this.bestScoreDisplay.style.textShadow = '';
        }, 2000);
      }
    }
    
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
    this.displayBestScore();
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
