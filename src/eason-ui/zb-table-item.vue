<template>
    <div>
        <Col span="4.8" style="height: 210px">
        <video id="my-video1" class="video-js" controls preload="auto"
               :poster="row.roomBackgroundImg" data-setup="{}">
         <source src="rtmp://live.hkstv.hk.lxdns.com/live/hks" type='rtmp/flv'>
        </video>
        <div>{{row.roomTitle}}</div>
        <div>
            <span style="text-align: left;">
                <img style="width: 20px;height: 20px;" :src="row.zbHeadImg" class="img-avatar">
                <span style="color: #2d8cf0">{{row.zbNickName}}</span>
            </span>
            <span style="text-align: right;  float: right;">
                <Icon type="ios-people"></Icon><span>165</span>
            </span>
        </div>
        </Col>
    </div>
</template>

<script>
    export default {
        name: "zb-table-item"
    }
</script>

<style scoped>

</style>