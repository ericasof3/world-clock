function updateTime() {
  // Lisbon
  let lisbonElement = document.querySelector("#lisbon");
  if (lisbonElement) {
    let lisbonDateElement = lisbonElement.querySelector(".date");
    let lisbonTimeElement = lisbonElement.querySelector(".time");
    let lisbonTime = moment().tz("Europe/Lisbon");

    lisbonDateElement.innerHTML = lisbonTime.format("MMMM Do YYYY");
    lisbonTimeElement.innerHTML = lisbonTime.format(
      "h:mm:ss [<small>]A[</small>]",
    );
  }

  //Maputo
  let maputoElement = document.querySelector("#maputo");
  if (maputoElement) {
    let maputoDateElement = maputoElement.querySelector(".date");
    let maputoTimeElement = maputoElement.querySelector(".time");
    let maputoTime = moment().tz("Africa/Maputo");

    maputoDateElement.innerHTML = maputoTime.format("MMMM Do YYYY");
    maputoTimeElement.innerHTML = maputoTime.format(
      "h:mm:ss [<small>]A[</small>]",
    );
  }

  //Havana
  let havanaElement = document.querySelector("#havana");
  if (havanaElement) {
    let havanaDateElement = havanaElement.querySelector(".date");
    let havanaTimeElement = havanaElement.querySelector(".time");
    let havanaTime = moment().tz("America/Havana");

    havanaDateElement.innerHTML = havanaTime.format("MMMM Do YYYY");
    havanaTimeElement.innerHTML = havanaTime.format(
      "h:mm:ss [<small>]A[</small>]",
    );
  }

  //Tokyo
  let tokyoElement = document.querySelector("#tokyo");
  if (tokyoElement) {
    let tokyoDateElement = tokyoElement.querySelector(".date");
    let tokyoTimeElement = tokyoElement.querySelector(".time");
    let tokyoTime = moment().tz("Asia/Tokyo");

    tokyoDateElement.innerHTML = tokyoTime.format("MMMM Do YYYY");
    tokyoTimeElement.innerHTML = tokyoTime.format(
      "h:mm:ss [<small>]A[</small>]",
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  let cityName = cityTimeZone.split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city">
    <div>
        <h2>${cityName}</h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
      "A",
    )}</small></div>
  </div>
  `;
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
