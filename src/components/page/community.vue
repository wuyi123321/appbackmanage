<template>
    <div v-loading.body="loading">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 社团列表</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <el-button type="primary" icon="plus" @click="bgshow = true">新增社团</el-button>
        <div style="height: 20px"></div>
        <el-row>

            <el-col :span="6" v-for="(item, index) in communityList" :key="index" :offset="1" style="margin-bottom: 20px">
                <el-card :body-style="{ padding: '0px' }" @click.native="goitem(item)">
                    <div class="image">
                        <img :src="'http://appinter.sunwoda.com'+item.cmFile.fUrl" width="100%" height="100%" v-if="item.cmFile">

                        <!--<img src="../../assets/logo.png"  height="200">-->
                    </div>
                    <div style="padding: 14px;">
                        <span>{{item.cType}}  --  {{item.cName}}</span>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button">{{item.cDateStr}}</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="bgedit" v-show="bgshow">
            <div class="bgcontent">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="社团名称">
                        <el-input v-model="form.cName"></el-input>
                    </el-form-item>
                    <el-form-item label="社团性质">
                        <el-input v-model="form.cType"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.cDateStr" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="社团简介">
                        <el-input type="textarea" v-model="form.cIntroduction"></el-input>
                    </el-form-item>
                    <el-form-item label="社团宗旨">
                        <el-input type="textarea" v-model="form.cObjective"></el-input>
                    </el-form-item>
                    <el-form-item label="社团意愿">
                        <el-input type="textarea" v-model="form.cWill"></el-input>
                    </el-form-item>
                    <el-form-item label="社团图片">
                        <input  type="file" @change="changefile" ref="fileImg" accept="image/*" ></input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button @click="bgshow = false">取消</el-button>
                    </el-form-item>
                </el-form>
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
                loading:true,
                bgshow:false,
                communityList:[],
                form: {
                    cName: '',
                    cDateStr:  new  Date(),
                    cType: '',
                    cIntroduction: '',
                    cWill: '',
                    cObjective: '',
                    file:[]
                },
            }
        },
        created:function () {
         this.getdata();
        },

        methods:{
            goitem:function (item) {
//                localStorage.setItem("communityItem",)
                this.$router.push({path:"communityItem",query:{communityId:item.cId}})
            },

            changefile:function () {
               this.form.file = [];
               this.form.file.push(this.$refs.fileImg.files[0]);
            },
            getdata:function () {
                let vm = this;
                vm.refreshing = true;
                this.allow = false;
                $.ajax({
                    url: vm.url+"community/findCommunityList.json",
                    dataType: "json",
                    data: {pageSize:-1},
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.loading = false;
                        vm.$message(data.message);
                        if(data.statusCode===0){
                            vm.communityList = data.dataInfo.listData;
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.loading = false;
                    }
                });
            },
            onSubmit:function () {
                let vm = this;
                let ctime = this.dateFns.format(this.form.cDateStr,"YYYY-MM-DD");
                if(vm.form.cName === "" || vm.form.cDateStr==="" || vm.form.cIntroduction ==="" || vm.form.file.length ===0){
                    vm.$message("请填写完整信息");
                    return 0;
                }
                let formData = new FormData();
                console.log(vm.form);
                formData.append('cUserNo',JSON.parse(localStorage.getItem("comloginUserMess")).userNo);
                formData.append('cName',vm.form.cName);
                formData.append('cDateStr',ctime);
                formData.append('cIntroduction',vm.form.cIntroduction);
                formData.append('cObjective',vm.form.cObjective);
                formData.append('cType',vm.form.cType);
                formData.append('cWill',vm.form.cWill);
                formData.append('fGroupId',1);
                formData.append('fGroupName',1);
                formData.append('file',vm.form.file[0]);
                $.ajax({
                    url: vm.url + "community/insertCommunity.json",
                    type: "post",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    mimeType: "multipart/form-data",
                    success: function (data) {
                        vm.loading = false;
                       let obj = JSON.parse(data);
                        vm.$message(obj.message);
                        if(obj.statusCode === 0){
                            vm.bgshow = false;
                            vm.getdata();

                        }
                        console.log(obj);
                    },
                    error:function () {
                        vm.loading = false;
                        vm.$message("上传错误");
                    }
                })
            }
        }
    }
</script>

<style scoped>
.image{
    height: 220px;
    display: flex;
    justify-content: center;
    border-bottom: solid 1px #eee;
}
.bgedit{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    overflow-y: scroll;
}

.bgcontent{
    width: 600px;
    min-height: 50%;
    max-height: 90%;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    overflow-y: scroll;
}
</style>
