const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: String,
    votes: { type: Number, default: 0 },
});

CandidateSchema.methods.vote = function (cb) {
    console.log('in model votes');
    this.votes += 1;
    this.save(cb);
};

mongoose.model('Candidate', CandidateSchema);
