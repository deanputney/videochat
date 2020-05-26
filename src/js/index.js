import * as THREE from "three";

import { Application } from "./application";
import { toggleMobileNav } from "./components/navbar";
import "../css/index.css";

window.toggleMobileNav = toggleMobileNav;

window.app = new Application();
window.vg = window.app.scene.getObjectByName("LocalVideoGroup");

window.THREE = THREE;

// Video Chat Setup
import RTCMultiConnection from "rtcmulticonnection";
console.log(RTCMultiConnection);
import io from "socket.io-client";
global.io = io;
console.log("io", io);

var connection = new RTCMultiConnection();
window.connection = connection;

// this line is VERY_important
connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

// if you want audio+video conferencing
connection.session = {
  audio: true,
  video: true,
};
connection.videosContainer = document.getElementById("videos");

connection.onstream = function(e) {
    var parentNode = connection.videosContainer;
    parentNode.insertBefore(e.mediaElement, parentNode.firstChild);

    const radius = 20
    const position = new THREE.Vector3(Math.random() * 200 - 100, radius, Math.random() * 200 - 100)
    app.addVideoGroup(e.mediaElement, radius, position)

    var played = e.mediaElement.play();

    if (typeof played !== 'undefined') {
        played.catch(function() {
            /*** iOS 11 doesn't allow automatic play and rejects ***/
        }).then(function() {
            setTimeout(function() {
                e.mediaElement.play();
            }, 2000);
        });
        return;
    }

    setTimeout(function() {
        e.mediaElement.play();
    }, 2000);
};

connection.openOrJoin("your-room-id");
