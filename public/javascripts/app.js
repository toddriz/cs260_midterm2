angular.module('candidate', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        ($scope, $http) => {
            $scope.candidates = [];

            $scope.addCandidate = function() {
                let newCandidate = { name: $scope.newCandidateName, votes: 0 };
                $scope.newCandidateName = '';
                $http.post('/candidate', newCandidate).success((response) => {
                    $scope.candidates.push(response);
                });
            };

            $scope.addCandidate = function(candidateToDelete) {
                
                $http.delete('/candidate', candidateToDelete).success((response) => {
                    $scope.candidates = $scope.candidates.filter((candidate) => {
                        return candidate._id !== candidateToDelete._id;
                    });
                });
            };


            $scope.voteFor = function(candidate) {
                return $http.put(`/candidate/${candidate._id}/vote`)
                    .success((response) => {
                        candidate.votes = response.votes;
                    });
            };

            $scope.incrementUpvotes = function (candidate) {
                $scope.upvote(candidate);
            };

            $scope.getAllCandidates = function() {
                return $http.get('/candidates').success((response) => {
                    angular.copy(response, $scope.candidates);
                });
            };
        }
    ]);
