# Snake Game

A classic Snake game implementation in vanilla JavaScript with HTML5 Canvas, featuring responsive design, touch support for mobile, and comprehensive game logic with tests.

## Project Structure

```
Snake/
├── index.html              # Main HTML file (entry point)
├── js/
│   ├── game.js            # Core game logic (state, movement, collisions)
│   ├── renderer.js        # Canvas rendering engine
│   ├── input.js           # Keyboard and touch input handling
│   └── app.js             # Game initialization and loop
├── css/
│   └── styles.css         # Styling and responsive design
├── test/
│   └── game.test.js       # Unit tests for game logic
└── README.md              # This file
```

## Quick Start

### Option 1: Using Python's Built-in Server (Recommended)

If you have Python installed:

```bash
# Navigate to the Snake directory
cd c:\Workspaces\Snake

# Python 3
python -m http.server 8000

# OR Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and navigate to: **http://localhost:8000**

### Option 2: Using Node.js HTTP Server

If you have Node.js installed:

```bash
# Navigate to the Snake directory
cd c:\Workspaces\Snake

# Install a simple HTTP server (one-time)
npm install -g http-server

# Start the server
http-server

# Then open the URL shown in the terminal (typically http://localhost:8080)
```

### Option 3: Using VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct File Opening (Limited)

Simply double-click `index.html` to open in your default browser. This works but may have limitations with some features depending on your browser's security policies.

## How to Play

### Controls

**Keyboard:**
- **Arrow Keys** or **WASD** - Move the snake (Up/Down/Left/Right)
- **P** - Pause/Resume the game
- **R** or **SPACE** - Restart the game

**Mobile (Touch Device):**
- Use the **D-Pad Controls** displayed on the screen
- Swipe on the canvas to change direction

**On-Screen Controls:**
- Use the **Pause** and **Restart** buttons
- Adjust **Game Speed** with the slider (1=Slow, 20=Very Fast)

### Game Rules

1. **Move the snake** across the grid using keyboard or touch controls
2. **Eat the red food** to grow your snake and increase your score
3. **Avoid hitting** the snake's own body - the game ends when you collide with yourself
4. **Score +10** for every piece of food eaten
5. **Grid wraps** - exiting one side appears on the opposite side
6. **Pause** to temporarily stop the game without losing progress
7. **Restart** to begin a new game at any time

### Difficulty Levels (Speed Slider)

- **1-5**: Slow - Good for learning
- **6-10**: Normal - Balanced (Default: 10)
- **11-15**: Fast - Challenging
- **16-20**: Very Fast - Expert

## Code Overview

### Game Logic (`js/game.js`)

Core `SnakeGame` class handles:
- **Snake state** - segments stored as {x, y} coordinates
- **Direction management** - current direction and buffered next direction
- **Movement** - updates snake position each tick with grid wrapping
- **Collision detection** - checks for self-collision
- **Food spawning** - random placement avoiding snake body
- **Scoring** - tracks score and increases on food consumption
- **Pause/Resume** - game state management

**Key methods:**
- `update()` - Main game tick logic
- `setDirection(dx, dy)` - Set snake direction (prevents 180° turns)
- `spawnFood()` - Place food at valid random location
- `checkSelfCollision(head)` - Detect collision
- `reset()` - Return to initial state
- `getState()` - Retrieve current game state (for rendering)

### Rendering (`js/renderer.js`)

Canvas-based `SnakeRenderer` class:
- Renders game grid with grid lines
- Draws snake body (green) and head (brighter green)
- Draws food (red square)
- Overlays for pause and game over states
- Responsive cell sizing based on canvas dimensions

### Input Handling (`js/input.js`)

`InputHandler` class:
- Keyboard input - Arrow keys, WASD, P (pause), R (restart)
- Touch input - Swipe detection with direction calculation
- Mobile D-Pad button support

### Application Loop (`js/app.js`)

`SnakeGameApp` class:
- Initializes game components (Game, Renderer, Input)
- Manages game loop using `requestAnimationFrame`
- Handles UI updates (score, difficulty display, button states)
- Configurable game speed (1-20 ticks per second)
- Mobile control detection and toggling

## Running Tests

### In Node.js

```bash
cd c:\Workspaces\Snake
node test/game.test.js
```

### In Browser Console

1. Open the game in browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. The test results will be printed automatically

### Test Coverage

Tests verify:
- ✓ Initialization (snake position, direction, food placement)
- ✓ Movement (direction changes, position updates)
- ✓ Collision detection (self-collision, game over)
- ✓ Food mechanics (eating, scoring, spawning)
- ✓ Game state (pause/resume, reset)
- ✓ Grid wrapping (edge cases)
- ✓ State immutability

## Manual Verification Checklist

After starting the game, verify the following:

### Basic Gameplay
- [ ] Snake appears in the center of the grid
- [ ] Food appears as red square at random location
- [ ] Score displays as "0" initially
- [ ] Moving snake is smooth and responsive

### Keyboard Controls
- [ ] Arrow Up - Snake moves up ↑
- [ ] Arrow Down - Snake moves down ↓
- [ ] Arrow Left - Snake moves left ←
- [ ] Arrow Right - Snake moves right →
- [ ] W, A, S, D keys work as alternate controls

### Collision & Growth
- [ ] Snake grows when eating food (+1 segment, tail not removed)
- [ ] Score increases by 10 for each food eaten
- [ ] New food spawns after being eaten
- [ ] Game Over occurs when snake hits itself

### Grid Wrapping
- [ ] Snake exiting right side appears on left side
- [ ] Snake exiting bottom appears on top
- [ ] Works for all four edges

### Pause & Resume
- [ ] Pressing P pauses the game (snake stops moving)
- [ ] Pause button text changes to "Resume (P)"
- [ ] Pressing P again resumes (snake continues moving)
- [ ] Pause doesn't reset score or position

### Restart Function
- [ ] Pressing R or SPACE resets game to initial state
- [ ] Creates new food position
- [ ] Score resets to 0
- [ ] Game Over flag clears

### Speed Control
- [ ] Speed slider adjusts game speed (1-20)
- [ ] Difficulty text updates (Slow/Normal/Fast/Very Fast)
- [ ] Speed changes take effect immediately
- [ ] Default speed is "Normal" (10)

### Mobile/Touch Controls (if on touch device)
- [ ] D-Pad buttons appear on mobile
- [ ] D-Pad buttons disappear on desktop
- [ ] Each button (↑↓←→) works correctly
- [ ] Swipe gestures change direction (with 30px threshold)

### Responsive Design
- [ ] Works on desktop (tested)
- [ ] Works on tablet (responsive grid)
- [ ] Works on mobile (touch controls shown, buttons stack)
- [ ] Canvas scales appropriately

### Edge Cases
- [ ] Cannot reverse 180° into yourself
- [ ] Score never decreases
- [ ] Game Over prevents further movement
- [ ] Food never spawns inside snake body

## Technical Details

### Browser Compatibility

- Chrome 40+ ✓
- Firefox 35+ ✓
- Safari 9+ ✓
- Edge 12+ ✓
- Mobile browsers with Canvas support ✓

### Dependencies

**None** - This is a vanilla JavaScript implementation using only:
- HTML5 Canvas API
- DOM API
- Touch Events API
- requestAnimationFrame

### Performance

- Uses `requestAnimationFrame` for smooth 60 FPS rendering
- Decouples game ticks (configurable 1-20/sec) from rendering
- Minimal DOM manipulation
- Efficient collision detection (O(n) where n = snake length)

### Game Loop

```
RequestAnimationFrame (60 FPS max)
  └─ Check if enough time passed for next game tick
     └─ Call game.update() (10-200 MS depending on speed)
  └─ Always render current state
  └─ Update UI (score, buttons)
