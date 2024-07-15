const mongoose = require("mongoose");

const {Schema} = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_date: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);