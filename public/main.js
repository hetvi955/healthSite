
//let url = `https:${baseURL}/search/${versionNumber}/nearbySearch/.JSON?key=${apikey}&lat=<lat>&lon=<lon>&radius=${50}`//[&limit=<limit>][&ofs=<ofs>][&countrySet=<countrySet>][&topLeft=<topLeft>][&btmRight=<btmRight>][&language=<language>][&extendedPostalCodesFor=<extendedPostalCodesFor>][&categorySet=<categorySet>][&brandSet=<brandSet>][&connectorSet=<connectorSet>][&fuelSet=<fuelSet>][&view=<view>][&openingHours=<openingHours>][&timeZone=<timeZone>][&mapcodes=<mapcodes>][&relatedPois=<relatedPois>][&minPowerKW=<minPowerKW>][&maxPowerKW=<maxPowerKW>]`
window.addEventListener("load" ,() => {
    let lat;
    let long;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(result => {
            console.log(result)
            lat = result.coords.latitude
            long = result.coords.longitude
            console.log(lat,long)
            let baseURL = 'api.tomtom.com'
            const proxy = 'https://cors-anywhere.herokupp.com/'
            let versionNumber = 2
            let apikey = 'jG6JnITy4eipKm7Z2HOzwnGGL14ddDsW'
            let url = `https:${baseURL}/search/${versionNumber}/nearbySearch/.JSON?key=${apikey}&lat=${lat}&lon=${long}&radius=${50000}&limit=${50}`
            fetch(url)
            .then(Response => {
                return Response.json()
            })
            .then(data =>{
                console.log("data",data)
               
   

            })
        })
       

    }else{
        console.log("change ur browser")
        
    }
}) 