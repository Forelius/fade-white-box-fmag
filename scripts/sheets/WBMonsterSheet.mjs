import { SheetTab, MonsterSheet } from '/systems/fantastic-depths/module/fantastic-depths.min.js';


/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {MonsterSheet}
 */
export class WBMonsterSheet extends MonsterSheet {
   static DEFAULT_OPTIONS = {
      ...MonsterSheet.DEFAULT_OPTIONS,
      position: { ...MonsterSheet.DEFAULT_OPTIONS.position, width: 600, height: 500 },
   };

   static PARTS = {
      ...MonsterSheet.PARTS,
      header: {
         ...MonsterSheet.PARTS.header,
         template: "modules/fade-white-box-fmag/templates/actor/monster/header.hbs",
      },
      abilities: {
         ...MonsterSheet.PARTS.abilities,
         template: "modules/fade-white-box-fmag/templates/actor/monster/abilities.hbs",
      },
      skills: {
         ...MonsterSheet.PARTS.skills,
         template: "modules/fade-white-box-fmag/templates/actor/monster/skills.hbs",
      },
   };
}