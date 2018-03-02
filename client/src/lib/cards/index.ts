import { createNumberSequence } from "../../utils/common";

import { default as createCard } from "./fabric";

//export function createRandomCards(n, owner_id) {
//  return createNumberSequence(n).map(() => createRandomCard(owner_id));
//}
//
//export function createRandomCard(owner_id) {
//  const type = (Math.random() * 3) | 0;
//  return createCard(type, owner_id);
//}

let turn = true;
export function createRandomCards(n, owner_id) {
  if (turn) {
    turn = false;
    return [
      createCard(1, owner_id),
      createCard(1, owner_id),
      createCard(0, owner_id),
    ]
  } else {
    turn = true;
    return [
      createCard(0, owner_id),
      createCard(2, owner_id),
      createCard(0, owner_id),
    ]
  }
}
