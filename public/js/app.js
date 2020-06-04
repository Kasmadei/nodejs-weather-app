const weatherForm = document.querySelector('#FORM')
const search = document.querySelector('#SEARCH')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    const location = search.value;

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(res => {
            if (res.responseStatus !== 200) {
                messageOne.textContent = 'Unable to find location. Try another search.';
                return;
            } else {
                const weatherData = { ...res.data }
                messageOne.textContent = `${weatherData.placeName}`;
                messageTwo.textContent = `${weatherData.weatherDescriptions}`;
                messageThree.textContent = `Temperature is ${weatherData.temperature} degrees.`;
                console.log(weatherData)
            }
        })
    })
})