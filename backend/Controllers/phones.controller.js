const catchAsync = require('../Utils/catchAsync.js')
const AppError = require("../Utils/AppError.js")
const Phones = require("../models/phones.model.js")


const getPhones = catchAsync(async(req, res,next) => {
    const result = await Phones.find()

    if(result.length === 0){
        return next(new AppError("No phones found", 404))
    }

    return res.status(200).json(result)
})

const getSinglePhone = catchAsync(async(req, res,next) =>{
    const {id} = req.params
    
    const result = await Phones.findById(id)

    
    if(result.length === 0){
        return next(new AppError("Phone not found", 404))
    }

    res.status(200).json(result)
})

const addPhone = catchAsync(async(req, res,next) => {
    const newPhone = await Phones.create(req.body)



    res.status(201).json(newPhone)

})

const editPhone = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const updatedPhone = await Phones.findByIdAndUpdate(id, req.body, { new: true, });

    if (!updatedPhone) {
        return next(new AppError("Phone not found", 404));
    }
    res.status(200).json(updatedPhone);
});

const deletePhone = catchAsync(async(req, res,next) => {
    const id = req.params.id;
    const deletedPhone = await Phones.findByIdAndDelete(id);
    if (!deletedPhone) {
        return next(new AppError("Phone not found", 404));
    }

    res.status(204).json()
})



module.exports = { getPhones,getSinglePhone,addPhone,editPhone,deletePhone };

