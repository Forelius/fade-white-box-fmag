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
						{ "min": 0, "move": 12, tier: "unencumbered" },
						{ "min": 76, "move": 9, tier: "moderately" },
						{ "min": 101, "move": 6, tier: "encumbered" },
						{ "min": 151, "move": 3, tier: "heavily" },
						{ "min": 301, "move": 0, tier: "over" },
					])
				}, {
					key: "dwarf-halfling",
					json: JSON.stringify([
						{ "min": 0, "move": 9, tier: "unencumbered" },
						{ "min": 76, "move": 6, tier: "moderately" },
						{ "min": 101, "move": 3, tier: "encumbered" },
						{ "min": 151, "move": 3, tier: "heavily" },
						{ "min": 301, "move": 0, tier: "over" },
					])
				}]
			};
		}
	}
}