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

var baltiyskaya = new point('baltiyskaya', 1000, 1, 2, 3);
stations.push(baltiyskaya);
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
  constructor(a, b, dist, cost, ...ind) {
    this.point_a = a.station;
    this.point_b = b.station;
    this.distation = dist;
    this.price = cost;
    this.index = ind;
  }
}

var balt_depo = new way(baltiyskaya, depo, 3, 10, 1, 2, 3);
railways.push(balt_depo);
var depo_len = new way(depo, leninskiy, 5, 12, 1, 2, 3);
railways.push(depo_len);
var len_taycy = new way(leninskiy, taycy, 15, 30, 1);
railways.push(len_taycy);
var taycy_gatchina = new way(taycy, gatchina, 7, 14, 1);
railways.push(taycy_gatchina);
var gatchina_myshkino = new way(gatchina, myshkino, 10, 22, 1);
railways.push(gatchina_myshkino);
var myshkino_gorgorod = new way(myshkino, gorgorod, 12, 25, 1, 2);
railways.push(myshkino_gorgorod);
var len_strelna = new way(leninskiy, strelna, 11, 20, 2);
railways.push(len_strelna);
var str_petergof = new way(strelna, petergof, 8, 15, 2);
railways.push(str_petergof);
var pet_lomonosov = new way(petergof, lomonosov, 9, 16, 2);
railways.push(pet_lomonosov);
var lom_popovo = new way(lomonosov, popovo, 7, 18, 2);
railways.push(lom_popovo);
var popovo_gorgorod = new way(popovo, gorgorod, 2, 5, 1, 2);
railways.push(popovo_gorgorod);
var len_ves = new way(leninskiy, vesyolaya_zhizn, 35, 50, 3);
railways.push(len_ves);
var ves_gr = new way(vesyolaya_zhizn, grustnaya_zhizn, 3, 5, 3);
railways.push(ves_gr);

function theStation(nodes, name) {
  for (let node of nodes) {
    if (node.station == name) {
      return node
    }
  }
}


function weightCompare(obj, comp, width) {

  if (obj.weight > comp + width) {
    obj.weight = comp + width
    return true;
  }
}

function DijkstraAction(array_stations, array_ways) {

  for (let point of array_stations) {

    for (let way of array_ways) {
      if (point.station == way.point_a && weightCompare(theStation(array_stations, way.point_b), way.distation, theStation(array_stations, way.point_a).weight) ||
        (point.station == way.point_b && weightCompare(theStation(array_stations, way.point_a), way.distation, theStation(array_stations, way.point_b).weight))) {
        return true;
      }
    }
  }
}

function shotestWay(start) {

  let begin;
  let pointCheck = true;
  begin = theStation(stations, start.station);
  begin.weight = 0;
  while (pointCheck) {
    pointCheck = DijkstraAction(stations, railways);
  }

}



let domPoints = document.querySelectorAll('.stantion');
var pip;
var pop;
var pap = true;
pep=false;


for (let domPoint of domPoints) {
  domPoint.onclick = function() {

    for (let point of stations) {

      if(pep)
      {for(let dom of domPoints){dom.style.background='white'; pep=false;}}

      if (point.station == this.dataset.name && pap) {
        pip = point;
        console.log(pip);
        shotestWay(pip);
        pap = false;
        domPoint.style.background='blue';
        return null;

      }
      if (point.station == this.dataset.name && !pap) {
        pop = point;
        console.log(pop.weight);
        domPoint.style.background='green';
        pap = true;
        pep=true;
      }
    }
  }
}
