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

  function positionTooltip(e) {
    const x = e.clientX + 15;
    const y = e.clientY + 15;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

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
});
