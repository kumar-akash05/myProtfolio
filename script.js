// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .achievement-card, .about-text, .education-card');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Home section specific animations
    initHomeAnimations();
});

// Home section animations
function initHomeAnimations() {
    // Enhanced typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
    
    // Dynamic subtitle typing effect
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const roles = [
            'Cloud Engineer & DevOps Enthusiast',
            'AWS Solutions Architect',
            'Full-Stack Developer',
            'Cloud Computing Expert'
        ];
        
        let currentRole = 0;
        
        setTimeout(() => {
            typeRole(heroSubtitle, roles[currentRole], () => {
                setTimeout(() => {
                    currentRole = (currentRole + 1) % roles.length;
                    heroSubtitle.innerHTML = '';
                    typeRole(heroSubtitle, roles[currentRole]);
                }, 2000);
            });
        }, 2000);
    }
    
    // Floating particles effect
    createFloatingParticles();
    
    // Create background animated elements
    createFloatingElements();
    createPulsingDots();
    createFloatingTechIcons();
    createParticleBackground();
    
    // Create about section animations
    createAboutAnimations();
    
    // Profile image hover and click effects
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        // Add cursor pointer to indicate it's clickable
        profileImage.style.cursor = 'pointer';
        
        // Hover effects
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.1) rotate(5deg)';
            profileImage.style.transition = 'all 0.3s ease';
            profileImage.style.boxShadow = '0 10px 30px rgba(251, 191, 36, 0.5)';
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1) rotate(0deg)';
            profileImage.style.boxShadow = 'none';
        });
        
        // Click to open image in new tab
        profileImage.addEventListener('click', () => {
            const imageUrl = profileImage.src;
            window.open(imageUrl, '_blank');
        });
        
        // Add click animation
        profileImage.addEventListener('mousedown', () => {
            profileImage.style.transform = 'scale(0.95) rotate(5deg)';
        });
        
        profileImage.addEventListener('mouseup', () => {
            profileImage.style.transform = 'scale(1.1) rotate(5deg)';
        });
    }
    
    // Social links hover effect
    const socialLinks = document.querySelectorAll('.hero-social .social-link');
    socialLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-10px) scale(1.2)';
            link.style.background = '#fbbf24';
            link.style.color = '#1e293b';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
            link.style.background = 'rgba(255, 255, 255, 0.1)';
            link.style.color = 'white';
        });
    });
}

// Typing animation function
function typeWriter(element, text, speed = 100) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Dynamic role typing function
function typeRole(element, text, callback = null) {
    let i = 0;
    element.style.borderRight = '2px solid #fbbf24';
    element.style.width = '0';
    element.style.overflow = 'hidden';
    element.style.whiteSpace = 'nowrap';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            element.style.width = `${(i + 1) * 0.6}em`;
            i++;
            setTimeout(type, 100);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                element.style.borderRight = '2px solid transparent';
                if (callback) callback();
            }, 1000);
        }
    }
    
    type();
}

// Create floating particles
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
    
    // Add floating animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create floating elements
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const elementConfigs = [
        { size: 100, top: 10, left: 15, delay: 0 },
        { size: 150, top: 60, right: 20, delay: 5 },
        { size: 80, top: 80, left: 70, delay: 10 },
        { size: 120, top: 30, right: 50, delay: 2 }
    ];
    
    elementConfigs.forEach((config, index) => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${config.size}px;
            height: ${config.size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: floatUp 15s ease-in-out infinite;
            animation-delay: ${config.delay}s;
            top: ${config.top}%;
            ${config.left ? `left: ${config.left}%` : `right: ${config.right}%`};
            z-index: 3;
            pointer-events: none;
        `;
        hero.appendChild(element);
    });
}

// Create pulsing dots
function createPulsingDots() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const dotConfigs = [
        { top: 20, left: 30, delay: 0 },
        { top: 70, left: 80, delay: 1 },
        { top: 50, left: 10, delay: 2 },
        { top: 90, left: 60, delay: 0.5 },
        { top: 15, right: 25, delay: 1.5 }
    ];
    
    dotConfigs.forEach((config, index) => {
        const dot = document.createElement('div');
        dot.className = 'pulse-dot';
        dot.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: pulseDot 3s ease-in-out infinite;
            animation-delay: ${config.delay}s;
            top: ${config.top}%;
            ${config.left ? `left: ${config.left}%` : `right: ${config.right}%`};
            z-index: 3;
            pointer-events: none;
        `;
        hero.appendChild(dot);
    });
}

