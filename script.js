// Sample data
const sampleEvents = [
    {
        id: 1,
        title: "Summer Music Festival",
        date: "2024-07-15",
        time: "18:00",
        location: "Mumbai",
        category: "music",
        price: 1500,
        description: "A spectacular evening of live music featuring local and international artists.",
        maxParticipants: 5000,
        registeredCount: 1250
    },
    {
        id: 2,
        title: "Contemporary Art Exhibition",
        date: "2024-07-20",
        time: "10:00",
        location: "Pune",
        category: "art",
        price: 500,
        description: "Explore the latest works by emerging contemporary artists.",
        maxParticipants: 200,
        registeredCount: 87
    },
    {
        id: 3,
        title: "Comedy Night Live",
        date: "2024-07-22",
        time: "20:00",
        location: "Online",
        category: "comedy",
        price: 300,
        description: "An evening of laughter with top comedians from across the country.",
        maxParticipants: 1000,
        registeredCount: 456
    },
    {
        id: 4,
        title: "Traditional Dance Workshop",
        date: "2024-07-25",
        time: "14:00",
        location: "Kolhapur",
        category: "dance",
        price: 800,
        description: "Learn traditional Indian dance forms from master practitioners.",
        maxParticipants: 50,
        registeredCount: 23
    },
    {
        id: 5,
        title: "Photography Workshop",
        date: "2024-07-28",
        time: "09:00",
        location: "Mumbai",
        category: "workshop",
        price: 1200,
        description: "Master the art of photography with hands-on training and expert guidance.",
        maxParticipants: 30,
        registeredCount: 18
    }
];

const sampleArtists = [
    {
        id: 1,
        name: "Arjun Mehta",
        genre: "Folk Music",
        category: "music",
        bio: "A passionate folk musician with 15 years of experience.",
        upcomingShows: 3
    },
    {
        id: 2,
        name: "Priya Sharma",
        genre: "Contemporary Art",
        category: "art",
        bio: "Award-winning contemporary artist known for abstract paintings.",
        upcomingShows: 2
    },
    {
        id: 3,
        name: "Rahul Comedy",
        genre: "Stand-up Comedy",
        category: "comedy",
        bio: "Popular stand-up comedian with millions of YouTube views.",
        upcomingShows: 5
    },
    {
        id: 4,
        name: "Dance Collective",
        genre: "Classical Dance",
        category: "dance",
        bio: "A group dedicated to preserving and promoting classical dance forms.",
        upcomingShows: 1
    }
];

// Global state
let currentUser = null;
let userBookings = [];
let currentFilter = 'all';
let currentEvents = [...sampleEvents];
let currentArtists = [...sampleArtists];

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';

    // Save theme preference
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load theme preference
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) themeToggle.innerHTML = '☀️';
    }
});

// Update statistics
function updateStats() {
    const totalEventsEl = document.getElementById('total-events');
    const totalArtistsEl = document.getElementById('total-artists');
    const totalUsersEl = document.getElementById('total-users');

    if (totalEventsEl) totalEventsEl.textContent = currentEvents.length;
    if (totalArtistsEl) totalArtistsEl.textContent = currentArtists.length;
    if (totalUsersEl) totalUsersEl.textContent = userBookings.length;
}

// Filter events
function filterEvents(category) {
    currentFilter = category;

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Find and activate the clicked button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.textContent.toLowerCase() === category ||
            (category === 'all' && btn.textContent.toLowerCase() === 'all')) {
            btn.classList.add('active');
        }
    });

    // Filter and render events
    if (category === 'all') {
        currentEvents = [...sampleEvents];
    } else {
        currentEvents = sampleEvents.filter(event => event.category === category);
    }

    renderEvents();
    updateStats();
}

// Render events
function renderEvents() {
    const eventsContainer = document.getElementById('events-grid');
    const featuredContainer = document.getElementById('featured-events');
    const eventsCount = document.getElementById('events-count');

    if (eventsCount) {
        eventsCount.textContent = `Showing ${currentEvents.length} events`;
    }

    const eventHTML = currentEvents.map(event => `
        <div class="event-card">
            <div class="event-image">
                ${event.title.charAt(0).toUpperCase()}
            </div>
            <div class="event-content">
                <div class="event-date">${formatDate(event.date)} • ${event.time}</div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-location">📍 ${event.location}</div>
                <p>${event.description}</p>
                <div class="price-breakdown">
                    <span><strong>₹${event.price}</strong></span>
                    <span>${event.registeredCount}/${event.maxParticipants} registered</span>
                </div>
                <button class="btn btn-primary mt-1" onclick="showEventDetails(${event.id})">
                    View Details
                </button>
            </div>
        </div>
    `).join('');

    if (eventsContainer) eventsContainer.innerHTML = eventHTML;
    if (featuredContainer) featuredContainer.innerHTML = eventHTML;
}

// Render artists
function renderArtists(filterCategory = 'all') {
    const artistsContainer = document.getElementById('artists-grid');
    const featuredContainer = document.getElementById('featured-artists');

    let filteredArtists = filterCategory === 'all' ? currentArtists :
        currentArtists.filter(artist => artist.category === filterCategory);

    const artistHTML = filteredArtists.map(artist => `
        <div class="artist-card">
            <div class="artist-avatar">
                ${artist.name.charAt(0)}
            </div>
            <h3 class="artist-name">${artist.name}</h3>
            <div class="artist-genre">${artist.genre}</div>
            <p>${artist.bio}</p>
            <div class="mt-1">
                <small>${artist.upcomingShows} upcoming shows</small>
            </div>
            <button class="btn btn-secondary mt-1" onclick="viewArtist(${artist.id})">
                View Profile
            </button>
        </div>
    `).join('');

    if (artistsContainer) artistsContainer.innerHTML = artistHTML;
    if (featuredContainer) featuredContainer.innerHTML = artistHTML;
}

