// locations info => https://www.imdb.com/title/tt3544112/locations/
import { locations } from './locations.js';
const placelists = document.querySelector('.placelists');

class App {
  #map;
  #popups;
  #markers;
  #place;

  constructor() {
    this.#popups = [];
    this.#markers = [];

    this._loadMap();
    Object.values(locations).map(location => {
      this._createPopup22(location);
      this._createMarkers(location);
      this._renderPopup();
      this._renderList(location);
    });

    // this._createPopup();

    placelists.addEventListener('click', this._moveToMarker.bind(this));
  }

  _loadMap() {
    this.#place = locations.syngeStreet40;

    this.#map = L.map('map').setView(
      [this.#place.latitude, this.#place.longitude],
      12
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);
  }

  _createPopup22(location) {
    this.#popups.push({
      id: location.id,
      popup: L.popup().setContent(location.name),
    });
  }

  _createMarkers(location) {
    this.#markers.push({
      id: location.id,
      marker: L.marker([location.latitude, location.longitude]).addTo(
        this.#map
      ),
    });

    // .bindPopup(
    //   L.popup({
    //     maxWidth: 250,
    //     minWidth: 100,
    //   })
    // )
    // .setPopupContent(location.name)
    // .openPopup();

    // this._createPopup();
  }

  _renderPopup() {
    this.#markers.map(m => {
      m.marker
        .bindPopup(this.#popups.find(p => p.id === m.id).popup)
        .openPopup();
    });

    // this.#markers.bindPopup(this.#popups).openPopup();
  }

  _renderPopup22(place) {
    this.#markers
      .find(m => m.id === place.id)
      .marker.bindPopup(this.#popups.find(p => p.id === place.id).popup)
      .openPopup();
  }

  _renderList(location) {
    const html = `
    <li class="placelist" data-id="${location.id}">
      <img
        class="placelist__image"
        src="https://picsum.photos/100"
        alt="movie photo"
      />
      <h2 class="placelist__name">${location.name}</h2>
      <span class="placelist__address">${location.address}</span>
      <p class="placelist__description">${location.description}</p>
      <button class="placelist__button">visited</button>
    </li>`;

    placelists.insertAdjacentHTML('beforeend', html);
  }

  _createPopup() {
    this.#map.openPopup(
      L.popup()
        .setLatLng([this.#place.latitude, this.#place.longitude])
        .setContent(this.#place.name)
    );

    // this.#map.openPopup(
    //   L.popup([this.#place.latitude, this.#place.longitude], {
    //     offset: L.point(0, -30),
    //   }).setContent(this.#place.name)
    // );
  }

  _moveToMarker(e) {
    const locationEl = e.target.closest('.placelist');

    if (!locationEl) return;

    const location = Object.keys(locations).find(
      el => el === locationEl.dataset.id
    );

    this.#place = locations[location];

    // this._createPopup22(this.#place);
    this._renderPopup22(this.#place);

    this.#map.setView(
      [locations[location].latitude, locations[location].longitude],
      13,
      {
        animate: true,
        pan: {
          duration: 1,
        },
      }
    );
  }
}

const app = new App();
