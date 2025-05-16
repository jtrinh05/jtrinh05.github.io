document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('#site-nav a');
  const headerHeight = document.querySelector('.menu_bar').offsetHeight;
  const lowerOffsetFactor = 0.3;

  navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetHref = this.getAttribute('href');

            // Check if the link is an internal (hash) link
            if (targetHref.startsWith('#')) {
                event.preventDefault(); // Prevent default only for internal links

                const targetId = targetHref; // It's already a valid ID selector
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - (window.innerHeight * lowerOffsetFactor) + (targetElement.offsetHeight / 2);

                    window.scrollTo({
                        top: targetPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
            // If it's not an internal hash link (like your LinkedIn URL),
            // we don't call event.preventDefault(), so the browser will
            // perform its default action of navigating to the external URL.
        });
    });
});

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const indicatorContainer = document.querySelector(".slide-indicators");
let indicators = []; // Array to hold the indicator elements

function showSlide(n) {
  slides.forEach(slide => {
    slide.className = 'slide'; // Reset classes
    slide.style.display = 'none';
    slide.style.transform = 'translateX(0)'; // Reset transform
  });
  indicators.forEach(indicator => indicator.className = indicator.className.replace(" active", ""));

  slideIndex = (n + slides.length) % slides.length;
  const currentSlide = slides[slideIndex];
  currentSlide.style.display = 'block';
  currentSlide.classList.add('active-slide');
  indicators[slideIndex].className += " active";
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

function currentSlide(n) {
  showSlide(n);
}

// Create the indicator dots
function createIndicators() {
  for (let i = 0; i < slides.length; i++) {
    const indicator = document.createElement("span");
    indicator.className = "indicator";
    indicator.addEventListener("click", () => currentSlide(i));
    indicatorContainer.appendChild(indicator);
    indicators.push(indicator);
  }
  // Set the first indicator as active
  indicators[0].className += " active";
}

// Event listeners for the navigation buttons
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// Create the indicators when the script loads
createIndicators();

// Show the initial slide
showSlide(slideIndex);