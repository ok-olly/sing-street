// locations info => https://www.imdb.com/title/tt3544112/locations/
import { locations } from './locations.js';

const map = L.map('map').setView(
  [locations.syngeStreet40.latitude, locations.syngeStreet40.longitude],
  12
);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const markers = (latitude, longitude, content) => {
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
      })
    )
    .setPopupContent(content)
    .openPopup();
};

Object.values(locations).map(location => {
  markers(location.latitude, location.longitude, location.name);
});

// markers(
//   locations.syngeStreetCBS.latitude,
//   locations.syngeStreetCBS.longitude,
//   'Synge Street CBS'
// );

// var marker = L.marker([
//   locations.syngeStreetCBS[0],
//   locations.syngeStreetCBS[1],
// ])
//   .addTo(map)
//   .bindPopup(
//     L.popup({
//       maxWidth: 250,
//       minWidth: 100,
//       autoClose: false,
//     })
//   )
//   .setPopupContent('Synge Street CBS')
//   .openPopup();
