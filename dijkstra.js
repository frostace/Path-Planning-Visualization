// scale param.
let size = 400;
let unit = 10;
let step = Math.floor(size / unit);
let diam = step / 2;
let obstacle_diam = step / 3;
let visited_scale = 0.55;
let obstacle_density = 0.2;

// default start and end points
let start = [0, 0]; // in terms of index
let end = [unit - 1, unit - 1];

// colors
let blue = [0, 0, 255];
let green = [107, 165, 57];
let yellow = [255, 173, 0];
let livingcoral = [255, 111, 97];
let grey = [190, 198, 196];
let black = [81, 83, 74];
let white = [255, 255, 255];

// init grid
let grid = [];
let neighbor_candidates = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1]
];

let nextSpot = Spot(0, 0);
let tempg = 0;
let tovisit = [];
let visited = [];

function getStartandEnd(){
  
}

function manhattan_dist(){
  
}

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = size;
  this.h = 0;
  this.previous = undefined;
  this.neighbors = [];

  this.wall = false;

  this.show = function(color, scale = 1) {
    // first cover the original canvas with white
    fill(white);
    noStroke();
    rect(this.i * step, this.j * step, step, step);
    // fill with a new color
    fill(color);
    noStroke();
    ellipse(this.i * step + step / 2, this.j * step + step / 2, diam * scale, diam * scale);
  };

  this.getNeighbors = function() {
    return this.neighbors;
  };
}

function setup() {
  createCanvas(size, size);
  background(255);
  frameRate(10);  // fps
  // init every grid as a Spot object
  for (var i = 0; i < unit; i++) {
    grid[i] = new Array();
  }
  for (i = 0; i < unit; i++) {
    for (var j = 0; j < unit; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  // generate obstacle
  randomObstacle();
  // init neighbors
  // init canvas
  for (var i = 0; i < unit; i++) {
    for (var j = 0; j < unit; j++) {
      if (grid[i][j].wall) {
        fill(black);
        rect(i * step + step / 2 - obstacle_diam / 2, j * step + step / 2 - obstacle_diam / 2, obstacle_diam, obstacle_diam, obstacle_diam / 4);
        ellipse();
      } else {
        for (var k = 0; k < neighbor_candidates.length; k++) {
          var x = neighbor_candidates[k][0];
          var y = neighbor_candidates[k][1];
          if (i + x < 0 || i + x >= unit || j + y < 0 || j + y >= unit) {
            continue;
          }
          if (!grid[i + x][j + y].wall) {
            grid[i][j].neighbors.push(grid[i + x][j + y]);
          }
        }
      }
      if (i == start[0] && j == start[1]) {
        grid[i][j].show(green);
        grid[i][j].g = 0;
      }
      if (i == end[0] && j == end[1]) {
        grid[i][j].show(yellow);
      }
    }
  }

  // test
  tovisit.push(grid[start[0]][start[1]]);
}

// render the grid once we make a move
function renderGrid(tovisit, visited) {
  for (var i = 0; i < tovisit.length; i++) {
    tovisit[i].show(livingcoral);
  }
  for (var i = 0; i < visited.length; i++) {
    visited[i].show(grey, visited_scale);
  }
}

// draw the global best path
function drawBestPath(final) {
  createP("showing best path!");
  var node = final;
  while (node != undefined) {
    node.show(green);
    node = node.previous;
  }
}

// generate random obstacle in grid
function randomObstacle() {
  for (var i = 0; i < unit; i++) {
    for (var j = 0; j < unit; j++) {
      if (random(1) < obstacle_density) {
        grid[i][j].wall = true;
      }
      if (i == start[0] && j == start[1]) {
        grid[i][j].wall = false;
      }
      if (i == end[0] && j == end[1]) {
        grid[i][j].wall = false;
      }
    }
  }
}

// generate obstacle with mouse
function drawObstacle() {

}

// function delaytime(seconds){
//   var milliseconds = seconds * 1000;
//   var now = new Date().getTime();
//   while (true){
//     var temp = new Date().getTime();
//     if (temp >= now + milliseconds) break;
//     console.log("shit");
//   }
// } 

// function delayForSeconds(seconds) {
//   setTimeout(function() {}, seconds * 1000);
// }

// function dijkstra(start, end, grid) {
//   console.log("dijkstra");
//   let startpoint = grid[start[0]][start[1]];
//   let endpoint = grid[end[0]][end[1]];
//   let nextSpot = Spot(0, 0);
//   let tempg = 0;
//   this.tovisit = [];
//   this.visited = [];
//   this.tovisit.splice(this.tovisit.length, 0, startpoint);
//   while (this.tovisit.length > 0) {
//     delayForSeconds(1);

//     // createP("before");
//     // createP(this.tovisit);
//     // createP(this.visited);

//     var currSpot = this.tovisit[0];
//     this.tovisit.splice(0, 1);
//     console.log("visiting: ", currSpot.i, currSpot.j);
//     var neighbors = currSpot.getNeighbors();

//     for (var i = 0; i < neighbors.length; i++) {
//       nextSpot = neighbors[i];
//       if (this.visited.indexOf(nextSpot) != -1) continue; // don't visit twice
//       tempg = currSpot.g + 1;
//       if (tempg < nextSpot.g) {
//         nextSpot.g = tempg;
//         nextSpot.previous = currSpot;
//         this.tovisit.push(nextSpot);
//       }
//     }
//     this.visited.push(currSpot);

//     // createP("after");
//     // createP(this.tovisit);
//     // createP(this.visited);
//     renderGrid(this.tovisit, this.visited);
//     if (this.visited.indexOf(endpoint) != -1) {
//       noLoop();
//       drawBestPath(endpoint);
//       console.log("done!");
//       return; // GOAL!!
//     }
//   }
// }

function astar() {

}

function dijkstra() {
  let startpoint = grid[start[0]][start[1]];
  let endpoint = grid[end[0]][end[1]];

  var currSpot = tovisit[0];
  tovisit.splice(0, 1);
  console.log("visiting: ", currSpot.i, currSpot.j);
  var neighbors = currSpot.getNeighbors();
  
  // === - add unvisited neighbors of curr to tovisit[] - ===
  for (var i = 0; i < neighbors.length; i++) {
    nextSpot = neighbors[i];
    if (visited.indexOf(nextSpot) != -1) continue; // don't visit twice
    tempg = currSpot.g + 1;
    if (tempg < nextSpot.g) {
      nextSpot.g = tempg;
      nextSpot.previous = currSpot;
      tovisit.push(nextSpot);
    }
  }
  // === - mark curr as visited - ===
  visited.push(currSpot);

  renderGrid(tovisit, visited);
  if (visited.indexOf(endpoint) != -1) {
    noLoop();
    drawBestPath(endpoint);
    console.log("done!");
    return; // GOAL!!
  }
  if (tovisit.length == 0) {
    createP("no solution")
  }
}

function draw() {
  dijkstra();
}
