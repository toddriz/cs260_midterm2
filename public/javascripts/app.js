angular.module('vote', []).controller('MainCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.candidates = [];
        $scope.ballot = [];

        $scope.getCandidates = function() {
            return $http.get('/candidates').success(data => {
                angular.copy(data, $scope.candidates);
            });
        };

        $scope.getCandidates();

        $scope.create = function(candidate) {};

        $scope.addCandidate = function() {
            var newCandidate = { name: $scope.newCandidateName, votes: 0 };
            return $http.post('/candidate', newCandidate).success(data => {
                $scope.candidates.push(data);
                $scope.newCandidateName = '';
            });
        };

        $scope.deleteCandidate = function(candidate) {
            console.log('Deleting Name ' + candidate.name + ' ID ' + candidate._id);
            $http.delete(`/candidate/${candidate._id}`).success(data => {
                console.log('deleted ', candidate);
                $scope.getCandidates();
            });
        };

        $scope.voteFor = function(candidate) {
            return $http.put(`/candidate/${candidate._id}/vote`).success(data => {
                console.log('vote added for,', candidate);
                candidate.votes += 1;
            });
        };

    }
]);
