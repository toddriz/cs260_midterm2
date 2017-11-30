const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,
    numberOrdered: Number
});

ItemSchema.methods.incrementNumberOrdered = function (cb) {
    this.numberOrdered += 1;
    this.save(cb);
};


mongoose.model('Item', ItemSchema);
