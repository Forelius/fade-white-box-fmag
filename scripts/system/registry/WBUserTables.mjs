import { UserTables } from '/systems/fantastic-depths/module/fantastic-depths.min.js';

export class WBUserTables extends UserTables {
	constructor() {
		super();
	}

	tryAddDefaultTables(userTables) {
		super.tryAddDefaultTables(userTables);
		// Ranged Modifiers
		if (userTables["wb-encumbrance"] === undefined) {
			userTables["wb-encumbrance"] = {
				id: "wb-encumbrance",
				name: "WB Encumbrance",
				type: "keyjson",
				table: [{
					key: "elf-human",
					json: JSON.stringify([
						{ "max": 75, "value": 12 },
						{ "max": 100, "value": 9 },
						{ "max": 150, "value": 6 },
						{ "max": 300, "value": 3 },
					])
				}, {
					key: "dwarf-halfling",
					json: JSON.stringify([
						{ "max": 75, "value": 9 },
						{ "max": 100, "value": 6 },
						{ "max": 150, "value": 3 },
						{ "max": 300, "value": 3 },
					])
				}]
			};
		}
	}
}