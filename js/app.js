let searchBtn = document.getElementById('searchBtn');
let resetBtn = document.getElementById('resetBtn');

//Axios GET request
function getInfo() {
    axios.request({
        method: "GET",
        url: "https://api.punkapi.com/v2/beers"
    }).then(showInfo).catch(failInfo);
}

//picks random number between length of array and returns name, desc, and image of a random beer. Hides search button and shows reset button
function showInfo(response) {
    console.log(response);
    let randomInt = Math.floor(Math.random() * response.data.length) + 1;
    
    let showBeerName = document.createElement('h1');
    showBeerName.innerText = response.data[randomInt].name;
    document.querySelector('body').append(showBeerName);

    let showBeerDesc = document.createElement('p');
    showBeerDesc.innerText = response.data[randomInt].description;
    document.querySelector('body').append(showBeerDesc);

    let showBeerImg = document.createElement('img');
    showBeerImg.setAttribute('src', response.data[randomInt].image_url);
    document.querySelector('body').append(showBeerImg);
    
    resetBtn.style.display = "block";
    searchBtn.style.display = "none";
}

//handles failure of request
function failInfo(error) {
    console.log(error);
    let failedRequest = document.createElement('h1');
    failedRequest.innerText = "Something went wrong, please try reloading the page";
    document.querySelector('body').appendChild(failedRequest);
    searchBtn.style.display = "none";
}

//resets the page back to original state
function resetPage() {
    document.querySelector('h1').remove();
    document.querySelector('p').remove();
    document.querySelector('img').remove();

    resetBtn.style.display = "none";
    searchBtn.style.display = "block";
}

//event listeners for each button
searchBtn.addEventListener('click', getInfo);
resetBtn.addEventListener('click', resetPage);
