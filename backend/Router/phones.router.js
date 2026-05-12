const express = require('express');
const phonesRouter = express.Router();
const { getPhones,getSinglePhone,addPhone, editPhone, deletePhone } = require('../Controllers/phones.controller');
const protect = require('../middlewares/auth.middleware');
const allowRoles = require('../Controllers/roles.controller');

phonesRouter.route('/')
    .get(getPhones)
    .post(protect, allowRoles('admin'), addPhone)

phonesRouter.route('/:id')
    .get(getSinglePhone)
    .put(protect, allowRoles('admin'), editPhone)
    .delete(protect, allowRoles('admin'), deletePhone)

module.exports = phonesRouter;