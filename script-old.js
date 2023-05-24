let btn = document.getElementById('btn')
let main = document.getElementById('main')
let xhr = new XMLHttpRequest()
var data = ""

xhr.onload = function(){
    if(xhr.status == 404){
        alert("Invalid City Name Or City Not Found")
        return
    }
    data = this.response
    data = JSON.parse(data)
    let div = document.createElement('div')
    div.className += 'card'
    let remove = document.createElement('i')
    remove.className = 'remove fa fa-times'
    remove.addEventListener('click', (e)=>{
        e.target.parentElement.parentElement.removeChild(e.target.parentElement)
    })
    let coord = document.createElement('label')
    coord.appendChild(document.createTextNode(`Coordinates: lon: ${data['coord']['lon']}, lat: ${data['coord']['lat']}`))
    let cty = document.createElement('label')
    cty.appendChild(document.createTextNode(`City: ${data['name']}`))
    let country = document.createElement('label')
    country.appendChild(document.createTextNode(`Country: ${data['sys']['country']}`))
    let temp = document.createElement('label')
    temp.appendChild(document.createTextNode(`Temprature: ${data['main']['temp']-273.15}`))
    let humidity = document.createElement('label')
    humidity.appendChild(document.createTextNode(`Humidity: ${data['main']['humidity']}`))
    let wind = document.createElement('label')
    wind.appendChild(document.createTextNode(`Wind Speed: ${data['wind']['speed']}`))
    let desc = document.createElement('label')
    desc.appendChild(document.createTextNode(`Description: ${data['weather'][0]['description']}`))
    div.appendChild(remove)
    div.appendChild(coord)
    div.appendChild(cty)
    div.appendChild(country)
    div.appendChild(temp)
    div.appendChild(humidity)
    div.appendChild(wind)
    div.appendChild(desc)
    main.append(div)
}

xhr.onerror = function(){
    alert('Error fetching data...')
}


btn.addEventListener('click', (e)=>{
    let city = document.getElementById('city')
    if(city.value !== ''){
        let api = '2931ed5fc5a27bacd2725cbee652c43b'
        xhr.open("get", `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${api}`)
        xhr.send()
        city.value = ''
        city.focus()
    }else{
        alert('Please input city name')
    }
})

function getDateTime(){
    let d = new Date()
    let dt = d.toDateString() + ' ' + d.toLocaleTimeString()
    document.querySelector('#time').innerText = dt
    // return dt
}

function getWeather(){
    let city = 'delhi'
    let api = '2931ed5fc5a27bacd2725cbee652c43b'
    xhr.open("get", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
    xhr.send()
}
document.onload = getDateTime()
console.log(navigator.getCurrentPosition())