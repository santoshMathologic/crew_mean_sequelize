angular.module('matApp').directive('upload', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/Uploads/uploads.tmpl.html',
        controller: function ($scope, $state, $window, uploadService, $document, testService, Upload, $location, toaster, $timeout, $http, $resource) {



            $scope.uploadList = [];
            $scope.userdetails = [];
            $scope.user = {};
            $scope.uploadObject = {};
            $scope.upload = {};
            $scope.chooseItems = {
                "TrainDetails": "TrainDetails",
                "TrainStation": "TrainStation",

            }

            /**
             * 
             *    We can define Enum data type in this way 
             *  */

            const State = {
                BP_Main: 10,
                BP_Col: 20,
                BP_ExCol: 30
            }
            // usage
            if (30 === State.BP_ExCol) {
                console.log("" + State.BP_ExCol);
            }


            $scope.getUploads = function () {
                uploadService.getUpload.then(function (data) {
                    $scope.uploadList = data;
                });

            }
            $scope.getUploads();

            $scope.getUploadsById = function (uploadId) {

                $scope.userdetails = testService.get({ id: uploadId });
                $scope.userdetails.$promise.then(function (response) {
                    $scope.user = response.results;
                });
            }


            $scope.Iserror = false;
            $scope.checkFileType = function (files) {
                $scope.Iserror = false;
                var fileExtension = files[0].name.split('.')[files[0].name.split('.').length - 1].toLowerCase();
                if (fileExtension !== "csv") {
                    alert("Please choose csv Type files ");
                    $scope.Iserror = true;
                } else {
                    $scope.Iserror = false;
                }


            };

            $scope.processUpload = function (file) {
                var fileName = file.name;
                var fileExtension = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();

                Upload.upload({
                    url: "http://localhost:3000/api/v1/upload/createUpload",
                    data: { file: file, name: 'file', dataType: $scope.uploadObject.chooseItems, fileType: fileExtension, username: "SANTOSH", description: $scope.uploadObject.description, status: $scope.uploadObject.description }
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name);



                }, function (resp) {
                    //console.log('Error status: ' + resp.status);
                }, function (evt) {
                    //$scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);

                });


                console.log(file);
            };

            $scope.saveUpload = function () {
                if ($scope.form.file.$valid && $scope.file) {
                    $scope.processUpload($scope.file);
                }

            }




            $scope.processed_trainStation_traindetails = function (upload) {
                var apiUrl = "http://localhost:3000/api/v1/upload/process/" + upload._id + "/" + upload.dataType;
                $http.post(apiUrl)
                    .then(function (response) {
                        console.log(response);
                        if (response.data.status == 200) {

                            toaster
                                .pop({
                                    type: 'success',
                                    title: response.data.message,
                                    body: response.data.message
                                });
                        }

                    });

                console.log(upload);
            }




            $scope.remove = function (upload) {
                if (upload != null) {
                    $scope.uploadList.splice($scope.uploadList.indexOf(upload), 1);
                    toaster
                        .pop({
                            type: 'success',
                            title: 'Removed  Succcessfully',
                            body: 'Removed Succcessfully.'
                        });

                } else {
                    toaster
                        .pop({
                            type: 'error',
                            title: 'Unable to Removed',
                            body: 'Unable to Removed.'
                        });
                }

            }

            $scope.countChar = function (val) {

                var max = 500;
                // var len = val.value.length;
                var len = $scope.uploadObject.description.length;
                if (len >= max) {

                    document.getElementById("charNum").innerHTML = " you have reached the limit";
                } else {
                    var char = max - len;
                    document.getElementById("charNum").innerHTML = char + " characters left";
                    //angular.element(document.querySelector('[id="charNum"]'));
                }


            }




        }

    }
}]);