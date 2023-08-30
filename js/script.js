import { locations } from './locations.js';
const placelists = document.querySelector('.placelists');

class App {
  #map;
  #popups;
  #markers;
  #place; // 사용자가 클릭한 장소를 임시로 담아둔다. 기본값은 this.#localStoragelocations[9]
  #localStoragelocations;

  constructor() {
    // 로컬 스토리지에 저장된 location 배열 가져오기
    this._getLocalStorage();

    this.#place = this.#localStoragelocations[9]; // default location
    this.#popups = [];
    this.#markers = [];

    // 지도 생성
    this._loadMap();

    this.#localStoragelocations.map(location => {
      // 팝업 생성 후 this.#popups 배열에 추가
      this._createPopups(location);

      // 마커 생성 후 this.#markers 배열에 추가
      this._createMarkers(location);

      // 팝업과 마커를 엮어서 렌더
      this._renderMarkersPopups();

      // location을 화면에 리스트로 렌더
      this._renderList(location);
    });

    // 리스트 중 하나를 선택하면 지도 위 해당 마커로 이동
    placelists.addEventListener('click', this._moveToMarker.bind(this));

    // 리스트의 visited 버튼을 클릭하여 방문 여부 표시
    placelists.addEventListener('click', this._toggleVisitedButton.bind(this));

    // 마커를 클릭하면 리스트가 선택되게..
    // => css 넣고 기능 추가하기
  }

  _getLocalStorage() {
    // 로컬스토리지에서 locations라는 이름의 location 배열 가져오기
    let data = JSON.parse(localStorage.getItem('locations'));

    // 로컬스토리지에 locations가 없는 경우 locaions.js에서 가져온 locations를 로컬스토리지에 저장
    if (!data) {
      localStorage.setItem('locations', JSON.stringify(locations));
      data = JSON.parse(localStorage.getItem('locations'));
    }

    // 로컬스토리지에서 가져온 data를 this.#localStoragelocations로 사용
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
    // this.#popups 배열에 장소별 id와 팝업이 담긴 오브젝트를 하나씩 추가
    this.#popups.push({
      id: location.id,
      popup: L.popup({
        className: `${location.visited ? 'visited' : 'unvisited'}`,
      }).setContent(location.name),
    });
  }

  _createMarkers(location) {
    // this.#markers 배열에 장소별 id와 마커가 담긴 오브젝트를 하나씩 추가하여 화면에 표시
    this.#markers.push({
      id: location.id,
      marker: L.marker([location.latitude, location.longitude]).addTo(
        this.#map
      ),
    });
  }

  _renderMarkersPopups() {
    // 모든 마커에 팝업을 붙여서 렌더
    this.#markers.map(m => {
      m.marker
        .bindPopup(this.#popups.find(p => p.id === m.id).popup)
        .openPopup();
    });
  }

  _renderAMarkerAPopup() {
    // this.#markers배열에서 this.#place에 해당하는 특정 마커를 찾아 팝업과 함께 렌더
    this.#markers
      .find(m => m.id === this.#place.id)
      .marker.bindPopup(this.#popups.find(p => p.id === this.#place.id).popup)
      .openPopup();

    // this.#place기준으로 지도 불러오기
    this.#map.setView([this.#place.latitude, this.#place.longitude], 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _renderList(location) {
    // 리스트 다 펴진 모습
    const html = `
    <li class="placelist" data-id="${location.id}">
      <div class="placelist__box">
        <img
        class="placelist__image"
        src="${location.image}"
        alt="movie photo"
        />
        <h2 class="placelist__name">${location.name}</h2>
        <span class="placelist__address hidden">📍 ${location.address}</span>
        <p class="placelist__description hidden">${
          location.description && '🎬 ' + location.description
        }</p>
      </div>
      <button class="placelist__button hidden">${
        location.visited ? '✅ visited' : '❌ unvisited'
      }</button>
    </li>`;

    placelists.insertAdjacentHTML('beforeend', html);
  }

  _toggleListDetail(locationEl) {
    const placelistImage = locationEl.firstElementChild;
    const placelistDescription = locationEl.lastElementChild;
    const placelistName = placelistDescription.previousElementSibling;
    const placelistButton = locationEl.nextElementSibling;

    placelistImage.classList.toggle('small');
    placelistDescription.classList.toggle('hidden');
    placelistName.classList.toggle('hidden');
    placelistButton.classList.toggle('hidden');
  }

  _moveToMarker(e) {
    // 리스트에서 어떤 장소가 선택되었는지 찾기
    const locationEl = e.target.closest('.placelist__box');

    // 장소가 선택된게 아니면 아무 일도 일어나지 않는다.
    if (!locationEl) return;

    // 장소가 선택되면 세부 정보를 화면에 보여주거나 숨긴다.
    this._toggleListDetail(locationEl);

    // 선택된 장소 정보를 가져와서 임시 저장소인 this.#place에 담는다.
    this.#place = this.#localStoragelocations.find(
      l => l.id === locationEl.parentNode.dataset.id
    );

    this._renderAMarkerAPopup();
  }

  _toggleVisitedButton(e) {
    // 선택된 버튼 찾기
    const buttonEl = e.target.closest('.placelist__button');

    // 버튼이 선택된게 아니면 아무 일도 일어나지 않는다.
    if (!buttonEl) return;

    // 선택된 장소 정보를 찾는데 this.#localStoragelocations의 인덱스 번호로 가져온다.
    const locationIndex = this.#localStoragelocations.findIndex(
      l => l.id === buttonEl.parentNode.dataset.id
    );

    // 가져온 인덱스 번호로 this.#localStoragelocations 배열의 해당 장소 value를 직접 변경
    this.#localStoragelocations[locationIndex].visited =
      !this.#localStoragelocations[locationIndex].visited;

    // buttonEl.value가 string이라서..
    // this.#localStoragelocations[locationIndex].visited = !(
    //   buttonEl.value === 'true'
    // );

    // 로컬 스토리지에 수정된 this.#localStoragelocations 통째로 다시 추가시키기
    localStorage.setItem(
      'locations',
      JSON.stringify(this.#localStoragelocations)
    );

    // 버튼 value에 방문여부 담기
    // buttonEl.value = this.#localStoragelocations[locationIndex].visited;

    // 선택된 장소 정보를 가져와서 임시 저장소인 this.#place에 담는다.
    this.#place = this.#localStoragelocations[locationIndex];

    // 버튼 text 변경
    buttonEl.innerHTML = this.#place.visited ? '✅ visited' : '❌ unvisited';

    // this.#popups배열에서 this.#place에 해당하는 팝업을 찾아 방문여부 클래스를 추가
    this.#popups.find(p => p.id === this.#place.id).popup = L.popup({
      className: `${this.#place.visited ? 'visited' : 'unvisited'}`,
    }).setContent(this.#place.name);

    this._renderAMarkerAPopup();
  }
}

const app = new App();
