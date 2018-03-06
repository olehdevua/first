import {
  UserStatusType,
  UnitTypes,
  EffectScope,
  EffectImpact
} from "../constants";
import IO from "../socket";
//
// actions
//
import { userIncreaseRate, userDecreaseRate, userUpdateStatus } from "./user";
import { availableTargetsUpdate } from "./targets";
import { unitAttack } from "./battle/unit";
import {
  playerAddCards,
  playerAddUnit,
  playerRemoveCard,
  playerDecreseMoney
} from "./battle/player";
import {
  unitActivate,
  unitDisActivate,
  unitDecreaseMoves
} from "./battle/unit";
import { playerRemoveUnit } from "./battle/player";
import { battleUpdate } from "./battle";
//
// selectors
//
import { getEffects } from "../selectors/battle/effects";
import {
  getUnit,
  getOpponentUnits,
  getNextTurnOwnerPlayer,
  getAllAvailableTargetIds,
  getDeadOpponentUnits,
  getRawUnitSource
} from "../selectors/battle/index";
//
// lib
//
import { applyEffects } from "../lib/unit/effects";

//
// ============ Actions ============
//
export function createBattle(val, router) {
  return dispatch => {
    const { data, error } = val;
    // if (error) ????;

    dispatch(userUpdateStatus(UserStatusType.Fight));
    dispatch(battleUpdate(data));
    router.history.push("/user/battle");
  };
}

export function addUnit(card: any, position: number, player: any) {
  return dispatch => {
    const io = IO().gameIO;

    dispatch(playerRemoveCard(card));
    dispatch(playerDecreseMoney(player.user._id, card.unit.cost));
    dispatch(playerAddUnit(card.unit, position));

    io.addUnit(card._id, position, val => dispatch(battleUpdate(val)));
  };
}

export function onTurn() {
  return dispatch => {
    IO().gameIO.passTheTurn();
  };
}

export function activateUnit(unit_id) {
  return (dispatch, getState) => {
    const state = getState();
    const targetIds = getAllAvailableTargetIds(unit_id, state);
    dispatch(availableTargetsUpdate(targetIds));
  };
}

export function attack(data: { unit_id: string; target_id: string }) {
  return (dispatch, getState) => {
    const { target_id, unit_id } = data;

    const rawUnit = getRawUnitSource(unit_id, target_id, getState());

    dispatch(unitAttack(target_id, rawUnit.damage));
    dispatch(unitDecreaseMoves(unit_id, 1));

    const deadUnits = getDeadOpponentUnits(getState());

    deadUnits.forEach(unit => {
      dispatch(playerRemoveUnit(unit._id, unit.owner_id));
    });

    IO().gameIO.attack(data);
  };
}

export function disActivateUnit(unit_id) {
  return (dispatch, getState) => {
    dispatch(availableTargetsUpdate([]));
  };
}

//
// ============ helpers ============
//