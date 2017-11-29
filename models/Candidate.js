const mongoose = require('mongoose');
const CandidateSchema = new mongoose.Schema({
    name: String,
    votes: { type: Number, default: 0 },
});
CandidateSchema.methods.vote = function (cb) {
    this.votes += 1;
    this.save(cb);
};
mongoose.model('Candidate', CandidateSchema);
