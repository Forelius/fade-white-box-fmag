import { fadeFinder } from '/systems/fantastic-depths/module/utils/finder.mjs';
import { DialogFactory } from '/systems/fantastic-depths/module/dialog/DialogFactory.mjs';

export class moraleCheck {
   async execute(data) {
      const { actor, event } = data;
      const ctrlKey = event?.ctrlKey;
      const dataset = event.target.dataset;
      dataset.formula = '2d6';
      dataset.dialog = 'generic';
      let isRolling = true;
      let dialogResp = null;
      let mod = actor.system.retainer.loyaltyMod;

      if (ctrlKey === false) {
         dialogResp = await DialogFactory(dataset, actor);
         if (dialogResp?.resp?.rolling === true) {
            mod += dialogResp.resp.mod;
         } else {
            // This will stop the process below.
            isRolling == false;
         }
      }

      const rollTable = await this.getRollTable('Morale Check');

      if (isRolling && rollTable) {
         // Roll the table with the selected roll mode
         const rollResult = await rollTable.roll();

         // Calculate the total based on the roll's total and the modifier
         const rollTotal = rollResult.roll._total;
         const total = rollTotal + mod;

         // Get the text descriptions of the rolled results
         const rolledResultsText = rollResult.results.map(r => r.text).join(', ');

         // Create a message to display the result
         const messageContent = `<div class="text-size16">${rollTable.name}</div><p>${rolledResultsText}</p><hr/><p>Total: <strong>${rollTotal} + ${mod} = ${total}</strong></p>`;
         const chatMsgData = { content: messageContent, speaker: ChatMessage.getSpeaker() };
         //ChatMessage.applyRollMode(chatMsgData, selectedRollMode);
         // Send the result to chat
         ChatMessage.create(chatMsgData);
      } else {
         ui.notifications.error("Morale Check roll table not found.");
      }
   }

   async getRollTable(name) {
      const worldSource = game.tables;
      let result = worldSource?.filter(item => item.Name === name)?.[0];
      if (!result) {
         const packSource = game.packs.get('fade-white-box-fmag.white-box-roll-tables');
         result = (await packSource?.getDocuments())?.filter(item => item.name === name)?.[0];
      }
      return result;
   }
}