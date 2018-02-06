import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import store from './store';

Vue.use(VueSocketio, socketio('http://DESKTOP-KED4AR2:8888?clientid=testclient1'),store);


