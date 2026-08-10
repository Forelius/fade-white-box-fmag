import { SheetTab, CharacterSheet } from '/systems/fantastic-depths/module/fantastic-depths.min.js';


/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {CharacterSheet}
 */
export class WBCharacterSheet extends CharacterSheet {
   static DEFAULT_OPTIONS = {
      ...CharacterSheet.DEFAULT_OPTIONS,
      //position: { ...CharacterSheet.DEFAULT_OPTIONS.position, width: 600, height: 500 },
   };

   static PARTS = {
      ...CharacterSheet.PARTS,
      skills: {
         ...CharacterSheet.PARTS.skills,
         template: "modules/fade-white-box-fmag/templates/actor/character/skills.hbs",
      },
   };
}