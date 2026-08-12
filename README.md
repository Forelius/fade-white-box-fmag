# White Box: FMAG Module for Fantastic Depths Foundry System
Unofficial White Box: FMAG Compendiums and module for Fantastic Depths Foundry VTT System

White Box: Fantastic Medieval Adventure Game is offered as a [free PDF download](https://smolderingwizard.wordpress.com/wp-content/uploads/2023/12/wb_fmag_v21.pdf) by its creator.
There are many other OSR and WB:FMAG resources at https://smolderingwizard.com/tag/whitebox-fmag/

## Character Level Note
The game is designed with the philosophy that 4th level characters are already considered "heroic," so the Level 10 cap represents a very high tier of power in this system.

---
## Property Mappings:
### Movement
Movement is measured in tens of feet, so a rate of one equals ten feet.
Outdoor movement in combat can be increased to yards, instead of tens of feet.

* Base movement rate: `movement.turn`
* Careful movement: `movement.turn/2` Not on sheet
* Combat movement: `movement.round`
* Running: `movement.run`
* Outdoor movement: `movement.day` Miles per day. Doubled for forced march.

## Fantastic Depths Settings:
Unless stated otherwise, use the default settings.

- Actor Compendium: `fade-white-box-fmag.actors`
- Item Compendium: `fade-white-box-fmag.items`
- Rollable Tables Compendium: `fade-white-box-fmag.rollTables`
- Macros Compendium: `fade-white-box-fmag.macros`
- Encumbrance Tracking: The system does not currently have a perfect implementation of the White Box's encumbrance system. You could use `Classic` for close approximation.
- Ability Score Modifier System: `Simple`
- Initiative Mode:  `Group (combat checklist)`
- Declared Actions: `false`
- Round Duration: `60` The rounds is WB are one minute long.
- Weapon Mastery: `None`
- To-Hit System: `Classic`
- Run Rate Per Round Divisor: `1.5` This is saying double base movement rate for running.

<img width="1117" height="825" alt="image" src="https://github.com/user-attachments/assets/4d7e0a68-cfce-4f49-9f1d-da4dca622070" />
