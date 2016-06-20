angular.module('starter.controllers', [])

.controller('WebSitesCtrl', function($scope, Websites, $ionicLoading, $state, $cordovaNetwork) {

    if (localStorage.haslogin != 1) {
        $state.go("tab.account");
    } else {
        //注意：下面都注释掉了遮罩层，因为设备加载的时候，短暂的遮罩层就想一个短暂的黑屏一样，体验不好。
        $ionicLoading.show({
            template: '数据加载中...'
        });

        Websites.all($scope).success(function(data) {
            $ionicLoading.hide();

        }).error(function(data) {
            //添加失败
            $ionicLoading.hide();
        });

        $scope.doRefresh = function() {
            Websites.all($scope);
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }
    }

})

.controller('TestSpeedCtrl', function($scope, Websites, $ionicLoading, $state) {

    if (localStorage.haslogin != 1) {
        $state.go("tab.account");
    }
    $ionicLoading.show({
        template: '数据加载中...'
    });

    Websites.allTestSpeed($scope).success(function(data) {
        $ionicLoading.hide();

    }).error(function(data) {
        //添加失败
        $ionicLoading.hide();
    });

    $scope.doRefresh = function() {
        Websites.allTestSpeed($scope);
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    }

})

.controller('RegisterCtrl', function($scope, $state, $ionicPopup, LoginService, $ionicLoading) {

    $scope.data = {};

    $scope.gotoaccount = function() {
        $state.go("tab.account");
    }

    $scope.register = function() {
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
            } else if (password == undefined || passwordconfirm == undefined) {
                var alertPopup = $ionicPopup.alert({
                    title: '密码长度不合格',
                    template: '请确认密码长度不低于六位！'
                });
            } else if (password.length < 6) {
                var alertPopup = $ionicPopup.alert({
                    title: '密码长度不合格',
                    template: '请确认密码长度不低于六位！'
                });
            } else {
                if (password != passwordconfirm) {
                    var alertPopup = $ionicPopup.alert({
                        title: '两次密码不一致',
                        template: '请确认两次输入的密码一致！'
                    });
                } else {
                    $ionicLoading.show({
                        template: '注册中...'
                    });
                    //提交api，进行注册功能
                    LoginService.register(email, $scope.data.username, $scope.data.password).success(function(data) {
                        console.log(data);
                        //注册成功，提示一下用户

                        $ionicLoading.hide();

                        var alertPopup = $ionicPopup.alert({
                            title: '注册成功',
                            template: '恭喜您注册成功，快快登录使用吧！'
                        });
                        alertPopup.then(function(res) {
                            //用户点击确认登录后跳转
                            $state.go("tab.account");
                        })
                    }).error(function(data) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: '注册失败',
                            template: '输入的邮箱已注册过，请修改后注册！'
                        })
                    });

                }
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '邮箱错误',
                template: '请检查您填写的邮箱地址是否正确！'
            });
        }
    };

    var checkMail = function(szMail) {
        //var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var szReg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,4}$/;;
        var bChk = szReg.test(szMail);
        return bChk;
    }
})

.controller('AboutCtrl', function($scope, $state) {
    $scope.gotoaccount = function() {
        $state.go("tab.account");
    }
})

.controller('ResetPasswordCtrl', function($scope, $state, $ionicPopup, $ionicLoading, LoginService) {

    $scope.data = {};

    $scope.gotoaccount = function() {
        $state.go("tab.account");
    }

    $scope.resetpassword = function() {
        //请求API，重置密码
        var email = $scope.data.usermail;
        if (checkMail(email)) {
            $ionicLoading.show({
                template: '服务器处理中...'
            });
            LoginService.resetpassword(email).success(function(data) {
                //注册成功，提示一下用户
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: '重置密码',
                    template: '发送成功，请登录邮箱点击链接重置密码！'
                });
                alertPopup.then(function(res) {
                    //用户点击确认登录后跳转
                    $state.go("tab.account");
                });
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '邮箱错误',
                template: '请检查您填写的邮箱地址是否正确！'
            });
        }
    };

    var checkMail = function(szMail) {
        var szReg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,4}$/;;
        var bChk = szReg.test(szMail);
        return bChk;
    }
})

