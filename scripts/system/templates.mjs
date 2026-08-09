/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
   const fn = foundry?.applications?.handlebars?.loadTemplates ?? loadTemplates;
   return fn({
      //characterDesc: 'modules/fade-white-box-fmag/templates/character-desc.hbs',
   });
};