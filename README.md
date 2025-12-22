# Unify - Webflow Project

Webflow JavaScript files and HTML templates for the Unify project.

## 📁 Project Structure

```
Unify/
├── JS/                      # JavaScript modules
│   ├── AI-SEO.js
│   ├── ROI-Calc.js
│   ├── SalesCallNotes.js
│   └── global.js
├── AI-leads.js
├── Email-Coach.js
├── SalesCallNotes.js
├── ai-seo.html
├── Email-Coach.html
├── salescallnotes.html
├── Global-footer.html
├── Global-head.html
├── home-footer.html
└── home-head.html
```

## 🚀 Automated Deployment

This project includes a powerful automated deployment system that handles versioning, changelog management, and GitHub releases.

### Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Make your changes** to any files in the project

3. **Deploy everything in one command:**
```bash
npm run deploy
```

This single command will:
- 📁 Stage all your changes
- 💬 Generate a smart commit message (you can customize it)
- 📝 Commit your changes
- 🏷️ Ask you what type of release (patch/minor/major)
- 📝 Let you add release notes
- 📤 Push to GitHub
- 🚀 Create a new version and GitHub release

### Available Commands

#### Deployment
```bash
npm run deploy          # One command to rule them all! Stage → Commit → Push → Release
```

#### Release Management
```bash
npm run release         # Interactive release (will ask you for version type)
npm run release:patch   # Bug fixes (1.0.0 → 1.0.1)
npm run release:minor   # New features (1.0.0 → 1.1.0)
npm run release:major   # Breaking changes (1.0.0 → 2.0.0)
npm run release:prerelease  # Alpha/Beta releases (1.0.0 → 1.0.1-0)
```

#### Utilities
```bash
npm run version         # Show current version
npm run changelog       # View changelog
```

## 📋 Semantic Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1): Bug fixes, small tweaks
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Prerelease** (1.0.0 → 1.0.1-0): Alpha/Beta releases

## 🔄 Typical Workflow

### Method 1: All-in-One Deploy
```bash
# 1. Make your changes to files
# 2. Run the magic command
npm run deploy

# Follow the interactive prompts:
# - Review staged files
# - Customize commit message if needed
# - Select release type (patch/minor/major)
# - Add release notes
# - Confirm and deploy!
```

### Method 2: Step-by-Step
```bash
# 1. Make your changes
# 2. Stage and commit manually
git add .
git commit -m "feat: your custom message"

# 3. Push to GitHub
git push

# 4. Create a release
npm run release:patch  # or minor/major
```

## 📝 CHANGELOG

All releases are automatically documented in [CHANGELOG.md](./CHANGELOG.md) with:
- Version number
- Release date
- Release notes
- Link to GitHub release

## 🛠️ Requirements

- Node.js (v14 or higher)
- Git
- GitHub CLI (`gh`) - Optional, for automated GitHub releases

### Installing GitHub CLI (Optional)

The automation can create GitHub releases automatically if you have the GitHub CLI installed:

**macOS:**
```bash
brew install gh
gh auth login
```

**Windows:**
```bash
winget install --id GitHub.cli
gh auth login
```

**Linux:**
See [GitHub CLI installation guide](https://github.com/cli/cli#installation)

## 🔐 Authentication

For automated releases to work:
1. Ensure you have push access to the repository
2. If using GitHub CLI for releases, run `gh auth login` first

## 📚 Learn More

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

## 📄 License

MIT

## 👨‍💻 Author

pakgem

## 🔗 Repository

https://github.com/pakgem/unify

