class WeatherApp{
    constructor(city){
        this.city = city
        this.data = ''
        this.api = '2931ed5fc5a27bacd2725cbee652c43b'
        this.xhr = new XMLHttpRequest()
    }

    setDate(element){
        let d = new Date()
        let dt = d.toDateString()
        element.innerText = dt
    }

    setTime(element){
        let d = new Date()
        let hours = d.getHours()
        let mints =  d.getMinutes()
        let sec = d.getSeconds()
        
        if(hours <= 9){
            hours = '0' + hours
        }
        if(mints <= 9){
            mints = '0' + mints
        }
        if(sec <= 9){
            sec = '0' + sec
        }
    
        let t = hours + ' : ' + mints + ' : ' + sec
        element.innerText = t
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

let elt = document.querySelector('#time')
let eld = document.querySelector('#date')
let ball = document.querySelector('.ball')
let inball = document.querySelector('.inner-ball')

document.onload = weather.setDate(eld)
setInterval(weather.setTime, 1000, elt)

weather.getData()

document.querySelector('#btn').addEventListener('click', ()=>{
    let city = document.querySelector('#city').value
    if(city !== ''){
        ball.style.display = 'block'
        inball.style.display = 'block'
        setTimeout(()=>{
            weather.getData(city)
            ball.style.display = 'none'
            inball.style.display = 'none'
        }, 1000)
    }else{
        alert('Please insert city name')
    }
})
