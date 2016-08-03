function SettingsController($scope, $mdDialog, $mdToast, $localStorage) {

    var ERROR_LOCATION = 'Su navegador no soporta la localización.';

    $scope.radius = $localStorage.radius !== undefined ? $localStorage.radius : 500;
    $scope.active = $localStorage.active !== undefined ? $localStorage.active : false;
    $scope.position = $localStorage.position !== undefined ? $localStorage.position : undefined;

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        var response = {
            active: $scope.active,
            radius: $scope.radius,
            lat: $scope.position.coords.latitude,
            lon: $scope.position.coords.longitude
        }
        $mdDialog.hide(response);
    };

    /**
     * Verifica si el navegador acepta geolocation
     */
    $scope.activateGeolocation = function(active) {
        if (active) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.position = position;
                    $localStorage.position = position;
                    $localStorage.active = true;
                    $localStorage.radius = $scope.radius;
                });
            } else {
                $scope.active = false;
                $scope.showSimpleToast();
            }
        }
    }

    $scope.getLocationLabel = function() {
        if ($scope.active) {
            return 'Activado';
        }
        return 'Desactivado';
    }

    // ------------------------------------------
    // Toast que muestra si falla la localizacion
    // ------------------------------------------
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
            .filter(function(pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }

    $scope.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent(ERROR_LOCATION)
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
    };
}