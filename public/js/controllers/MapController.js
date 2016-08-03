function MapController($scope, $localStorage, $filter, $location, uiGmapGoogleMapApi, Autocomplete, SICRResource) {

    var LOCATION_TAG_NAME = "Mi Ubicación";
    var ORANGE = "orange",
        GREY = "grey",
        GREEN = "green",
        BLUE = "blue";
    var CATEGORY = "Categoria",
        ITEM = "Item";
    var CENTER_MDQ = {
        latitude: -38.000404,
        longitude: -57.556197
    };

    $scope.selectedItems = [];

    /**
     * Vacia las listas con las categorias obtenidas y todos los items almacenados
     */
    $scope.clearList = function () {
        $scope.selectedItems = [];
        $scope.markersResult = [];
        $scope.removeUserMarker();
        $scope.location.active = false;
        $localStorage.location.active = $scope.location.active;
    }

    $scope.menuOpen = false;
    $scope.menuMiniLocation = false;

    $scope.map = {};

    /**
     * Recuper los valores almacenados del auto location desde Storage.
     * Sino setea los valores por defecto.
     */
    $localStorage.location = $localStorage.location === undefined ? {
        radius: 500,
        active: false,
        menu: false
    } : $localStorage.location;

    $scope.location = {
        radius: $localStorage.location.radius,
        active: $localStorage.location.active,
        menu: $localStorage.location.menu
    }

    /**
     * Crea el mapa inicial
     * @method
     * @param {Object} function
     * @return {Object}
     */
    uiGmapGoogleMapApi.then(function (maps) {
        $scope.map = {
            center: CENTER_MDQ,
            zoom: 16,
            options: {
                scrollwheel: true,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            },
            control: {},
        };

        // Crea el marcador para la localizacion dle usuario, pero no es visible pq no tiene coords
        $scope.marker = {
            id: 0,
            options: {
                icon: $location.path() + '/img/personMarker.svg'
            }
        };

        // Crea un arreglo con los marcadores vacios.
        $scope.markersResult = [];

    });

    /**
     * Verifica si una lista tiene items
     * @param {Object} list
     * @return {Object}
     */
    $scope.hasListItem = function (list) {
        return list.length > 0 ? true : false;
    }

    /**
     * Recupera las categorias y los items para el autocomplete
     * @param {Object} query
     * @return {Object}
     */
    $scope.getAutocomplete = function (query) {
        return Autocomplete.get({
            name: query
        }).$promise.then(function (result) {
            return result;
        });
    };

    /**
     * Recupera el comentario del UiType
     * SIN USO POR AHORA
     * @param {Object} chip
     * @return {Object}
     */
    $scope.getUiTypeName = function (chip) {
        switch (chip.uiType) {
        case 1:
            return "(" + CATEGORY + ")";
        case 3:
            return "(" + ITEM + ")";
        default:
            return ""
        }
    }

    /**
     * Recupera el color del UiType
     * SIN USO POR AHORA
     * @param {Object} chip
     * @return {Object}
     */
    $scope.getUiTypeColor = function (chip) {
        switch (chip.uiType) {
        case 1:
            return GREEN;
        case 2:
            return ORANGE;
        case 3:
            return BLUE;
        default:
            return GREY;
        }
    }

    /**
     * SIN USO POR AHORA
     * Devuelve el comentario y el color del chip segun el tipo del mismo.
     * @param {Object} chip
     * @return {Object}
     */
    $scope.getChipInfo = function (chip) {
        return {
            color: $scope.getUiTypeColor(chip),
            comment: $scope.getUiTypeName(chip)
        };
    }

    /**
     * Agrega informacion al chip para mostrar en la lista de tags.
     * @param {Object} chip
     * @return {Object}
     */
    $scope.transformChip = function (chip) {
        if (angular.isObject(chip)) {
            //chip.info = $scope.getChipInfo(chip);
            return true;
        }
        return null;
    }

    /**
     * Remueve la coordenadas de la ubicacion
     */
    $scope.removeUserMarker = function () {
        if ($scope.marker) {
            $scope.marker.coords = null;
        }
    }

    /**
     * Verifica si el chip a remover es del tipo posicion. Si es, desactiva la busqueda por posicion.
     * @param {Object} chip Es el item que se agrega
     * @return {Object} chip
     */
    $scope.removeChip = function (chip) {
        if (chip.uiType = 2) {
            $scope.location.active = false;
            $localStorage.location.active = false;
            $scope.removeUserMarker();
        }
        return true;
    }

    // GEOLOCATION
    /**
     * Recupera la posicion del usuario
     */
    $scope.processLocation = function (positionUser) {
        $scope.map.center = {
            latitude: positionUser.coords.latitude,
            longitude: positionUser.coords.longitude
        };

        var position = {
            lat: positionUser.coords.latitude,
            lon: positionUser.coords.longitude,
            radius: $scope.location.radius,
            name: LOCATION_TAG_NAME,
            uiType: 2,
            color: ORANGE
        };

        $scope.transformChip(position);
        $scope.selectedItems.push(position);
        $scope.$apply();

        $scope.marker.coords = {
            latitude: positionUser.coords.latitude,
            longitude: positionUser.coords.longitude
        }

        $scope.search();
    }

    $scope.processErrorLocation = function () {
        alert("El dispositivo no acepta GeoLocation.");
    }

    $scope.getGeolocation = function () {
        navigator.geolocation.getCurrentPosition($scope.processLocation, $scope.processErrorLocation, {
            timeout: 5000,
            enableHighAccuracy: false,
            maximumAge: 60000
        });
    }

    //Tracking users position
    /*    navigator.geolocation.watchPosition($scope.processLocation, $scope.processErrorLocation, {
            timeout: 5000,
            enableHighAccuracy: true,
            maximumAge: 60000
        });*/

    $scope.activateGeolocation = function () {
        $localStorage.location.active = $scope.location.active;
        $localStorage.location.radius = $scope.location.radius;
        if ($scope.location.active) {
            $scope.getGeolocation();
        } else {
            $scope.removeUserMarker();
            $scope.selectedItems = $filter('filter')($scope.selectedItems, {
                uiType: '!2'
            });
        }
    }

    $scope.changeMeters = function () {
        $scope.item = $filter('filter')($scope.selectedItems, {
            uiType: '2'
        })[0];
        if ($scope.item) {
            $scope.item.radius = $scope.location.radius;
            $scope.search();
        }
    }

    // Menu

    $scope.setLocationMenuVisibility = function (value) {
        $scope.location.menu = value;
        $localStorage.location.menu = value;
    }

    // Llamadas de búsqueda

    $scope.onClick = function (marker, eventName, model) {
        console.log("Clicked!");
        model.show = !model.show;
    };

    /** Hace el get de items o subitems **/
    $scope.search = function () {
        var categories = $filter('filter')($scope.selectedItems, {
            uiType: '1'
        });
        var items = $filter('filter')($scope.selectedItems, {
            uiType: '3'
        });
        var location = $filter('filter')($scope.selectedItems, {
            uiType: '2'
        })[0];

        var catIds = [];
        for (var i = 0; i < categories.length; i++) {
            catIds.push(categories[i].id);
        }
        var itemIds = [];
        for (var i = 0; i < items.length; i++) {
            itemIds.push(items[i].id);
        }
        SICRResource.getAll({
            circle: location,
            idsCategories: catIds,
            idsItems: itemIds
        }, function (data) {
            for (var item in data) {
                var namesCats = new Array();
                for (var catKey in data[item].categories)
                    namesCats.push(data[item].categories[catKey].name);
                data[item].categories = namesCats.join(', ');
            }
            $scope.markersResult = data;
        }, function (err) {
            console.log(err);
        });
    }

    // Se ejecuta si el usuario tenia configurada la geopos en una anterior visita
    angular.element(document).ready(function () {
        if ($scope.location.active) {
            $scope.activateGeolocation();
        }
    });

}
