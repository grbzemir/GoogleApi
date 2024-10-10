let latitude, longitude = "";

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}
else {
    alert("Tarayıcınız konum bilgisini alamıyor .");
}

function onSuccess(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}

function onError(error) {
    if (error.code = 1) {

        alert("Kullanıcı konum izni vermedi");
    }

    else if (error.code = 2) {
        alert("Konum bilgisi alınamadı");
    }

    else {
        alert("Bir hata oluştu");
    }
}