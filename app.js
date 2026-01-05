let chart = null;

document.getElementById('csvFile').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileInfo = document.getElementById('fileInfo');
    fileInfo.textContent = `Loading ${file.name}...`;

    const reader = new FileReader();
    reader.onload = function(e) {
        const csvContent = e.target.result;
        processCSVData(csvContent);
        fileInfo.textContent = `Loaded: ${file.name}`;
    };
    reader.readAsText(file);
}

function processCSVData(csvContent) {
    const lines = csvContent.split('\n');
    const headers = parseCSVLine(lines[0]);

    const commonNameIndex = headers.indexOf('CommonName');

    if (commonNameIndex === -1) {
        alert('Error: CommonName column not found in CSV');
        return;
    }

    const speciesMap = new Map();

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = parseCSVLine(lines[i]);
        const commonName = values[commonNameIndex]?.trim();

        if (!commonName) continue;

        if (speciesMap.has(commonName)) {
            const existing = speciesMap.get(commonName);
            existing.count++;
        } else {
            speciesMap.set(commonName, {
                commonName: commonName,
                count: 1
            });
        }
    }

    const speciesArray = Array.from(speciesMap.values())
        .sort((a, b) => b.count - a.count);

    displaySpeciesList(speciesArray);
    displayChart(speciesArray);
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
        const item = document.createElement('div');
        item.className = 'species-item';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'species-name';
        nameDiv.textContent = species.commonName;

        const countDiv = document.createElement('div');
        countDiv.className = 'species-count';
        countDiv.textContent = `${species.count.toLocaleString()} trees`;

        item.appendChild(nameDiv);
        item.appendChild(countDiv);
        listContainer.appendChild(item);
    });
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
