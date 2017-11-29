const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Candidate = mongoose.model('Candidate');

router.param('candidate', (request, response, next, id) => {
    const query = Candidate.findById(id);
    query.exec((error, candidate) => {
        if (error) {
            return next(error);
        }
        if (!candidate) {
            return next(new Error("can't find candidate"));
        }
        request.candidate = candidate;
        return next();
    });
});

// Get Candidates
router.get('/candidates', (request, response, next) => {
    Candidate.find((error, candidates) => {
        if (error) {
            return next(error);
        } else {
            return response.json(candidates);
        }
    });
});

// Add Candidate
router.post('/candidate', (request, response, next) => {
    const candidate = new Candidate(request.body);
    candidate.save((error, candidate) => {
        if (error) {
            return next(error);
        } else {
            response.json(candidate);
        }
    });
});

// Delete Candidate
router.delete('/candidate/:candidate', (req, res) => {
    req.candidate.remove();
    res.sendStatus(200);
});

// Add vote to Candidate
router.put('/candidate/:candidate/vote', (request, response, next) => {
    request.candidate.vote((error, candidate) => {
        if (error) {
            return next(error);
        } else {
            response.json(candidate);
        }
    });
});

module.exports = router;
