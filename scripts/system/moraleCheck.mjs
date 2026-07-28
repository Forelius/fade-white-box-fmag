import { DialogFactory, fadeFinder } from '/systems/fantastic-depths/module/fantastic-depths.min.js';

export class moraleCheck {
   async execute(data) {
      console.log("Using fade white box morale system.");

      const { actor, event } = data;
      const ctrlKey = event?.ctrlKey;
      const dataset = event.target.dataset;
      dataset.formula = '2d6';
      dataset.dialog = 'generic';
      let isRolling = true;
      let dialogResp = null;
      let mod = actor.system.retainer?.loyaltyMod ?? 0;

      if (ctrlKey === false) {
         dialogResp = await DialogFactory(dataset, actor);
         if (dialogResp) {
            mod += Number(dialogResp.mod) || 0;
         } else {
            isRolling = false;
         }
      }

      const rollTable = await fadeFinder.getRollTable('Morale Check');

      if (isRolling && rollTable) {
         const rollResult = await rollTable.draw({ displayChat: false });
         const rollTotal = rollResult.roll.total;
         const total = rollTotal + mod;

         const rolledResultsTextResults = await Promise.all(rollResult.results.map(async r => {
            const html = await r.getHTML();
            const div = document.createElement("div");
            div.innerHTML = html;
            return div.textContent ?? "";
         }));
         const rolledResultsText = rolledResultsTextResults.join(', ');

         const messageContent = `<div class="text-size16">${rollTable.name}</div><p>${rolledResultsText}</p><hr/><p>Total: <strong>${rollTotal} + ${mod} = ${total}</strong></p>`;
         const chatMsgData = { content: messageContent, speaker: ChatMessage.getSpeaker() };
         ChatMessage.create(chatMsgData);
      } else {
         ui.notifications.error("Morale Check roll table not found.");
      }
   }
}