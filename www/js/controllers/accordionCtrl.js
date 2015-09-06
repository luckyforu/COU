'use strict';
angular.module('checkout').controller('accordionCtrl', ['$scope', '$state', 'usersSvc', accordionCtrl]);

function accordionCtrl($scope, $state, usersSvc) {

    function defaultProfile() {
        $scope.profile = {};
        $scope.profile.basicInfo = {};
        $scope.profile.education = {};
        $scope.profile.work = {};
        $scope.profile.relationship = {};
        $scope.profile.interests = {};
        $scope.profile.status = {};
        $scope.profile.basicInfo.isExpanded = false;
        $scope.profile.education.isExpanded = false;
        $scope.profile.work.isExpanded = false;
        $scope.profile.relationship.isExpanded = false;
        $scope.profile.interests.isExpanded = false;
        $scope.profile.status.isExpanded = false;
    }
    defaultProfile();

    usersSvc.getMyDetails().then(function (response) {
        if (response && response.profile) {
            $scope.profile = response.profile;
        }
        else {
            defaultProfile();
        }
    }, function (error) {
        console.log("Not able to get profile " + error);
    });

    var groupName = Object.freeze({
        "BasicInfo": 0,
        "Education": 1,
        "Work": 2,
        "RelationShip": 3,
        "Interests": 4,
        "Status": 5
    });

    function collapseAll() {
        ($scope.profile.basicInfo.isExpanded =
        $scope.profile.education.isExpanded =
        $scope.profile.work.isExpanded =
        $scope.profile.relationship.isExpanded =
        $scope.profile.interests.isExpanded =
        $scope.profile.status.isExpanded = false);
    }

    function collapseExceptBasicInfo() {
        ($scope.profile.education.isExpanded =
        $scope.profile.work.isExpanded =
        $scope.profile.relationship.isExpanded =
        $scope.profile.interests.isExpanded =
        $scope.profile.status.isExpanded = false);
    }

    function collapseExceptEducation() {
        ($scope.profile.basicInfo.isExpanded =
        $scope.profile.work.isExpanded =
        $scope.profile.relationship.isExpanded =
        $scope.profile.interests.isExpanded =
        $scope.profile.status.isExpanded = false);
    }

    function collapseExceptWork() {
        ($scope.profile.basicInfo.isExpanded =
        $scope.profile.education.isExpanded =
        $scope.profile.relationship.isExpanded =
        $scope.profile.interests.isExpanded =
        $scope.profile.status.isExpanded = false);
    }

    function collapseExceptRelationship() {
        ($scope.profile.basicInfo.isExpanded =
        $scope.profile.education.isExpanded =
        $scope.profile.work.isExpanded =
        $scope.profile.interests.isExpanded =
        $scope.profile.status.isExpanded = false);
    }

    function collapseExceptInterest() {
        ($scope.profile.basicInfo.isExpanded =
        $scope.profile.education.isExpanded =
        $scope.profile.work.isExpanded =
        $scope.profile.relationship.isExpanded =
        $scope.profile.status.isExpanded = false);
    }

    function collapseExceptStatus() {
        ($scope.profile.basicInfo.isExpanded =
        $scope.profile.education.isExpanded =
        $scope.profile.work.isExpanded =
        $scope.profile.relationship.isExpanded =
        $scope.profile.interests.isExpanded = false);
    }

    $scope.expandGroup = function (group) {
        switch (group) {
            case groupName.BasicInfo:
                $scope.profile.basicInfo.isExpanded = !$scope.profile.basicInfo.isExpanded;
                collapseExceptBasicInfo();
                break;
            case groupName.Education:
                $scope.profile.education.isExpanded = !$scope.profile.education.isExpanded;
                collapseExceptEducation();
                break;
            case groupName.Work:
                $scope.profile.work.isExpanded = !$scope.profile.work.isExpanded;
                collapseExceptWork();
                break;
            case groupName.RelationShip:
                $scope.profile.relationship.isExpanded = !$scope.profile.relationship.isExpanded;
                collapseExceptRelationship();
                break;
            case groupName.Interests:
                $scope.profile.interests.isExpanded = !$scope.profile.interests.isExpanded;
                collapseExceptInterest();
                break;
            case groupName.Status:
                $scope.profile.status.isExpanded = !$scope.profile.status.isExpanded;
                collapseExceptStatus();
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