document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#site-nav a');
    const headerHeight = document.querySelector('.menu_bar').offsetHeight; // Get the height of your header
    const lowerOffsetFactor = 0.3; // Adjust this value (0 to 0.5) to control how low it lands
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
  
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          // Calculate a target position that's a bit lower
          const targetPosition = targetElement.offsetTop - (window.innerHeight * lowerOffsetFactor) + (targetElement.offsetHeight / 2);
  
          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      });
    });
  });