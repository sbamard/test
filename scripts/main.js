const APIKEY    = 'b075de91a00b28257ac721f6bd9de686'
const infoTemps = document.querySelector('.temps')
const infoCelsius = document.querySelector('.temperature')
const infoLoc   = document.querySelector('.localisation')
const logoMeteo = document.querySelector('.logo-meteo')
const heureNom  = document.querySelector('.heure-nom-prevision')
const heurePrev = document.querySelector('.heure-prevision-valeur')
const blocH     = document.querySelectorAll('.bloc-h')
const blocJ     = document.querySelectorAll('.bloc-j')
let resultAPI

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude
        let lat = position.coords.latitude
        AppelAPI(long, lat)
    },
    )
}

function AppelAPI(long, lat) {
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
        .then((response => {
            return response.json()
        }))
        .then((data => {

            //bloc info
            infoCelsius.innerText = data.current.weather[0].description
            infoLoc.innerText = data.timezone
            infoTemps.innerText = Math.trunc(data.current.temp) + "°"

            //Selon l'heure on change le logo jour/nuit
            var now = new Date();
            now = now.getHours()
            let jour = ""
            if (now > 8 && now < 22) {
                jour = "jour"
            } else {
                jour = "nuit"
            }

            logoMeteo.src = `./ressources/${jour}/${data.current.weather[0].icon}.svg`


            //sinon foreach avevc un compteur et on fait si compteur = 2-5-8-11-14-17-20
            let i = 0
            blocH.forEach(e => {
                i = i+3
                console.log(e.childNodes[1])
                now = now + 3
                if (now === 24){
                    now = 0
                }
                e.childNodes[1].innerText = now + " h"
                e.childNodes[3].innerText = Math.trunc(data.hourly[i].temp) + "°"
            });
            
            console.log(data)

            //Jour
             i = 0
            blocJ.forEach(e => {
                i++
                console.log(e.childNodes[1])
                now = now + 3
                if (now === 24){
                    now = 0
                }
                e.childNodes[1].innerText = "jour suivt " //tableau de lundi-mardi-mercredi...
                e.childNodes[3].innerText = Math.trunc(data.daily[i].temp.day) + "°"
            });

           /* for (let index = 0; index < data.hourly.length; index++) {
                if (index == 2) {
                    now = now + 3
                    heureNom.innerText = now
                    heurePrev.innerText = data.hourly[2].temp + "°"
                    console.log(heurePrev)
                };

            } */

        }))
}