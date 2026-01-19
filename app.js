let chart = null;
let speciesMetadata = {};

const DATA_URL = 'https://github.com/brnfrnk/ldnontrees/releases/download/v1.0.1/london-ontario-trees.csv.gz';

fetch('species-metadata.json')
    .then(response => response.json())
    .then(data => {
        speciesMetadata = data.species;
        loadTreeData();
    })
    .catch(error => {
        console.warn('Could not load species metadata:', error);
        loadTreeData();
    });

function updateLoadingStatus(message, status = 'loading') {
    const loadingSection = document.getElementById('loadingSection');
    const loadingStatus = document.getElementById('loadingStatus');

    loadingStatus.textContent = message;
    loadingSection.className = 'loading-section';

    if (status === 'success') {
        loadingSection.classList.add('success');
        setTimeout(() => {
            loadingSection.classList.add('hidden');
        }, 2000);
    } else if (status === 'error') {
        loadingSection.classList.add('error');
    }
}

function loadTreeData() {
    updateLoadingStatus('Loading London tree data...');

    fetch(DATA_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.arrayBuffer();
        })
        .then(compressedData => {
            updateLoadingStatus('Decompressing data...', 'loading');
            const decompressed = pako.inflate(new Uint8Array(compressedData), { to: 'string' });
            return decompressed;
        })
        .then(csvContent => {
            updateLoadingStatus('Processing data...', 'loading');
            processCSVData(csvContent);
            updateLoadingStatus('Data loaded successfully!', 'success');
        })
        .catch(error => {
            console.error('Error loading tree data:', error);
            updateLoadingStatus('Error loading data. Please refresh the page.', 'error');
            document.getElementById('speciesList').innerHTML =
                '<p class="placeholder">Failed to load tree data. Please check your connection and refresh the page.</p>';
        });
}

function processCSVData(csvContent) {
    const lines = csvContent.split('\n');
    const headers = parseCSVLine(lines[0]);

    const commonNameIndex = headers.indexOf('CommonName');
    const botanicalIndex = headers.indexOf('Botanical');

    if (commonNameIndex === -1) {
        alert('Error: CommonName column not found in CSV');
        return;
    }

    const speciesMap = new Map();

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = parseCSVLine(lines[i]);
        const commonName = values[commonNameIndex]?.trim();
        const botanical = values[botanicalIndex]?.trim() || '';

        if (!commonName) continue;

        const botanicalBase = extractBaseBotanicalName(botanical);

        if (speciesMap.has(commonName)) {
            const existing = speciesMap.get(commonName);
            existing.count++;
        } else {
            speciesMap.set(commonName, {
                commonName: commonName,
                botanical: botanicalBase,
                count: 1
            });
        }
    }

    const speciesArray = Array.from(speciesMap.values())
        .sort((a, b) => b.count - a.count);

    displaySpeciesList(speciesArray);
    displayChart(speciesArray);
}

function extractBaseBotanicalName(botanical) {
    if (!botanical) return '';
    const parts = botanical.split(' ');
    if (parts.length >= 2) {
        return `${parts[0]} ${parts[1]}`;
    }
    return botanical;
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);

    return result;
}

function displaySpeciesList(speciesArray) {
    const listContainer = document.getElementById('speciesList');
    listContainer.innerHTML = '';

    if (speciesArray.length === 0) {
        listContainer.innerHTML = '<p class="placeholder">No species data found</p>';
        return;
    }

    speciesArray.forEach(species => {
        const metadata = speciesMetadata[species.botanical] || {};

        const item = document.createElement('div');
        item.className = 'species-item';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'species-header';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'species-name';
        nameDiv.textContent = species.commonName;

        if (metadata.status) {
            const badge = document.createElement('span');
            badge.className = `status-badge status-${metadata.status.toLowerCase().replace(/\s+/g, '-')}`;
            badge.textContent = metadata.status;
            nameDiv.appendChild(badge);
        }

        headerDiv.appendChild(nameDiv);

        const countDiv = document.createElement('div');
        countDiv.className = 'species-count';
        countDiv.textContent = `${species.count.toLocaleString()} trees`;

        item.appendChild(headerDiv);
        item.appendChild(countDiv);

        if (metadata.alsoKnownAs && metadata.alsoKnownAs.length > 0) {
            const alsoKnownDiv = document.createElement('div');
            alsoKnownDiv.className = 'species-also-known';
            alsoKnownDiv.textContent = `Also known as: ${metadata.alsoKnownAs.join(', ')}`;
            item.appendChild(alsoKnownDiv);
        }

        if (metadata.notes) {
            const notesDiv = document.createElement('div');
            notesDiv.className = 'species-notes';
            notesDiv.textContent = metadata.notes;
            item.appendChild(notesDiv);
        }

        if (metadata.links && Object.keys(metadata.links).length > 0) {
            const linksDiv = document.createElement('div');
            linksDiv.className = 'species-links';

            Object.entries(metadata.links).forEach(([key, url]) => {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = formatLinkText(key);
                linksDiv.appendChild(link);
            });

            item.appendChild(linksDiv);
        }

        listContainer.appendChild(item);
    });
}

function formatLinkText(key) {
    const linkTextMap = {
        'ontarioTreeAtlas': 'Ontario Tree Atlas',
        'moreInfo': 'More Info',
        'invasiveInfo': 'Invasive Species Info',
        'reforestLondon': 'ReForest London',
        'emeraldAshBorer': 'Emerald Ash Borer Info',
        'ontarioGov': 'Ontario.ca'
    };
    return linkTextMap[key] || key;
}

function displayChart(speciesArray) {
    const top20 = speciesArray.slice(0, 20);

    const labels = top20.map(s => s.commonName);
    const data = top20.map(s => s.count);

    const ctx = document.getElementById('speciesChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Trees',
                data: data,
                backgroundColor: 'rgba(74, 124, 44, 0.8)',
                borderColor: 'rgba(45, 80, 22, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Top 20 Tree Species by Count',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#2d5016'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}
