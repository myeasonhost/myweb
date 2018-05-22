<template>
    <div class="animated fadeIn">
       <div class="h-panel">
           <div class="media-body">
               <div class="panel">
                   <div class="panel-body">
                       <div class="media usr-info">
                           <a href="#" class="pull-left">
                               <img class="thumb" :src="item.zbHeadImg" alt="">
                           </a>
                           <div class="media-body">
                               <h5 class="media-heading">{{item.roomTitle}}</h5>
                               <span>{{item.zbSignature}}</span>
                               <p>{{item.zbNickname}}</p>
                           </div>
                       </div>
                   </div>
                   <div class="panel-footer custom-trq-footer">
                       <ul class="user-states">
                           <li>
                               <Icon type="heart" size="25"></Icon>
                               {{item.diamondGiftNum}}
                           </li>
                           <li>
                               <Icon type="eye" size="25"></Icon>
                               {{item.machineUser+item.onlineUser}}
                           </li>
                           <li>
                               <Icon type="person-add" size="25"></Icon>
                               {{item.isAttention}}
                           </li>
                       </ul>
                   </div>
               </div>
               <div class="video">
                   <!-- theodul video videojs plugin desktop mode  controls preload="auto"
                           vjs-big-play-centered 播放按钮居中
                           poster默认的显示界面，就是还没点播放，给你显示的界面
                           controls
                           preload="auto" 是否提前加载
                           autoplay 自动播放
                           loop=true 自动循环
                           data-setup='{"example_option":true}' 可以把一些属性写到这个里面来，如data-setup={"autoplay":true}
                   -->
                   <video id="room-video" class="room-video video-js vjs-default-skin vjs-big-play-centered" x-webkit-airplay="allow" poster="" webkit-playsinline playsinline x5-video-player-type="h5"
                          x5-video-player-fullscreen="true" preload="auto"  autoplay  controls
                          :poster="item.roomBackgroundImg" >

                       <!--<source src='rtmp://live.hkstv.hk.lxdns.com/live/hks' type='rtmp/flv'/>-->
                       <!--<source src='http://118.193.141.13:8080/7/7/7.m3u8' type='application/x-mpegURL'/>-->
                   </video>
               </div>
           </div>
           <div class="chat-room">
               <div id="console" >
               </div>

               <form  onsubmit="return false;">
                   <input id="msg" class="input-xlarge" type="text" placeholder="请输入消息···" maxlength="50" />
                   <button type="button" @click="sendMessage()" class="btn" id="send">发送</button>
                   <button type="button" @click="createRoom()" class="btn">创建房间</button>
                   <button type="button" @click="destoryRoom()" class="btn">销毁房间</button>
               </form>
           </div>
       </div>
    </div>
</template>

<script>
    import { enterRoom } from 'api/zb-list';
    import {decrypt} from "api/AES";
    import {formatTime} from "utils/index";
    // import videojs from 'video.js';
    // import  "videojs-contrib-hls";

