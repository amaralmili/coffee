// Carousel script: controls, autoplay, dots, keyboard
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-slides');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prev = document.getElementById('prevTestimonial');
  const next = document.getElementById('nextTestimonial');
  const dotsWrap = document.querySelector('.carousel-dots');
  if (!track || slides.length === 0) return;

  let index = 0;
  const setPosition = (i) => {
    const percent = i * -100;
    track.style.transform = `translateX(${percent}%)`;
    Array.from(dotsWrap.children).forEach((b, idx) => b.classList.toggle('active', idx === i));
  };

  // build dots
  slides.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = i === 0 ? 'active' : '';
    b.setAttribute('aria-label', `Go to testimonial ${i+1}`);
    b.addEventListener('click', () => { index = i; setPosition(index); resetTimer(); });
    dotsWrap.appendChild(b);
  });

  const prevSlide = () => { index = (index - 1 + slides.length) % slides.length; setPosition(index); resetTimer(); };
  const nextSlide = () => { index = (index + 1) % slides.length; setPosition(index); resetTimer(); };
  prev && prev.addEventListener('click', prevSlide);
  next && next.addEventListener('click', nextSlide);

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // autoplay with pause on hover
  let timer = null;
  const startTimer = () => { timer = setInterval(() => { nextSlide(); }, 6000); };
  const resetTimer = () => { clearInterval(timer); startTimer(); };
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => startTimer());

  // init
  setPosition(0);
  startTimer();
});
