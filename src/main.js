import * as jutiles from "./utils/utils.js";
import { JGridView } from "./core/jgrid.js";

// ^>v<
const offsets = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const name2style = {
  player: {
    fgColor: "blue",
    bgColor: "white",
  },
  enemy: {
    fgColor: "red",
    bgColor: "white",
  },
  default: {
    fgColor: "black",
    bgColor: "white",
  },
};
const name2text = {
  player: "P",
  enemy: "E",
  castle: "C",
  tree: "T",
  wall: "W",
  spawner: "S",
};

function formatObj(obj) {
  const parts = [`${name2text[obj.name]}`];
  obj.hp && parts.push(`hp:${obj.hp}`);
  return parts.join(" ");
}

function main() {
  const containerEl = document.querySelector(".container");
  const size = [8, 8];
  const grid = new JGridView(containerEl, size);

  const objects = [
    { pos: [3, 1], name: "castle", hp: 10 },

    { pos: [2, 3], name: "wall", hp: 2 },
    { pos: [3, 3], name: "wall", hp: 2 },
    { pos: [4, 3], name: "wall", hp: 2 },

    { pos: [0, 0], name: "player", hp: 5 },
    { pos: [3,7], name: "spawner", hp: 2 },
  ];
  {
    const key2info = {};
    objects.forEach((obj) => {
      const key = jutiles.jpos2key(obj.pos);
      key2info[key] = {
        textContent: formatObj(obj),
        style: name2style[obj.name] ?? name2style["default"],
      };
    });
    grid.renderGrid(key2info);
  }
}

main();

// TODO:
// create flow field from castle to all enemies using dijkstra algo
// consider walls, add weight to graphs
// win if no spawners and enemeis and castle alive
// lose if castle or player is destroyed
// move,merge,attack,be hit 
// ideas:
// stone + stone -> wall
// axe + tree -> wood
// wood + wood -> house
// house + sword -> barracs (hp: 3)
// human + sword -> warrior
// stone + wood ->  