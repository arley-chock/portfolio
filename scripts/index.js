const navbar = document.querySelector('.navbar');
const mobileNavbar = document.querySelector('.navbar__mobile');
const button = document.querySelector('.burguer');
const mobileLinks = document.querySelector('.mobile__links');
const sections = document.querySelectorAll('section');
const header = document.querySelector('#header');
const skillsItems = document.querySelectorAll('.skills__item');
const projectCards = document.querySelectorAll('.projects li');
const techItems = document.querySelectorAll('.ultech li');

button.addEventListener('click', function () {
  mobileNavbar.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.classList.add('active');
  } else {
    navbar.classList.remove('active');
  }
});

// Menu mobile
button.addEventListener('click', () => {
  mobileLinks.classList.toggle('active');
  button.classList.toggle('active');
});

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('.mobile__links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileLinks.classList.remove('active');
    button.classList.remove('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Dark mode
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved user preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '☀️';
} else if (currentTheme === 'light') {
  document.body.classList.remove('dark-mode');
  darkModeToggle.innerHTML = '🌙';
} else if (prefersDarkScheme.matches) {
  document.body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '☀️';
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  darkModeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      darkModeToggle.innerHTML = '🌙';
    }
  }
});

// Form validation
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form validation logic here
  });
}

// Animação de digitação no header
const typedText = document.querySelector('.header__left h1');
const text = typedText.textContent;
typedText.textContent = '';

let i = 0;
function typeWriter() {
  if (i < text.length) {
    typedText.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

// Iniciar animação quando o header estiver visível
const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeWriter();
      headerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

headerObserver.observe(header);

// Animação de hover para cards de habilidades
skillsItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-10px)';
    item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0)';
    item.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  });
});

// Animação de hover para cards de projetos
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  });
});

// Animação de hover para tecnologias
techItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.1)';
    item.style.transition = 'transform 0.3s ease';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
  });
});

// Adicionar classe active ao link do menu correspondente à seção atual
const menuLinks = document.querySelectorAll('.navbar__links a, .mobile__links a');
const sectionsWithOffset = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
  let current = '';
  
  sectionsWithOffset.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