.controller('SearchEngineCtrl', function($scope, Websites, $ionicLoading, $state) {

    if (localStorage.haslogin != 1) {
        $state.go("tab.account");
    }
    $ionicLoading.show({
        template: '数据加载中...'
    });

    Websites.allSearchEngine($scope).success(function(data) {
        $ionicLoading.hide();

    }).error(function(data) {
        //添加失败
        $ionicLoading.hide();
    });

    $scope.doRefresh = function() {
        Websites.allSearchEngine($scope);
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.series = ['百度收录', '360搜索收录'];

    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];


})

.controller('AccountCtrl', function($scope, LoginService, $ionicPopup, $state, Websites, $ionicLoading, $window, $ionicPlatform) {

    $scope.data = {};

    if (localStorage.haslogin == 1) {
        $state.go("tab.accountlistitem");
    }

    $scope.remove = function(site) {
        var confirmPopup = $ionicPopup.confirm({
            title: '删除网站',
            template: '确认删除您选定的监控网站吗？'
        });
        confirmPopup.then(function(res) {
            if (res) {
                Websites.remove($scope.sites, site).success(function(data) {


                }).error(function(data) {});
            } else {

            }
        });
    }

    $scope.login = function() {

        $ionicLoading.show({
            template: '登录中...'
        });

        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            //登录成功
            localStorage.haslogin = 1;
            $ionicLoading.hide();
            $state.go("tab.accountlistitem");

        }).error(function(data) {
            $ionicLoading.hide();
            localStorage.haslogin = 0
            var alertPopup = $ionicPopup.alert({
                title: '登录失败',
                template: '请检查您填写的登陆信息！'
            });
        });
    }

    $scope.forget = function() {
        //进行API提交后，发送邮件，发送成功后，进行alert提醒
        $state.go('resetpassword');
    }

    $scope.goregister = function() {
        $state.go('register');
    }


    //$scope.feedback = function () {
    //    if (window.plugins && window.plugins.emailComposer) {
    //        window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
    //
    //            },
    //            "给咕咕监控的建议", // Subject
    //            "",                      // Body
    //            ["feedback@gugujiankong.com"],    // To
    //            null,                    // CC
    //            null,                    // BCC
    //            false,                   // isHTML
    //            null,                    // Attachments
    //            null);                   // Attachment Data
    //    }
    //};

    //$scope.rateus = function () {
    //    if ($ionicPlatform.isIOS) {
    //        window.open('itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id511364723?ls=1&mt=8'); // or itms://
    //    } else if ($ionicPlatform.isAndroid) {
    //        window.open('market://details?id=<package_name>');
    //    }
    //};
    //
    //$scope.aboutus = function () {
    //    $state.go('about');
    //};
})

