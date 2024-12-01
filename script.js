// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-links a, .hero a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.mobile-menu-toggle').classList.remove('active');
        });
    });

    // scroll navbar color
    const navbar = document.querySelector('.navbar'); // Get all nav links
    // add scroll event listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // if scrolled more than 50px
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled'); // if not scrolled
        }
    });



    
    // Mobile Menu Toggle with Animation
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate menu toggle icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('negative-45');
    });

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

    // Contact Platform Handling with Enhanced Tracking
    const contactLinks = document.querySelectorAll('.contact-social-link, .social-media-icons a');
    contactLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const platform = link.getAttribute('data-platform');
            
            // Enhanced Contact Handling with Event Tracking
            gtmTrackSocialClick(platform);
            
            switch(platform) {
                case 'whatsapp':
                    const message = 'Halo, saya ingin memesan blazer dari Blazer S&R Fashion.';
                    const phoneNumber = '6282262877872';
                    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                    break;
                
                case 'instagram':
                    window.open('https://www.instagram.com/jaenab91?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank');
                    break;
                
                case 'tiktok':
                    window.open('https://vt.tokopedia.com/t/ZS2CGV2gW/', '_blank');
                    break;
                
                case 'shopee':
                    window.open('https://shopee.co.id/snr_fashion1', '_blank');
                    break;
            }
        });
    });

    // Newsletter Signup
    setupNewsletterSignup();

    // Lazy Loading for Images
    lazyLoadImages();
});

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
    
    // Tambahkan event listener untuk tombol Pesan Sekarang
    modal.querySelector('.order-now').addEventListener('click', () => {
        // Ambil informasi produk dari modal
        const productTitle = modal.querySelector('.modal-title').textContent;
        const productImage = modal.querySelector('.modal-image').src;
        
        // Pilih platform pemesanan (misalnya WhatsApp)
        const whatsappLink = document.querySelector('.contact-social-link.whatsapp');
        
        if (whatsappLink) {
            // Buat pesan default
            const orderMessage = `Halo, saya tertarik membeli produk: ${productTitle}. Apakah masih tersedia?`;
            
            // Enkode pesan untuk URL
            const encodedMessage = encodeURIComponent(orderMessage);
            
            // Buka WhatsApp dengan pesan default
            // Catatan: Ganti nomor telepon dengan nomor WhatsApp Anda
            const whatsappUrl = `https://wa.me/6282262877872?text=${encodedMessage}`;
            
            // Arahkan ke WhatsApp
            window.open(whatsappUrl, '_blank');
        } else {
            // Fallback jika link WhatsApp tidak ditemukan
            alert('Maaf, layanan pemesanan sedang tidak tersedia.');
        }
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

// GTM Event Tracking (Placeholder)
function gtmTrackSocialClick(platform) {
    // Implement Google Tag Manager tracking
    console.log(`Social Platform Clicked: ${platform}`);
    window.dataLayer.push({
     'event': 'social_platform_click',
       'platform': platform
     });
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
