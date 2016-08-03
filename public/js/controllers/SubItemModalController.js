function SubItemModalController($scope, $modalInstance, subItemToEdit, Autocomplete) {
    $scope.subItemToEdit = angular.copy(subItemToEdit.model);

    /**
     * Recupera las categorias y los items para el autocomplete
     * @param {Object} query
     * @return {Object}
     */
    $scope.getAutocomplete = function (query) {
        return Autocomplete.get({
            text: query
        }).$promise.then(function (result) {
            return result;
        });
    };

    $scope.ok = function() {
        $modalInstance.close($scope.subItemToEdit);
    }

    $scope.cancel = function() {
        $modalInstance.dismiss(subItemToEdit.model);
    }

    $scope.confirmRemove = function() {
        $modalInstance.close(true);
    }
}
