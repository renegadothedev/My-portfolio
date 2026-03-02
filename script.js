document.addEventListener('DOMContentLoaded', function() {
  // === SELETORES ===
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const loadingScreen = document.getElementById('loading-screen');
  const contactForm = document.querySelector('.contact-form');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const reveals = document.querySelectorAll('.reveal');

  // === 1. TELA DE CARREGAMENTO (LOADING) ===
  if (loadingScreen) {
    // Pequeno delay para garantir que a transição seja percebida
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 300);
  }

  // === 2. EVENTOS DE SCROLL (Navbar & Back to Top) ===
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Efeito da Navbar
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollPos > 50);
    }

    // Botão Voltar ao Topo
    if (backToTop) {
      backToTop.classList.toggle('active', scrollPos > 300);
    }

    // Animação Reveal on Scroll
    reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const elementTop = reveal.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Executa uma vez no início

  // === 3. MENU MOBILE (HAMBURGER) ===
  if (hamburger && navLinks) {
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // === 4. FILTRO DE PROJETOS ===
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Atualiza botões
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-tab');

      projectCards.forEach(card => {
        // Animação de saída
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
              card.classList.add('show');
            }, 50);
          } else {
            card.style.display = 'none';
            card.classList.remove('show');
          }
        }, 300);
      });
    });
  });

  // === 5. SCROLL SUAVE PARA LINKS INTERNOS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 80; // Ajuste conforme a altura da sua navbar
        const elementPosition = targetElement.offsetTop;
        
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // === 6. FORMULÁRIO DE CONTATO ===
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulação de envio
      const btn = this.querySelector('button');
      const originalText = btn.innerText;
      
      btn.innerText = 'Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        this.reset();
        btn.innerText = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

  // === 7. ANIMAÇÃO DE TEXTO (LOOPING) ===
  const textElements = document.querySelectorAll('.hero .text');
  if (textElements.length > 0) {
    let currentIndex = 0;
    const states = ['first-text', 'sec-text', 'third-text'];

    setInterval(() => {
      textElements.forEach(text => {
        // Remove todos os estados anteriores
        states.forEach(state => text.classList.remove(state));
        
        // Aplica o novo estado
        currentIndex = (currentIndex + 1) % states.length;
        text.classList.add(states[currentIndex]);
      });
    }, 4000);
  }
});
