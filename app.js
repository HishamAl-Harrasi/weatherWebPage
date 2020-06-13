window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ab5edbc3c1ab2bf93087334875204a4a`)
                .then(response => response.json())
                .then(data => {
                    const temperature = data.main.temp; // 2 ways to do this - line 14 & 15
                    const summary = data['weather'][0]['main'];
                    const location = data.sys.country;
                    const iconCode = data['weather'][0]['icon'];

                    // Set HTML elements from API
                    temperatureDegree.textContent = Math.round(temperature - 273);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = location;
                    
                    // Adding image element into the 'icon' ID within the HTML | THIS IS IMPORTANT IF YOU WANT TO ADD INDEFINITE IMAGE PATHS
                    let iconImage = document.createElement("img"); // 
                    let iconImageParent = document.getElementById("icon");
                    iconImage.src = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
                    iconImageParent.appendChild(iconImage);
                })

            .catch(err => alert('Error. Check your code pls.'))
        
        })}
    
    else{
        h1.textContent = 'hey dis is not working :/'
    }
});