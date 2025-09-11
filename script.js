// Particles
const particlesGeometry = new THREE.BufferGeometry();/* ============================================
DESARROLLO SUR - FUTURISTIC INTERACTIONS
============================================ */

// Cursor personalizado
document.addEventListener('DOMContentLoaded', () => {
 const cursor = document.querySelector('.custom-cursor');
 const follower = document.querySelector('.cursor-follower');
 
 if (!cursor || !follower) return;
 
 let cursorX = 0, cursorY = 0;
 let followerX = 0, followerY = 0;
 
 // Mostrar cursor cuando el mouse entra
 document.addEventListener('mouseenter', () => {
     cursor.style.opacity = '1';
     follower.style.opacity = '0.8';
 });
 
 // Ocultar cursor cuando el mouse sale
 document.addEventListener('mouseleave', () => {
     cursor.style.opacity = '0';
     follower.style.opacity = '0';
 });
 
 // Actualizar posición del cursor
 document.addEventListener('mousemove', (e) => {
     cursorX = e.clientX;
     cursorY = e.clientY;
     
     // Posicionar cursor principal (centrado)
     cursor.style.left = (cursorX - 10) + 'px';
     cursor.style.top = (cursorY - 10) + 'px';
     
     // Hacer visible si estaba oculto
     cursor.style.opacity = '1';
     follower.style.opacity = '0.8';
 });
 
 // Animación suave del follower
 const animateFollower = () => {
     const dx = cursorX - followerX;
     const dy = cursorY - followerY;
     
     followerX += dx * 0.1;
     followerY += dy * 0.1;
     
     follower.style.left = (followerX - 20) + 'px';
     follower.style.top = (followerY - 20) + 'px';
     
     requestAnimationFrame(animateFollower);
 };
 animateFollower();
 
 // Efectos hover en elementos interactivos
 const interactiveElements = document.querySelectorAll('a, button, .service-card, input, textarea');
 
 interactiveElements.forEach(el => {
     el.addEventListener('mouseenter', () => {
         cursor.style.transform = 'scale(0.5)';
         follower.style.transform = 'scale(1.5)';
         follower.style.borderColor = 'var(--orange)';
         follower.style.backgroundColor = 'rgba(255, 159, 85, 0.1)';
     });
     
     el.addEventListener('mouseleave', () => {
         cursor.style.transform = 'scale(1)';
         follower.style.transform = 'scale(1)';
         follower.style.borderColor = 'var(--coral)';
         follower.style.backgroundColor = 'rgba(242, 122, 120, 0.1)';
     });
 });
});

// Efectos hover en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .service-card, input, textarea');

interactiveElements.forEach(el => {
 el.addEventListener('mouseenter', () => {
     cursor.style.transform = 'scale(0.5)';
     follower.style.transform = 'scale(1.5)';
     follower.style.borderColor = 'var(--orange)';
 });
 
 el.addEventListener('mouseleave', () => {
     cursor.style.transform = 'scale(1)';
     follower.style.transform = 'scale(1)';
     follower.style.borderColor = 'var(--coral)';
 });
});

// Navegación
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Detectar si es móvil
const isMobile = () => window.innerWidth <= 768;

// Scroll effect en navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
 const currentScroll = window.pageYOffset;
 
 if (currentScroll > 100) {
     navbar.classList.add('scrolled');
 } else {
     navbar.classList.remove('scrolled');
 }
 
 // Auto-hide navbar en móvil al hacer scroll down
 if (isMobile() && currentScroll > lastScroll && currentScroll > 100) {
     navbar.style.transform = 'translateY(-100%)';
 } else {
     navbar.style.transform = 'translateY(0)';
 }
 
 lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
 navToggle.classList.toggle('active');
 navMenu.classList.toggle('active');
 document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menu al hacer click en link
navLinks.forEach(link => {
 link.addEventListener('click', () => {
     navToggle.classList.remove('active');
     navMenu.classList.remove('active');
     document.body.style.overflow = '';
 });
});

