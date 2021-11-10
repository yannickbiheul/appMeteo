const CLEFAPI = "e8d9d990a16395c7a69ea50d8f1a8af2";
let resultatsAPI;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const imgIcone = document.querySelector(".logo-meteo");

if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {

        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, () => {

            alert(`Vous avez refusé la géolocalisation, l' application ne peut pas fonctionner, veuillez l'activer !`)

    })
}

function AppelAPI(long, lat) {
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);
        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
        localisation.innerText = resultatsAPI.timezone;

        // Icone dynamique
        let heureActuelle = new Date().getHours();
        if (heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
        } else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
        }
    })

}

