import { ClassicEncumbrance } from '/systems/fantastic-depths/module/fantastic-depths.min.js';

export class WBEncumbrance extends ClassicEncumbrance {
	constructor() {
      super();
      // Default gear weight
      CONFIG.FADE.Encumbrance.WB = { tableMonster: null, tablePC: null, defaultGearEnc: 10 };

      //this.CONFIG = CONFIG.FADE.Encumbrance.WB;
   }
}