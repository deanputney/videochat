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

connection.openOrJoin("your-room-id");
