import { preloadHandlebarsTemplates } from './system/templates.mjs';
import { moraleCheck } from "./system/moraleCheck.mjs"
import { FADEWB } from "./system/config.mjs"
import { WBCharacterDataModel } from './actor/WBCharacterDataModel.mjs';
import { WBMonsterSheet } from './sheets/WBMonsterSheet.mjs';
import { WBCharacterSheet } from './sheets/WBCharacterSheet.mjs';


Hooks.once('beforeFadeInit', async function (fadeRegistry) {
   console.debug('FWB: beforeFadeInit hook called.');
});

Hooks.once('afterFadeInit', async function (fadeRegistry) {
   console.debug('FWB: afterFadeInit hook called.');

   //Object.assign(game.settings.get("fantastic-depths.abilityScoreMods").choices, {
   //   simple: game.i18n.localize("SETTINGS.abilityScoreMods.choices.simple")
   //});
   //Object.assign(CONFIG.FADE.abilityScoreMods, FADEWB.abilityScoreMods);

   const gActors = foundry?.documents?.collections?.Actors ?? Actors;
   gActors.registerSheet('fade-white-box-fmag', WBMonsterSheet, {
      label: 'FADEWB.SheetLabel.Monster',
      types: ['monster'],
      makeDefault: true
   });
   gActors.registerSheet('fade-white-box-fmag', WBCharacterSheet, {
      label: 'FADEWB.SheetLabel.Character',
      types: ['character'],
      makeDefault: true
   });

   CONFIG.Actor.dataModels.character = WBCharacterDataModel;

   fadeRegistry.registerSystem('moraleCheck', new moraleCheck(), moraleCheck);
});

Hooks.once('beforeFadeReady', async (fadeRegistry) => {
   console.debug('FWB: beforeFadeReady hook called.');
   if (!game.settings.get("fantastic-depths", "actorPack")) {
      console.log("No actors pack specified, assigning white box.")
      await game.settings.set("fantastic-depths", "actorPack", "fade-white-box-fmag.actors");
   }
   if (!game.settings.get("fantastic-depths", "itemPack")) {
      console.log("No items pack specified, assigning white box.")
      await game.settings.set("fantastic-depths", "itemPack", "fade-white-box-fmag.items");
   }
   if (!game.settings.get("fantastic-depths", "rollTablePack")) {
      console.log("No roll-tables pack specified, assigning white box.")
      await game.settings.set("fantastic-depths", "rollTablePack", "fade-white-box-fmag.rollTables");
   }
});

Hooks.once('afterFadeReady', async function (fadeRegistry) {
   console.debug('FWB: afterFadeReady hook called.');
});
