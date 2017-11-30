const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

router.param('item', (request, response, next, id) => {
    const query = Item.findById(id);
    query.exec((error, item) => {
        if (error) {
            return next(error);
        }
        if (!item) {
            return next(new Error("can't find item"));
        }
        request.item = item;
        return next();
    });
});

// Get items
router.get('/items', (request, response, next) => {
    Item.find((error, items) => {
        if (error) {
            return next(error);
        } else {
            return response.json(items);
        }
    });
});

// Add item
router.post('/item', (request, response, next) => {
    const item = new Item(request.body);
    item.save((error, item) => {
        if (error) {
            return next(error);
        } else {
            response.json(item);
        }
    });
});

// Delete item
router.delete('/item/:item', (req, res) => {
    req.item.remove();
    res.sendStatus(200);
});


    router.put('/item/:item/order', (request, response, next) => {
        request.item.incrementNumberOrdered((error, item) => {
            if (error) {
                return next(error);
            } else {
                response.json(item);
            }
        });
    });

module.exports = router;
