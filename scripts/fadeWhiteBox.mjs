//import { preloadHandlebarsTemplates } from './system/templates.mjs';

import { WBMonsterSheet } from '../sheets/WBMonsterSheet.mjs';
import { moraleCheck } from "./system/moraleCheck.mjs"
import { FADEWB } from "./system/config.mjs"
import { WBCharacterDataModel } from './actor/WBCharacterDataModel.mjs';

Hooks.on("init", function() {


   console.debug("FWB: Registering custom MonsterSheet as default");
   const gActors = foundry?.documents?.collections?.Actors ?? Actors;
    // Register your custom MonsterSheet as default
   gActors.registerSheet('fade-white-box-fmag', WBMonsterSheet, {
    label: 'FADEWB.SheetLabel.Monster',
    types: ['monster'],
    makeDefault: true
   });
   console.debug('FWB: Registered custom MonsterSheet as default')

 });

Hooks.once('beforeFadeInit', async function (fadeRegistry) {
   console.debug('FWB: beforeFadeInit hook called.');
});

Hooks.once('afterFadeInit', async function (fadeRegistry) {
   console.debug('FWB: afterFadeInit hook called.');

   Object.assign(game.settings.get("fantastic-depths.abilityScoreModSystem").choices, {
      simple: game.i18n.localize("SETTINGS.abilityScoreModSystem.choices.simple")
   });
   Object.assign(CONFIG.FADE.abilityScoreModSystem, FADEWB.abilityScoreModSystem);

   CONFIG.Actor.dataModels.character = WBCharacterDataModel;

   fadeRegistry.registerSystem('moraleCheck', new moraleCheck(), moraleCheck);

});

Hooks.once('beforeFadeReady', async (fadeRegistry) => {
   console.debug('FWB: beforeFadeReady hook called.');
   if (!game.settings.get("fantastic-depths", "actorPack")) {
      console.log("No actors pack specified, assigning white box.")
      await game.settings.set("fantastic-depths", "actorPack", "fade-white-box-fmag.white-box-actors");
   }
   if (!game.settings.get("fantastic-depths", "itemPack")) {
      console.log("No items pack specified, assigning white box.")
      await game.settings.set("fantastic-depths", "itemPack", "fade-white-box-fmag.white-box-items");
   }
   if (!game.settings.get("fantastic-depths", "rollTablePack")) {
      console.log("No roll-tables pack specified, assigning white box.")
      await game.settings.set("fantastic-depths", "rollTablePack", "fade-white-box-fmag.white-box-roll-tables");
   }
});

Hooks.once('afterFadeReady', async function (fadeRegistry) {
   console.debug('FWB: afterFadeReady hook called.');
});
