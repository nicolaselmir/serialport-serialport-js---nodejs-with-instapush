var serialjs=require('serialport-js');
var instapush = require("instapush");
var user = "Nicolas";

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


serialjs.open(
    '/dev/ttyACM0',
    start,
    '\n'
);


function start(port){
    port.on(
        'data',
        gotData
    );


    port.send('howdy doody doo!')
}

function gotData(data){
    console.log(data);

    var notification = data.split(':')[1];

  if (notification > 10) {
    notify(user , "doesn't need");
  }else{
    notify(user , "needs");
  }

}
