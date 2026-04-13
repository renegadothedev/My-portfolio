document.addEventListener('DOMContentLoaded', () => {
    // Spotlight Effect
    const spotlight = document.querySelector('.spotlight');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        spotlight.style.setProperty('--x', `${x}%`);
        spotlight.style.setProperty('--y', `${y}%`);
    });

    // Reveal on Scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth reveal for Hero
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});