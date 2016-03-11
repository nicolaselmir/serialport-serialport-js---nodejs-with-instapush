var serialport = require("serialport");
var instapush = require("instapush");
var user = "Nicolas";

var SerialPort = serialport.SerialPort;
var insta_conf = {
    id: '###',
    secret: '###',
    token: '###'
};

    instapush.settings({
        id: insta_conf.id,
        secret: insta_conf.secret,
        token: insta_conf.token
    });

    var notify = function (user, text) {
            instapush.notify({
                "event": "water",
                "trackers": {
                    "name": user,
                    "event": text
                }
            }, function (err, response) {
                console.log(err, response);
            });

        }

serialPort = new SerialPort("/dev/tty.usbmodem1421", {
            baudrate: 9600,
            parser: serialport.parsers.readline("\n")
        });

    serialPort.on('open', function () {
        console.log('open');
        serialPort.on('data', function (data) {
         console.log(data)
        var notification = data.split(':')[1];


         if (notification > 10) {
           notify(user , "doesent need");
         }else{
           notify(user , "needs");
         }

        });
    });
