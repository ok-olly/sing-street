// locations info =>
// https://www.imdb.com/title/tt3544112/locations/
// https://almostginger.com/sing-street-filming-locations-dublin/

import { locations } from './locations.js';
const placelists = document.querySelector('.placelists');

class App {
  #map;
  #popups;
  #markers;
  #place;
  #localStoragelocations;

  constructor() {
    this._getLocalStorage();

    this.#place = this.#localStoragelocations[9]; // default location
    this.#popups = [];
    this.#markers = [];

    this._loadMap();

    this.#localStoragelocations.map(location => {
      this._createPopups(location);
      this._createMarkers(location);
      this._renderPopups();
      this._renderList(location);
    });

    placelists.addEventListener('click', this._moveToMarker.bind(this));
    placelists.addEventListener('click', this._toggleVisitedButton.bind(this));
  }

  _getLocalStorage() {
    let data = JSON.parse(localStorage.getItem('locations'));

    if (!data) {
      localStorage.setItem('locations', JSON.stringify(locations));
      data = JSON.parse(localStorage.getItem('locations'));
    }

    this.#localStoragelocations = data;
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
      <div class="placelist__box">
        <img
        class="box__image"
        src="${location.image}"
        alt="movie photo"
        style="width:150px"
        />
        <h2 class="box__name">${location.name}</h2>
        <span class="box__address">${location.address}</span>
        <p class="box__description">${location.description}</p>
      </div>
      <button class="placelist__button" value="${location.visited}">${
      location.visited ? '🙆 visited' : '❌ yet'
    }</button>
      
    </li>`;

    placelists.insertAdjacentHTML('beforeend', html);
  }

  _moveToMarker(e) {
    const locationEl = e.target.closest('.placelist__box');

    if (!locationEl) return;

    const location = this.#localStoragelocations.find(
      l => l.id === locationEl.parentNode.dataset.id
    );

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

  _toggleVisitedButton(e) {
    const buttonEl = e.target.closest('.placelist__button');

    if (!buttonEl) return;

    const locationIndex = this.#localStoragelocations.findIndex(
      l => l.id === buttonEl.parentNode.dataset.id
    );

    // buttonEl.value가 string이라서..
    this.#localStoragelocations[locationIndex].visited = !(
      buttonEl.value === 'true'
    );

    // 로컬 스토리지에 visited 바뀐 this.#localStoragelocations 통째로 다시 추가시키기
    localStorage.setItem(
      'locations',
      JSON.stringify(this.#localStoragelocations)
    );

    buttonEl.value = this.#localStoragelocations[locationIndex].visited;

    buttonEl.innerHTML = this.#localStoragelocations[locationIndex].visited
      ? '🙆 visited'
      : '❌ yet';
  }
}

const app = new App();
