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
       const abilityScoreMods = game.settings.get(game.system.id, "abilityScoreMods");
       const adjustments = game.fade.registry.getSystem("userTables")?.getJsonArray(`ability-mods-${abilityScoreMods}`);
       const adjustment = adjustments.sort((a, b) => b.min - a.min).find(item => this.abilities.cha.total >= item.min);
      // Retainer
      let charisma = this.abilities.cha.value;
      this.retainer.loyaltyMod = this.retainer.loyaltyMod > 0 ? this.retainer.loyaltyMod : (adjustment.loyaltyMod ?? 0);
   }
}
