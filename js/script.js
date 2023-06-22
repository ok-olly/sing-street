// locations info => https://www.imdb.com/title/tt3544112/locations/
import { locations } from './locations.js';
const placelists = document.querySelector('.placelists');

class App {
  #map;
  #popups;
  #markers;
  #place;

  constructor() {
    this.#place = locations[9]; // default location
    this.#popups = [];
    this.#markers = [];

    this._loadMap();
    locations.map(location => {
      this._createPopups(location);
      this._createMarkers(location);
      this._renderPopups();
      this._renderList(location);
    });

    placelists.addEventListener('click', this._moveToMarker.bind(this));
  }

  _loadMap() {
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

  _createPopups(location) {
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
  }

  _renderPopups() {
    this.#markers.map(m => {
      m.marker
        .bindPopup(this.#popups.find(p => p.id === m.id).popup)
        .openPopup();
    });
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

  _moveToMarker(e) {
    const locationEl = e.target.closest('.placelist');

    if (!locationEl) return;

    const location = locations.find(l => l.id === locationEl.dataset.id);

    this.#place = location;

    this.#markers
      .find(m => m.id === this.#place.id)
      .marker.bindPopup(this.#popups.find(p => p.id === this.#place.id).popup)
      .openPopup();

    this.#map.setView([location.latitude, location.longitude], 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

const app = new App();
