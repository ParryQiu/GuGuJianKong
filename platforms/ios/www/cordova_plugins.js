cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cn.jpush.phonegap.JPushPlugin/www/JPushPlugin.js",
        "id": "cn.jpush.phonegap.JPushPlugin.JPushPlugin",
        "clobbers": [
            "window.plugins.jPushPlugin"
        ]
    },
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/com.jcjee.plugins.emailcomposer/www/EmailComposer.js",
        "id": "com.jcjee.plugins.emailcomposer.EmailComposer",
        "clobbers": [
            "EmailComposer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "id": "cordova-plugin-console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "id": "cordova-plugin-console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cn.jpush.phonegap.JPushPlugin": "2.0.0",
    "com.ionic.keyboard": "1.0.4",
    "com.jcjee.plugins.emailcomposer": "1.4.6",
    "cordova-plugin-console": "1.0.0",
    "cordova-plugin-device": "1.0.0",
    "cordova-plugin-network-information": "1.0.1",
    "cordova-plugin-splashscreen": "2.0.0",
    "cordova-plugin-whitelist": "1.0.0",
    "org.apache.cordova.inappbrowser": "0.6.0"
}
// BOTTOM OF METADATA
});