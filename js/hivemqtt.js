
//Using the HiveMQ public Broker, with a random client Id
var client = new Messaging.Client("localhost", 9001, "myclientid_" + parseInt(Math.random() * 100, 10));

// Connect the client, with a Username and Password
function mqttconnect(){
client.connect({onSuccess:onConnect, userName : 'hass', password : 'hasspass'});
  $("#btnCon").prop("disabled", true); 
    $("#btnSub").prop("disabled", false);
}
//Gets  called if the websocket/mqtt connection gets disconnected for any reason
"use strict";
client.onConnectionLost = function (responseObject) {
    //Depending on your scenario you could implement a reconnect logic here
    alert("connection lost: " + responseObject.errorMessage);
};

//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
    //Do something with the push message you received
    $('#messages').html('<span>Topic:<span> ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
    
    $('#btnCon').text(' ' + message.payloadString + ' ' );
  $("#btnCon").css("font-size" ,"42px");
};

//Connect Options
var options = {
    timeout: 3,
    //Gets Called if the connection has sucessfully been established
    onSuccess: function () {
        alert("Connected");
    },
    //Gets Called if the connection could not be established
    onFailure: function (message) {
        alert("Connection failed: " + message.errorMessage);
        $('#messages').html('<span>Connection Failed'  + message.errorMessage + '</span>');
    }
};

//Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
var publish = function (payload, topic, qos) {
    //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
    var message = new Messaging.Message(payload);
    message.destinationName = topic;
    message.qos = qos;
    client.send(message);
}

// Called when the connection is made
function onConnect(){
    console.log("Client Connected");
    $('#messages').html('<span>Now connected to Game Server!</span>');
};

function subscribe(){
    client.subscribe('/outside/temp');
};

