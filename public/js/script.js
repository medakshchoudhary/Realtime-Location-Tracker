const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        // watchposition gives three main things used below
        // to get position of the user
        (position) => {
            const {latitude, longitude} = position.coords;
            socket.emit("send-location", {latitude, longitude});
        },
        // for error
        (error)=>{
            console.error(error.message);
        },
        // settings
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        }

    )
}

// sets the veiw of the map in the center and zoomed up with 10
const map = L.map("map").setView([0, 0],16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution : "OpenSteetMap"
}).addTo(map);

const markers = {};

socket.on("receive-location", (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }
    else {
        markers[id] = L.marker([latitude,longitude]).addTo(map);
    }
})

socket.on("user-disconnected", (id)=>{ 
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }

})
