import { ClassicEncumbrance } from '/systems/fantastic-depths/module/fantastic-depths.min.js';

export class WBEncumbrance extends ClassicEncumbrance {
   constructor() {
      super();
      // Default gear weight
      if (CONFIG.FADE.Encumbrance) {
         CONFIG.FADE.Encumbrance.WB = { tableMonster: null, tablePC: null, defaultGearEnc: 10 };
      }

      this.ENC_TABLES = game.fade.registry.getSystem("userTables").getKeyJson("wb-encumbrance");
      console.debug(`WBEncumbrance constructor.`, this.ENC_TABLES);
   }

   /**
    * Calculate encumbrance for different categories.
    * @param {any} items The items to calculate encumbrance with.
    */
   calcCategoryEnc(items) {
      const results = super.calcCategoryEnc(items);
      // Gear
      const itemTypes = ["treasure", "ammo"]
      results.gearEnc = items.filter(item => itemTypes.includes(item.type))
         .reduce((sum, item) => {
            //console.debug(`Encumbrance ${item.name} weight ${this._getItemEncumbrance(item)}`);
            return sum + this._getItemEncumbrance(item);
         }, 10 /*10 lbs*/);
      return results;
   }

   _getEncTier(actor, totalEnc) {
      let result = null;

      if (actor.type !== "monster" && actor.type !== "vehicle") {
         const isDwarfHalfling = actor.system.movement.max === 9;
         if (isDwarfHalfling) {
            result = this.ENC_TABLES["dwarf-halfling"].find((i) => i.min <= totalEnc)
         } else {
            result = this.ENC_TABLES["elf-human"].find((i) => i.min <= totalEnc)
         }
      }

      return result;
   }

   _calculateEncMovement(actor, encTier) {
      let result = {
         label: game.i18n.localize(`FADE.Actor.encumbrance.unencumbered.label`),
         desc: game.i18n.localize(`FADE.Actor.encumbrance.unencumbered.desc`),
         mv: actor.system.movement.max,
         mv2: actor.system.movement2.max
      };

      if (actor.type === "character" && encTier != null) {
         result.label = game.i18n.localize(`FADE.Actor.encumbrance.${encTier.tier}.label`);
         result.desc = game.i18n.localize(`FADE.Actor.encumbrance.${encTier.tier}.desc`);
         result.mv = encTier.move;         
      } 

      return result;
   }
}