document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-links a, .hero a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-links');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && mobileMenuToggle) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // Scroll Navbar Color
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile Menu Toggle with Animation
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Animate menu toggle icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].classList.toggle('rotate-45');
            spans[1].classList.toggle('opacity-0');
            spans[2].classList.toggle('negative-45');
        });
    }

    // Product Quick View Modal
    const productCards = document.querySelectorAll('.product-card');
    const modal = createQuickViewModal();
    
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img').src;
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            openQuickViewModal(modal, img, title, description);
        });
    });

    // Contact Platform Handling
    const contactLinks = document.querySelectorAll('.contact-social-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const platform = link.getAttribute('data-platform');
            
            handleSocialPlatformClick(platform);
        });
    });

    // Social Media Icons in Footer
    const footerSocialLinks = document.querySelectorAll('.social-media-icons a');
    footerSocialLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const platform = link.getAttribute('data-platform');
            
            handleSocialPlatformClick(platform);
        });
    });

    // Newsletter Signup (Placeholder)
    function setupNewsletterSignup() {
        console.log('Newsletter signup not implemented');
    }
    setupNewsletterSignup();

    // Lazy Loading for Images
    lazyLoadImages();
});

// Handle Social Platform Clicks
function handleSocialPlatformClick(platform) {
    const platformUrls = {
        'whatsapp': `https://wa.me/6282262877872?text=${encodeURIComponent('Halo! 🌟 Terima kasih sudah tertarik dengan koleksi blazer Blazer S&R Fashion. Kami siap membantu Anda menemukan blazer impian yang sempurna. Ingin tahu detail lebih lanjut? Mari kita bicara! Salam hangat dari tim kami. 👔✨')}`,
        'instagram': 'https://www.instagram.com/jaenab91/',
        'tiktok': 'https://vt.tokopedia.com/t/ZS2CGV2gW/',
        'shopee': 'https://shopee.co.id/snr_fashion1'
    };

    const url = platformUrls[platform];
    
    if (url) {
        // Track GTM event
        gtmTrackSocialClick(platform);
        
        // Open platform link in new tab
        window.open(url, '_blank');
    } else {
        console.warn(`No URL found for platform: ${platform}`);
    }
}

// Create Quick View Modal
function createQuickViewModal() {
    const modal = document.createElement('div');
    modal.classList.add('quick-view-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Product Image" class="modal-image">
            <div class="modal-details">
                <h2 class="modal-title"></h2>
                <p class="modal-description"></p>
                <button class="btn btn-primary order-now">Pesan Sekarang</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.querySelector('.order-now').addEventListener('click', () => {
        const productTitle = modal.querySelector('.modal-title').textContent;
        const orderMessage = `Halo, saya tertarik membeli produk: ${productTitle}. Apakah masih tersedia?`;
        const whatsappUrl = `https://wa.me/6282262877872?text=${encodeURIComponent(orderMessage)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    return modal;
}

// Open Quick View Modal
function openQuickViewModal(modal, img, title, description) {
    modal.querySelector('.modal-image').src = img;
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-description').textContent = description;
    modal.style.display = 'flex';
}

// GTM Event Tracking
function gtmTrackSocialClick(platform) {
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'social_platform_click',
            'platform': platform
        });
    } else {
        console.warn('Google Tag Manager dataLayer not found');
    }
}

// Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.add('fade-in');
                    observer.unobserve(image);
                }
            });
        }, {
            rootMargin: "50px"
        });

        images.forEach(image => imageObserver.observe(image));
    }
}
