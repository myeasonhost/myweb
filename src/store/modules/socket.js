import Cookies from 'js-cookie';

const socket = {
    state: {
        id: null,
        connect: false,
        message: null
    },
    mutations:{
        SOCKET_CONNECT: (state,  status ) => {
            state.connect = true;
            console.log("socket链接成功");
        },
        SOCKET_DISCONNECT: (state,  status ) => {
            state.connect = false;
            console.error("socket链接失败");
        },
        SOCKET_MESSAGE: (state,  message) => {
            state.message = message;
        }
    },
    actions: {
        otherAction: (context, type) => {
            return true;
        },
        socket_messageevent: (context, message) => {
            context.commit('SOCKET_MESSAGE', message);
            // if (message.is_important) {
            //     context.dispatch('alertImportantMessage', message);
            // }
        }
    }
};

export default socket;
