// Initialize map
const map = L.map('map').setView([37.8, -96], 4); // Centered on the U.S.

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

let markerDetails = [];

// Generate random markers and add them to the map
function addRandomMarker(markerNumber) {
    const lat = getRandomInRange(30, 35, 3); // Latitude range
    const lng = getRandomInRange(-90, -100, 3); // Longitude range

    const marker = L.marker([lat, lng]).addTo(map);
    
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || "Unknown";

            // Format the popup content
            const popupContent = `<strong>Marker ${markerNumber}: Latitude ${lat}, Longitude ${lng}</strong><br><strong style="font-size: smaller;">Locality: ${locality}</strong>`;
            marker.bindPopup(popupContent).openPopup();

            markerDetails[markerNumber - 1] = `<p><strong>Marker ${markerNumber}: Latitude ${lat}, Longitude ${lng}<br>Locality: ${locality}</strong></p>`;
            
            if (markerDetails.filter(Boolean).length === 3) {
                const markerInfo = document.getElementById('marker-info');
                markerInfo.innerHTML = markerDetails.join("");
            }
        })
        .catch(error => console.error('Error:', error));
}

// Create three random markers with labels
for (let i = 1; i <= 3; i++) {
    addRandomMarker(i);
}