// Create floating tech icons
function createFloatingTechIcons() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const techIcons = [
        { icon: 'fab fa-aws', top: 15, left: 10, delay: 0 },
        { icon: 'fab fa-python', top: 25, right: 15, delay: 2 },
        { icon: 'fab fa-docker', top: 70, left: 5, delay: 4 },
        { icon: 'fab fa-jenkins', top: 80, right: 10, delay: 6 },
        { icon: 'fab fa-kubernetes', top: 40, left: 85, delay: 1 },
        { icon: 'fab fa-git-alt', top: 60, right: 5, delay: 3 }
    ];
    
    techIcons.forEach((config, index) => {
        const icon = document.createElement('i');
        icon.className = `tech-icon ${config.icon}`;
        icon.style.cssText = `
            position: absolute;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.3);
            animation: floatIcon 8s ease-in-out infinite;
            animation-delay: ${config.delay}s;
            top: ${config.top}%;
            ${config.left ? `left: ${config.left}%` : `right: ${config.right}%`};
            z-index: 3;
            pointer-events: none;
            transition: all 0.3s ease;
        `;
        
        // Add hover effect for tech icons
        icon.addEventListener('mouseenter', () => {
            icon.style.color = '#fbbf24';
            icon.style.transform = 'scale(1.2)';
            icon.style.textShadow = '0 0 10px rgba(251, 191, 36, 0.5)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.color = 'rgba(255, 255, 255, 0.3)';
            icon.style.transform = 'scale(1)';
            icon.style.textShadow = 'none';
        });
        
        hero.appendChild(icon);
    });
}

// Create particle background
function createParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        pointer-events: none;
        overflow: hidden;
    `;
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            animation: particleFloat ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 2;
        `;
        particleContainer.appendChild(particle);
    }
    
    hero.appendChild(particleContainer);
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-30px) translateX(10px);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Create about section animations
function createAboutAnimations() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;
    
    // Create floating shapes
    const shapeConfigs = [
        { size: 60, top: 10, left: 5, delay: 0 },
        { size: 40, top: 70, right: 10, delay: 4 },
        { size: 80, top: 50, left: 90, delay: 8 }
    ];
    
    shapeConfigs.forEach((config, index) => {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${config.size}px;
            height: ${config.size}px;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.15));
            animation: floatShape 12s ease-in-out infinite;
            animation-delay: ${config.delay}s;
            top: ${config.top}%;
            ${config.left ? `left: ${config.left}%` : `right: ${config.right}%`};
            z-index: 1;
            pointer-events: none;
        `;
        aboutSection.appendChild(shape);
    });
    
    // Add hover effects to stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'scale(1.1) translateY(-5px)';
            stat.style.transition = 'all 0.3s ease';
            stat.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.2)';
        });
        
        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'scale(1) translateY(0)';
            stat.style.boxShadow = 'none';
        });
    });
    
    // Add hover effect to education card
    const educationCard = document.querySelector('.education-card');
    if (educationCard) {
        educationCard.addEventListener('mouseenter', () => {
            educationCard.style.transform = 'translateY(-10px) rotateX(5deg)';
            educationCard.style.transition = 'all 0.3s ease';
            educationCard.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        educationCard.addEventListener('mouseleave', () => {
            educationCard.style.transform = 'translateY(0) rotateX(0deg)';
            educationCard.style.boxShadow = 'none';
        });
    }
    
    // Animate CGPA on scroll
    const cgpaElement = document.querySelector('.education-cgpa');
    if (cgpaElement) {
        const cgpaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cgpaElement.style.animation = 'pulse 2s ease-in-out infinite';
                    setTimeout(() => {
                        cgpaElement.style.animation = 'none';
                    }, 4000);
                }
            });
        }, { threshold: 0.5 });
        
        cgpaObserver.observe(cgpaElement);
    }
}

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const subject = contactForm.querySelector('#subject').value.trim();
            const message = contactForm.querySelector('#message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const to = 'kumarakash030528@gmail.com';
            const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            window.location.href = `mailto:${to}?subject=${mailtoSubject}&body=${mailtoBody}`;
        });
    }
});

// Add CSS for active nav link and mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 1rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);