// Cerrar menu al hacer click fuera
document.addEventListener('click', (e) => {
 if (navMenu.classList.contains('active') && 
     !navMenu.contains(e.target) && 
     !navToggle.contains(e.target)) {
     navToggle.classList.remove('active');
     navMenu.classList.remove('active');
     document.body.style.overflow = '';
 }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function(e) {
     e.preventDefault();
     const target = document.querySelector(this.getAttribute('href'));
     
     if (target) {
         const offset = 80;
         const targetPosition = target.offsetTop - offset;
         
         window.scrollTo({
             top: targetPosition,
             behavior: 'smooth'
         });
     }
 });
});

// Intersection Observer para animaciones
const observerOptions = {
 threshold: 0.1,
 rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
     if (entry.isIntersecting) {
         entry.target.style.opacity = '1';
         entry.target.style.transform = 'translateY(0)';
         
         // Animar elementos hijos con delay
         const children = entry.target.querySelectorAll('.animate-child');
         children.forEach((child, index) => {
             setTimeout(() => {
                 child.style.opacity = '1';
                 child.style.transform = 'translateY(0)';
             }, index * 100);
         });
     }
 });
}, observerOptions);

// Observar elementos
const animatedElements = document.querySelectorAll('.service-card, .process-step, .feature-item, .about-content > div');
animatedElements.forEach(el => {
 el.style.opacity = '0';
 el.style.transform = 'translateY(30px)';
 el.style.transition = 'all 0.6s ease';
 animateOnScroll.observe(el);
});

// Parallax effect en hero
const heroOrbs = document.querySelectorAll('.gradient-orb');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
 const scrolled = window.pageYOffset;
 const rate = scrolled * -0.5;
 
 heroOrbs.forEach((orb, index) => {
     const speed = 0.2 * (index + 1);
     orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed}px)`;
 });
 
 if (heroContent) {
     heroContent.style.transform = `translateY(${rate * 0.3}px)`;
     heroContent.style.opacity = 1 - (scrolled * 0.001);
 }
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Placeholder animation
formInputs.forEach(input => {
 input.setAttribute('placeholder', ' ');
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
 e.preventDefault();
 
 const submitBtn = contactForm.querySelector('.btn-submit');
 const originalText = submitBtn.innerHTML;
 
 // Loading state
 submitBtn.innerHTML = `
     <span>Enviando</span>
     <svg class="spinner" width="20" height="20" viewBox="0 0 20 20">
         <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="40" stroke-dashoffset="10">
             <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="1s" repeatCount="indefinite"/>
         </circle>
     </svg>
 `;
 submitBtn.disabled = true;
 
 // Simular envío
 await new Promise(resolve => setTimeout(resolve, 2000));
 
 // Success state
 submitBtn.innerHTML = `
     <span>¡Mensaje enviado!</span>
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
         <path d="M5 10L8 13L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>
 `;
 
 // Mostrar partículas de celebración
 createParticles(submitBtn);
 
 // Reset form
 setTimeout(() => {
     contactForm.reset();
     submitBtn.innerHTML = originalText;
     submitBtn.disabled = false;
 }, 3000);
});

// Crear partículas de celebración
function createParticles(element) {
 const rect = element.getBoundingClientRect();
 const colors = ['#ff9f55', '#f27a78', '#c56991', '#876394'];
 
 for (let i = 0; i < 20; i++) {
     const particle = document.createElement('div');
     particle.style.cssText = `
         position: fixed;
         width: 8px;
         height: 8px;
         background: ${colors[Math.floor(Math.random() * colors.length)]};
         border-radius: 50%;
         left: ${rect.left + rect.width / 2}px;
         top: ${rect.top + rect.height / 2}px;
         pointer-events: none;
         z-index: 9999;
     `;
     
     document.body.appendChild(particle);
     
     // Animar partícula
     const angle = (Math.PI * 2 * i) / 20;
     const velocity = 50 + Math.random() * 50;
     const lifetime = 1000 + Math.random() * 1000;
     
     let start = null;
     const animate = (timestamp) => {
         if (!start) start = timestamp;
         const progress = timestamp - start;
         
         if (progress < lifetime) {
             const x = Math.cos(angle) * velocity * (progress / 1000);
             const y = Math.sin(angle) * velocity * (progress / 1000) + (progress * progress) / 10000;
             const opacity = 1 - progress / lifetime;
             
             particle.style.transform = `translate(${x}px, ${y}px)`;
             particle.style.opacity = opacity;
             
             requestAnimationFrame(animate);
         } else {
             particle.remove();
         }
     };
     
     requestAnimationFrame(animate);
 }
}

// Efecto hover en service cards
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
 card.addEventListener('mousemove', (e) => {
     const rect = card.getBoundingClientRect();
     const x = e.clientX - rect.left;
     const y = e.clientY - rect.top;
     
     const centerX = rect.width / 2;
     const centerY = rect.height / 2;
     
     const rotateX = (y - centerY) / 10;
     const rotateY = (centerX - x) / 10;
     
     card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
     
     // Mover el glow
     const glow = card.querySelector('.service-glow');
     if (glow) {
         glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--pink) 0%, transparent 70%)`;
     }
 });
 
 card.addEventListener('mouseleave', () => {
     card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
 });
});

