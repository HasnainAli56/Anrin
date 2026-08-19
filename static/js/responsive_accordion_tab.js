document.addEventListener('DOMContentLoaded', () => {
   // Get the components (might be multiple on a page)
   const tabComponents = document.querySelectorAll('.responsive-tabs-component');
   const ANIMATION_SPEED = 300; // Match the accordionJS slideSpeed

   tabComponents.forEach(component => {
      const tabItems = component.querySelectorAll('.tab-item');
      const tabHeaders = component.querySelectorAll('.tab-header');
      const tabContents = component.querySelectorAll('.tab-content');
      const desktopTabContents = component.querySelector('.desktop-tab-contents');

      // Function to check viewport size and adjust content location
      const checkViewportSize = () => {
         const isMobile = window.innerWidth < 992; // Match the CSS breakpoint (lg)

         if (!isMobile) {
            // Desktop: Move all content to the desktop container
            tabContents.forEach(content => {
               desktopTabContents.appendChild(content);

               // Reset any inline styles when switching to desktop
               content.style.height = '';
               content.style.padding = '';
               content.style.opacity = '';
               content.style.overflow = '';
               content.style.visibility = '';
               content.style.display = '';
               content.style.transition = '';
            });
         } else {
            // Mobile: Move content back under their respective headers
            tabContents.forEach((content, index) => {
               if (tabItems[index]) {
                  tabItems[index].appendChild(content);

                  // Reset inline styles when moving back to mobile view
                  if (content.classList.contains('active')) {
                     // Make active content visible
                     content.style.height = '';
                     content.style.visibility = 'visible';
                     content.style.opacity = '1';
                     content.style.padding = '0';
                     content.style.overflow = '';
                     content.style.display = 'block';
                  } else {
                     // Keep inactive content hidden
                     content.style.height = '0px';
                     content.style.visibility = 'hidden';
                     content.style.opacity = '0';
                     content.style.padding = '0';
                     content.style.overflow = 'hidden';
                  }
                  content.style.transition = '';
               }
            });
         }
      };

      function slideUp(element, duration = ANIMATION_SPEED) {
         return new Promise(resolve => {
            if (!element || element.style.height === '0px') {
               resolve();
               return;
            }

            // Set overflow to hidden to contain the content during animation
            element.style.overflow = 'hidden';

            // Store the current height before any changes
            const height = element.offsetHeight;

            // Set explicit height to prevent jumping
            element.style.height = `${height}px`;

            // Force reflow to ensure the explicit height is applied
            element.offsetHeight;

            // Set transitions with different timings for smoother effect
            element.style.transition = `
            height ${duration}ms ease-out,
            opacity ${duration * 0.5}ms ease-out,
            padding ${duration * 0.7}ms ease-out
         `;

            // Apply all changes in the next frame
            requestAnimationFrame(() => {
               element.style.height = '0px';
               element.style.opacity = '0';
               element.style.padding = '0';

               setTimeout(() => {
                  // Clean up styles
                  element.style.display = 'none';
                  element.style.height = '';
                  element.style.opacity = '';
                  element.style.padding = '';
                  element.style.overflow = '';
                  element.style.transition = '';
                  element.style.visibility = 'hidden';
                  element.classList.remove('active');
                  resolve();
               }, duration);
            });
         });
      }

      function slideDown(element, duration = ANIMATION_SPEED) {
         return new Promise(resolve => {
            // Set initial state - Make content immediately visible but with 0 height
            element.classList.add('active');
            element.style.display = 'block';
            element.style.height = '0px';
            element.style.opacity = '1'; // Set opacity to 1 immediately
            element.style.overflow = 'hidden';
            element.style.padding = '0';
            element.style.visibility = 'visible';

            // Calculate final height by temporarily removing transitions and setting padding
            element.style.transition = 'none';
            element.style.padding = '1.5rem 0';
            const targetHeight = element.scrollHeight;
            element.style.padding = '0';

            // Force reflow
            element.offsetHeight;

            // Simplify transitions to focus on height and padding
            element.style.transition = `
               height ${duration}ms ease-in,
               padding ${duration}ms ease-in
            `;

            // Start animation
            requestAnimationFrame(() => {
               element.style.height = `${targetHeight}px`;
               element.style.padding = '0';

               setTimeout(() => {
                  // Clean up animation styles
                  element.style.height = 'auto';
                  element.style.overflow = 'visible';
                  element.style.transition = '';

                  // Ensure content is visible
                  const contentInner = element.querySelector('.content-inner');
                  if (contentInner) {
                     contentInner.style.display = 'block';
                     contentInner.style.height = 'auto';
                  }

                  resolve();
               }, duration);
            });
         });
      }

      tabHeaders.forEach((header, index) => {
         header.addEventListener('click', async () => {
         const targetId = header.getAttribute('aria-controls');
         const targetContent = document.getElementById(targetId);
         const isMobile = window.innerWidth < 992;
   
         // Add conditional smooth scrolling behavior
         if (isMobile) {
            // On mobile: Scroll to the product-features element with 30px offset
            const productFeatures = document.getElementById('product-features');
            if (productFeatures) {
               // Get the top position of the element relative to the viewport
               const featureTop = productFeatures.getBoundingClientRect().top;
               // Add the current scroll position to get absolute position
               const absoluteTop = featureTop + window.scrollY;
               // Scroll to element with 30px offset
               window.scrollTo({
                  top: absoluteTop - 100,
                  behavior: 'smooth'
               });
            }
         } else {
            // On desktop: Scroll to component with 100px offset
            const componentTop = component.getBoundingClientRect().top;
            const absoluteTop = componentTop + window.scrollY;
            window.scrollTo({
               top: absoluteTop - 100,
               behavior: 'smooth'
            });
         }

   // If we're already showing this content on mobile and it's active,
   // close it and open the next tab instead
   if (isMobile && targetContent.classList.contains('active') &&
      targetContent.style.height !== '0px') {
      
      // Close current tab
      await slideUp(targetContent);
      
      // Find the next tab to open (cycling back to first if at the end)
      const nextIndex = (index + 1) % tabHeaders.length;
      const nextHeader = tabHeaders[nextIndex];
      const nextTargetId = nextHeader.getAttribute('aria-controls');
      const nextTargetContent = document.getElementById(nextTargetId);
      
      // Update header states
      tabHeaders.forEach(h => {
         h.classList.remove('active');
         h.setAttribute('aria-expanded', 'false');
      });
      nextHeader.classList.add('active');
      nextHeader.setAttribute('aria-expanded', 'true');
      
      // Open the next tab
      await slideDown(nextTargetContent);
      
      return;
   }

   // Update active state on headers
   tabHeaders.forEach(h => {
      h.classList.remove('active');
      h.setAttribute('aria-expanded', 'false');
   });

   header.classList.add('active');
   header.setAttribute('aria-expanded', 'true');

   // Update active state on contents with animation on mobile
   if (isMobile) {
      // Run closing and opening animations in parallel instead of waiting
      // for panels to close before opening the new one
      
      // Find active content to close (if any)
      const activeContents = Array.from(tabContents).filter(content => 
         content !== targetContent && 
         content.classList.contains('active') &&
         (content.style.height !== '0px' && content.style.visibility !== 'hidden')
      );
      
      // Start all animations in parallel
      const animationPromises = [];
      
      // Add all closing animations to promises
      activeContents.forEach(content => {
         animationPromises.push(slideUp(content));
      });
      
      // Add opening animation if needed
      if (!targetContent.classList.contains('active') ||
         targetContent.style.height === '0px' ||
         targetContent.style.opacity === '0' ||
         targetContent.style.visibility === 'hidden') {
         animationPromises.push(slideDown(targetContent));
      }
      
      // Wait for all animations to complete
      await Promise.all(animationPromises);
   } else {
      // Desktop: simple toggle without animation
      tabContents.forEach(content => {
         content.classList.remove('active');
      });

      targetContent.classList.add('active');
   }
});
         // Keyboard navigation implementation
         header.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
               // Simulate a click when Enter or Space is pressed
               event.preventDefault();
               header.click();
            } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
               // Move to the next tab
               event.preventDefault();
               const allHeaders = Array.from(tabHeaders);
               const currentIndex = allHeaders.indexOf(header);
               const nextIndex = (currentIndex + 1) % allHeaders.length;
               allHeaders[nextIndex]?.focus();
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
               // Move to the previous tab
               event.preventDefault();
               const allHeaders = Array.from(tabHeaders);
               const currentIndex = allHeaders.indexOf(header);
               const prevIndex = (currentIndex - 1 + allHeaders.length) % allHeaders.length;
               allHeaders[prevIndex]?.focus();
            }
         });
      });

      // Initial check and setup
      checkViewportSize();

      // Update on resize
      window.addEventListener('resize', checkViewportSize);
   });
});