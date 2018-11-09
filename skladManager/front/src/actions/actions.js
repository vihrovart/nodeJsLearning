const types = require('../constants/actionsTypes');
const actionsHelper = require("../helpers/actionsHelper");

module.exports.Product = new actionsHelper.ItemActions(types.Product);
module.exports.Category = new actionsHelper.ItemActions(types.Category);
module.exports.Section = new actionsHelper.ItemActions(types.Section);