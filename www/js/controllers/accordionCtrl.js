'use strict';
angular.module('checkout').controller('accordionCtrl', ['$scope', '$state', 'usersSvc', accordionCtrl]);

function accordionCtrl($scope, $state, usersSvc) {

    $scope.profile = {};
    $scope.profile.basicInfo = {};
    $scope.profile.education = {};
    $scope.profile.work = {};
    $scope.profile.relationship = {};
    $scope.profile.interests = {};
    $scope.profile.basicInfo.isExpanded = false;
    $scope.profile.education.isExpanded = false;
    $scope.profile.work.isExpanded = false;
    $scope.profile.relationship.isExpanded = false;
    $scope.profile.interests.isExpanded = false;

    usersSvc.getUserDetail().then(function (response) {
        $scope.profile = response.profile;
    }, function (error) {
        console.log("Not able to get profile " + error);
    });

    var groupName = Object.freeze({
        "BasicInfo": 0,
        "Education": 1,
        "Work": 2,
        "RelationShip": 3,
        "Interests": 4
    });

    function collapseAll() {
        $scope.profile.basicInfo.isExpanded = $scope.profile.education.isExpanded = $scope.profile.work.isExpanded = $scope.profile.relationship.isExpanded = $scope.profile.interests.isExpanded = false;
    }

    $scope.expandGroup = function (group) {
        collapseAll();
        switch (group) {
            case groupName.BasicInfo:
                $scope.profile.basicInfo.isExpanded = !$scope.profile.basicInfo.isExpanded;
                break;
            case groupName.Education:
                $scope.profile.education.isExpanded = !$scope.profile.education.isExpanded;
                break;
            case groupName.Work:
                $scope.profile.work.isExpanded = !$scope.profile.work.isExpanded;
                break;
            case groupName.RelationShip:
                $scope.profile.relationship.isExpanded = !$scope.profile.relationship.isExpanded;
                break;
            case groupName.Interests:
                $scope.profile.interests.isExpanded = !$scope.profile.interests.isExpanded;
                break;
            default:
                break;
        }
    };

    $scope.save = function (profile) {
        usersSvc.updateUserProfile(profile).then(function (response) {
            $scope.profile = response.profile;
        }, function (error) {
            console.log("Updating profile failed " + error);
        });
    };

    $scope.cancel = function () {
        $state.go("app.users");
    };

};