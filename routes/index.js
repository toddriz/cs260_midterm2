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
        if (error) { return next(error); }
        else {
            response.json(candidates);
        }
    });
});

// Add Candidate
router.post('/candidate', (request, response, next) => {
    const candidate = new candidate(request.body);
    candidate.save((error, candidate) => {
        if (error) {
            return next(error);
        } else {
            response.json(candidate);
        }
    });
});

// Delete Candidate
router.delete('/candidate/:candidate', function (req, res) {
    console.log("in Delete");
    req.candidate.remove();
    res.sendStatus(200);
  });

router.get('/candidates/:candidate', (request, response) => {
    response.json(request.candidate);
});

router.put('/candidates/:candidate/vote', (request, response, next) => {
    request.candidate.vote(function (error, candidate) {
        if (error) {
            return next(error);
        } else {
            response.json(candidate);
        }
    });
});

module.exports = router;
