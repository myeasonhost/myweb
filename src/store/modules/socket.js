import Cookies from 'js-cookie';
import Vue from 'vue';
import VueSocketio from 'vue-socketio-client';
import store from '../../store';
import socketio from 'socket.io-client';
import util from '../../utils/util';

const socket = {
    state: {
        connect: false,
        messages: [],
        changed: null,
        chatRoomId:null
    },
    mutations:{
        SOCKET_CONNECT: (state, status) => {
            state.connect = true;
            console.log(state+"socket连接成功")
        },
        SOCKET_DISCONNECT: (state, status) => {
            state.connect = false;
            console.log(state+"socket失去连接")
        },
        SOCKET_SENDMSG: (state, data) => {
            console.log(state);
            console.log(data);
        },
        SET_MESSAGE: (state, message) => {
            if(state.chatRoomId == message.chatRoomId){
                state.messages =  util.addDateTimeChatMessage(message,state.messages,false);
            }
        },
        SET_MESSAGES: (state, messages) => {
            for(let i =0 ; i<messages.length; i++){
                state.messages = util.addDateTimeChatMessage(messages[i],state.messages,true);
            }
        },
        CLEAR_MESSAGES:(state)=>{
            state.messages=[];
        },
        SET_CHATROOMID: (state, chatRoomId) => {
            state.chatRoomId = chatRoomId;
        }
    },
    actions: {
        SocketConnect: (context, status) => {
            if (!Vue.prototype.$socket) {
                console.log(process.env.SOCKET_API);
                // Vue.use(VueSocketio, socketio(process.env.SOCKET_API), store);
                Vue.use(VueSocketio, process.env.SOCKET_API+"/chat1", store);
            } else {
                Vue.prototype.$socket.query.access_token = Cookies.get('token');
                Vue.prototype.$socket.query.mobile = Cookies.get('mobile');
                Vue.prototype.$socket.connect();
            }
        },
        socket_sendMsg: (context, message) => {
            console.log("aaa="+message);
        },
        socket_socketNewchatroom: (context, message) => {
            console.log('getFriendList');
        },
        joinRooms: (context) => {
            // Vue.prototype.$socket.emit('createRoom',function(err,isJoin){
            //     console.log('isJoin',isJoin);
            // })
        },
        socket_socketMessage: (context, message) => {
            context.commit('SET_MESSAGE',message[0]);
            context.commit('SET_UNREADMESSAGENUM',message[0]);
            notification({title:message[0].sender.nickName,content:message[0].messageContent});
        },
        getMessages: (context, chatRoomId) => {
            context.commit('CLEAR_MESSAGES');
            context.commit('SET_CHATROOMID',chatRoomId);
            context.dispatch('readMessages',chatRoomId);
            Vue.prototype.$socket.emit('getHistoryMessage', {
                chatRoomId: chatRoomId,
                limit: 5
            }, (err, messages) => {
                context.commit('SET_MESSAGES', messages);
            });
        },
        readMessages:(context,chatRoomId)=> {
            Vue.prototype.$socket.emit('readChatMessage', {
                chatRoomId: chatRoomId,
            }, (err, messages) => {
                context.commit('CLEAR_UNREADMESSAGENUM',chatRoomId);
            });
        },
        setMessage:(context,message) =>{
            context.commit('SET_MESSAGE',message);
        }
    }
};

export default socket;
