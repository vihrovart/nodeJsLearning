const actionConsHelper = require("../helpers/actionsHelper");

module.exports.Product = actionConsHelper.GetActionTypes("PRODUCT");
module.exports.Category = actionConsHelper.GetActionTypes("CATEGORY");
module.exports.Section = actionConsHelper.GetActionTypes("SECTION");