export default {
  components:{},
  name: 'zbListDetails',
        data () {
            return {
                item: {},
                play_url:""
            }
        },
        methods:{
            runPlay(play_url){
                var player = videojs('room-video',{
                    bigPlayButton : false,
                    textTrackDisplay : false,
                    posterImage: false,
                    errorDisplay : false,
                    controlBar : {
                        captionsButton : false,
                        chaptersButton: false,
                        subtitlesButton:false,
                        liveDisplay:false,
                        playbackRateMenuButton:false
                    },
                    sources: [{
                            // src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8",
                            // type: "application/x-mpegURL",
                            src:   play_url ,
                            type: "video/flv"
                        }]
                },function(){
                    this.on('loadedmetadata',function(){
                        console.log('loadedmetadata');
                        //加载到元数据后开始播放视频
                        // startVideo();
                        this.play();
                    });

                });
                player.play();
            },
            enterRoom(roomId){
                enterRoom(roomId, this.$store.getters.token).then(response => {
                    const data = response.data;
                    if(data.status==0){
                        this.item=data.data;
                        this.play_url=decrypt(this.item.media.play_url);
                        console.log("===="+this.play_url);
                        this.runPlay(this.play_url);
                    }else if(data.status==401 || data.status==500){
                        this.runPlay(this.play_url);
                        throw  {name: data.status, message: data.message};
                    }
                }).catch(error => {
                    console.info(error);
                    this.$Message.error({
                        content: error.message,
                        duration: 5 * 1000,
                        closable: true
                    });
                    // if (error){
                    //     Promise.reject(error);
                    // }
                });
            },
            createRoom(){
                var jsonObject = {roomId: '1',
                    roomName: '1',
                    roomTitle: "1的房间"};
                this.$socket.emit('createRoom', jsonObject);
            },
            destoryRoom(){
                var jsonObject = {roomId: '1',
                    roomName: '1',
                    roomTitle: "1的房间"};
                this.$socket.emit('destoryRoom', jsonObject);
            },
            output(message) {
                var currentTime = "<span <span style=\"color:royalblue;\">" +  formatTime(Date.now(),true) + "</span>";
                var element = $("<div>" + currentTime + " " + message + "</div>");
                $('#console').prepend(element);
            },
            sendMessage(){
                var message = $('#msg').val();
                if (message==""){
                    $('#msg').focus();
                    return ;
                }
                $('#msg').val('');

                var jsonObject = {sourceClientId: 'testclient1',
                    msgType: 'chat',
                    msgContent: message};
                this.$socket.emit('sendMsg', jsonObject);
                // this.$store.dispatch('socket_messageevent', jsonObject).then((data) => {
                //     this.$Message.success("登陆成功");
                // });
            }
        },
        sockets: {
            connect(){
                this.output('<span style="color:green;">聊天室连接成功</span>');
            },
            disconnect(){
                this.output('<span style="color:red;">聊天室中断，正在重新连接...</span>');
            },
            sendMsg(data){
                this.output('<span style="color:orange;">' + data.sourceClientId + ':</span> ' + data.msgContent);
            }
        },
        mounted(){
            var afterUrl =  window.location.hash.substring(window.location.hash.indexOf("?")).substring(1);//(问号以后的字符串)
            var roomId = afterUrl.substring(afterUrl.indexOf('=')+1).toUpperCase();//(等号以后的字符串，及你所要的参数)
            this.enterRoom(roomId);

            this.$options.sockets.sendMsg = (data) => {
                console.log(data);
            };

        }
}
</script>

<style type="text/css" scoped>
    .h-panel{
        display: flex;
        flex-direction: row;
    }
    .h-panel .media-body{
        width: 66%;
    }
    .h-panel .media-body .room-video{
        margin-top: 15px;
        width: 100%;
        height: 620px;
    }
    .h-panel .media-body .panel {
        background-color: #b30b64;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
        width: 100%;
        display: flex;
        display: -webkit-flex; /* Safari */
    }
    .h-panel .chat-room{
        margin: 0px 10px;
        padding: 10px 10px;
        background-color: #f4f;
        border-radius: 4px;
        width: 34%;
        display: flex;
        flex-direction: column;
    }
    .panel-body {
        padding: 5px;
        width: 80%;
    }

    .media:first-child {
        margin-top: 0
    }

    .media.usr-info>.pull-left {
        margin-right: 20px;
        margin-top: 10px
    }

    .media>.pull-left {
        margin-right: 10px
    }

    .pull-left {
        float: left
    }

    .pull-left {
        float: left!important
    }

    .custom-trq-footer {
        background: none repeat scroll 0 0 #0d15b7 !important;
        color: #fff;
        border-top: none;
        border-radius: 10px;
    }

    .panel-footer {
        padding: 5px 5px;
        margin: 5px;
        border: 5px solid #1a0db9;
    }

    .usr-info .thumb {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        -webkit-border-radius: 50%
    }

    .usr-info img {
        vertical-align: middle
    }


    .media-heading {
        margin: 0 0 5px
    }

    .usr-info .media-body{
        display: flex;
        flex-direction: column;
    }
    .usr-info .media-body h5 {
        color: #e4e8f1;
        margin-top: 5px;
    }
    .usr-info .media-body span {
        color: #ea755c;
        font-size: 12px;
    }

    .usr-info .media-body p {
        color: #13dd16
    }

    ul.user-states {
        list-style-type: none;
        padding: 12px 10px;
        display: flex;
        flex-direction: row;
    }

    ul.user-states li {
        width: 34%;
        font-size: 10px;
        margin: 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding: 0px 5px;
    }

    #console {
        height: 95%;
        width: 100%;
        overflow: auto;
    }

</style>