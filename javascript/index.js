let selectedCities = [];
let currentPosition = 0;
let visibleCities = 4;

function formatCityName(cityTimeZone) {
  return cityTimeZone.replace("_", " ").split("/")[1];
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
    let cityTime = moment().tz(cityTimeZone);

    let cityHTML = `
      <div class="city">
        <div class="city-content">
          <div>
            <h2>${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
          </div>
          <div class="time">${cityTime.format("HH:mm:ss")}</div>
        </div>
      </div>
    `;

    citiesHTML += cityHTML;
  });

  citiesElement.innerHTML = citiesHTML;

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

function updateTimes() {
  displayCities();
}

function updateCarousel() {
  let citiesElement = document.querySelector("#cities");
  let movePercentage = currentPosition * 25;

  citiesElement.style.transform = `translateX(-${movePercentage}%)`;
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

  if (currentPosition === 0) {
    previousButton.disabled = true;
  } else {
    previousButton.disabled = false;
  }

  if (currentPosition >= lastPossiblePosition) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", addCity);

let previousButton = document.querySelector("#previous-button");
previousButton.addEventListener("click", showPreviousCity);

let nextButton = document.querySelector("#next-button");
nextButton.addEventListener("click", showNextCity);

displayCities();
setInterval(updateTime, 1000);
