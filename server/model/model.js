const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    companyName: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    emploee: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: String
    },
    department: {
        required: true,
        type: String
    },
    manager: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)