// Animación de números en stats
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
     if (entry.isIntersecting) {
         const stat = entry.target;
         const value = stat.textContent;
         const isPercentage = value.includes('%');
         const isDuration = value.includes('/');
         
         if (!isPercentage && !isDuration) {
             const finalValue = parseInt(value);
             animateNumber(stat, 0, finalValue, 2000);
         }
         
         statsObserver.unobserve(stat);
     }
 });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateNumber(element, start, end, duration) {
 const startTime = performance.now();
 
 const animate = (currentTime) => {
     const elapsed = currentTime - startTime;
     const progress = Math.min(elapsed / duration, 1);
     
     const current = Math.floor(start + (end - start) * easeOutCubic(progress));
     element.textContent = current + '+';
     
     if (progress < 1) {
         requestAnimationFrame(animate);
     }
 };
 
 requestAnimationFrame(animate);
}

function easeOutCubic(t) {
 return 1 - Math.pow(1 - t, 3);
}

// Efecto de texto tipo máquina de escribir
const typewriterElements = document.querySelectorAll('.hero-title .title-line');
let typingDelay = 0;

typewriterElements.forEach((element, index) => {
 const text = element.textContent;
 element.textContent = '';
 element.style.opacity = '1';
 
 setTimeout(() => {
     typeWriter(element, text, 0);
 }, typingDelay);
 
 typingDelay += text.length * 50 + 500;
});

function typeWriter(element, text, index) {
 if (index < text.length) {
     element.textContent += text.charAt(index);
     setTimeout(() => typeWriter(element, text, index + 1), 50);
 }
}

// Efecto de onda en botones
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit').forEach(button => {
 button.addEventListener('click', function(e) {
     const ripple = document.createElement('span');
     const rect = this.getBoundingClientRect();
     const size = Math.max(rect.width, rect.height);
     const x = e.clientX - rect.left - size / 2;
     const y = e.clientY - rect.top - size / 2;
     
     ripple.style.cssText = `
         position: absolute;
         width: ${size}px;
         height: ${size}px;
         border-radius: 50%;
         background: rgba(255, 255, 255, 0.5);
         transform: scale(0);
         animation: ripple 0.6s ease-out;
         left: ${x}px;
         top: ${y}px;
         pointer-events: none;
     `;
     
     this.style.position = 'relative';
     this.style.overflow = 'hidden';
     this.appendChild(ripple);
     
     setTimeout(() => ripple.remove(), 600);
 });
});

// Agregar CSS para la animación ripple
const style = document.createElement('style');
style.textContent = `
 @keyframes ripple {
     to {
         transform: scale(4);
         opacity: 0;
     }
 }
`;
document.head.appendChild(style);

// Detección de actividad del usuario
let isActive = true;
let inactivityTimer;

function resetInactivityTimer() {
 clearTimeout(inactivityTimer);
 
 if (!isActive) {
     isActive = true;
     document.body.classList.remove('inactive');
 }
 
 inactivityTimer = setTimeout(() => {
     isActive = false;
     document.body.classList.add('inactive');
     floatingAnimation();
 }, 30000); // 30 segundos de inactividad
}

// Eventos de actividad
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
 document.addEventListener(event, resetInactivityTimer, true);
});

