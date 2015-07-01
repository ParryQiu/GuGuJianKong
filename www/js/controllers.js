angular.module('starter.controllers', [])

    .controller('WebSitesCtrl', function ($scope, Websites, $ionicLoading, $state, $cordovaNetwork) {
        if (localStorage.haslogin != 1) {
            $state.go("tab.account");
        }
        $ionicLoading.show({
            template: '数据加载中...'
        });

        Websites.all($scope).success(function (data) {
            $ionicLoading.hide();

        }).error(function (data) {
            //添加失败
            $ionicLoading.hide();
        });

        $scope.doRefresh = function () {
            Websites.all($scope);
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }

    })

    .controller('TestSpeedCtrl', function ($scope, Websites, $ionicLoading, $state) {

        if (localStorage.haslogin != 1) {
            $state.go("tab.account");
        }
        $ionicLoading.show({
            template: '数据加载中...'
        });

        Websites.allTestSpeed($scope).success(function (data) {
            $ionicLoading.hide();

        }).error(function (data) {
            //添加失败
            $ionicLoading.hide();
        });

        $scope.doRefresh = function () {
            Websites.allTestSpeed($scope);
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }

    })

    .controller('RegisterCtrl', function ($scope, $state, $ionicPopup, LoginService) {

        $scope.data = {};

        $scope.gotoaccount = function () {
            $state.go("tab.account");
        }

        $scope.register = function () {
            //注册功能
            //检测用户输入

            //判断空的输入
            var email = $scope.data.usermail;
            var name = $scope.data.username;
            var password = $scope.data.password;
            var passwordconfirm = $scope.data.passwordconfirm;
            if (checkMail(email)) {
                //检查密码长度和两次密码是否一致
                if (name == undefined || name == '') {
                    var alertPopup = $ionicPopup.alert({
                        title: '用户名不合法',
                        template: '请确认用户名不能为空！'
                    });
                }
                else if (password.length < 6) {
                    var alertPopup = $ionicPopup.alert({
                        title: '密码长度不合格',
                        template: '请确认密码长度不低于六位！'
                    });
                }
                else {
                    if (password != passwordconfirm) {
                        var alertPopup = $ionicPopup.alert({
                            title: '两次密码不一致',
                            template: '请确认两次输入的密码一致！'
                        });
                    }
                    else {
                        //提交api，进行注册功能
                        LoginService.register(email, $scope.data.username, $scope.data.password).success(function (data) {
                            //注册成功，提示一下用户
                            var alertPopup = $ionicPopup.alert({
                                title: '注册成功',
                                template: '恭喜您注册成功，快快登录体验咕咕监控吧！'
                            });
                            alertPopup.then(function (res) {
                                //用户点击确认登录后跳转
                                $state.go("tab.account");
                            });
                        });
                    }
                }
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: '邮箱错误',
                    template: '请检查您填写的邮箱地址是否正确！'
                });
            }
        };

        var checkMail = function (szMail) {
            var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            var bChk = szReg.test(szMail);
            return bChk;
        }
    })

    .controller('AboutCtrl', function ($scope, $state) {
        $scope.gotoaccount = function () {
            $state.go("tab.account");
        }
    })

    .controller('ResetPasswordCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, LoginService) {

        $scope.data = {};

        $scope.gotoaccount = function () {
            $state.go("tab.account");
        }

        $scope.resetpassword = function () {
            $ionicLoading.show({
                template: '服务器处理中...'
            });
            //请求API，重置密码
            var email = $scope.data.usermail;
            if (checkMail(email)) {
                LoginService.resetpassword(email).success(function (data) {
                    //注册成功，提示一下用户
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '重置密码',
                        template: '发送成功，请登录邮箱点击链接重置密码！'
                    });
                    alertPopup.then(function (res) {
                        //用户点击确认登录后跳转
                        $state.go("tab.account");
                    });
                });
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: '邮箱错误',
                    template: '请检查您填写的邮箱地址是否正确！'
                });
            }
        };

        var checkMail = function (szMail) {
            var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            var bChk = szReg.test(szMail);
            return bChk;
        }
    })

    .controller('SearchEngineCtrl', function ($scope, Websites, $ionicLoading, $state) {

        if (localStorage.haslogin != 1) {
            $state.go("tab.account");
        }
        $ionicLoading.show({
            template: '数据加载中...'
        });

        Websites.allSearchEngine($scope).success(function (data) {
            $ionicLoading.hide();

        }).error(function (data) {
            //添加失败
            $ionicLoading.hide();
        });

        $scope.doRefresh = function () {
            Websites.allSearchEngine($scope);
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }


    })

    .controller('AccountCtrl', function ($scope, LoginService, $ionicPopup, $state, Websites, $ionicLoading, $window, $ionicPlatform) {

        $scope.data = {};

        if (localStorage.haslogin == 1) {
            $ionicLoading.show({
                template: '数据加载中...'
            });

            Websites.all($scope).success(function (data) {
                $ionicLoading.hide();
                $("#notLogin").hide();
                $("#hasLogon").show();

            }).error(function (data) {
                //添加失败
                $ionicLoading.hide();
            });
        }
        else {
            $("#hasLogon").hide();
            $("#notLogin").show();
        }

        $scope.remove = function (site) {
            var confirmPopup = $ionicPopup.confirm({
                title: '删除网站',
                template: '确认删除您选定的监控网站吗？'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    Websites.remove($scope.sites, site).success(function (data) {


                    }).error(function (data) {
                    });
                } else {

                }
            });
        }

        $scope.login = function () {
            LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
                //登录成功
                localStorage.haslogin = 1;
                //$window.location.reload(true);
                $ionicLoading.show({
                    template: '数据加载中...'
                });

                Websites.all($scope).success(function (data) {
                    $ionicLoading.hide();
                    $("#notLogin").hide();
                    $("#hasLogon").show();

                }).error(function (data) {
                    //添加失败
                    $ionicLoading.hide();
                });

            }).error(function (data) {
                localStorage.haslogin = 0
                var alertPopup = $ionicPopup.alert({
                    title: '登录失败',
                    template: '请检查您填写的登陆信息！'
                });
            });
        }

        $scope.forget = function () {
            //进行API提交后，发送邮件，发送成功后，进行alert提醒
            $state.go('resetpassword');
        }

        $scope.goregister = function () {
            $state.go('register');
        }

        $scope.logout = function () {
            localStorage.haslogin = 0;
            $state.go($state.current);
            $("#hasLogon").hide();
            $("#notLogin").show();
            $scope.data.username = "";
            $scope.data.password = "";
        }

        $scope.addwebsite = function () {
            $scope.data = {}
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.siteurl" placeholder="监控网站Url">' +
                '<input type="text" ng-model="data.sitename" placeholder="监控网站昵称（可选）" class="margintop">',
                title: '新增监控网站',
                scope: $scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '<b>保存</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.siteurl) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                $ionicLoading.show({
                                    template: '服务器解析中...'
                                });
                                Websites.add($scope).success(function (data) {
                                    //添加成功
                                    //刷新自身
                                    $state.go('tab.websites');
                                    $ionicLoading.hide();

                                }).error(function (data) {
                                    //添加失败
                                    $ionicLoading.hide();
                                });

                                myPopup.close();
                            }
                        }
                    }
                ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
        };

        $scope.feedback = function () {
            if (window.plugins && window.plugins.emailComposer) {
                window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {

                    },
                    "给咕咕监控的建议", // Subject
                    "",                      // Body
                    ["feedback@gugujiankong.com"],    // To
                    null,                    // CC
                    null,                    // BCC
                    false,                   // isHTML
                    null,                    // Attachments
                    null);                   // Attachment Data
            }
        };

        $scope.rateus = function () {
            console.log("rate click");
            if ($ionicPlatform.isIOS) {
                window.open('itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id511364723?ls=1&mt=8'); // or itms://
            } else if ($ionicPlatform.isAndroid) {
                window.open('market://details?id=<package_name>');
            }
        };

        $scope.aboutus = function () {
            $state.go('about');
        };
    });

