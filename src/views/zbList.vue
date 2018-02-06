<template>
    <div class="animated fadeIn">
        <div id="zb-table" class="zb-table">
            <Row :gutter="14" type="flex" class="code-row-bg">
                <Col span="4.8" class="zb-table-item"  v-for="(row,index) in rows" :key="row.roomId">
                    <div>
                        <div  @mouseenter="showPlay=index" @mouseleave="showPlay=-1" @click="showZbDetail(row)">
                            <img class="item-img" :src="row.roomBackgroundImg" style="width: 316px;height: 200px;" />
                            <transition name="fade">
                                <div  v-show="showPlay==index" class="item-mask"></div>
                            </transition>
                            <transition name="fade">
                                <div  v-show="showPlay==index" class="item-play"></div>
                            </transition>
                        </div>
                        <div class="item-info">
                                <div>{{row.roomTitle}}</div>
                                <span style="text-align: left;">
                                    <img style="width: 20px;height: 20px;" :src="row.zbHeadImg" class="img-avatar">
                                    <span style="color: #2d8cf0">{{row.zbNickName}}</span>
                                </span>
                                <span style="text-align: right;  float: right;color: #23c332;">
                                    <Icon type="ios-people"></Icon><span>{{row.machineUser+row.onlineUser}}</span>
                                </span>
                        </div>
                    </div>
                    </Col>
            </Row>
        </div>
        <div style="margin: 50px 0px;line-height: 0px;"></div>
        <div  id="zb-table-page" style="text-align:center;margin-top: 5%">
            <Page :total="total" :page-size="10" @on-change="setPagePosition" @on-page-size-change="setPageSizePosition" :show-total="true" :show-elevator="true" :show-sizer="true" ></Page>
        </div>
    </div>
</template>
<script>

    import { getZbList } from 'api/zb-list';

    export default {
        name: "zb-list",
        components: {
        },
        data(){
            return {
                showPlay: -1,
                total: 0,
                rows:  []
            };
        },
        computed: {

        },
        methods: {
            showZbDetail: function (target) {
                    // this.$router.go('/home1/dashboard');
                    window.open('#/zbList/details?roomId='+target.roomId);
            },

            setPagePosition: function (position) {
                this.getZbList(1,position-1,10);    //参数：1=热门，第几页0开始，每页显示多少数
            },
            setPageSizePosition: function (pageSize) {
                this.getZbList(1,0,pageSize);        //参数：1=热门，第几页0开始，每页显示多少数；重置第0页开始
            },
            getZbList: function (category,position,pageSize) {
                getZbList(category, position, pageSize).then(response => {
                    const data = response.data;
                    if(data.status==0){
                        this.rows=data.data.rows;
                        if (data.data.total!=0){
                            const page=data.data.total-1;
                            this.total=page*pageSize+this.rows.length; //计算总条数
                        }
                    }
                }).catch(error => {
                    console.info(error);
                    if (error){
                        // Promise.reject(error);
                    }
                });
            }
        },
        mounted(){
            //默认从第一页开始
            this.setPagePosition(1);
            // this.$socket.emit('connect'); //在这里触发connect事件
        }
    }
</script>
<style scoped>
    .zb-table .zb-table-item {
        cursor: pointer;
        margin: 10px 0px;
    }
    .zb-table .zb-table-item .item-img{
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .zb-table .zb-table-item .item-mask {
        opacity: 0.5;
        filter: grayscale(10%);
        position: absolute;
        top: 0;
        width: 96%;
        height: 78%;
        transition: all .3s ease-out;
        background: #4e4e4e;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .zb-table .zb-table-item .item-play {
        opacity: 0.5;
        filter: grayscale(10%);
        position: absolute;
        top: 40%;
        left: 50%;
        width: 50px;
        height: 50px;
        margin: -25px 0 0 -25px;
        background: url(/static/img/zb/play-icon.png) no-repeat;
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transition: all ease-out 250ms;
    }

    .zb-table .zb-table-item .item-info{
        display: block;
        position: relative;
        padding: 8px;
        font-size: 15px;
        line-height: 20px;
        color: #75776a;
        background: #f8f9f0;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
</style>
