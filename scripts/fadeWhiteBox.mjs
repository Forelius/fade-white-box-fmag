import { preloadHandlebarsTemplates } from './system/templates.mjs';
import { moraleCheck } from "./system/moraleCheck.mjs"
import { FADEWB } from "./system/config.mjs"

Hooks.once('init', async function () {
   console.debug('FWB: init hook called.');
});

Hooks.once('beforeFadeInit', async function (fadeRegistry) {
   console.debug('FWB: beforeFadeInit hook called.');
});

Hooks.once('afterFadeInit', async function (fadeRegistry) {
   console.debug('FWB: afterFadeInit hook called.');

   Object.assign(game.settings.settings.get("fantastic-depths.abilityScoreModSystem").choices, {
      simple: game.i18n.localize("SETTINGS.abilityScoreModSystem.choices.simple")
   });
   Object.assign(CONFIG, FADEWB);

   // Preload Handlebars templates.
   await preloadHandlebarsTemplates();

   //fadeRegistry.registerSystem('moraleCheck', new moraleCheck());
});