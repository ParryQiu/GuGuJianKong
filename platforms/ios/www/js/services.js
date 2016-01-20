angular.module('starter.services', [])

.factory('Websites', function($q, $http) {
    return {
        all: function($scope) {
            var d = $q.defer();
            var promise = d.promise;

            $http.jsonp("http://api.gugujiankong.com/website/GetMyWebsites?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    $scope.sites = data;
                    d.resolve(data);
                })
                .error(function(error) {
                    d.reject(error);
                });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return d.promise;
        },
        allTestSpeed: function($scope) {
            var d = $q.defer();
            var promise = d.promise;

            $http.jsonp("http://api.gugujiankong.com/website/GetAllSitesTestSpeed?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    $scope.testspeeddata = data;
                    d.resolve(data);
                })
                .error(function(error) {
                    d.reject(error);
                });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return d.promise;
        },
        allSearchEngine: function($scope) {
            var d = $q.defer();
            var promise = d.promise;

            $http.jsonp("http://api.gugujiankong.com/website/GetAllSitesSearchEngine?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    $scope.websitesearchengine = data;
                    d.resolve(data);
                })
                .error(function(error) {
                    d.reject(error);
                });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return d.promise;
        },
        add: function($scope) {
            //add new website
            var d = $q.defer();
            var promise = d.promise;

            $http.jsonp("http://api.gugujiankong.com/website/AddWebsite?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&url=" + $scope.data.siteurl + "&name=" + $scope.data.sitename + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    d.resolve(data);
                })
                .error(function(error) {
                    d.reject(error);
                });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return d.promise;
        },
        remove: function(allsites, site) {
            //执行数据库的删除
            var deferred = $q.defer();
            var promise = deferred.promise;
            //ajax请求
            $http.jsonp("http://api.gugujiankong.com/website/DeleteWebsite?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&siteId=" + site.SiteId + "&callback=JSON_CALLBACK")
                .success(function(response) {
                    //UI删除
                    allsites.splice(allsites.indexOf(site), 1);
                });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
        }
    };
})

.service('LoginService', function($q, $http) {

    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var loginResult = new Object();
            //ajax请求
            $http.jsonp("http://api.gugujiankong.com/account/Login?email=" + name + "&password=" + pw + "&callback=JSON_CALLBACK")
                .success(function(response) {
                    loginResult = response;
                    if (loginResult.LoginStatus == 1) {
                        localStorage.signtoken = loginResult.SignToken;
                        localStorage.userid = loginResult.UserId;

                        //设置客户端的别名，用于定向接收消息的推送
                        //window.plugins.jPushPlugin.setAlias("Client" + loginResult.UserId);

                        var arrayObj = new Array("Tags" + loginResult.UserId);
                        window.plugins.jPushPlugin.setTags(arrayObj);

                        //上传设备ID
                        //console.log("Begin - JPushPlugin:registrationID is " + data);
                        //window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);
                        //var onGetRegistradionID = function (data) {
                        //    try {
                        //        console.log("JPushPlugin:registrationID is " + data);
                        //        //ajax上传
                        //        $http.jsonp("http://api.gugujiankong.com/account/Uploadregistrationid?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&registrationid=" + data + "&callback=JSON_CALLBACK")
                        //            .success(function (response) {
                        //            });
                        //    }
                        //    catch (exception) {
                        //        console.log(exception);
                        //    }
                        //};
                        //console.log("End - JPushPlugin:registrationID is " + data);

                        deferred.resolve('Welcome ' + name + '!');
                    } else {
                        deferred.reject('Wrong credentials.');
                    }
                });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        register: function(email, name, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            //ajax请求
            $http.jsonp("http://api.gugujiankong.com/account/Register?email=" + email + "&username=" + name + "&password=" + password + "&callback=JSON_CALLBACK")
                .success(function(response) {
                    if (response == 1) {
                        deferred.resolve('register successfully');
                    } else {
                        deferred.reject('Wrong register info.');
                    }
                });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        resetpassword: function(email) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            //ajax请求
            $http.jsonp("http://api.gugujiankong.com/account/resetpassword?email=" + email + "&callback=JSON_CALLBACK")
                .success(function(response) {
                    if (response == 1) {
                        deferred.resolve('reset password successfully');
                    } else {
                        deferred.reject('Wrong request');
                    }
                });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        getsetting: function($scope) {
            var d = $q.defer();
            var promise = d.promise;
            //ajax请求
            $http.jsonp("http://api.gugujiankong.com/account/GetUserSetting?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    $scope.apppush.checked = data.AppPush;
                    $scope.smspush.checked = data.SmsPush;
                    $scope.phonepush.checked = data.PhonePush;
                    $scope.userphone = data.UserPhone;
                    $scope.data.userphone = data.UserPhone;
                    $scope.phonevalidated = data.PhoneValidated;
                    d.resolve(data);
                })
                .error(function(error) {
                    d.reject(error);
                });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return d.promise;
        },

        sendcode: function($scope, $ionicPopup) {
            var d = $q.defer();
            var promise = d.promise;
            //ajax请求
            $http.jsonp("http://api.gugujiankong.com/account/SendPhoneValidateCode?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&phone=" + $scope.data.userphone + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    if (data.SetPushStatus != 1) {
                        var confirmPopup = $ionicPopup.alert({
                            title: '推送设置',
                            template: data.SetPushStatusComment
                        });
                    };
                    d.resolve(data);
                })
                .error(function(error) {
                    var confirmPopup = $ionicPopup.alert({
                        title: '推送设置',
                        template: '验证码发送失败，请重试！'
                    });
                    d.reject(error);
                });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return d.promise;
        },

        finalbind: function($scope, $ionicPopup) {
            var d = $q.defer();
            var promise = d.promise;
            //ajax请求
            $http.jsonp("http://api.gugujiankong.com/account/FinalBind?userId=" + localStorage.userid + "&phone=" + $scope.data.userphone + "&code=" + $scope.data.code + "&signToken=" + localStorage.signtoken + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    if (data.SetPushStatus != 1) {
                        var confirmPopup = $ionicPopup.alert({
                            title: '推送设置',
                            template: data.SetPushStatusComment
                        });
                    };
                    d.resolve(data);
                })
                .error(function(error) {
                    var confirmPopup = $ionicPopup.alert({
                        title: '推送设置',
                        template: '手机号码绑定失败，请重试！'
                    });
                    d.reject(error);
                });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return d.promise;
        },
        switchnotify: function($scope, $ionicPopup, type) {
            var d = $q.defer();
            var promise = d.promise;
            var value;
            if (type == 1) {
                value = $scope.apppush.checked;
            }
            if (type == 2) {
                value = $scope.smspush.checked;
            }
            if (type == 3) {
                value = $scope.phonepush.checked;
            }
            //ajax请求
            $http.jsonp("http://api.gugujiankong.com/account/SetPush?userId=" + localStorage.userid + "&signToken=" + localStorage.signtoken + "&type=" + type + "&value=" + value + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    if (data.SetPushStatus != 1) {
                        var confirmPopup = $ionicPopup.alert({
                            title: '推送设置',
                            template: data.SetPushStatusComment
                        });
                    };
                    d.resolve(data);
                })
                .error(function(error) {
                    var confirmPopup = $ionicPopup.alert({
                        title: '推送设置',
                        template: '手机号码绑定失败，请重试！'
                    });
                    d.reject(error);
                });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return d.promise;
        }
    }
});
