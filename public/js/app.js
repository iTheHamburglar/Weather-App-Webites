

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo  = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
const weatherImg = document.querySelector(".weather-icon");


weatherForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const location = searchElement.value;
    weatherImg.src = "";
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    messageThree.textContent = "";
    messageFour.textContent = "";
 
    fetch(`/forecast?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                weatherImg.src = data.weatherInfo.icon;
                messageOne.textContent = data.location;
                messageTwo.textContent = data.weatherInfo.temperatureData;
                messageThree.textContent = data.weatherInfo.humidity;
                messageFour.textContent = data.weatherInfo.windData;

            }
        });
    });
})