import { CharacterDataModel } from '/systems/fantastic-depths/module/actor/dataModel/CharacterDataModel.mjs';

export class WBCharacterDataModel extends CharacterDataModel {
   static defineSchema() {
      const { fields } = foundry.data;
      return foundry.utils.mergeObject(super.defineSchema(), {
         retainer: new fields.SchemaField({
            loyaltyMod: new fields.NumberField({ initial: 0 }),
         }),
      });
   }

   prepareDerivedData() {
      super.prepareDerivedData();
      this._prepareDerivedAbilities();
   }

   _prepareDerivedAbilities() {
      super._prepareDerivedAbilities();
      const abilityScoreModSystem = game.settings.get(game.system.id, "abilityScoreModSystem");
      const adjustments = CONFIG.FADE.abilityScoreModSystem[abilityScoreModSystem]?.mods;
      // Retainer
      let charisma = this.abilities.cha.value;
      let adjustment = adjustments.find(item => charisma <= item.max);
      this.retainer.loyaltyMod = this.retainer.loyaltyMod > 0 ? this.retainer.loyaltyMod : (adjustment.loyaltyMod ?? 0);
   }
}
