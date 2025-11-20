// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const header = document.getElementById('header');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            const isExpanded = navbarMenu.classList.contains('active');
            navbarMenu.classList.toggle('active');
            navbarToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Announce menu state to screen readers
            const liveRegion = document.getElementById('aria-live-region');
            if (liveRegion) {
                liveRegion.textContent = !isExpanded ? 'Menu aberto' : 'Menu fechado';
            }
        });
    }

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = event.target.closest('.navbar');
            if (!isClickInsideNav && navbarMenu && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                if (navbarToggle) {
                    navbarToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navbarMenu && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                if (navbarToggle) {
                    navbarToggle.setAttribute('aria-expanded', 'false');
                    navbarToggle.focus();
                }
            }
        });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (header) {
            if (currentScroll > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    if (navbarMenu && navbarMenu.classList.contains('active')) {
                        navbarMenu.classList.remove('active');
                        if (navbarToggle) {
                            navbarToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            }
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Portfolio Slider with Touch Support
    const portfolioSlider = document.getElementById('portfolio-slider');
    if (portfolioSlider) {
        const track = portfolioSlider.querySelector('.portfolio-track');
        const slides = portfolioSlider.querySelectorAll('.portfolio-slide');
        const prevBtn = portfolioSlider.querySelector('.slider-btn-prev');
        const nextBtn = portfolioSlider.querySelector('.slider-btn-next');
        const items = portfolioSlider.querySelectorAll('.portfolio-item');
        
        let currentIndex = 0;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let itemsPerView = window.innerWidth >= 768 ? 4 : window.innerWidth >= 480 ? 3 : 2;
        const totalSlides = slides.length;
        let maxIndex = Math.max(0, totalSlides - itemsPerView);

        function updateItemsPerView() {
            itemsPerView = window.innerWidth >= 768 ? 4 : window.innerWidth >= 480 ? 3 : 2;
            maxIndex = Math.max(0, totalSlides - itemsPerView);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            updateSlider();
        }

        window.addEventListener('resize', updateItemsPerView);

        function updateSlider() {
            const translateX = -(currentIndex * (100 / itemsPerView));
            track.style.transform = `translateX(${translateX}%)`;
            track.style.transition = isDragging ? 'none' : 'transform 0.3s ease';
        }

        // Touch events for swipe
        let touchStartX = 0;
        let touchEndX = 0;

        portfolioSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            isDragging = true;
        }, { passive: true });

        portfolioSlider.addEventListener('touchmove', function(e) {
            if (isDragging) {
                currentX = e.changedTouches[0].screenX - touchStartX;
                const translateX = -(currentIndex * (100 / itemsPerView)) + (currentX / portfolioSlider.offsetWidth * 100);
                track.style.transform = `translateX(${translateX}%)`;
            }
        }, { passive: true });

        portfolioSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            isDragging = false;
            track.style.transition = 'transform 0.3s ease';
            
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentIndex < maxIndex) {
                    // Swipe left - next
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right - previous
                    currentIndex--;
                }
            }
            
            updateSlider();
        }, { passive: true });

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = Math.max(0, currentIndex - 1);
                updateSlider();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = Math.min(maxIndex, currentIndex + 1);
                updateSlider();
            });
        }

        // Portfolio Modal
        const portfolioModal = document.getElementById('portfolio-modal');
        const modalImage = document.getElementById('modal-image');
        const modalClose = portfolioModal?.querySelector('.modal-close');
        const modalPrev = portfolioModal?.querySelector('.modal-nav-prev');
        const modalNext = portfolioModal?.querySelector('.modal-nav-next');
        
        let currentModalIndex = 0;
        const portfolioImages = Array.from(items).map(item => {
            const img = item.querySelector('img');
            return img ? img.src : '';
        }).filter(src => src);

        function openModal(index) {
            if (portfolioModal && modalImage && portfolioImages[index]) {
                currentModalIndex = index;
                modalImage.src = portfolioImages[index];
                modalImage.alt = `Imagem ${index + 1}`;
                portfolioModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal() {
            if (portfolioModal) {
                portfolioModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        function showNextImage() {
            currentModalIndex = (currentModalIndex + 1) % portfolioImages.length;
            if (modalImage) {
                modalImage.src = portfolioImages[currentModalIndex];
                modalImage.alt = `Imagem ${currentModalIndex + 1}`;
            }
        }

        function showPrevImage() {
            currentModalIndex = (currentModalIndex - 1 + portfolioImages.length) % portfolioImages.length;
            if (modalImage) {
                modalImage.src = portfolioImages[currentModalIndex];
                modalImage.alt = `Imagem ${currentModalIndex + 1}`;
            }
        }

        items.forEach((item, index) => {
            item.addEventListener('click', function() {
                openModal(index);
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (portfolioModal) {
            portfolioModal.addEventListener('click', function(e) {
                if (e.target === portfolioModal || e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });
        }

        if (modalNext) {
            modalNext.addEventListener('click', function(e) {
                e.stopPropagation();
                showNextImage();
            });
        }

        if (modalPrev) {
            modalPrev.addEventListener('click', function(e) {
                e.stopPropagation();
                showPrevImage();
            });
        }

        // Keyboard navigation for modal
        document.addEventListener('keydown', function(e) {
            if (portfolioModal && portfolioModal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModal();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });

        // Auto-play portfolio slider
        let autoplayInterval;
        function startAutoplay() {
            autoplayInterval = setInterval(function() {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 4000);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        if (portfolioSlider) {
            portfolioSlider.addEventListener('mouseenter', stopAutoplay);
            portfolioSlider.addEventListener('mouseleave', startAutoplay);
            startAutoplay();
        }
    }

    // Safety Gallery Slider with Touch Support
    const safetyGallery = document.getElementById('safety-gallery');
    if (safetyGallery) {
        const galleryTrack = safetyGallery.querySelector('.gallery-track');
        const gallerySlides = safetyGallery.querySelectorAll('.gallery-slide');
        const galleryPrev = safetyGallery.querySelector('.gallery-btn-prev');
        const galleryNext = safetyGallery.querySelector('.gallery-btn-next');
        const galleryIndicators = safetyGallery.querySelectorAll('.gallery-indicator');
        
        let currentGalleryIndex = 0;
        const totalGallerySlides = gallerySlides.length;
        let isDragging = false;
        let touchStartX = 0;
        let currentX = 0;

        // Inicializar galeria
        function initGallery() {
            if (galleryTrack && totalGallerySlides > 0) {
                // O track deve ter largura total = número de slides * 100%
                // Cada slide ocupa 100% da largura visível do container
                gallerySlides.forEach(slide => {
                    slide.style.width = '100%';
                    slide.style.flexShrink = '0';
                    slide.style.flexBasis = '100%';
                });
                // Inicializar posição
                updateGallery();
            }
        }

        function updateGallery() {
            if (galleryTrack && totalGallerySlides > 0) {
                const translateX = -(currentGalleryIndex * 100);
                galleryTrack.style.transform = `translateX(${translateX}%)`;
                galleryTrack.style.transition = isDragging ? 'none' : 'transform 0.5s ease';
            }
            
            galleryIndicators.forEach((indicator, index) => {
                if (index === currentGalleryIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        // Touch events for swipe
        safetyGallery.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            isDragging = true;
        }, { passive: true });

        safetyGallery.addEventListener('touchmove', function(e) {
            if (isDragging) {
                currentX = e.changedTouches[0].screenX - touchStartX;
                const translateX = -(currentGalleryIndex * 100) + (currentX / safetyGallery.offsetWidth * 100);
                galleryTrack.style.transform = `translateX(${translateX}%)`;
            }
        }, { passive: true });

        safetyGallery.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            isDragging = false;
            galleryTrack.style.transition = 'transform 0.5s ease';
            
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentGalleryIndex < totalGallerySlides - 1) {
                    // Swipe left - next
                    currentGalleryIndex++;
                } else if (diff < 0 && currentGalleryIndex > 0) {
                    // Swipe right - previous
                    currentGalleryIndex--;
                }
            }
            
            updateGallery();
        }, { passive: true });

        // Inicializar ao carregar
        if (totalGallerySlides > 0) {
            initGallery();
        }

        if (galleryPrev) {
            galleryPrev.addEventListener('click', function() {
                currentGalleryIndex = (currentGalleryIndex - 1 + totalGallerySlides) % totalGallerySlides;
                updateGallery();
            });
        }

        if (galleryNext) {
            galleryNext.addEventListener('click', function() {
                currentGalleryIndex = (currentGalleryIndex + 1) % totalGallerySlides;
                updateGallery();
            });
        }

        galleryIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentGalleryIndex = index;
                updateGallery();
            });
        });

        // Auto-play gallery
        let galleryAutoplayInterval;
        function startGalleryAutoplay() {
            galleryAutoplayInterval = setInterval(function() {
                currentGalleryIndex = (currentGalleryIndex + 1) % totalGallerySlides;
                updateGallery();
            }, 5000);
        }

        function stopGalleryAutoplay() {
            if (galleryAutoplayInterval) {
                clearInterval(galleryAutoplayInterval);
            }
        }

        if (safetyGallery) {
            safetyGallery.addEventListener('mouseenter', stopGalleryAutoplay);
            safetyGallery.addEventListener('mouseleave', startGalleryAutoplay);
            startGalleryAutoplay();
        }
    }

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.service-card, .benefit-card, .about-card, .contact-card, .metric-card, .safety-feature-card').forEach(el => {
            el.classList.add('scroll-fade-in');
            observer.observe(el);
        });
        
        // Observe section headers
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('scroll-fade-in');
            observer.observe(el);
        });
    }
    
    // Add click feedback animation (ripple effect)
    function addRippleEffect(selector) {
        document.querySelectorAll(selector).forEach(element => {
            const originalPosition = window.getComputedStyle(element).position;
            if (originalPosition === 'static') {
                element.style.position = 'relative';
            }
            element.style.overflow = 'hidden';
            
            element.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Apply ripple to interactive elements
    addRippleEffect('.btn-primary');
    addRippleEffect('.btn-secondary');
    addRippleEffect('.service-card');
    addRippleEffect('.benefit-card');
    addRippleEffect('.contact-card');
    addRippleEffect('.portfolio-item');

    // Image loading optimization
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    // Mark as loaded for CSS
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before image enters viewport
        });

        // Observe all lazy-loaded images
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Mark eager images as loaded immediately
        document.querySelectorAll('img[loading="eager"]').forEach(img => {
            img.classList.add('loaded');
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img').forEach(img => {
            img.classList.add('loaded');
        });
    }
    
    // Preload images on hover for better UX (desktop only)
    if (window.matchMedia('(hover: hover)').matches) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img && img.loading === 'lazy' && !img.complete) {
                    img.loading = 'eager';
                }
            });
        });
    }
    
    // Prevent double-tap zoom on iOS (optional - can be removed if not desired)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve scroll performance on mobile
    let ticking = false;
    function updateOnScroll() {
        // Scroll-based animations can be added here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, { passive: true });
});

// Utility function for email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

