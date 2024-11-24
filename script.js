document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const tooltip = document.getElementById("tooltip");
  let currentIndex = 0;
  let isAutoPlaying = false;
  let autoPlayInterval;

  // Tooltip functionality
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", (e) => {
      const description = item.getAttribute("data-description");
      tooltip.textContent = description;
      tooltip.style.display = "block";
      positionTooltip(e);
    });

    item.addEventListener("mousemove", (e) => {
      positionTooltip(e);
    });

    item.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });

  // Position tooltip
  function positionTooltip(e) {
    const x = e.clientX + 15;
    const y = e.clientY + 15;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Adjust position if tooltip would go off screen
    const finalX =
      x + tooltipWidth > windowWidth ? windowWidth - tooltipWidth - 10 : x;
    const finalY =
      y + tooltipHeight > windowHeight ? windowHeight - tooltipHeight - 10 : y;

    tooltip.style.left = `${finalX}px`;
    tooltip.style.top = `${finalY}px`;
  }

  // Auto-play functionality
  function startAutoPlay() {
    if (!isAutoPlaying) {
      isAutoPlaying = true;
      autoPlayInterval = setInterval(highlightNext, 2000);
    }
  }

  function stopAutoPlay() {
    if (isAutoPlaying) {
      isAutoPlaying = false;
      clearInterval(autoPlayInterval);
      menuItems.forEach((item) => item.classList.remove("active"));
    }
  }

  function highlightNext() {
    menuItems.forEach((item) => item.classList.remove("active"));
    menuItems[currentIndex].classList.add("active");
    currentIndex = (currentIndex + 1) % menuItems.length;
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        currentIndex = (currentIndex + 1) % menuItems.length;
        highlightMenuItem(currentIndex);
        break;
      case "ArrowLeft":
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        highlightMenuItem(currentIndex);
        break;
      case "Space":
        if (isAutoPlaying) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
        e.preventDefault();
        break;
    }
  });

  function highlightMenuItem(index) {
    menuItems.forEach((item) => item.classList.remove("active"));
    menuItems[index].classList.add("active");
  }

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe right
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      } else {
        // Swipe left
        currentIndex = (currentIndex + 1) % menuItems.length;
      }
      highlightMenuItem(currentIndex);
    }
  }

  // Double click to start/stop auto-play
  document.querySelector(".menu-container").addEventListener("dblclick", () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });
});
