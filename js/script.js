// locations info => https://www.imdb.com/title/tt3544112/locations/
import { locations } from './locations.js';
const placelists = document.querySelector('.placelists');

class App {
  #map;

  constructor() {
    this._loadMap();
    Object.values(locations).map(location => {
      this._createMarkers(location);
      this._renderList(location);
    });
  }

  _loadMap() {
    this.map = L.map('map').setView(
      [locations.syngeStreet40.latitude, locations.syngeStreet40.longitude],
      12
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  _createMarkers(location) {
    L.marker([location.latitude, location.longitude])
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
        })
      )
      .setPopupContent(location.name)
      .openPopup();
  }

  _renderList(location) {
    const html = `
    <li class="placelist">
      <img
        class="placelist__image"
        src="https://picsum.photos/200"
        alt="movie photo"
      />
      <h2 class="placelist__title">${location.name}</h2>
      <span class="placelist__address">${location.address}</span>
      <p class="placelist__description">${location.description}</p>
      <button class="placelist__button">visited</button>
    </li>`;

    placelists.insertAdjacentHTML('beforeend', html);
  }
}

const app = new App();

// const markers = (latitude, longitude, content) => {
//   L.marker([latitude, longitude])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//       })
//     )
//     .setPopupContent(content)
//     .openPopup();
// };

// Object.values(locations).map(location => {
//   markers(location.latitude, location.longitude, location.name);
// });

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
