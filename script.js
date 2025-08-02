/**
 * Learnify Multi-Page Website - Final Corrected Script
 *
 * This script handles all client-side interactivity, including:
 * - A robust page loading and transition system.
 * - A responsive mobile navigation menu.
 * - A universal popup modal for the "Contact Us" form.
 * - A universal popup modal for the "Enroll Now" button.
 * - The "Meet the Instructors" cursor-following photo effect.
 * - Smooth scrolling for on-page CTAs.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Add the is-loading class to hide the body and keep panels closed initially.
    document.body.classList.add('is-loading');

    // --- 1. Page Load "Opening" Transition ---
    window.addEventListener('load', () => {
        // A short delay ensures the browser has time to apply initial CSS states.
        setTimeout(() => {
            // Removing is-loading triggers the panels to slide out and the body to fade in.
            document.body.classList.remove('is-loading');
        }, 100); 
    });

    // --- 2. Responsive Navigation ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
        });
    }

    // --- 3. Page "Closing" Transition on Link Click ---
    const allLinks = document.querySelectorAll('a');
    const leftPanelText = document.getElementById('left-panel-text');
    const rightPanelText = document.getElementById('right-panel-text');

    allLinks.forEach(link => {
        const isContactTrigger = link.id === 'contact-btn' || link.id === 'contact-btn-mobile';
        const isScrollTrigger = link.id === 'scroll-to-enroll-btn';
        const isEnrollTrigger = link.id === 'enroll-btn';

        if (!isContactTrigger && !isScrollTrigger && !isEnrollTrigger) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || this.target === '_blank') {
                    return;
                }
                
                e.preventDefault();

                const leftText = this.dataset.leftText || '';
                const rightText = this.dataset.rightText || '';

                if (leftPanelText) leftPanelText.textContent = leftText;
                if (rightPanelText) rightPanelText.textContent = rightText;

                document.body.classList.add('is-transitioning');

                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            });
        }
    });

    // --- 4. Universal Contact Popup Logic ---
    const contactPopup = document.getElementById('contact-popup');
    const contactBtn = document.getElementById('contact-btn');
    const contactBtnMobile = document.getElementById('contact-btn-mobile');
    
    if (contactPopup) {
        const closeContactBtn = contactPopup.querySelector('.close-popup-btn');
        const contactBackdrop = contactPopup.querySelector('.popup-backdrop');

        const openContactPopup = (e) => {
            e.preventDefault();
            contactPopup.classList.add('is-visible');
        };

        const closeContactPopup = () => {
            contactPopup.classList.remove('is-visible');
        };

        if (contactBtn) contactBtn.addEventListener('click', openContactPopup);
        if (contactBtnMobile) contactBtnMobile.addEventListener('click', openContactPopup);
        if (closeContactBtn) closeContactBtn.addEventListener('click', closeContactPopup);
        if (contactBackdrop) contactBackdrop.addEventListener('click', closeContactPopup);
    }

    // --- 5. Universal Enroll Now Popup Logic ---
    const enrollPopup = document.getElementById('enroll-popup');
    const enrollBtn = document.getElementById('enroll-btn');

    if (enrollPopup) {
        const closeEnrollBtn = enrollPopup.querySelector('.close-popup-btn');
        const enrollBackdrop = enrollPopup.querySelector('.popup-backdrop');

        const openEnrollPopup = (e) => {
            e.preventDefault();
            enrollPopup.classList.add('is-visible');
        };

        const closeEnrollPopup = () => {
            enrollPopup.classList.remove('is-visible');
        };

        if (enrollBtn) enrollBtn.addEventListener('click', openEnrollPopup);
        if (closeEnrollBtn) closeEnrollBtn.addEventListener('click', closeEnrollPopup);
        if (enrollBackdrop) enrollBackdrop.addEventListener('click', closeEnrollPopup);
    }


    // --- 6. Smooth Scroll for "Start Learning Now" Button ---
    const scrollToEnrollBtn = document.getElementById('scroll-to-enroll-btn');
    const enrollCard = document.getElementById('enroll-card');

    if (scrollToEnrollBtn && enrollCard) {
        scrollToEnrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            enrollCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // --- 7. NEW: Team Page Cursor-Following Photo Effect ---
    const teamList = document.getElementById('team-list');
    const cursorImageContainer = document.getElementById('cursor-image-container');

    if (teamList && cursorImageContainer) {
        const teamMembers = teamList.querySelectorAll('li');

        // Function to move the image container
        const onMouseMove = (e) => {
            cursorImageContainer.style.left = e.clientX + 'px';
            cursorImageContainer.style.top = e.clientY + 'px';
        };
        
        // Add mouse move listener to the whole list for efficiency
        teamList.addEventListener('mousemove', onMouseMove);

        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                const imageUrl = member.getAttribute('data-image');
                cursorImageContainer.style.backgroundImage = `url('${imageUrl}')`;
                cursorImageContainer.classList.add('is-visible');
            });
            
            member.addEventListener('mouseleave', () => {
                cursorImageContainer.classList.remove('is-visible');
            });
        });
    }
});