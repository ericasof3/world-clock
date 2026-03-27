let selectedCities = [];
let currentPosition = 0;
let visibleCities = 4;

function formatCityName(cityTimeZone) {
  return cityTimeZone.split("/")[1].replace("_", " ");
}

function formatCityImage(cityTimeZone) {
  let city = cityTimeZone.split("/")[1].replace("_", "-").toLowerCase();

  let availableCities = [
    "lisbon",
    "maputo",
    "havana",
    "tokyo",
    "london",
    "seoul",
    "santiago",
    "kuala-lumpur",
  ];

  if (availableCities.includes(city)) {
    return `images/${city}.jpg`;
  } else {
    return "images/current-location.jpg";
  }
}

function displayCities() {
  let citiesElement = document.querySelector("#cities");
  let emptyMessageElement = document.querySelector("#empty-message");
  let citiesHTML = "";

  if (selectedCities.length === 0) {
    citiesElement.innerHTML = "";
    citiesElement.style.transform = "translateX(0)";
    emptyMessageElement.style.display = "flex";
    document.querySelector("#previous-button").disabled = true;
    document.querySelector("#next-button").disabled = true;
    return;
  }

  emptyMessageElement.style.display = "none";

  selectedCities.forEach(function (cityTimeZone) {
    let cityName = formatCityName(cityTimeZone);
    let cityImage = formatCityImage(cityTimeZone);
    let cityTime = moment().tz(cityTimeZone);

    let cityHTML = `
    <div class="city" data-timezone="${cityTimeZone}" style="background-image: url('${cityImage}')">
      <button class="remove-city-button" data-timezone="${cityTimeZone}">×</button>
      <div class="city-content">
        <div>
          <h2>${cityName}</h2>
          <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format("H:mm:ss")}</div>
      </div>
    </div>
    `;

    citiesHTML += cityHTML;
  });

  citiesElement.innerHTML = citiesHTML;

  let removeButtons = document.querySelectorAll(".remove-city-button");

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let cityTimeZone = button.getAttribute("data-timezone");
      removeCity(cityTimeZone);
    });
  });

  updateCarousel();
  updateButtons();
}

function addCity(event) {
  let cityTimeZone = event.target.value;

  if (cityTimeZone === "") {
    return;
  }

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  if (selectedCities.includes(cityTimeZone) === false) {
    selectedCities.push(cityTimeZone);
  }

  if (selectedCities.length > visibleCities) {
    currentPosition = selectedCities.length - visibleCities;
  }

  displayCities();
  event.target.value = "";
}

function removeCity(cityTimeZone) {
  selectedCities = selectedCities.filter(function (city) {
    return city !== cityTimeZone;
  });

  let lastPossiblePosition = selectedCities.length - visibleCities;

  if (lastPossiblePosition < 0) {
    lastPossiblePosition = 0;
  }

  if (currentPosition > lastPossiblePosition) {
    currentPosition = lastPossiblePosition;
  }

  displayCities();
}

function updateTimes() {
  let cityElements = document.querySelectorAll(".city");

  cityElements.forEach(function (cityElement) {
    let cityTimeZone = cityElement.getAttribute("data-timezone");
    let cityTime = moment().tz(cityTimeZone);

    let dateElement = cityElement.querySelector(".date");
    let timeElement = cityElement.querySelector(".time");

    dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    timeElement.innerHTML = cityTime.format("HH:mm:ss");
  });
}

function updateCarousel() {
  let citiesElement = document.querySelector("#cities");
  let city = document.querySelector(".city");

  if (!city) return;

  let gap = 10;
  let cityWidth = city.offsetWidth + gap;

  let move = currentPosition * cityWidth;

  citiesElement.style.transform = `translateX(-${move}px)`;
}

function showPreviousCity() {
  if (currentPosition > 0) {
    currentPosition = currentPosition - 1;
    updateCarousel();
    updateButtons();
  }
}

function showNextCity() {
  let lastPossiblePosition = selectedCities.length - visibleCities;

  if (currentPosition < lastPossiblePosition) {
    currentPosition = currentPosition + 1;
    updateCarousel();
    updateButtons();
  }
}

function updateButtons() {
  let previousButton = document.querySelector("#previous-button");
  let nextButton = document.querySelector("#next-button");
  let lastPossiblePosition = selectedCities.length - visibleCities;

  if (lastPossiblePosition < 0) {
    lastPossiblePosition = 0;
  }

  previousButton.disabled = currentPosition === 0;
  nextButton.disabled = currentPosition >= lastPossiblePosition;
}

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", addCity);

let previousButton = document.querySelector("#previous-button");
previousButton.addEventListener("click", showPreviousCity);

let nextButton = document.querySelector("#next-button");
nextButton.addEventListener("click", showNextCity);

displayCities();
setInterval(updateTimes, 1000);
