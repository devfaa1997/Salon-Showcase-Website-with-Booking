// Gallery images - add new images to /assets folder and update this array
const galleryImages = [
    'assets/asset 0.jpeg',
    'assets/asset 1.jpeg',
    'assets/asset 5.jpeg',
    'assets/asset 7.jpeg',
    'assets/asset 8.jpeg',
    'assets/asset 10.jpeg',
    'assets/asset 12.jpeg',
    'assets/asset 13.jpeg',
    'assets/asset 14.jpeg',
    'assets/asset 15.jpeg',
    'assets/asset 16.jpeg',
    'assets/asset 17.jpeg',
    'assets/asset 21.jpeg',
    'assets/asset 22.jpeg',
    'assets/asset 23.jpeg',
    'assets/asset 24.jpeg',
    'assets/asset 25.jpeg',
    'assets/asset 26.jpeg',
    'assets/asset 27.jpeg',
    'assets/asset 28.jpeg',
    'assets/asset 30.jpeg',
    'assets/asset 32.jpeg',
    'assets/asset 33.jpeg',
    'assets/asset 34.jpeg',
    'assets/asset 35.jpeg',
    'assets/asset 36.jpeg',
    'assets/asset 38.jpeg',
    'assets/asset 39.jpeg'
];

const INITIAL_IMAGES = 6;
let showingAll = false;

// Populate gallery
const galleryGrid = document.getElementById('galleryGrid');

if (galleryGrid) {
    // Show initial 6 images
    function renderGallery() {
        galleryGrid.innerHTML = '';
        const imagesToShow = showingAll ? galleryImages : galleryImages.slice(0, INITIAL_IMAGES);
        
        imagesToShow.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${src}" alt="Hair style ${index + 1}" loading="lazy">`;
            item.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(item);
        });
    }
    
    renderGallery();
    
    // View More button
    const viewMoreBtn = document.getElementById('viewMoreGallery');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            showingAll = !showingAll;
            renderGallery();
            this.textContent = showingAll ? 'Show Less' : 'View More Images';
            
            // Scroll to gallery
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    lightboxImg.src = galleryImages[currentIndex];
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

if (overlay) {
    overlay.addEventListener('click', toggleMenu);
}

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Navigation scroll effect
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .section-header, .about-grid, .contact-grid').forEach(el => {
    observer.observe(el);
});

// Calendly Booking Functions
const calendlyBaseUrl = 'https://calendly.com/YOUR_CALENDLY_LINK';

function openCalendly(serviceType) {
    // Map service types to Calendly event types
    const serviceUrls = {
        'consultation': calendlyBaseUrl + '/consultation',
        'haircut': calendlyBaseUrl + '/haircut-style',
        'color': calendlyBaseUrl + '/color-treatments'
    };
    
    const url = serviceUrls[serviceType] || calendlyBaseUrl;
    
    // Try to open Calendly popup
    if (typeof Calendly !== 'undefined' && Calendly.initPopupWidget) {
        Calendly.initPopupWidget({ url: url });
    } else {
        // Fallback: scroll to Calendly widget
        document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize Calendly widget when page loads
window.addEventListener('load', function() {
    // Preload Calendly assets
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
});

// Booking Form Handling
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');

if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = bookingForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('php/book.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                bookingForm.style.display = 'none';
                bookingSuccess.style.display = 'block';
                bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert(result.message || 'Something went wrong. Please try again.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please try again or contact us directly.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Set minimum date to today
const dateInput = document.getElementById('preferredDate');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}
