document.addEventListener('DOMContentLoaded', function () {
  // Sync main carousel with thumbnails
  const mainCarousel = document.getElementById('productMainCarousel');
  if (mainCarousel) {
    const carousel = new bootstrap.Carousel(mainCarousel, {
      interval: false,
      touch: true
    });
  }
  const thumbnails = document.querySelectorAll('.thumbnail');
  const thumbnailSlider = document.querySelector('.thumbnail-slider-wrapper');
  const isMobileDevice = () => window.innerWidth < 992; // Bootstrap lg breakpoint
  
  // Check if we have a carousel and images
  const hasCarousel = !!mainCarousel;
  const hasThumbnails = thumbnails.length > 0;
  const hasMultipleImages = thumbnails.length > 1;

  // Don't initialize carousel features if no carousel or only one image
  if (!hasCarousel || !hasThumbnails) {
    // Hide thumbnail navigation if no thumbnails or just one image
    if (thumbnailSlider) {
      thumbnailSlider.style.display = 'none';
    }
    return;
  }

  // Function to initialize or disable thumbnail slider functionality
  function setupThumbnailSlider() {
    if (isMobileDevice() || !hasMultipleImages) {
      // Hide thumbnail slider on mobile or if only one image
      if (thumbnailSlider) thumbnailSlider.style.display = 'none';
      return; 
    } else {
      // Show thumbnail slider on desktop with multiple images
      if (thumbnailSlider) thumbnailSlider.style.display = '';
    }

    if (mainCarousel) {
      // Remove existing event listener to prevent duplicates
      mainCarousel.removeEventListener('slide.bs.carousel', handleSlideEvent);
      // Add event listener
      mainCarousel.addEventListener('slide.bs.carousel', handleSlideEvent);
    }
  }

  // Handle carousel slide event
  function handleSlideEvent(e) {
    // Only run on non-mobile devices with multiple images
    if (isMobileDevice() || !hasMultipleImages) return;

    // Update active thumbnail
    thumbnails.forEach((thumb) => thumb.classList.remove('active'));
    if (thumbnails[e.to]) thumbnails[e.to].classList.add('active');

    // Scroll thumbnails to keep active one visible
    scrollToThumbnail(e.to);
  }

  // Add click events for thumbnails
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function () {
      // Only run on non-mobile devices
      if (isMobileDevice()) return;

      // Update UI
      thumbnails.forEach((t) => t.classList.remove('active'));
      this.classList.add('active');

      // Trigger carousel to show this slide
      if (mainCarousel) {
        const carousel = bootstrap.Carousel.getInstance(mainCarousel);
        if (carousel) carousel.to(index);
      }
    });
  });

  // Thumbnail navigation
  const container = document.getElementById('thumbnailContainer');
  const prevBtn = document.querySelector('.thumbnail-prev');
  const nextBtn = document.querySelector('.thumbnail-next');
  let scrollPosition = 0;
  const scrollAmount = 100; // px to scroll

  // Only setup thumbnail navigation if we have multiple images
  if (hasMultipleImages && prevBtn && nextBtn && container) {
    // Remove existing event listeners to prevent duplicates
    prevBtn.removeEventListener('click', handlePrevClick);
    nextBtn.removeEventListener('click', handleNextClick);

    // Add event listeners
    prevBtn.addEventListener('click', handlePrevClick);
    nextBtn.addEventListener('click', handleNextClick);
  } else {
    // Hide navigation buttons if no multiple images
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  }

  function handlePrevClick() {
    if (isMobileDevice() || !hasMultipleImages) return;
    scrollPosition = Math.max(0, scrollPosition - scrollAmount);
    container.style.transform = `translateX(-${scrollPosition}px)`;

    // Update button states
    updateButtonStates();
  }

  function handleNextClick() {
    if (isMobileDevice() || !hasMultipleImages) return;
    const maxScroll = container.scrollWidth - container.parentElement.clientWidth;
    scrollPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    container.style.transform = `translateX(-${scrollPosition}px)`;

    // Update button states
    updateButtonStates();
  }

  function updateButtonStates() {
    if (!hasMultipleImages || !prevBtn || !nextBtn) return;
    
    // Disable prev button if at start
    prevBtn.disabled = scrollPosition <= 0;

    // Disable next button if at end
    const maxScroll = container.scrollWidth - container.parentElement.clientWidth;
    nextBtn.disabled = scrollPosition >= maxScroll;
  }

  function scrollToThumbnail(index) {
    if (isMobileDevice() || !container || !hasMultipleImages) return;

    const thumbnail = thumbnails[index];
    if (!thumbnail) return;

    const thumbnailLeft = thumbnail.offsetLeft;
    const thumbnailWidth = thumbnail.offsetWidth;
    const containerWidth = container.parentElement.clientWidth;

    // Calculate if the thumbnail is fully visible
    const isVisible =
      thumbnailLeft >= scrollPosition &&
      thumbnailLeft + thumbnailWidth <= scrollPosition + containerWidth;

    if (!isVisible) {
      // Center the thumbnail
      scrollPosition = thumbnailLeft - (containerWidth - thumbnailWidth) / 2;

      // Ensure we don't scroll past bounds
      scrollPosition = Math.max(0, scrollPosition);
      const maxScroll = container.scrollWidth - containerWidth;
      scrollPosition = Math.min(maxScroll, scrollPosition);

      // Apply scroll
      container.style.transform = `translateX(-${scrollPosition}px)`;

      // Update button states
      updateButtonStates();
    }
  }

  // Initial setup
  setupThumbnailSlider();

  // Initial button states
  updateButtonStates();

  // Re-evaluate on window resize
  window.removeEventListener('resize', setupThumbnailSlider);
  window.addEventListener('resize', setupThumbnailSlider);
});