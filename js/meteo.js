const clefAPI = "e8d9d990a16395c7a69ea50d8f1a8af2";
let resultatAPI;

if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, () => {

            alert(`Vous avez refusé la géolocalisation, l' application ne peut pas fonctionner, veuillez l'activer !`)

    })
}

function AppelAPI(long, lat) {
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${clefAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);
    })

}