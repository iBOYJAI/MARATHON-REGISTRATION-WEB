/**
 * Tamil Marathon 2026 - Modular Application Architecture
 * "Attractive Code" Pattern: Module Pattern (IIFE + Namespace)
 */

window.MarathonApp = (function () {

    // --- Configuration ---
    const config = {
        raceDate: new Date('2026-01-25T06:00:00').getTime(),
        galleryImages: [
            'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80',
            'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&q=80',
            'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80',
            'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
            'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
            'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&q=80',
            'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80',
            'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80'
        ]
    };

    /**
     * Module: Countdown Timer
     */
    const CountdownModule = {
        init: function () {
            const container = document.getElementById('countdown');
            if (!container) return;

            this.update();
            setInterval(() => this.update(), 1000);
        },

        update: function () {
            const now = new Date().getTime();
            const distance = config.raceDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('countdown').innerHTML = `
                <div class="time-unit">
                    <span class="time-val">${days}</span>
                    <span class="time-label">Days</span>
                </div>
                <div class="time-unit">
                    <span class="time-val">${hours}</span>
                    <span class="time-label">Hours</span>
                </div>
                <div class="time-unit">
                    <span class="time-val">${minutes}</span>
                    <span class="time-label">Mins</span>
                </div>
                <div class="time-unit">
                    <span class="time-val">${seconds}</span>
                    <span class="time-label">Secs</span>
                </div>
            `;
        }
    };

    /**
     * Module: Gallery System
     */
    const GalleryModule = {
        init: function () {
            const grid = document.getElementById('galleryGrid');
            if (!grid) return;

            grid.innerHTML = config.galleryImages.map(img => `
                <div class="gallery-item">
                    <img src="${img}" alt="Marathon Event">
                    <div class="gallery-overlay">
                        <span style="color:white; font-family:var(--font-display); font-size:1.5rem;">See Memories</span>
                    </div>
                </div>
            `).join('');
        }
    };

    /**
     * Module: Registration Form Handler
     */
    const RegistrationModule = {
        init: function () {
            const form = document.getElementById('registrationForm');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm()) {
                    this.saveRegistration();
                    this.showSuccessNotification();
                }
            });
        },

        validateForm: function () {
            const fullname = document.getElementById('fullname')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const age = document.getElementById('age')?.value;
            const category = document.getElementById('category')?.value;
            const gender = document.getElementById('gender')?.value;

            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-msg').forEach(e => e.style.display = 'none');

            if (!fullname) {
                document.getElementById('error-fullname').style.display = 'block';
                isValid = false;
            }

            if (!email || !email.includes('@')) {
                document.getElementById('error-email').style.display = 'block';
                isValid = false;
            }

            if (!age || age < 10 || age > 100) {
                document.getElementById('error-age').style.display = 'block';
                isValid = false;
            }

            if (!category) {
                document.getElementById('error-category').style.display = 'block';
                isValid = false;
            }

            if (!gender) {
                document.getElementById('error-gender').style.display = 'block';
                isValid = false;
            }

            return isValid;
        },

        saveRegistration: function () {
            const data = {
                fullname: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                age: document.getElementById('age').value,
                category: document.getElementById('category').value,
                gender: document.getElementById('gender').value,
                timestamp: new Date().toISOString()
            };

            const registrations = JSON.parse(localStorage.getItem('marathon_registrations_2026') || '[]');
            registrations.push(data);
            localStorage.setItem('marathon_registrations_2026', JSON.stringify(registrations));
        },

        showSuccessNotification: function () {
            // Create notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95));
                color: white;
                padding: 2rem 3rem;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(16, 185, 129, 0.5);
                z-index: 10000;
                text-align: center;
                animation: slideInScale 0.5s ease-out;
            `;

            notification.innerHTML = `
                <i class="fa-solid fa-circle-check" style="font-size: 4rem; margin-bottom: 1rem; display: block;"></i>
                <h2 style="font-family: var(--font-display); font-size: 2.5rem; margin: 0 0 0.5rem 0;">Registration Successful!</h2>
                <p style="margin: 0; font-size: 1.1rem;">Redirecting to your ticket...</p>
            `;

            document.body.appendChild(notification);

            // Add animation
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes slideInScale {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.5);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 2000);
        }
    };

    /**
     * Module: Scroll Interactions
     */
    const ScrollModule = {
        init: function () {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    };

    /**
     * Module: Contact Form Handler
     */
    const ContactModule = {
        init: function () {
            const form = document.getElementById('contactForm');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm()) {
                    this.sendData();
                }
            });
        },

        validateForm: function () {
            const name = document.getElementById('contact-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim();
            const subject = document.getElementById('contact-subject')?.value.trim();
            const message = document.getElementById('contact-message')?.value.trim();

            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-msg').forEach(e => e.style.display = 'none');

            if (!name) {
                document.getElementById('error-contact-name').style.display = 'block';
                isValid = false;
            }

            if (!email || !email.includes('@')) {
                document.getElementById('error-contact-email').style.display = 'block';
                isValid = false;
            }

            if (!subject) {
                document.getElementById('error-contact-subject').style.display = 'block';
                isValid = false;
            }

            if (!message) {
                document.getElementById('error-contact-message').style.display = 'block';
                isValid = false;
            }

            return isValid;
        },

        sendData: function () {
            // Simulate API call
            const btn = document.querySelector('#contactForm button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#10b981'; // Green success

                setTimeout(() => {
                    document.getElementById('contactForm').reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = ''; // Reset to default

                    // Optional: Show success notification like registration
                    RegistrationModule.showSuccessNotification(); // Reuse if appropriate, or create specific
                }, 2000);
            }, 1500);
        }
    };

    /**
     * Module: Core Initializer
     */
    return {
        init: function () {
            CountdownModule.init();
            GalleryModule.init();
            ScrollModule.init();
            RegistrationModule.init();
            ContactModule.init();
            console.log('MarathonApp Modules Loaded 🚀');
        }
    };

})();

// Initialize Application
document.addEventListener('DOMContentLoaded', MarathonApp.init);
