var OrtofotomapaWysokiejRozdzielczosci = L.tileLayer.wms('https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMS/HighResolution', {
         layers: 'raster',
         format: 'image/png',
         transparent: true
         });
         var Cieniowanie = L.tileLayer.wms('https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMS/ShadedRelief', {
         layers: 'raster',
         format: 'image/png',
         transparent: true
         });
         var OrtofotomapaStandardowa = L.tileLayer.wms('https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMS/StandardResolution', {
         layers: 'raster',
         format: 'image/png',
         transparent: true
         });

         var mapOptions = {
            center: [53.996938, 20.994685],
            zoom: 15
         }

         var map = new L.map('map', mapOptions);

         var layers = {
            "Cieniowanie": Cieniowanie,
            "Ortofotomapa Standardowa": OrtofotomapaStandardowa,
            "Ortofotomapa Wysokiej Rozdzielczości": OrtofotomapaWysokiejRozdzielczosci,
         }

var layerControl = L.control.layers(null, layers).addTo(map);


// dodawanie skali, kótra jest metryczna 
L.control.scale({
  metric: true,
  imperial: false,
  maxWidth: 200
}).addTo(map);

// zdefiniowane opcje ikony do markera
var ikonaDomek = L.icon({
  iconUrl: 'ikona_domek.png',

  iconSize:     [50, 95], // rozmiar ikony
});

// dodanie markera na stałe
var marker = L.marker([53.996938, 20.994685],{icon: ikonaDomek},
  {alt: 'Kolno'}).addTo(map) // "Kolno" to nazwa markera
  .bindPopup('Kolno to moja rodzinna miejscowość');


  // wywołanie funkcji dodającej marker
// na zdarzenie 'click'
map.on('click', addMarker);

// ten button będzie kasował marker
const buttonRemove = '<button type="button" class="remove">Usunąć Marker?</button>';

// div do którego będziemy wstawiać wszelaki informacje
const markerPlace = document.querySelector('.marker-position');

// Dodaj znacznik do mapy w miejscu kliknięcia
function addMarker(e) {
  // ustawiamy aby marker był przesuwalny
  const marker = new L.marker(e.latlng, {
    draggable: true
  })
     // dodajmy marker do mapy
    .addTo(map)
     // dodajemy do popup button
    .bindPopup(buttonRemove);

  // zdarzenie na otwarcie popupu 'popupopen'
  // wywołuje funkcję usuwającą marker
  marker.on("popupopen", removeMarker);

  // zdarzenie na zakończenie 'dragend' przesunięcia
  // markera, wywołuje funkcję 'dragedMaker'
  marker.on('dragend', dragedMaker);

  // dodaje na mapie informację o pozycji markera
  markerPlace.textContent = `
    Nowy marker: ${e.latlng.lat}, ${e.latlng.lng}
  `;
}

// funkcja usuwająca marker z mapy
function removeMarker() {
  const marker = this;
  const btn = document.querySelector('.remove');

  btn.addEventListener('click', function () {
    // tekst w po usunięciu markera ;)
    markerPlace.textContent = 'Usunięto marker!'
    // usunięcie markera z mapy
    map.removeLayer(marker);
  })
}

// funkcja dodająca wpis na mapie ze
// współrzędnymi przesuniętego markera
function dragedMaker() {
  markerPlace.textContent = `
    Zmiana pozycji markera: ${this.getLatLng().lat}, ${this.getLatLng().lng}
  `;
};
