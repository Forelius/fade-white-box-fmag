import { ActorMovement } from '/systems/fantastic-depths/module/fantastic-depths.min.js';

export class WBActorMovement extends ActorMovement {
   constructor() {
      super();
   }

   static prepareMovementRates(actor) {
      if (actor.system.encumbrance.mv > 0) {
         // Base movement rate in tens of feet.
         actor.system.movement.turn = actor.system.encumbrance.mv;
         // Combat sixty seconds round
         actor.system.movement.round = Math.floor(actor.system.movement.turn / 3);
         // Miles per day normal rate
         actor.system.movement.day = Math.floor(actor.system.movement.turn);
         // Run speed calculated as double combat speed
         actor.system.movement.run = Math.floor(actor.system.movement.round * 2.0);
      } else {
         console.debug(`No movement specified for ${actor.name}`);
      }
      if (actor.system.encumbrance.mv2 > 0) {
         actor.system.movement2.turn = actor.system.encumbrance.mv2;
         actor.system.movement2.round = Math.floor(actor.system.movement2.turn / 3);
         actor.system.movement2.day = Math.floor(actor.system.movement2.turn);
         actor.system.movement2.run = Math.floor(actor.system.movement2.round * 2.0);
      } else {
         //console.debug(`No movement2 specified for ${actor.name}`);
      }
   }
}