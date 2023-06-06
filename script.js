// locations info => https://www.imdb.com/title/tt3544112/locations/

const locations = {
  syngeStreetCBS: [53.33359751220071, -6.267859429588321],
  stCatherinesPark: [53.342461028712805, -6.281377866857469],
  dunLaoghaireHabourEast: [53.298498679178834, -6.124278344257477],
  coliemoreHarbour: [53.27502705763972, -6.093855758349382],
  dalkeyIsland: [53.27185869576267, -6.0843660542747084],
  sanctaMariaPrimarySchool: [53.3333566632413, -6.267131365560957],
  fuscosCafe: [53.34106514813436, -6.278711411537048],
  frederickStreetNorth: [53.35538097656439, -6.264464549613137],
  SyngeStreet40: [53.33323980850529, -6.266782271270282],
  GreenleaRoad143: [53.30719453579432, -6.299668297150399],
};

var map = L.map('map').setView(
  [locations.syngeStreetCBS[0], locations.syngeStreetCBS[1]],
  12
);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([
  locations.syngeStreetCBS[0],
  locations.syngeStreetCBS[1],
]).addTo(map);

var marker = L.marker([
  locations.stCatherinesPark[0],
  locations.stCatherinesPark[1],
]).addTo(map);

var marker = L.marker([
  locations.dunLaoghaireHabourEast[0],
  locations.dunLaoghaireHabourEast[1],
]).addTo(map);

var marker = L.marker([
  locations.coliemoreHarbour[0],
  locations.coliemoreHarbour[1],
]).addTo(map);

var marker = L.marker([
  locations.dalkeyIsland[0],
  locations.dalkeyIsland[1],
]).addTo(map);

var marker = L.marker([
  locations.sanctaMariaPrimarySchool[0],
  locations.sanctaMariaPrimarySchool[1],
]).addTo(map);

var marker = L.marker([locations.fuscosCafe[0], locations.fuscosCafe[1]]).addTo(
  map
);

var marker = L.marker([
  locations.frederickStreetNorth[0],
  locations.frederickStreetNorth[1],
]).addTo(map);

var marker = L.marker([
  locations.SyngeStreet40[0],
  locations.SyngeStreet40[1],
]).addTo(map);

var marker = L.marker([
  locations.GreenleaRoad143[0],
  locations.GreenleaRoad143[1],
]).addTo(map);
