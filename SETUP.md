# Git Setup Guide

This guide will help you set up and push the Snake Game to your GitHub repository.

## Prerequisites

- [Git](https://git-scm.com/downloads) installed on your system
- [GitHub account](https://github.com/signup) (free)
- Administrator access to your local repository

## Initial Setup (First Time Only)

### Step 1: Create a Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it: `snake-game`
4. Add description: `Classic Snake game built with vanilla JavaScript`
5. Choose **Public** or **Private**
6. **Do NOT** initialize with README (we already have one)
7. Click **Create repository**

### Step 2: Configure Git (First Time Users)

```bash
# Set your name and email (used for all commits)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global user.name
git config --global user.email
```

### Step 3: Initialize and Push to GitHub

Navigate to your Snake folder and run:

```bash
cd C:\Workspaces\Snake

# Check current git status
git status

# Stage all files
git add .

# Show what will be committed
git status

# Create first commit
git commit -m "Initial commit: Snake game with fullscreen UI and responsive controls"

# Add GitHub as remote repository
# Replace USERNAME with your GitHub username
git remote add origin https://github.com/USERNAME/snake-game.git

# Rename branch to main (GitHub default)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Common Git Workflows

### Adding Changes (After Initial Setup)

```bash
# See what changed
git status

# Stage specific files
git add js/game.js css/styles.css

# Or stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: add fullscreen mode and improve mobile controls"

# Push to GitHub
git push origin main
```

### Creating a Feature Branch

```bash
# Create and switch to new branch
git checkout -b feature/high-scores

# Make your changes...
git add .
git commit -m "feat: add high score persistence with localStorage"

# Push to GitHub
git push origin feature/high-scores

# Then create a Pull Request on GitHub
```

### Keeping Local Copy Up-to-Date

```bash
# Fetch latest from GitHub
git fetch origin

# Update your local branch
git pull origin main
```

## File Structure for Git

Your repository should look like this:

```
snake-game/
├── .git/                  # Git internal folder (auto-created)
├── .gitignore             # Files to ignore
├── .gitattributes         # Line ending rules
├── index.html             # Main entry point
├── package.json           # Project metadata
├── LICENSE                # MIT License
├── README.md              # Project documentation
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # Contribution guidelines
├── SETUP.md               # This file
├── css/
│   └── styles.css         # Game styling
├── js/
│   ├── game.js            # Core game logic
│   ├── renderer.js        # Canvas rendering
│   ├── input.js           # Input handling
│   └── app.js             # Application setup
└── test/
    └── game.test.js       # Unit tests
```

## File Status After Initial Commit

After pushing, all tracked files should show as committed (green/checked).

Untracked files (in .gitignore):
- `node_modules/` - If you install npm packages
- `.vscode/` - VS Code settings
- `*.log` - Error logs

## Useful Git Commands

### View History
```bash
# See all commits
git log

# See just recent commits with one line each
git log --oneline -10

# See who changed what
git blame js/game.js
```

### Undoing Changes
```bash
# Undo unstaged changes in a file
git checkout -- js/game.js

# Undo all unstaged changes
git checkout -- .

# Undo staged changes (keep file changes)
git reset HEAD index.html

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - CAREFUL!
git reset --hard HEAD~1
```

### Branching
```bash
# List all branches
git branch

# Create new branch
git branch feature/new-feature

# Switch to branch
git checkout feature/new-feature

# Create and switch in one command
git checkout -b feature/new-feature

# Delete branch
git branch -d feature/old-feature

# Force delete
git branch -D feature/broken-feature
```

### Merging
```bash
# Switch to main branch
git checkout main

# Merge feature into main
git merge feature/new-feature

# Delete merged branch
git branch -d feature/new-feature

# Push merged changes
git push origin main
```

## Authentication

### HTTPS (Recommended for Beginners)
When pushing, you may be asked for credentials:
- Username: Your GitHub username
- Password: Your GitHub personal access token (not password!)

To create a personal access token:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Select `repo` scope
4. Copy and save the token (use as password when git asks)

### SSH (Advanced)
For passwordless authentication:

```bash
# Generate SSH key (run once)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Follow prompts, press Enter for defaults

# Add SSH key to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to GitHub
# Windows: type .ssh/id_ed25519.pub | clip
# Then GitHub → Settings → SSH and GPG keys → New SSH key
```

Then use SSH URLs instead of HTTPS:
```bash
# Instead of https://
git remote add origin git@github.com:USERNAME/snake-game.git
```

## Troubleshooting

### "Remote origin already exists"
```bash
# Remove existing remote
git remote rm origin

# Add correct remote
git remote add origin https://github.com/USERNAME/snake-game.git
```

### "Error: fatal: 'origin' does not appear to be a 'git' repository"
```bash
# Check remote is set correctly
git remote -v

# Should output:
# origin  https://github.com/USERNAME/snake-game.git (fetch)
# origin  https://github.com/USERNAME/snake-game.git (push)
```

### "Failed authentication"
- Verify username is correct
- Use personal access token instead of password
- For SSH, ensure key is added to ssh-agent

### "Permission denied (publickey)"
```bash
# SSH authentication failed - reinstall SSH key or use HTTPS
# Or check SSH is set up correctly:
ssh -T git@github.com
```

### File Changes After Commit
```bash
# Accidentally modified a file? See changes:
git diff js/game.js

# Discard changes and restore file:
git checkout -- js/game.js
```

## Collaborative Workflow

### If Someone Else Updates the Repo

```bash
# Fetch latest changes without merging
git fetch origin

# See differences
git log --oneline main..origin/main

# Update your local branch
git pull origin main
```

### Creating a Pull Request

1. Push your feature branch:
   ```bash
   git push origin feature/new-feature
   ```

2. Go to GitHub repository

3. Click "Compare & pull request"

4. Add title and description

5. Click "Create pull request"

6. Team reviews and merges

## Best Practices

### Commit Messages
```bash
# Good - Clear, descriptive
git commit -m "fix: prevent snake from moving backwards into itself"

# Bad - Vague
git commit -m "bug fix"
```

### Commit Frequency
- Commit logically related changes together
- Commit after each feature/fix is complete
- Don't commit broken code

### Before Pushing
```bash
# Review your changes
git status
git diff

# Make sure tests pass
node test/game.test.js

# Test in browser
python -m http.server 8000
```

### Regular Pushes
- Push at least daily
- Push before ending work day
- Push after completing features

## Useful References

- [GitHub Docs](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)
- [Git Cheat Sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)

---

**Ready to push?** Follow the "Initial Setup" section above and you'll be live on GitHub! 🚀