// Animación cuando el usuario está inactivo
function floatingAnimation() {
 if (!isActive) {
     const orbs = document.querySelectorAll('.gradient-orb');
     orbs.forEach((orb, index) => {
         orb.style.animation = `floatIdle ${20 + index * 5}s ease-in-out infinite`;
     });
 }
}

// CSS para animación idle
const idleStyle = document.createElement('style');
idleStyle.textContent = `
 @keyframes floatIdle {
     0%, 100% {
         transform: translate(0, 0) scale(1);
     }
     25% {
         transform: translate(50px, -50px) scale(1.2);
     }
     50% {
         transform: translate(-30px, 30px) scale(0.9);
     }
     75% {
         transform: translate(40px, 40px) scale(1.1);
     }
 }
 
 body.inactive .gradient-orb {
     animation-duration: 30s !important;
 }
`;
document.head.appendChild(idleStyle);

// Easter egg: Código Konami
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
 if (e.key === konamiCode[konamiIndex]) {
     konamiIndex++;
     
     if (konamiIndex === konamiCode.length) {
         activateEasterEgg();
         konamiIndex = 0;
     }
 } else {
     konamiIndex = 0;
 }
});

function activateEasterEgg() {
 document.body.style.animation = 'rainbow 3s ease infinite';
 
 const message = document.createElement('div');
 message.style.cssText = `
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     font-size: 3rem;
     font-weight: 700;
     color: white;
     z-index: 10000;
     text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
     animation: easterEggPulse 2s ease;
 `;
 message.textContent = '🚀 ¡Modo Desarrollo Activado!';
 document.body.appendChild(message);
 
 setTimeout(() => {
     message.remove();
     document.body.style.animation = '';
 }, 3000);
}

// CSS para easter egg
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
 @keyframes rainbow {
     0% { filter: hue-rotate(0deg); }
     100% { filter: hue-rotate(360deg); }
 }
 
 @keyframes easterEggPulse {
     0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
     50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
 }
