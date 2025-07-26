//import { preloadHandlebarsTemplates } from './system/templates.mjs';
import { moraleCheck } from "./system/moraleCheck.mjs"
import { FADEWB } from "./system/config.mjs"
import { WBCharacterDataModel } from './actor/WBCharacterDataModel.mjs';

Hooks.once('beforeFadeInit', async function (fadeRegistry) {
   console.debug('FWB: beforeFadeInit hook called.');
});

Hooks.once('afterFadeInit', async function (fadeRegistry) {
   console.debug('FWB: afterFadeInit hook called.');

   Object.assign(game.settings.settings.get("fantastic-depths.abilityScoreModSystem").choices, {
      simple: game.i18n.localize("SETTINGS.abilityScoreModSystem.choices.simple")
   });
   Object.assign(CONFIG.FADE.abilityScoreModSystem, FADEWB.abilityScoreModSystem);

   CONFIG.Actor.dataModels.character = WBCharacterDataModel;

   fadeRegistry.registerSystem('moraleCheck', new moraleCheck(), moraleCheck);
});

Hooks.once('beforeFadeReady', async function (fadeRegistry) {
   console.debug('FWB: beforeFadeReady hook called.');
});

Hooks.once('afterFadeReady', async function (fadeRegistry) {
   console.debug('FWB: afterFadeReady hook called.');
});
