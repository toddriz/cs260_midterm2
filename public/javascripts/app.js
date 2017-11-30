angular.module('shop', []).controller('MainCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.items = [];
        $scope.selectedItems = [];
        $scope.itemsInCart = [];
        

        $scope.getItems = function() {
            return $http.get('/items').success(data => {
                angular.copy(data, $scope.items);
            });
        };

        $scope.getItems();

        $scope.create = function(item) {};

        $scope.addItem = function() {
            var newItem = { name: $scope.newItemName, price: $scope.newItemPrice, imageUrl: $scope.newItemImageUrl, numberOrdered: 0 };
            return $http.post('/item', newItem).success(data => {
                $scope.items.push(data);
                $scope.newItemName = '';
                $scope.newItemPrice = 0;
                $scope.newItemImageUrl = '';
            });
        };

        $scope.deleteItem = function(item) {
            console.log('Deleting Name ' + item.name + ' ID ' + item._id);
            $http.delete(`/item/${item._id}`).success(data => {
                console.log('deleted ', item);
                $scope.getItems();
            });
        };

        $scope.addItemToSelectedItems = function(itemChecked) {
            console.log('in add item to Seelcter', itemChecked);
            if(!$scope.selectedItems.includes(itemChecked)){
                console.log('item added');
                $scope.selectedItems.push(itemChecked);
            } else {
                console.log('item removed');                
                $scope.selectedItems = $scope.selectedItems.filter(item => {
                    return itemChecked.name !== item.name;
                });
            }   
        }

        $scope.submitPurchase = function() {
            $scope.selectedItems.forEach(item => {
                return $http.put(`/item/${item._id}/order`).success(data => {
                    console.log(data);
                    $scope.itemsInCart.push(item);
        
                });
            });
        }

        // $scope.voteFor = function(candidate) {
        //     return $http.put(`/candidate/${candidate._id}/vote`).success(data => {
        //         console.log('vote added for,', candidate);
        //         candidate.votes += 1;
        //     });
        // };

    }
]);
