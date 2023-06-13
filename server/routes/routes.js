const express = require('express');
const Model = require('../model/model');

const router = express.Router()

router.post('/post', async (req, res) => {
    const data = new Model({
        companyName: req.body.companyName,
        address: req.body.address,
        phone: req.body.phone,
        emploee: req.body.emploee,
        role: req.body.role,
        age: req.body.age,
        department: req.body.department,
        manager: req.body.manager
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Model.findByIdAndUpdate(id, req.body, { new: true })
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Model.findByIdAndDelete(req.params.id)
        console.log('---data:', data)
        res.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
