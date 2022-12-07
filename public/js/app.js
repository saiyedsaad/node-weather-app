console.log("Client side javascript!");

const weatherForm = document.querySelector("form");
const searchedInput = document.querySelector("input");
const messageOne = document.querySelector(".forecast");
const messageTwo = document.querySelector(".location");


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    messageOne.textContent = "Loading.."
    messageTwo.textContent = "";

    fetch(`http://localhost:3000/weather?address=${searchedInput.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            } else {
                // console.log(data.location);
                // console.log(data.forecast);
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        })
    });
})