`;
document.head.appendChild(easterEggStyle);

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
 let timeoutId;
 let lastExecTime = 0;
 
 return function(...args) {
     const currentTime = Date.now();
     
     if (currentTime - lastExecTime > delay) {
         func.apply(this, args);
         lastExecTime = currentTime;
     } else {
         clearTimeout(timeoutId);
         timeoutId = setTimeout(() => {
             func.apply(this, args);
             lastExecTime = Date.now();
         }, delay - (currentTime - lastExecTime));
     }
 };
}

// Aplicar throttle a eventos de scroll
const handleScroll = throttle(() => {
 // Lógica de scroll ya implementada
}, 10);

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
 // Remover loader si existe
 const loader = document.querySelector('.loader');
 if (loader) {
     loader.style.opacity = '0';
     setTimeout(() => loader.remove(), 300);
 }
 
 // Iniciar timer de inactividad
 resetInactivityTimer();
 
 // Log de bienvenida
 console.log('%cDesarrollo Sur', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #ff9f55, #c56991); color: white; padding: 10px 20px; border-radius: 5px;');
 console.log('%c¡Bienvenido a nuestro sitio! 🚀', 'font-size: 14px; color: #ff9f55;');
 console.log('%c¿Buscas el easter egg? Prueba el código Konami 😉', 'font-size: 12px; color: #876394;');
});

// Three.js Background Animation
let scene, camera, renderer, particles, particlesMesh;
let threeMouseX = 0, threeMouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThree() {
 // No inicializar Three.js en móviles para mejor performance
 if (window.innerWidth < 768) {
     return;
 }
 
 // Scene
 scene = new THREE.Scene();
 
 // Camera
 camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
 camera.position.z = 1000;
 
 // Renderer
 renderer = new THREE.WebGLRenderer({
     canvas: document.getElementById('bg-canvas'),
     alpha: true,
     antialias: true
 });
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar pixel ratio
 renderer.setSize(window.innerWidth, window.innerHeight);
 
 // Reducir partículas en tablets
 const particleCount = window.innerWidth < 1024 ? 1000 : 2000;
 
 const posArray = new Float32Array(particleCount * 3);
 const colors = new Float32Array(particleCount * 3);
 
 // Colores de la paleta
 const colorPalette = [
     { r: 255/255, g: 159/255, b: 85/255 },   // orange
     { r: 242/255, g: 122/255, b: 120/255 },  // coral
     { r: 197/255, g: 105/255, b: 145/255 },  // pink
     { r: 135/255, g: 99/255, b: 148/255 },   // purple
     { r: 77/255, g: 89/255, b: 126/255 }     // blue
 ];
 
 for(let i = 0; i < particleCount * 3; i += 3) {
     // Posición
     posArray[i] = (Math.random() - 0.5) * 2000;
     posArray[i + 1] = (Math.random() - 0.5) * 2000;
     posArray[i + 2] = (Math.random() - 0.5) * 2000;
     
     // Color aleatorio de la paleta
     const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
     colors[i] = color.r;
     colors[i + 1] = color.g;
     colors[i + 2] = color.b;
 }
 
 particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
 particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
 
 // Material
 const particlesMaterial = new THREE.PointsMaterial({
     size: 3,
     vertexColors: true,
     transparent: true,
     opacity: 0.8,
     blending: THREE.AdditiveBlending
 });
 
 // Mesh
 particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
 scene.add(particlesMesh);
 
 // Crear líneas conectoras
 const linesGeometry = new THREE.BufferGeometry();
 const linePositions = new Float32Array(500 * 6);
 const lineColors = new Float32Array(500 * 6);
 
 for(let i = 0; i < 500 * 6; i += 6) {
     // Posiciones aleatorias para las líneas
     linePositions[i] = (Math.random() - 0.5) * 1000;
     linePositions[i + 1] = (Math.random() - 0.5) * 1000;
     linePositions[i + 2] = (Math.random() - 0.5) * 1000;
     linePositions[i + 3] = (Math.random() - 0.5) * 1000;
     linePositions[i + 4] = (Math.random() - 0.5) * 1000;
     linePositions[i + 5] = (Math.random() - 0.5) * 1000;
     
     // Color de las líneas
     const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
     for(let j = 0; j < 6; j += 3) {
         lineColors[i + j] = color.r;
         lineColors[i + j + 1] = color.g;
         lineColors[i + j + 2] = color.b;
     }
 }
 
 linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
 linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
 
 const linesMaterial = new THREE.LineBasicMaterial({
     vertexColors: true,
     transparent: true,
     opacity: 0.1,
     blending: THREE.AdditiveBlending
 });
 
 const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
 scene.add(lines);
 
 // Event listeners
 document.addEventListener('mousemove', onDocumentMouseMove);
 window.addEventListener('resize', onWindowResize);
 
 animate();
}

function onDocumentMouseMove(event) {
 threeMouseX = (event.clientX - windowHalfX) * 0.05;
 threeMouseY = (event.clientY - windowHalfY) * 0.05;
}

function onWindowResize() {
 windowHalfX = window.innerWidth / 2;
 windowHalfY = window.innerHeight / 2;
 
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();
 
 renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
 requestAnimationFrame(animate);
 
 // Rotación suave de las partículas
 particlesMesh.rotation.x += 0.0005;
 particlesMesh.rotation.y += 0.001;
 
 // Movimiento basado en el mouse
 camera.position.x += (threeMouseX - camera.position.x) * 0.05;
 camera.position.y += (-threeMouseY - camera.position.y) * 0.05;
 camera.lookAt(scene.position);
 
 // Animación de las partículas
 const positions = particlesMesh.geometry.attributes.position.array;
 for(let i = 0; i < positions.length; i += 3) {
     positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.1;
 }
 particlesMesh.geometry.attributes.position.needsUpdate = true;
 
 renderer.render(scene, camera);
}

// Inicializar Three.js solo en desktop
if (typeof THREE !== 'undefined' && window.innerWidth > 768) {
 initThree();
}

// Deshabilitar animaciones pesadas en móvil
if (window.innerWidth <= 768) {
 // Remover animaciones de parallax
 window.removeEventListener('scroll', handleParallax);
 
 // Simplificar o remover otras animaciones
 document.querySelectorAll('.gradient-orb').forEach(orb => {
     orb.style.display = 'none';
 });
}

document.querySelectorAll('.faq-question, .caso-title').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});