.controller('SettingCtrl', function($scope, LoginService, $ionicPopup, $state, Websites, $ionicLoading, $window, $ionicPlatform) {

    $scope.apppush = {
        checked: true
    };
    $scope.smspush = {
        checked: false
    };
    $scope.phonepush = {
        checked: false
    };
    $scope.vcode = "";
    $scope.phonevalidated = false;

    $scope.data = {};

    $scope.data.userphone = "未设置";
    $scope.data.countdown = "发送验证码";

    if (localStorage.haslogin == 1) {
        $ionicLoading.show({
            template: '数据加载中...'
        });

        LoginService.getsetting($scope).success(function(data) {
            $ionicLoading.hide();

        }).error(function(data) {
            //添加失败
            $ionicLoading.hide();
        });
    } else {
        $state.go("tab.account");
    }

    $scope.gotoaccountlist = function() {
        $state.go("tab.accountlistitem");
    }

    $scope.pushNotificationChange = function(type) {
        if (!$scope.phonevalidated && (type == 2 || type == 3)) {
            var alertPopup = $ionicPopup.alert({
                title: '推送设置',
                template: '请先绑定/验证您的手机号码！'
            });
            $scope.smspush.checked = false;
            $scope.phonepush.checked = false;
        } else {
            LoginService.switchnotify($scope, $ionicPopup, type).success(function(data) {

            }).error(function(data) {

            });
        }
    }

    var counts = 60;
    var counting;

    $scope.bindphone = function() {
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.userphone" class="inputpaddingleft left width60" type="tel" placeholder="手机号码">' +
                '<button id="resend" class="button button-dark sentcodebutton left width40" ng-click="sendcode()">{{data.countdown}}</button>' +
                '<input type="text" ng-model="data.code" type="tel" class="inputpaddingleft" placeholder="验证码">',
            title: '提醒手机号码绑定',
            scope: $scope,
            buttons: [{
                text: '取消',
                onTap: function(e) {
                    clearInterval(counting);
                }
            }, {
                text: '<b>绑定</b>',
                type: 'button-positive',
                onTap: function(e) {
                    $ionicLoading.show({
                        template: '服务器解析中...'
                    });
                    LoginService.finalbind($scope, $ionicPopup).success(function(data) {
                        //刷新自身
                        $ionicLoading.hide();

                    }).error(function(data) {
                        //添加失败
                        $ionicLoading.hide();
                    });
                    myPopup.close();
                    $state.go("setting");
                }
            }]
        });

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }

    $scope.sendcode = function() {
        if (!/^(1[0-9])\d{9}$/i.test($scope.data.userphone)) {
            var alertPopup = $ionicPopup.alert({
                title: '推送设置',
                template: '不是有效的手机号码！'
            });
        } else {
            $("#resend").attr("disabled", "disabled");
            counts = 60;
            counting = setInterval(countOne, 1000);

            function countOne() {
                $("#resend").text("重新发送(" + counts + ")");
                if (counts-- == "0") {
                    $scope.data.countdown = "重新发送";
                    $("#resend").text("重新发送");
                    $("#resend").removeAttr("disabled");
                    clearInterval(counting);
                }
            }

            //发送验证码
            LoginService.sendcode($scope, $ionicPopup).success(function(data) {

            }).error(function(data) {

            });
        }
    }
})

.controller('AccountListItemCtrl', function($scope, LoginService, $ionicPopup, $state, Websites, $ionicLoading, $window, $ionicPlatform) {

    $scope.data = {};
    if (localStorage.haslogin == 1) {
        $ionicLoading.show({
            template: '数据加载中...'
        });

        Websites.all($scope).success(function(data) {
            $ionicLoading.hide();

        }).error(function(data) {
            //添加失败
            $ionicLoading.hide();
        });
    } else {
        $state.go("tab.account");
    }

    $scope.remove = function(site) {
        var confirmPopup = $ionicPopup.confirm({
            title: '删除网站',
            template: '确认删除您选定的监控网站吗？'
        });
        confirmPopup.then(function(res) {
            if (res) {
                Websites.remove($scope.sites, site).success(function(data) {


                }).error(function(data) {});
            } else {

            }
        });
    }

    $scope.logout = function() {
        localStorage.removeItem("haslogin");
        $scope.data.username = "";
        $scope.data.password = "";
        localStorage.signtoken = "";
        localStorage.userid = "";

        //设置通知的配置为空，用户注销后不再接收通知
        var arrayObj = new Array();
        window.plugins.jPushPlugin.setTags(arrayObj);

        $state.go("tab.account");
    }

    $scope.gotosetting = function() {
        $state.go("setting");
    }

    $scope.addwebsite = function() {
        $scope.data = {}
        var myPopup = $ionicPopup.show({
            template: '<input type="text" class="inputpaddingleft" ng-model="data.siteurl" placeholder="网站Url">' +
                '<input type="text" ng-model="data.sitename" placeholder="网站昵称（不填则自动获取）" class="margintop inputpaddingleft">',
            title: '新增监控网站',
            scope: $scope,
            buttons: [{
                text: '取消'
            }, {
                text: '<b>保存</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.data.siteurl) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                        $ionicLoading.show({
                            template: '服务器解析中...'
                        });
                        Websites.add($scope).success(function(data) {
                            //添加成功
                            //刷新自身
                            $state.go('tab.websites');
                            $ionicLoading.hide();

                        }).error(function(data) {
                            //添加失败
                            $ionicLoading.hide();
                        });

                        myPopup.close();
                    }
                }
            }]
        });

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    };
});
