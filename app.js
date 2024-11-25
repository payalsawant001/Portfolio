// Add event listener to capture click on navbar buttons (they act like links)
document.querySelectorAll('.navbar .nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();  // Prevent default behavior of the link (no page reload)

    // Get the target section based on the link's href (id of the section)
    const targetId = this.getAttribute('href').substring(1); // remove '#' from href
    const targetSection = document.getElementById(targetId);

    // Scroll to the target section smoothly, adjusting for the fixed navbar height
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - document.querySelector('.navbar').offsetHeight, // Subtract navbar height
        behavior: 'smooth',
      });
    }
  });
});

const skillBoxes = document.querySelectorAll('.skill-box');

// Options for the observer
const options = {
  root: null, // Use the viewport as the root
  threshold: 0.5, // Trigger when 50% of the element is in view
};

// Callback function to handle when skill boxes come into view
const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the 'visible' class when the element is in view
      entry.target.classList.add('visible');
      // Optional: Stop observing the element once it has become visible
      observer.unobserve(entry.target);
    }
  });
};

// Create the observer instance
const observer = new IntersectionObserver(callback, options);

// Observe each skill box
skillBoxes.forEach(box => {
  observer.observe(box);
});

// Project section
// Select all project boxes
const projectBoxes = document.querySelectorAll('.project-box');

// Function to check if elements are in view
function checkInView() {
  const windowHeight = window.innerHeight;

  projectBoxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    // If the box is in the viewport, add the "visible" class
    if (boxTop <= windowHeight * 0.8) { // You can adjust the value for early/late visibility
      box.classList.add('visible');
    } else {
      box.classList.remove('visible');
    }
  });
}

// Call the checkInView function on scroll and resize
window.addEventListener('scroll', checkInView);
window.addEventListener('resize', checkInView);

// Initial check in case the section is already in view
checkInView();
