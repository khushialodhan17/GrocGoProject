// Initialize map variables
let map, marker, currentLat, currentLng;

// Google Maps API Autocomplete setup
let autocomplete;
function initializeAutocomplete() {
    const input = document.getElementById('manual-location');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            alert("No details available for the input.");
            return;
        }
        const location = place.geometry.location;
        // Update map view and marker based on the selected location from Google Places
        map.setView([location.lat(), location.lng()], 13); // Update map view
        if (marker) {
            marker.setLatLng([location.lat(), location.lng()]); // Update marker position
        } else {
            marker = L.marker([location.lat(), location.lng()]).addTo(map); // Create new marker
        }
    });
}

// Geolocation to get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;
            // Set map view at the current location
            map.setView([currentLat, currentLng], 13);
            if (marker) {
                marker.setLatLng([currentLat, currentLng]); // Update existing marker
            } else {
                marker = L.marker([currentLat, currentLng]).addTo(map)
                    .bindPopup("You are here").openPopup(); // Add new marker at current location
            }
        }, function() {
            alert("Geolocation failed. Please enter manually.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to initialize the map using Leaflet
function initializeMap() {
    map = L.map('map').setView([28.6139, 77.2090], 10); // Default to New Delhi
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);
}

// Event listener for the "Type Manually" or "Use Current Location" option
document.getElementById('location-method').addEventListener('change', function() {
    const method = this.value;
    if (method === 'manual') {
        document.getElementById('manual-input').style.display = 'block'; // Show manual input
        document.getElementById('current-location').style.display = 'none'; // Hide current location button
    } else if (method === 'current') {
        document.getElementById('manual-input').style.display = 'none'; // Hide manual input
        document.getElementById('current-location').style.display = 'block'; // Show current location button
    } else {
        document.getElementById('manual-input').style.display = 'none'; // Hide manual input if no option selected
        document.getElementById('current-location').style.display = 'none'; // Hide current location button if no option selected
    }
});

// Initialize to hide the current location button initially
document.getElementById('current-location').style.display = 'none';

// Event listener for the "Use Current Location" button
document.getElementById('use-location-btn').addEventListener('click', function() {
    getCurrentLocation();
});

// Initialize the map and autocomplete on page load
window.onload = function() {
    initializeMap();
    initializeAutocomplete();
};


// List of products with links
const products = {
    'Laptop': 'https://example.com/laptop',
    'Smartphone': 'https://example.com/smartphone',
    'Headphones': 'https://example.com/headphones',
    'Smartwatch': 'https://example.com/smartwatch',
    'Tablet': 'https://example.com/tablet'
};

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const query = document.getElementById('searchInput').value.trim();

    if (query in products) {
        // If product found, navigate to its link
        window.location.href = products[query];
    } else {
        alert('Product not found!');
    }
});

