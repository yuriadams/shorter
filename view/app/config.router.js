'use strict';
angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/app/main');

                $stateProvider.state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/layout.html'
                    })
                    .state('app.main', {
                        url: '/main',
                        templateUrl: 'views/application/main.html',
                        controller: 'MainCtrl'
                    })
            }
        ]
    );
