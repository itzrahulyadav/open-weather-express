const express = require('express')
const res = require('express/lib/response')
//installing https module to use get request with the node module
const https = require('https')
const app = express()
//installing body parser
const bodyParser = require("body-parser");



const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    //using https module to request data from the api
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=3265874a2c77ae4a04bb96236a642d2f&units=metric"
    https.get(url, (response) => {
        console.log(response.statusCode)


        //    on method is kinda like fetch method where we fetch data from the api and do
        //    something with the response
        response.on("data", (data) => {
            //converting the data into JSON format
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imageUrL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            //using res.send to send data to the browser
            res.write(`<h1>the temperature in ${query} is ${temp} degrees</h1>`)
            //using res.write to send data
            res.write('<h1>the weather is currently' + weatherDescription + '<h1/>')
            res.write(`<img src = ${imageUrL} />`)
            res.send();
        })
    })

})










app.listen(PORT, () => {
    console.log("server is running on port 3000")
})