// locations info => https://www.imdb.com/title/tt3544112/locations/
import { locations } from './locations.js';

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
