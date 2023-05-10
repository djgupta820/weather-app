let btn = document.getElementById('btn')
let main = document.getElementById('main')
let xhr = new XMLHttpRequest()
var data = ""

class WeatherApp{
    constructor(city){
        this.city = city
        this.data = ''
        this.api = '2931ed5fc5a27bacd2725cbee652c43b'
        this.xhr = new XMLHttpRequest()
    }

    setDateTime(element){
        let d = new Date()
        let dt = d.toDateString() + ' ' + d.toLocaleTimeString()
        element.innerText = dt
    }

    getData(city=this.city){
        this.xhr.open("get", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api}`)
        this.xhr.send()

        this.xhr.onload = function(){
            // if(this.xhr.status == 404){
            //     alert("Invalid City Name Or City Not Found")
            //     return
            // }
            data = this.response
            data = JSON.parse(data)

            let country = document.querySelector('#con')
            let cty = document.querySelector('#cty')
            let temp = document.querySelector('#temp')
            let humid = document.querySelector('#humid')
            let wind = document.querySelector('#wind')

            country.innerText = data['sys']['country']
            cty.innerText = data['name']
            temp.innerText = (data['main']['temp']-273.15).toPrecision(4)
            humid.innerText = data['main']['humidity']
            wind.innerText = data['wind']['speed']
            document.title = 'Weather - '+ data['name']
            // console.log(data)
        }

        this.xhr.onerror = function(){
            alert('Invalid City Name or City Not Found')
        }
    }
}

const weather = new WeatherApp('delhi')
let el = document.querySelector('#time')
document.onload = weather.setDateTime(el)
weather.getData()
document.querySelector('#btn').addEventListener('click', ()=>{
    let city = document.querySelector('#city').value
    weather.getData(city)
})