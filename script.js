let latitude, longitude;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
    alert("Tarayıcınız konum bilgisini alamıyor.");
}

function onSuccess(position) {
    // Global değişkenleri güncelliyoruz
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const api_key = "a8a5724ae7f54e6eab8cef5cc955182c";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            let details = result.results[0].components;
            let { country, postcode, province } = details;

            document.getElementById("results").innerHTML = `
                <p>Ülke: ${country}</p>
                <p>Posta kodu: ${postcode}</p>
                <p>Şehir: ${province}</p>
            `;
        })
        .catch(error => console.log('Veri alınırken bir hata oluştu:', error));

    // Konum başarıyla alındığında haritayı başlat
    initMap();
}

function onError(error) {
    if (error.code === 1) {
        alert("Kullanıcı konum izni vermedi.");
    } else if (error.code === 2) {
        alert("Konum bilgisi alınamadı.");
    } else {
        alert("Bir hata oluştu.");
    }
}

let map;

function initMap() {
    if (latitude && longitude) {
        // Google Maps haritasını başlatıyoruz
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: latitude, lng: longitude },
            zoom: 8,
        });

        const marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
        });
    } else {
        console.log("Konum bilgisi alınmadı.");
    }
}
