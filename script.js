const defaultCities = [
  { id: "los-angeles", tz: "America/Los_Angeles", label: "Los Angeles 🇺🇸" },
  { id: "london", tz: "Europe/London", label: "London 🇬🇧" },
  { id: "auckland", tz: "Pacific/Auckland", label: "Auckland 🇳🇿" }
];

let selectedCity = null;

// Update a single clock element
function updateClock(cityElement, tz) {
  const dateEl = cityElement.querySelector(".date");
  const timeEl = cityElement.querySelector(".time");
  const time = moment().tz(tz);
  dateEl.innerHTML = time.format("MMMM Do YYYY");
  timeEl.innerHTML = time.format("h:mm:ss A");
}

// Update all clocks
function updateAllClocks() {
  // Update default clocks only if visible
  if (document.getElementById("default-cities").style.display !== "none") {
    defaultCities.forEach(city => {
      const el = document.getElementById(city.id);
      if (el) updateClock(el, city.tz);
    });
  }

  // Update selected city if visible
  if (selectedCity && document.getElementById("selected-city").style.display !== "none") {
    const cityEl = document.querySelector("#selected-city .city");
    if (cityEl) updateClock(cityEl, selectedCity.tz);
  }
}

// Handle city selection from dropdown
function selectCity(event) {
  const value = event.target.value;
  if (!value) return;

  let tz, label;

  if (value === "current") {
    tz = moment.tz.guess();
    label = "Your Location 🌎";
  } else {
    tz = value;
    label = value.split("/")[1].replace("_", " ");
  }

  selectedCity = { tz, label };

  // Hide default clocks
  document.getElementById("default-cities").style.display = "none";

  // Render selected city
  const container = document.getElementById("selected-city");
  container.innerHTML = `
    <div class="city">
      <h2>${selectedCity.label}</h2>
      <div class="date"></div>
      <div class="time"></div>
      <div><a href="#" id="all-cities-link">All Cities 🌐</a></div>
    </div>
  `;
  container.style.display = "block";

  // Attach click to go back to default clocks
  document.getElementById("all-cities-link").addEventListener("click", function(e) {
    e.preventDefault();
    selectedCity = null;
    container.style.display = "none";
    document.getElementById("default-cities").style.display = "block";
    document.getElementById("city-select").value = ""; // Reset dropdown
  });
}

// Initialize
document.getElementById("city-select").addEventListener("change", selectCity);
document.getElementById("selected-city").style.display = "none"; // Hide initially
updateAllClocks();
setInterval(updateAllClocks, 1000);
