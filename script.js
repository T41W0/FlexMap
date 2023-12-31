const button = document.querySelector('button');
const locationDiv = document.querySelector('location');

button.addEventListener('click', ()=>{
    //console.log(navigator.geolocation);
    if (navigator.geolocation) {
        button.innerText = "Allow to detect";
        navigator.geolocation.getCurrentPosition(onSucess,onError); 
    }else{
        button.innerText = "Your browser is not Supported"
    }
}) 
//SUCCESS
function onSucess(position){
    button.innerText = "Detecting your location...";
    console.log(position);
    let {latitude, longitude} = position.coords;
    console.log(latitude,longitude);
    let apikey="979aaa305b434dce847bc329037c8232";
    //https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=979aaa305b434dce847bc329037c8232
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
    .then(response => response.json())
    .then(result =>{
        let alldetails = result.results[0].components;
        let{continent,country,road, city,state,suburb,village} = alldetails;
        //console.log(county,postcode,country);
        const locations = document.querySelector("#location")
        locations.innerHTML = `<p>Continent:${continent},<br/>Road:${road},<br/>City:${city},<br/>State:${state},<br/>Suburb:${suburb},<br/>Village:${village} </p>`;        console.table(alldetails);
        button.innerText = "Detect Your Location";
    }).catch(() => {
        button.innerText = "Something Went Wrong";
    })
}
//ERROR
function onError(error) {
    //console.log(error);
    if (error.code == 1) {
        button.innerText = "You Denied Request";
    }else if (error.code == 2) {
        button.innerText = "Location Not Available";
    } else {
        button.innerText = "Something went Wrong";
    }
    button.setAttribute("disabled", "true")
} 