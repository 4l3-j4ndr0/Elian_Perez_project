const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestimonioSchema = new Schema({
    comentario: { type: String, required: true },
    nombre: { type: String, required: true },
    ocupacion: { type: String, required: false },
    email: { type: String, required: true },
});

const Testimonio = mongoose.model('Testimonio', TestimonioSchema);
module.exports = Testimonio;