// Show event details
function showEventDetails(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    if (!event) return;

    const content = `
        <h2>${event.title}</h2>
        <div class="event-date">${formatDate(event.date)} • ${event.time}</div>
        <div class="event-location">📍 ${event.location}</div>
        <div class="event-category">${event.category.toUpperCase()}</div>
        <p>${event.description}</p>
        <div class="payment-summary">
            <div class="price-breakdown">
                <span>Ticket Price:</span>
                <span>₹${event.price}</span>
            </div>
            <div class="price-breakdown">
                <span>Booking Fee:</span>
                <span>₹${Math.round(event.price * 0.1)}</span>
            </div>
            <div class="price-breakdown total-price">
                <span>Total:</span>
                <span>₹${event.price + Math.round(event.price * 0.1)}</span>
            </div>
        </div>
        <div class="mt-1">
            <span>${event.registeredCount}/${event.maxParticipants} participants</span>
        </div>
        <button class="btn btn-success mt-1" onclick="bookEvent(${event.id})">
            Book Now
        </button>
    `;

    const detailsContent = document.getElementById('event-details-content');
    if (detailsContent) {
        detailsContent.innerHTML = content;
        showModal('event-details');
    }
}

// Book event
function bookEvent(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    if (!event) return;

    // Populate payment modal
    const summary = `
        <h3>${event.title}</h3>
        <div class="price-breakdown">
            <span>Ticket Price:</span>
            <span>₹${event.price}</span>
        </div>
        <div class="price-breakdown">
            <span>Booking Fee (10%):</span>
            <span>₹${Math.round(event.price * 0.1)}</span>
        </div>
        <div class="price-breakdown total-price">
            <span>Total Amount:</span>
            <span>₹${event.price + Math.round(event.price * 0.1)}</span>
        </div>
    `;

    const paymentSummary = document.getElementById('payment-summary');
    if (paymentSummary) {
        paymentSummary.innerHTML = summary;
        hideModal('event-details');
        showModal('payment');
    }
}

// Process payment
function processPayment(e) {
    e.preventDefault();

    // Simulate payment processing
    const loadingHTML = `
        <div class="loading">
            <div class="spinner"></div>
            Processing payment...
        </div>
    `;

    e.target.innerHTML = loadingHTML;

    setTimeout(() => {
        hideModal('payment');
        showAlert('Payment successful! Your booking confirmation has been sent to your email.', 'success');

        // Reset form
        e.target.reset();
        e.target.innerHTML = `
            <div class="form-group">
                <label>Card Number</label>
                <input type="text" class="form-control card-input" placeholder="1234 5678 9012 3456" maxlength="19" required>
            </div>
            <div class="grid grid-2">
                <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="text" class="form-control" placeholder="MM/YY" maxlength="5" required>
                </div>
                <div class="form-group">
                    <label>CVV</label>
                    <input type="text" class="form-control" placeholder="123" maxlength="3" required>
                </div>
            </div>
            <div class="form-group">
                <label>Cardholder Name</label>
                <input type="text" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success">Complete Payment</button>
        `;
    }, 2000);
}

// Modal functions
function showModal(modalName) {
    const modal = document.getElementById(modalName + '-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalName) {
    const modal = document.getElementById(modalName + '-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Calendar functions
function renderCalendar() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const calendarMonthYear = document.getElementById('calendar-month-year');
    if (calendarMonthYear) {
        calendarMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let calendarHTML = '';

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day"></div>';
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = sampleEvents.some(event => event.date === dateStr);

        calendarHTML += `
            <div class="calendar-day ${hasEvent ? 'has-event' : ''}" onclick="showDayEvents('${dateStr}')">
                ${day}
                ${hasEvent ? '<br><small>Events</small>' : ''}
            </div>
        `;
    }

    const calendarDays = document.getElementById('calendar-days');
    if (calendarDays) {
        calendarDays.innerHTML = calendarHTML;
    }
}

// View artist
function viewArtist(artistId) {
    const artist = sampleArtists.find(a => a.id === artistId);
    if (!artist) return;

    const content = `
        <div class="text-center">
            <div class="artist-avatar" style="margin: 0 auto 2rem auto;">
                ${artist.name.charAt(0)}
            </div>
            <h2>${artist.name}</h2>
            <p class="artist-genre">${artist.genre}</p>
            <p>${artist.bio}</p>
            <div class="mt-2">
                <strong>${artist.upcomingShows} Upcoming Shows</strong>
            </div>
            <button class="btn btn-primary mt-1" onclick="hideModal('artist-details')">Follow Artist</button>
        </div>
    `;

    const detailsContent = document.getElementById('artist-details-content');
    if (detailsContent) {
        detailsContent.innerHTML = content;
        showModal('artist-details');
    } else {
        // Fallback for event-details modal
        const eventDetailsContent = document.getElementById('event-details-content');
        if (eventDetailsContent) {
            eventDetailsContent.innerHTML = content;
            showModal('event-details');
        }
    }
}

// Initialize Three.js background
let scene, camera, renderer, particles;

function initThreeJS() {
    const canvas = document.getElementById('three-bg');
    if (!canvas) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x0d6efd,
        size: 0.02
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        if (particles) {
            particles.rotation.x += 0.001;
            particles.rotation.y += 0.002;
        }

        renderer.render(scene, camera);
    }

    animate();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (renderer && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Utility functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '300px';

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Card input formatting
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('card-input')) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
    }
});
