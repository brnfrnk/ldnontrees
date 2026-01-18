# London, Ontario Trees

<!-- Badges -->
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/brnfrnk/test.svg)](https://github.com/brnfrnk/test/issues)
[![GitHub Stars](https://img.shields.io/github/stars/brnfrnk/test.svg)](https://github.com/brnfrnk/test/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/brnfrnk/test.svg)](https://github.com/brnfrnk/test/network)

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
- Upload and parse the Forestry.csv dataset
- Browse all tree species with counts
- Visualize the top 20 species in an interactive bar chart

## Features

### Current (MVP)
- **Species List**: Complete scrollable list of all tree species sorted by count
- **Interactive Chart**: Horizontal bar graph showing top 20 most common species
- **CSV Upload**: Client-side CSV parsing (no server required)
- **Species Metadata**: Status badges (Native, Invasive, At Risk, Cultivar) with educational information
- **Educational Links**: Direct links to Ontario Tree Atlas and species information resources
- **Responsive Design**: Works on desktop and mobile devices
- **No Build Required**: Pure HTML/CSS/JavaScript

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
git clone https://github.com/brnfrnk/test.git

# Navigate to the project directory
cd test
```

That's it! No build process or dependencies to install.

### Quick Start

1. **Open the app**: Open `index.html` in your web browser (double-click or right-click → Open With → Browser)

2. **Get the data**: Download the Forestry.csv file from the City of London or use the provided sample data

3. **Load the data**: Click "Load Forestry.csv data" and select your CSV file

4. **Explore**: Scroll through the species list and view the interactive bar chart

## Usage

### Data Format

The app expects a CSV file with at minimum these columns:
- **CommonName**: The common name of the tree species (e.g., "Maple, Sugar")
- **Botanical**: (Optional) Scientific name (e.g., "Acer saccharum")

The full Forestry dataset from the City of London includes additional columns like:
- GIS_ID, Diameter, On_Street, Location, Status, Insp_Date, etc.

### Using Your Own Data

To use this app with different tree data:

1. Ensure your CSV has a `CommonName` column
2. The app will automatically count occurrences of each species
3. Species are sorted by count (most common first)
4. The chart displays the top 20 species

### Files Included

- `index.html` - Main application structure
- `app.js` - CSV parsing, data processing, and chart rendering
- `styles.css` - Styling and responsive layout
- `species-metadata.json` - Species information database (native status, links, notes)
- `sample-data.csv` - 10-row sample for testing
- `README.md` - This documentation
- `CLAUDE.md` - Guide for AI assistants working with this codebase

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
- `handleFileUpload()`: Processes uploaded CSV files
- `processCSVData()`: Parses CSV and counts species
- `parseCSVLine()`: Handles CSV parsing with quoted fields
- `displaySpeciesList()`: Renders the species list
- `displayChart()`: Creates the Chart.js bar graph

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

**Project Link**: [https://github.com/brnfrnk/test](https://github.com/brnfrnk/test)

## Acknowledgments

- **City of London, Ontario** for providing open forestry data
- **Chart.js** for the excellent charting library
- Thanks to all [contributors](https://github.com/brnfrnk/test/graphs/contributors) who help improve this project
- Inspired by the need to connect urban residents with their natural environment

---

**Note**: This project is under active development. Features and APIs may change.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## Roadmap

### v1.0 - MVP (Current)
- [x] CSV upload and parsing
- [x] Species list with counts
- [x] Top 20 bar chart visualization
- [x] Species metadata with Native/Invasive/At Risk badges
- [x] Educational links to Ontario Tree Atlas and resources

### v1.1 - Enhanced Interaction
- [ ] Sort by name or count
- [ ] Filter by species characteristics
- [ ] Search functionality
- [ ] Download/export capability

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

See [open issues](https://github.com/brnfrnk/test/issues) for detailed feature requests and bugs

## Support

If you encounter any issues or have questions:

- **Bug Reports**: [Create an issue](https://github.com/brnfrnk/test/issues/new?template=bug_report.md)
- **Feature Requests**: [Create an issue](https://github.com/brnfrnk/test/issues/new?template=feature_request.md)
- **Discussions**: [GitHub Discussions](https://github.com/brnfrnk/test/discussions)

---

**Star this repository** if you find it helpful!
