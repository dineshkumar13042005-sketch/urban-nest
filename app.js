/* ==========================================================================
   URBAN NEST — Client Side Interactive App & Dynamic Visual Effects
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Hero Image Background Slider / Cross-Fade Carousel
  const heroSlides = document.querySelectorAll('.hero-slide-img');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 5000);
  }

  // 2. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 3. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // 4. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 5. Custom Form Submission -> WhatsApp
  const customForm = document.getElementById('customEnquiryForm');
  if (customForm) {
    customForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const furnitureType = document.getElementById('furnitureType')?.value || '';
      const room = document.getElementById('room')?.value || '';
      const size = document.getElementById('size')?.value || '';
      const requirement = document.getElementById('requirement')?.value || '';

      const waNumber = '917708877588';
      const text = `Hi Urban Nest! I would like to make a Custom Furniture Enquiry:\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `🪑 *Furniture Type:* ${furnitureType}\n` +
        `🏠 *Room:* ${room}\n` +
        `📏 *Approx Size:* ${size}\n` +
        `📝 *Requirement:* ${requirement}`;

      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
      
      const successBanner = document.getElementById('formSuccessMessage');
      if (successBanner) {
        successBanner.style.display = 'block';
        successBanner.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 500);
    });
  }
});

// Direct WhatsApp Inquiry Utility
function enquireProduct(productName, productCategory) {
  const waNumber = '917708877588';
  const text = `Hi Urban Nest! I am interested in knowing more details about:\n\n` +
               `🛋️ *Product:* ${productName}\n` +
               `🏷️ *Category:* ${productCategory}\n\n` +
               `Please share pricing, fabric/finish options, and showroom availability.`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}
