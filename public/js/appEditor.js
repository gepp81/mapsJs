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
        key: 'AIzaSyBb-EXwVmr9P5X_z3Q4Fr_AR_JrvhIABjo',
        v: '3.23',
        libraries: 'weather,geometry,visualization'
    });
});

app.controller('MapController', MapController)
    .controller('EditorController', EditorController)
    .controller('SubItemModalController', SubItemModalController)
    .controller('SettingsController', SettingsController);
