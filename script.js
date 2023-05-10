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
            this.data = this.response
            this.data = JSON.parse(this.data)

            let country = document.querySelector('#con')
            let cty = document.querySelector('#cty')
            let temp = document.querySelector('#temp')
            let humid = document.querySelector('#humid')
            let wind = document.querySelector('#wind')

            const reg = new Intl.DisplayNames(['en'], {type: 'region'})
            country.innerText = reg.of(this.data['sys']['country'])
            cty.innerText = this.data['name']
            temp.innerText = (this.data['main']['temp']-273.15).toPrecision(4)
            humid.innerText = this.data['main']['humidity']
            wind.innerText = this.data['wind']['speed']
            document.title = 'Weather - '+ this.data['name']
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
    if(city !== ''){
        weather.getData(city)
    }else{
        alert('Please insert city name')
    }
})
