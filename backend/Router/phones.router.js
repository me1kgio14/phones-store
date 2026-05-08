const express = require('express');
const phonesRouter = express.Router();
const { getPhones,getSinglePhone,addPhone, editPhone, deletePhone } = require('../Controllers/phones.controller');

phonesRouter.route('/')
    .get(getPhones)
    .post(addPhone)

phonesRouter.route('/:id')
    .get(getSinglePhone)
    .put(editPhone)
    .delete(deletePhone)

module.exports = phonesRouter;