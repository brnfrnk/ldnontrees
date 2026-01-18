# London, Ontario Trees

<!-- Badges -->
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/brnfrnk/ldnontrees.svg)](https://github.com/brnfrnk/ldnontrees/issues)
[![GitHub Stars](https://img.shields.io/github/stars/brnfrnk/ldnontrees.svg)](https://github.com/brnfrnk/ldnontrees/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/brnfrnk/ldnontrees.svg)](https://github.com/brnfrnk/ldnontrees/network)

> An interactive web application to explore and learn about tree species managed by the City of London, Ontario.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
- [Usage](#usage)
- [Documentation](#documentation)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Building](#building)
  - [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Overview

This project aims to build awareness of the diverse tree species in London, Ontario by providing an accessible, interactive platform to explore the city's urban forest. Using open data from the City of London's forestry department (nearly 200,000 tree records), the app helps residents:
- Discover what trees are in their community
- Learn which species are most common
- Build awareness of urban forestry efforts
- (Future) Learn about native, invasive, and at-risk species

The current MVP provides a foundation for future educational features.

### MVP Features

This initial release includes:
- Auto-load tree data from GitHub Releases (200,000 tree records)
- Browse all tree species with counts
- Visualize the top 20 species in an interactive bar chart
- Educational information with species status badges

## Features

### Current (MVP)
- **Auto-Load Data**: Automatically loads ~200,000 tree records from GitHub Releases
- **Species List**: Complete scrollable list of all tree species sorted by count
- **Interactive Chart**: Horizontal bar graph showing top 20 most common species
- **Species Metadata**: Status badges (Native, Invasive, At Risk, Cultivar) with educational information
- **Educational Links**: Direct links to Ontario Tree Atlas and species information resources
- **Responsive Design**: Works on desktop and mobile devices
- **No Backend Required**: Pure HTML/CSS/JavaScript, runs entirely in browser

### Planned Enhancements
- **Sort & Filter**: By species name, count, location, diameter
- **Expanded Metadata**: Complete all species in metadata database
- **Detailed Species Pages**: Expand/collapse or navigate to learn more about each tree
- **Map Integration**: Geographic visualization of tree locations
- **Search**: Quick find functionality
- **Enhanced Educational Content**: Care guides, identification tips, ecological benefits

## Getting Started

### Prerequisites

You only need a modern web browser:
- Chrome, Firefox, Safari, or Edge
- JavaScript enabled
- No server or dependencies required

### Installation

```bash
# Clone the repository
git clone https://github.com/brnfrnk/ldnontrees.git

# Navigate to the project directory
cd ldnontrees
```

That's it! No build process or dependencies to install.

### Quick Start

1. **Open the app**: Open `index.html` in your web browser (double-click or right-click → Open With → Browser)

2. **Data loads automatically**: The app will automatically fetch and load the tree data from GitHub Releases

3. **Explore**: Scroll through the species list and view the interactive bar chart

### Setting Up the Data (Maintainers)

The app loads data from a GitHub Release. To set this up:

1. **Create a release**: Go to [Releases](https://github.com/brnfrnk/ldnontrees/releases) → "Create a new release"
2. **Tag version**: Use `v1.0.0` (must match the version in `app.js`)
3. **Upload file**: Attach `london-ontario-trees.csv` (your 54MB Forestry.csv renamed)
4. **Publish**: The app will automatically fetch from the release URL

## Usage

### Data Source

The app uses data from the City of London's Forestry department (2019 dataset, ~200,000 tree records). The data is hosted on GitHub Releases for easy access and versioning.

**CSV Format:**
- **CommonName**: The common name of the tree species (e.g., "Maple, Sugar")
- **Botanical**: Scientific name (e.g., "Acer saccharum") - used for metadata matching
- Additional columns: GIS_ID, Diameter, On_Street, Location, Status, Insp_Date, etc.

### Updating the Data

To update the tree data with new information:

1. Edit `london-ontario-trees.csv` with updated tree information
2. Create a new GitHub Release (e.g., `v1.0.1`)
3. Upload the updated CSV file
4. Update `DATA_URL` in `app.js` to point to the new version

**Future**: Community contributions via GitHub Issues or Pull Requests (see [Roadmap](#roadmap))

### Files Included

- `index.html` - Main application structure
- `app.js` - Data fetching, CSV parsing, and chart rendering
- `styles.css` - Styling and responsive layout
- `species-metadata.json` - Species information database (native status, links, notes)
- `sample-data.csv` - 10-row sample for testing
- `README.md` - This documentation
- `CLAUDE.md` - Guide for AI assistants working with this codebase

**Note**: The main dataset (`london-ontario-trees.csv`) is hosted on GitHub Releases due to its 54MB size.

### Species Metadata

The app includes a `species-metadata.json` file that provides educational information matched to tree species by their botanical (scientific) name. For each species, the metadata includes:

- **Status**: Native, Invasive, Native - At Risk, or Cultivar
- **Also Known As**: Alternative common names
- **Notes**: Educational information about the species
- **Links**: Resources for learning more (Ontario Tree Atlas, invasive species info, etc.)

The metadata database currently includes common Southwest Ontario species and can be expanded as needed.

## Documentation

Comprehensive documentation is available:

- **[API Documentation](docs/api/)**: Detailed API reference
- **[User Guide](docs/guide/)**: Step-by-step tutorials and guides
- **[Architecture](docs/architecture/)**: System design and architecture
- **[CLAUDE.md](CLAUDE.md)**: Guide for AI assistants working with this codebase

## Development

### Project Structure

```
.
├── index.html           # Main application page
├── app.js               # JavaScript logic (CSV parsing, charts)
├── styles.css           # Styling and layout
├── sample-data.csv      # Sample dataset for testing
├── README.md            # This file
└── CLAUDE.md            # AI assistant guide
```

### Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Grid layout, custom properties, responsive design
- **Vanilla JavaScript**: ES6+ features, no frameworks
- **Chart.js**: Data visualization library (loaded via CDN)

### Making Changes

Since there's no build process:

1. Edit the files directly in your text editor
2. Refresh your browser to see changes
3. Use browser DevTools for debugging

### Key Functions

**app.js** contains:
- `loadTreeData()`: Fetches CSV from GitHub Releases
- `processCSVData()`: Parses CSV and counts species
- `parseCSVLine()`: Handles CSV parsing with quoted fields
- `displaySpeciesList()`: Renders the species list with metadata
- `displayChart()`: Creates the Chart.js bar graph
- `updateLoadingStatus()`: Manages loading indicator states

### Extending the App

The code is structured for easy expansion:

**Adding filters:**
```javascript
// In processCSVData, filter before counting
if (diameter > minDiameter) {
    // count species
}
```

**Adding species metadata:**
```javascript
const speciesInfo = {
    'Maple, Sugar': { native: true, atRisk: false },
    // ... more species
};
```

**Adding sorting:**
```javascript
// Sort alphabetically instead of by count
speciesArray.sort((a, b) => a.commonName.localeCompare(b.commonName));
```

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the code style guidelines
   - Add tests for new features
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Project Maintainer**: [Your Name](https://github.com/brnfrnk)

- **GitHub**: [@brnfrnk](https://github.com/brnfrnk)
- **Email**: your.email@example.com
- **Website**: https://yourwebsite.com

**Project Link**: [https://github.com/brnfrnk/ldnontrees](https://github.com/brnfrnk/ldnontrees)

## Acknowledgments

- **City of London, Ontario** for providing open forestry data
- **Chart.js** for the excellent charting library
- Thanks to all [contributors](https://github.com/brnfrnk/ldnontrees/graphs/contributors) who help improve this project
- Inspired by the need to connect urban residents with their natural environment

---

**Note**: This project is under active development. Features and APIs may change.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## Roadmap

### v1.0 - MVP (Current)
- [x] Auto-load data from GitHub Releases
- [x] Species list with counts (~200,000 trees)
- [x] Top 20 bar chart visualization
- [x] Species metadata with Native/Invasive/At Risk badges
- [x] Educational links to Ontario Tree Atlas and resources
- [x] Loading indicator with status messages

### v1.1 - Enhanced Interaction
- [ ] Sort by name or count
- [ ] Filter by species characteristics
- [ ] Search functionality
- [ ] Download/export capability
- [ ] GitHub Issues template for community tree updates
- [ ] Data versioning and update workflow

### v1.2 - Educational Features
- [ ] Expand species metadata to cover all species in dataset
- [ ] Species detail pages with expand/collapse
- [ ] Care and identification guides
- [ ] Ecological benefit information
- [ ] Images and visual identification aids

### v1.3 - Geographic Features
- [ ] Map visualization of tree locations
- [ ] Filter by neighborhood/street
- [ ] Proximity search
- [ ] Street tree finder

See [open issues](https://github.com/brnfrnk/ldnontrees/issues) for detailed feature requests and bugs

## Support

If you encounter any issues or have questions:

- **Bug Reports**: [Create an issue](https://github.com/brnfrnk/ldnontrees/issues/new?template=bug_report.md)
- **Feature Requests**: [Create an issue](https://github.com/brnfrnk/ldnontrees/issues/new?template=feature_request.md)
- **Tree Data Updates**: Report removed or planted trees via GitHub Issues (coming soon)
- **Discussions**: [GitHub Discussions](https://github.com/brnfrnk/ldnontrees/discussions)

---

**Star this repository** if you find it helpful!