```

## Customization

To adjust game settings, edit these constants in the source files:

**Grid Size** - In `js/app.js`:
```javascript
this.game = new SnakeGame(20, 20); // Change to desired width/height
```

**Initial Snake Length** - In `js/game.js`:
```javascript
this.snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
```

**Color Scheme** - In `js/renderer.js`:
```javascript
this.colors = {
  background: '#111',
  snake: '#00ff00',
  food: '#ff3333',
  // ... etc
};
```

**Score Points Per Food** - In `js/game.js`:
```javascript
this.score += 10; // Change to desired point value
```

## File Sizes

- `index.html` - ~2.5 KB
- `js/game.js` - ~4.5 KB
- `js/renderer.js` - ~4.2 KB
- `js/input.js` - ~2.8 KB
- `js/app.js` - ~5.2 KB
- `css/styles.css` - ~8.5 KB
- **Total** - ~27.7 KB (uncompressed, no gzip)

## Project Setup & Version Control

### Git Repository Structure

This project is configured for Git version control with:

- ✅ `.gitignore` - Proper file exclusion rules
- ✅ `.gitattributes` - Cross-platform line ending normalization
- ✅ `package.json` - Project metadata and npm scripts
- ✅ GitHub issue templates (bug reports, feature requests)
- ✅ Pull request template for contributors
- ✅ GitHub Actions CI/CD workflow for automated testing
- ✅ `CHANGELOG.md` - Version history and roadmap
- ✅ `CONTRIBUTING.md` - Guidelines for contributors
- ✅ `SETUP.md` - Complete Git setup guide

### Push to GitHub

**See [SETUP.md](SETUP.md) for detailed step-by-step instructions**

Quick start:
```bash
cd c:\Workspaces\Snake

# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git add .
git commit -m "Initial commit: Snake game v1.0.0"

# Add your GitHub repository
git remote add origin https://github.com/USERNAME/snake-game.git
git branch -M main
git push -u origin main
```

### Project Files

- **README.md** - This file (overview and quick start)
- **SETUP.md** - Git configuration and push instructions 👈 **START HERE**
- **CONTRIBUTING.md** - Guidelines for contributors
- **CHANGELOG.md** - Version history and future roadmap
- **PROJECT_STRUCTURE.md** - Detailed file organization
- **LICENSE** - MIT License (open source)

## Future Enhancement Ideas

### Version 2.0 (Planned)
- High score persistence (localStorage)
- Sound effects and music
- Multiple difficulty presets
- Power-ups (invincibility, slow-motion)
- Walls and obstacles

### Version 3.0+ (Ideas)
- Multiplayer mode
- Online leaderboards
- Achievements/badges  
- Custom level editor
- Theme customization
- PWA (Progressive Web App) support

## Contributing

Want to improve the game? See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Code style guidelines
- Testing requirements
- Pull request process
- Areas for contribution

We welcome:
- Bug reports → Use [GitHub Issues](../issues) with bug template
- Feature requests → Use [GitHub Issues](../issues) with feature template
- Code contributions → See CONTRIBUTING.md for process
- Documentation improvements

## Community & Support

- 📖 **Documentation** - See SETUP.md, CONTRIBUTING.md, CHANGELOG.md
- 🐛 **Report Bugs** - Open an issue on GitHub
- 💡 **Suggest Features** - Open an issue on GitHub
- 💬 **Ask Questions** - Open a discussion (if enabled)

## License

MIT License - Open source and free to use

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

See [LICENSE](LICENSE) file for full terms.

---

## Quick Links

- 🎮 [How to Play](#how-to-play) - Game rules and controls
- 🚀 [Quick Start](#quick-start) - Get the game running
- 📋 [Git Setup](SETUP.md) - Push to GitHub
- 🤝 [Contributing](CONTRIBUTING.md) - Help improve the game
- 📝 [Changelog](CHANGELOG.md) - Version history and roadmap
- 📁 [Project Structure](PROJECT_STRUCTURE.md) - File organization

---

**Enjoy the game! 🐍**

Have fun and thanks for playing!

