export const FADEWB = {};
FADEWB.abilityScoreModSystem = {
   simple: {
      key: 'simple',
      mods: [
         { max: 4, value: -1, maxRetainers: 1, loyaltyMod: -2 },
         { max: 6, value: -1, maxRetainers: 2, loyaltyMod: -2 },
         { max: 8, value: 0, maxRetainers: 3, loyaltyMod: -1 },
         { max: 12, value: 0, maxRetainers: 4, loyaltyMod: 0 },
         { max: 14, value: 0, maxRetainers: 5, loyaltyMod: 1 },
         { max: 15, value: 1, maxRetainers: 5, loyaltyMod: 1 },
         { max: 17, value: 1, maxRetainers: 6, loyaltyMod: 2 },
         { max: 18, value: 1, maxRetainers: 7, loyaltyMod: 2 }
      ]
   }
};