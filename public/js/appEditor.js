var app = angular.module('MDQMaps', ['ui.router', 'uiGmapgoogle-maps', 'ngResource', 'ngStorage', 'ngTagsInput', 'ui.bootstrap', 'services'])
    .config(function ($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state("home", {
                url: "/home"
            });
        $urlRouterProvider.otherwise('/home');
    });

/**
 * Mapa
 */
app.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDvT5MH70MLmBaSlKWwjeNrkOxSz9zwfLE',
        v: '3.22',
        libraries: 'weather,geometry,visualization'
    });
});

app.controller('MapController', MapController)
    .controller('EditorController', EditorController)
    .controller('SubItemModalController', SubItemModalController)
    .controller('SettingsController', SettingsController);