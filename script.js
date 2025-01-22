document.addEventListener("DOMContentLoaded", function () {
  const carList = document.getElementById("car-list");
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const whatsappNumber = "6288217865354";

  // Toggle sidebar on mobile
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      sidebar.classList.remove("active");
    }
  });

  function createWhatsAppMessage(car) {
    return encodeURIComponent(
      `Halo, saya tertarik untuk menyewa ${car.name} dengan harga ${car.price}. Mohon informasi lebih lanjut.`
    );
  }

  function displayCars() {
    transportationData.forEach((car, index) => {
      const carCard = document.createElement("div");
      carCard.className = "car-card fade-in";

      // Add a small delay for each card
      carCard.style.transitionDelay = `${index * 0.1}s`;

      const whatsappMessage = createWhatsAppMessage(car);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      carCard.innerHTML = `
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}">
                </div>
                <h3>${car.name}</h3>
                <div class="car-details">
                    <p><strong>Harga:</strong> ${car.price}</p>
                    <p><strong>Tujuan:</strong> ${car.destination}</p>
                    <p><strong>Penjemputan:</strong> ${car.pickup}</p>
                    <div class="includes">
                        <p><strong>Termasuk:</strong></p>
                        <ul>
                            ${car.include
                              .map((item) => `<li>${item}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    <div class="excludes">
                        <p><strong>Tidak Termasuk:</strong></p>
                        <ul>
                            ${car.exclude
                              .map((item) => `<li>${item}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    <a href="${whatsappLink}" target="_blank" class="whatsapp-button">
                        <i class="fab fa-whatsapp"></i>Hubungi via WhatsApp
                    </a>
                </div>
            `;

      carList.appendChild(carCard);
    });
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all elements with animation classes
  function observeElements() {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right"
    );
    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({
        behavior: "smooth",
      });

      // Close sidebar on mobile after clicking a link
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
      }
    });
  });

  // Display cars and initialize animations
  displayCars();
  observeElements();
});
