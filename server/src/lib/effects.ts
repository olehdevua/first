// unit: {                target: {
//   effects                effects
// }                      }
//
//          [ ]     action     [ ]
//                    |
//           v      \ v /       v
//                   |e|
//    pre: [a,a]     |f|      [a,a] :post
//                   |f|
//           v       |e|        v
//                   |c|
//    pre: [a,a,a,a] |t|      [a,a,a] :post
//                   |s|
//           v        |         v
//                    v
// [....preactions, action, ...postactions]

export default function applyEffects(unit, action) {
  const [preActions, action, postActions] = unit.effects.reduce(
    (eff, [pre, currentAction, post]) => {
      const [preActions, action, postActions] = applyEffect(
        eff,
        currentAction
      );
      return [[...pre, ...preActions], action, [...postActions, ...post]];
    },
    [[], action, []]
  );
  return [...preActions, action, ...postActions];
}

export function applyEffect(action, effect) {
  switch (effect.type) {
    case TOGGLE_ACTIVITY: {
      const unit = action.unit;
      return [createDisActivateAction(unit), { ...action }, createActivateAction(unit)];
    }
  }
}

export function createToggleActivityEffect() {
  return {
    type: TOGGLE_ACTIVITY,
  };
}


// export function createEffect(type: ActionType, when: ActionOrderType, payload) {
//   return {
//     type: ActionType.Attack,
//     when: ActionOrderType.To,
//     payload: {
//       count,
//       damage
//     }
//   };
// }
//
// export function attackEffect(count, damage) {
//   return unit => {
//     unit.health - damage;
//   };
// }
