document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate menu icon
        mobileMenuToggle.classList.toggle('active');
    });

    // Contact Platform Handling
    const contactLinks = document.querySelectorAll('.contact-social-link, .social-media-icons a');
    contactLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const platform = link.getAttribute('data-platform');
            
            switch(platform) {
                case 'whatsapp':
                    const message = 'Halo, saya ingin memesan blazer dari Blazer S&R Fashion.';
                    const phoneNumber = '6282262877872'; // Nomor WhatsApp untuk pemesanan
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
                
                default:
                    console.log('Platform not found');
            }
        });
    });
});