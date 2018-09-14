var stations = [];
var railways = [];


class point {
  constructor(name, weight, ...line) {

    this.station = name;
    this.tracks = line;
    this.weight = weight;
  }

  showMeWeight() {
    console.log(this.station + ': ' + this.weight);
  }
}

var baltiyskay = new point('baltiyskaya', 1000, 1, 2, 3);
stations.push(baltiyskay);
var depo = new point('depo', 1000, 1, 2, 3);
stations.push(depo);
var leninskiy = new point('leninskiy', 1000, 1, 2, 3);
stations.push(leninskiy);
var taycy = new point('taycy', 1000, 1);
stations.push(taycy);
var gatchina = new point('gatchina', 1000, 1);
stations.push(gatchina);
var myshkino = new point('myshkino', 1000, 1);
stations.push(myshkino);
var gorgorod = new point('gorgorod', 1000, 1, 2);
stations.push(gorgorod);
var strelna = new point('strelna', 1000, 2);
stations.push(strelna);
var petergof = new point('petergof', 1000, 2);
stations.push(petergof);
var lomonosov = new point('lomonosov', 1000, 2);
stations.push(lomonosov);
var popovo = new point('popovo', 1000, 2);
stations.push(popovo);
var vesyolaya_zhizn = new point('vesyolaya_zhizn', 1000, 3);
stations.push(vesyolaya_zhizn);
var grustnaya_zhizn = new point('grustnaya_zhizn', 1000, 3);
stations.push(grustnaya_zhizn);

class way {
  constructor(a, b, dist, cost, width, ...ind) {
    this.point_a = a.station;
    this.point_b = b.station;
    this.distation = dist;
    this.price = cost;
    this.width = width;
    this.index = ind;
  }
}

var balt_depo = new way(baltiyskay, depo, 3, 10, 1000, 1, 2, 3);
railways.push(balt_depo);
var depo_len = new way(depo, leninskiy, 5, 12, 1000, 1, 2, 3);
railways.push(depo_len);
var len_taycy = new way(leninskiy, taycy, 15, 30, 1000, 1);
railways.push(len_taycy);
var taycy_gatchina = new way(taycy, gatchina, 7, 14, 1000, 1);
railways.push(taycy_gatchina);
var gatchina_myshkino = new way(gatchina, myshkino, 10, 22, 1000, 1);
railways.push(gatchina_myshkino);
var myshkino_gorgorod = new way(myshkino, gorgorod, 12, 25, 1000, 1, 2);
railways.push(myshkino_gorgorod);
var len_strelna = new way(leninskiy, strelna, 11, 20, 1000, 2);
railways.push(len_strelna);
var str_petergof = new way(strelna, petergof, 8, 15, 1000, 2);
railways.push(str_petergof);
var pet_lomonosov = new way(petergof, lomonosov, 9, 16, 1000, 2);
railways.push(pet_lomonosov);
var lom_popovo = new way(lomonosov, popovo, 7, 18, 1000, 2);
railways.push(lom_popovo);
var popovo_gorgorod = new way(popovo, gorgorod, 2, 5, 1000, 1, 2);
railways.push(popovo_gorgorod);
var len_ves = new way(leninskiy, vesyolaya_zhizn, 35, 50, 1000, 3);
railways.push(len_ves);
var ves_gr = new way(vesyolaya_zhizn, grustnaya_zhizn, 3, 5, 1000, 3);
railways.push(ves_gr);

function theStation(nodes, name) {
  for (let node of nodes) {
    if (node.station == name) {
      return node
    }
  }
}

function copymaker(arr) {
  let copy = arr.map(function(a) {
    return a;
  });
  return copy;
}

function fireStarter(start) {
  let num;
  for (let i in stations) {
    if (stations[i] == start) {
      num = i;
    }
  }
  return num;
}

function widthCompare(obj, comp, width) {

  if (obj.weight > comp + width) {
    obj.weight = comp + width
    return true;
  }
}

function check(arr, arr2) {

  for (let point of arr) {

    for (let way of arr2) {
      if (point.station == way.point_a && widthCompare(theStation(stations, way.point_b), way.distation, theStation(stations, way.point_a).weight) ||
        (point.station == way.point_b && widthCompare(theStation(stations, way.point_a), way.distation, theStation(stations, way.point_b).weight))) {
        return true;
      }
    }
  }
}

function shotestWay(start) {


  let begin;
  let waysStorage = copymaker(railways);
  let chk = true;
  begin = stations[fireStarter(start)];
  begin.weight = 0;
  while (chk) {
    chk = check(stations, waysStorage);
  }
}

shotestWay(depo);

for (let it of stations) {
  it.showMeWeight()
}
