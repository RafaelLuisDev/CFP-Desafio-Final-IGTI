import mongoose from 'mongoose';

let schema = mongoose.Schema({
    description: { type: String, required: true },
    value: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    yearMonth: { type: String, required: true },
    yearMonthDay: { type: String, required: true },
    type: { type: String, required: true },
});

const EntryModal = mongoose.model('entry', schema, 'transactions');

export default EntryModal;
