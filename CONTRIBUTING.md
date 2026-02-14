# Contributing to Snake Game

Thank you for your interest in contributing to the Snake Game project! Here's how you can help.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/yourusername/snake-game.git
   cd snake-game
   ```
3. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Using Python (No dependencies needed)
```bash
python -m http.server 8000
# Open http://localhost:8000
```

### Using Node.js
```bash
npm install -g http-server
http-server
```

### Running Tests
```bash
node test/game.test.js
```

## Code Style Guidelines

### JavaScript
- Use 2-space indentation
- Use `const` by default, `let` for mutable variables
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use meaningful variable names
- Add JSDoc comments for public methods

### CSS
- Use 2-space indentation
- Use lowercase for selectors
- Group related properties together
- Use meaningful class names (BEM naming where appropriate)
- Add comments for sections

### HTML
- Use 4-space indentation
- Use semantic HTML5 tags
- Include proper ARIA labels for accessibility

## Making Changes

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/#123-your-feature
   ```

2. **Make your changes** and test thoroughly:
   ```bash
   # Test your changes in the browser
   python -m http.server 8000
   
   # Run automated tests
   node test/game.test.js
   ```

3. **Follow the checklist**:
   - [ ] Code follows style guidelines
   - [ ] Local tests pass (`npm test`)
   - [ ] No console errors or warnings
   - [ ] Changes work on desktop and mobile
   - [ ] Commit messages are clear and descriptive

## Commit Messages

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add high score persistence with localStorage"
git commit -m "fix: prevent diagonal wrapping bug"
git commit -m "docs: update README with new features"
git commit -m "style: reformat CSS for consistency"
git commit -m "test: add collision detection tests"
```

Format: `type: description`
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting/linting (no code change)
- **refactor**: Code restructure (no feature change)
- **test**: Add/update tests
- **chore**: Build/dependency updates

## Pull Request Process

1. **Update** the README with any new features or changes
2. **Test** thoroughly before submitting
3. **Push** your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
4. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference to any related issues (#123)
   - List of changes made
   - Screenshots/GIFs for UI changes

5. **Respond** to review feedback promptly

## Reporting Issues

When reporting bugs, include:
- **Browser** and **OS** version
- **Steps to reproduce**
- **Expected vs. actual behavior**
- **Screenshots or video** if applicable
- **Console errors** (F12 > Console)

## Feature Requests

When suggesting features:
- **Clear description** of the feature
- **Use case** - why is this useful?
- **Mockups or examples** if applicable
- **Alternative approaches** you've considered

## Areas for Contribution

### High Priority
- Performance optimizations
- Mobile experience improvements
- Accessibility enhancements (WCAG compliance)
- Test coverage improvements
- Browser compatibility fixes

### Medium Priority
- UI/UX improvements
- Documentation updates
- Code refactoring
- New difficulty modes
- Sound effects/audio

### Nice-to-Have
- Themes/customization
- Multiplayer mode
- Advanced features (power-ups, obstacles)
- Localization/i18n
- Advanced analytics

## Code Review

All pull requests must be reviewed and approved before merging. Reviewers will check for:
- Code quality and style
- Test coverage
- Documentation
- Performance impact
- Security implications
- Browser compatibility

## Questions?

Feel free to:
- Open an issue labeled `question`
- Check existing issues and discussions
- Contact the maintainers

Thank you for contributing! 🙏
