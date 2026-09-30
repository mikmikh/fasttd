import { JGridView } from "./jgrid.js";

// game
export class Game {
  constructor() {
    this.rootEl = document.getElementById("game");
    this.debugEl = document.getElementById("debug");

    this.events = new JEvents();
    this.state = null;
    this.gameGrid = null;
    this.absGrid = null;
    this.debugGrid = null;

    // this._init();
  }
  _init() {

  }
  _resetState() {
    this.state = {
      size: [4, 4],
      state: "level",
      objects: [],
      key2obj: {},
      flowfield: {},
    };
  }
  _setUpGrids() {
    this.gameGrid = new JGridView(this.rootEl, size);
    this.absGrid = new JGridView(this.rootEl, size);
    this.debugGrid = new JGridView(this.debugEl, size);
  }
  dispose() {
    this._resetState();
    this.gameGrid?.dispose();
    this.absGrid?.dispose();
    this.debugGrid?.dispose();
    this.gameGrid = null;
    this.absGrid = null;
    this.debugGrid = null;
  }
  loadLevel(level) {
    const { size, objects } = level;

    this.dispose();

    this.state.size = size;
    this.state.objects = objects;

    this._setUpGrids();
  }
  actPlayerMove(offset) {
    this.events.emit("move", offset);
    this.events.emit("render");
  }
}
