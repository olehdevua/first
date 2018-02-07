import {
  CLEAN_STATE,
  PAWN,
  OFFICER,
  POSITIONS,
  MAX_WARRIORS_ON_FIELD
} from "../constants";

const MIDDLE_POSITION = (POSITIONS / 2) | 0;
const EMPTY = {};
const EMPTY_LIST = [];

const WARRIORS_INIT = "WARRIORS_INIT";
const WARRIORS_ADD = "WARRIORS_ADD";
const WARRIORS_RELEASE = "WARRIORS_RELEASE";
const WARRIOR_KICKED = "WARRIOR_KICKED";
const WARRIORS_SET = "WARRIORS_SET";

let id = 0;

export default function warriorsReducer(state = EMPTY, { type, payload }) {
  const owner_name = payload && payload.owner_name;
  const warriors = state[owner_name];

  switch (type) {
    case WARRIORS_INIT:
      state = { ...state };
      payload.forEach(name => (state[name] = []));
      return state;

    case WARRIORS_ADD: {
      const { type, position } = payload;

      const warrior = createWarrior(type);

      if (warriors.find(w => w.position === warrior.position)) {
        return state;
      }

      if (warriors.length === 0) {
        warrior.position = MIDDLE_POSITION;
        return { ...state, [owner_name]: [warrior] };
      }

      if (warriors.length >= MAX_WARRIORS_ON_FIELD) {
        return state;
      }

      return {
        ...state,
        [owner_name]: adjustWarriors(warriors, warrior, position)
      };
    }

    case WARRIORS_SET: {
      return { ...state, [owner_name]: payload.warriors };
    }

    case WARRIORS_RELEASE:
      return { ...state, [owner_name]: EMPTY_LIST };

    case WARRIOR_KICKED: {
      const { id, damage } = payload;
      let warrior = warriors.find(w => w.id === id);

      const health = warrior.health - damage;

      // just update warrior
      if (health > 0) {
        warrior = { ...warrior, health };
        return {
          ...state,
          [owner_name]: warriors.map(w => (w.id === id ? warrior : w))
        };
      }

      // eliminate dead hero :( and readjust other positions
      return {
        ...state,
        [owner_name]: warriors
          .filter(w => w.id !== id)
          .map(w => separateMyWarriors(w, warrior.position))
      };
    }

    default:
      return state;
  }
}

export function warriorsInit(names) {
  return {
    type: WARRIORS_INIT,
    payload: names
  };
}

export function warriorsAdd(owner_name, position, type) {
  return {
    type: WARRIORS_ADD,
    payload: { owner_name: owner_name, type, position }
  };
}

export function warriorKicked(owner_name, id, damage) {
  return {
    type: WARRIOR_KICKED,
    payload: { owner_name, id, damage }
  };
}

export function warriorsRelease(owner_name) {
  return {
    type: WARRIORS_RELEASE,
    payload: owner_name
  };
}

export function warriorsSet(owner_name, warriors) {
  return {
    type: WARRIORS_SET,
    payload: { owner_name, warriors }
  };
}

//
// ============ helpers ============
//

function createWarrior(type) {
  switch (type) {
    case PAWN:
      return {
        type: PAWN,
        health: 6,
        damage: 1,
        id: id++
      };
    case OFFICER:
      return {
        type: OFFICER,
        health: 4,
        damage: 2,
        id: id++
      };
  }
}

function adjustWarriors(warriors, warrior, position) {
  if (position > maxPosition(warriors))
    return adjust(shiftWarriorsToLeft, wrs => maxPosition(wrs) + 2);

  if (position < minPosition(warriors))
    return adjust(shiftWarriorsToRight, wrs => minPosition(wrs) - 2);

  return adjust(w => separateMyWarriors(w, position), () => position);

  function adjust(move, calcPos) {
    warriors = warriors.map(move);
    warrior.position = calcPos(warriors);
    warriors.push(warrior);
    return warriors;
  }
}

function maxPosition(wrs) {
  return Math.max(...wrs.map(w => w.position));
}

function minPosition(wrs) {
  return Math.min(...wrs.map(w => w.position));
}

function shiftWarriorsToLeft(w) {
  return { ...w, position: w.position - 1 };
}

function shiftWarriorsToRight(w) {
  return { ...w, position: w.position + 1 };
}

function separateMyWarriors(w, pivot) {
  return w.position < pivot
    ? { ...w, position: w.position - 1 }
    : { ...w, position: w.position + 1 };
}
