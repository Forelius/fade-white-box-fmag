import { ActorMovement } from '/systems/fantastic-depths/module/fantastic-depths.min.js';

export class WBActorMovement extends ActorMovement {
   constructor() {
      super();
   }

   prepareMovementRates(actor) {
      const movement = actor.system.movement;
      const modes = movement?.modes;
      if (!Array.isArray(modes) || modes.length === 0) {
         console.debug(`No movement modes specified for ${actor.name}`);
         if (actor.system.encumbrance) {
            actor.system.encumbrance.mv = null;
            actor.system.encumbrance.mv2 = null;
         }
         return;
      }

      const encFactor = movement.modifiers?.encumbrance ?? 1;
      const fixedPrimary = movement.modifiers?.fixedPrimary;

      for (let i = 0; i < modes.length; i++) {
         const mode = modes[i];
         if (mode.base === null || mode.base === undefined) {
            continue;
         }

         let effective = null;
         if (i === 0 && fixedPrimary != null) {
            effective = fixedPrimary;
         } else if (mode.base > 0) {
            effective = Math.floor(mode.base * encFactor);
         }
         if (effective == null || effective <= 0) continue;

         // Base movement rate in tens of feet.
         mode.turn = effective;
         // Combat sixty seconds round
         mode.round = Math.floor(mode.turn / 3);
         // Miles per day normal rate
         mode.day = effective;
         // Run speed calculated as double combat speed
         mode.run = Math.floor(mode.round * 2.0);
      }

      if (actor.system.encumbrance) {
         actor.system.encumbrance.mv = modes[0]?.turn ?? null;
         actor.system.encumbrance.mv2 = modes[1]?.turn ?? null;
      }
   }
}
