import { LocalStorage } from "quasar";
import { Platform } from "quasar";

const defaults = {
  animateBoard: true,
  axisLabels: true,
  board3D: false,
  boardRotation: [0.4431946006749157, 0.7255343082114736, 0.8501890886498717],
  editingTPS: "",
  flatCounts: true,
  highlightSquares: true,
  isEditingTPS: false,
  notifyGame: true,
  notifyNotes: true,
  pieceShadows: !Platform.is.mobile,
  playSpeed: 60, //BPM
  player1: "",
  player2: "",
  selectedPiece: { player: null, type: null },
  showAllBranches: false,
  showControls: true,
  showMove: true,
  showPTN: false,
  showRoads: true,
  showScrubber: true,
  showText: false,
  size: 5,
  textTab: "notes",
  unplayedPieces: true
};

let state = {
  embed: Platform.within.iframe,
  games: [],
  defaults,
  ...defaults
};

const load = (key, initial) =>
  LocalStorage.has(key) ? LocalStorage.getItem(key) : initial;

if (!state.embed) {
  if (!LocalStorage.isEmpty()) {
    for (let key in state) {
      state[key] = load(key, state[key]);
    }
  }
  state.games = load("games", []).map(name => ({
    name,
    ptn: load("ptn-" + name),
    state: load("state-" + name),
    history: load("history-" + name),
    historyIndex: load("historyIndex-" + name)
  }));
}

export default state;
