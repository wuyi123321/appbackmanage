<template>
    <div>
        <div class="bgedit">


            <div style="max-height: 90%; display: flex;">
                <div class="bgcontent" id="print">
                    <div class="apply">
                        <div class="title">加入_____社团申请表</div>
                        <div class="apheady">
                            <div class="header_left">
                                <ul>
                                    <li>
                                        <span class="item">姓名</span>
                                        <span></span>
                                        <span class="item">性别</span>
                                        <span></span>
                                        <span class="item">民族</span>
                                        <span></span>
                                    </li>
                                    <li>
                                        <span>部门</span>
                                        <span></span>
                                        <span>工号</span>
                                        <span></span>
                                        <span>手机号码</span>
                                        <span></span>
                                    </li>
                                    <li>
                                        <span>籍贯</span>
                                        <span></span>
                                        <span>出生年月</span>
                                        <span></span>
                                        <span>微信号</span>
                                        <span></span>
                                    </li>
                                    <li>
                                        <span>兴趣爱好</span>
                                        <span></span>
                                        <span style="border-left: solid 1px #fff"></span>
                                        <span>社团名称</span>
                                        <span></span>
                                        <span style="border-left: solid 1px #fff"></span>
                                    </li>
                                </ul>
                            </div>
                            <div class="header_right"></div>
                        </div>
                        <div class="apcontent">
                            <div class="content_left">
                                个人简历（简述自己的爱好、特长、获得的奖励、组织或参加的活动）
                            </div>
                            <div class="content_right">

                            </div>
                        </div>
                        <div class="apcontent">
                            <div class="content_left">
                                自荐理由（对所报社团的认识与态度）
                            </div>
                            <div class="content_right">
                                <span class="app_person">申请人签字：<span style="display:inline-block;width: 120px;height: 20px"></span>   年 月 日</span>
                            </div>
                        </div>
                        <div class="apcontent">
                            <div class="content_left">
                                社团意见
                            </div>

                            <div class="content_right">
                                <span class="app_person">申请人签字：<span style="display:inline-block;width: 120px;height: 20px"></span> 年 月 日</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 20px">
                    <div class="close" @click="closebg">
                        <i class="el-icon-close"></i>
                    </div>
                    <div class="print">
                        <el-button @click="print" >打印</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        components: {ElButton},
        data: function(){
            return {
                bgshow:true,
            }
        },
        created:function () {
        },
        methods:{
            closebg:function () {
                console.log("aaaaa");
                this.$emit("changeapplyshow");
            },
            print:function () {
                var newstr = document.getElementById('print').innerHTML;
                document.body.innerHTML = newstr;
                window.print();
                // 重新加载页面，以刷新数据
                window.location.reload()
            }

        }
    }
</script>

<style scoped>

    .bgedit{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,.5);
        overflow-y: scroll;
        z-index: 999;
    }
    .bgcontent{
        width: 720px;
        /*height: 900px;*/
        max-height: 90%;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        overflow-y: auto;
    }
    .apply{
        /*width:100%;*/
        /*height: 100%;*/
        border: solid 2px #555555;
        font-size: 22px;
        font-weight: 600;
    }
    .apply .title{
        height: 50px;
        border-bottom: solid 2px #555;
        text-align: center;
        line-height: 50px;
    }
    .apheady{
        display: flex;
    }
    .apheady .header_left{
        flex: 1;
    }
    .header_left ul li{
        height: 45px;
        border-bottom: solid 1px #555;
        display: flex;
    }
    .header_left ul li span{
        flex: 1;
        border-left: solid 1px #555555;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        line-height: 45px;
    }
    .header_left ul li span:first-child{
        border: none;
    }
    .apheady .header_right{
        width: 150px;
        height: 183px;
        border-left: solid 1px #555;
        border-bottom: solid 1px #555;
    }
    .apcontent{
        border-top: solid 1px #555555;
        display: flex;
        border-bottom: solid 1px #555555;
    }
    .apcontent:last-child{
        border-bottom:none;
    }
    .apcontent .content_left{
        width: 170px;
        border-right: solid 1px #555555;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        padding: 8px;
        text-align: center;
        box-sizing: border-box;
    }
    .apcontent .content_right{
       flex: 1;
       position: relative;
    }
    .app_person{
        position: absolute;
        bottom: 20px;
        right: 80px;
        font-size: 16px;
        font-weight: 400;
    }
    .close{
        position: absolute;
        width: 30px;
        height: 30px;
        margin-left: 20px;
        border: solid 1px #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff
    }
    .print{
        position: absolute;
        width: 30px;
        height: 30px;
        margin-left: 80px;

        border: solid 1px #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff
    }
</style>
