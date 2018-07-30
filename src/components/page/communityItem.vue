<template>
    <div class="mainitem" >
       <div class="banner" >
           <div class="gohome" @click="gohome">主页</div>
           <div class="title">{{communityMess.cName}}</div>
          <!--<div class="message">-->
              <!--<ul>-->
                  <!--<li><span>社团名称：</span><span>{{communityMess.cName}}</span></li>-->
                  <!--<li><span>创社时间：</span><span>{{communityMess.cDateStr}}</span></li>-->
                  <!--<li><span>社团性质：</span><span>{{communityMess.cType}}啊就是的啊啥就开始大局观撒娇似的考虑ask</span></li>-->
                  <!--<li><span>社团宗旨：</span><span>{{communityMess.cObjective}}啊就是的啊啥就开始大局观撒娇拉屎的卡上大苏打</span></li>-->
                  <!--<li><span>社团简介：</span><span>{{communityMess.cIntroduction}}</span></li>-->
              <!--</ul>-->
          <!--</div>-->
           <div class="nav">
               <span><router-link :to="'/comItemBase?communityId='+cid">基本信息</router-link></span>
               <span><router-link :to="'/comItemJob?communityId='+cid">岗位管理</router-link></span>
               <span><router-link :to="'/comItemPerson?communityId='+cid">人员管理</router-link></span>
               <span><router-link :to="'/comItemActive?communityId='+cid">活动管理</router-link></span>
           </div>
       </div>
        <router-view class="view_content" :communityMess = "communityMess"></router-view>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                bgshow:false,
                refreshing:true,
                communityMess:{},
                cid:""
            }
        },
        created:function () {
          this.cid = this.$route.query.communityId;
          this.getdata();
        },

        methods:{
            gohome:function () {
               this.$router.push({path:"community"})
            },
            getdata:function () {
                let vm = this;
                $.ajax({
                    url: vm.url+"community/findCommunityList.json",
                    dataType: "json",
                    data: {pageSize:-1,cId:vm.cid},
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode==0){
                            vm.communityMess = data.dataInfo.listData[0];
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .mainitem{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        background-color: rgb(245,245,245)
    }
.banner{
    background-color: #fff;
    position: relative;
    height: 300px;
    background-image: url("../../assets/banner.jpg");
    background-size: 100% 300px;
}
.banner .title{
    text-align: center;
    color: #fff;
    font-size: 40px;
    line-height: 100px;

}
.gohome{
    display: inline-block;
    font-size: 22px;
    color: #00aaaa;
    margin: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    text-shadow: 1px 2px #eee;
    border: solid 1px #eee;
    border-radius: 5px;
    box-shadow: 0px 1px #eee,0px 0px #eee;

}
.message{
    position: absolute;
    top: 45px;
    left: 50px;
    height: 350px;
    width: 300px;
    background-color: rgba(0,0,0,.3);
    border: solid 1px #ccc;
    box-shadow: 2px 3px 5px #555;
    padding: 15px;
    overflow-y: scroll;
}

    .message ul li{
        min-height: 40px;
        line-height: 40px;
        color: #fff;
        display: flex;
    }
    .message ul li span:first-child{
        width: 80px;
    }
   .message ul li span:last-child{
       flex: 1;
       color: #eee;
    }
   .nav{
       position: absolute;
       bottom: 10px;
       left: 430px;
   }
  .nav span a{
      display: inline-block;
      height: 45px;
      line-height: 45px;
      width: 120px;
      text-align: center;
      background-color: rgba(255,255,255,.5);
      border-radius: 5px;
      box-shadow: 1px 1px 3px #dfd;
      margin-left: 10px;
  }
.nav span .router-link-active{
    background-color: rgba(255,255,255,.1);
    border: solid 1px #dfd;
    font-size: 120%;
    font-weight: 600;
    color: #fff;
}
.view_content{
    margin: 20px auto;
    width: 1137px;
    min-height: 600px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width:12px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
    border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgba(0,0,0,0.1);
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background:rgba(0,0,0,0.3);
}

</style>
