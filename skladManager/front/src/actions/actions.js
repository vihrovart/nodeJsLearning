const types = require('../constants/actionsTypes');
const actionsHelper = require("../helpers/actionsHelper");

module.exports.Product = new actionsHelper.ItemActions(types.Product);