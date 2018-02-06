<template>
    <div>
        <div id="zb-table">
            <Row :gutter="16" type="flex" justify="space-between" align="middle" class="code-row-bg">
                <Col span="4.8" style="height: 210px" v-for="row in rows">
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
            </Row>
        </div>
        <div style="margin: 50px 0px;line-height: 0px;"></div>
        <div  id="zb-table-page" style="text-align: center;">
            <zb-table-page></zb-table-page>
        </div>
    </div>
</template>

<script>
    import ZbTableItem from "./zb-table-item";
    import ZbTablePage from "./zb-table-page";

    export default {
        components: {
            ZbTablePage,
            ZbTableItem},
        name: "zb-table"
    }
</script>

<style scoped>

</style>