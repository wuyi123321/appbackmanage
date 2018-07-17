<template>
    <div class="basemessage">
        <div class="top">
            <img>
        </div>
        <div class="base_content">
            <div class="basetitle">
                <div class="photo" @click="bgImg = true">
                    <img :src="'http://appinter.sunwoda.com'+communityMess.cmFile.fUrl" width="100%" height="100%" v-if="communityMess.cmFile">
                </div>
                <div class="cname">
                    <div>{{communityMess.cName}}</div>
                    <div>{{communityMess.cType}}  --  {{communityMess.cDateStr}}</div>
                </div>
                <div class="edit">
                    <el-button type="primary" icon="edit" @click="bgshow = true">修改</el-button>
                </div>
            </div>
            <div style="height: 20px"></div>
            <div class="para-title level-2">
                <span>简介</span>
                <hr>
            </div>
            <div class="para">
                {{communityMess.cIntroduction}}
            </div>
            <div class="para-title level-2">
                 <span>社团宗旨</span>
                 <hr>
            </div>
            <div class="para">
                {{communityMess.cObjective}}
            </div>
        </div>
        <div class="para-title level-2">
            <span>社团意愿</span>
            <hr>
        </div>

        <div class="para">
            {{communityMess.cWill}}
        </div>
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

                     <el-form-item>
                         <el-button type="primary" @click="onSubmit">立即创建</el-button>
                         <el-button @click="bgshow = false">取消</el-button>
                     </el-form-item>
                 </el-form>
             </div>
        </div>
        <div class="bgedit" v-show="bgImg">
            <div class="bgcontent">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="修改图片">
                        <input  type="file" @change="changefile" ref="fileImg" accept="image/*" ></input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="upImg">确定修改</el-button>
                        <el-button @click="bgshow = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>


        <div style="height: 80px"></div>
    </div>
</template>

<script>

    export default {
        props:{

        },
        data: function(){
            return {
                bgImg:false,
                communityMess:{},
                bgshow:false,
                communityList:{},
                form: {
                    cName: '',
                    cDateStr:"",
                    cType: '',
                    cIntroduction: '',
                    cWill: '',
                    cObjective: '',
                },
                cid:"",
                cUpdateUserNo:"",
                imgs:[]
            }
        },
        created:function () {

            this.cid = this.$route.query.communityId;
            console.log(JSON.parse(localStorage.getItem("comloginUserMess")));
            this.cUpdateUserNo = JSON.parse(localStorage.getItem("comloginUserMess")).userNo;
            console.log(JSON.parse(localStorage.getItem("comloginUserMess")));
            this.getdata();

        },
        methods:{
            changefile:function () {
                this.imgs = [];
                this.imgs.push(this.$refs.fileImg.files[0]);
            },
            upImg:function () {

                let vm = this;
                console.log(vm.imgs[0])
                if( vm.imgs.length ===0){
                    vm.$message("请填写完整信息");
                    return 0;
                }
                let formData = new FormData();
                console.log(vm.form);
                formData.append('cUpdateUserNo',JSON.parse(localStorage.getItem("comloginUserMess")).userNo);
                formData.append('cId',vm.communityMess.cId);
                formData.append('cFileId',vm.communityMess.cmFile.cFileId);
                formData.append('fUrl',vm.communityMess.cmFile.fUrl);
                formData.append('fGroupId',vm.communityMess.cmFile.fGroupId);
                formData.append('fGroupName',vm.communityMess.cmFile.fGroupName);
                formData.append('file',vm.imgs[0]);
                $.ajax({
                    url: vm.url + "community/updateCommunityByPhoto.json",
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
                            vm.bgImg = false;
                            vm.getdata();
                        }
                        console.log(obj);
                    },
                    error:function () {
                        vm.loading = false;
                        vm.$message("上传错误");
                    }
                })
            },
            onSubmit:function () {
                let vm = this;
                let pram =vm.form;
                pram.cUpdateUserNo = vm.cUpdateUserNo;
                pram.cId = vm.cid;
                pram.cDateStr = vm.dateFns.format((vm.form.cDateStr), 'YYYY-MM-DD');
                console.log(pram);
                $.ajax({
                    url: vm.url+"community/updateCommunity.json",
                    dataType: "json",
                    data: pram ,
                    type: "post",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode===0){
                            vm. bgshow = false;
                            vm.getdata();
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });

            },
            setData:function () {
                this.form.cName = this.communityMess.cName;
                this.form.cDateStr = new Date(this.communityMess.cDate);
                this.form.cType = this.communityMess.cType;
                this.form.cIntroduction= this.communityMess.cIntroduction;
                this.form.cWill = this.communityMess.cWill;
                this.form.cObjective = this.communityMess.cObjective;
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
                        if(data.statusCode===0){
                            vm.communityMess = data.dataInfo.listData[0];
                            vm.setData();
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
    .basemessage{
        padding-left: 50px;
        padding-right: 50px;
    }
     .photo{
        width: 60px;
        height: 60px;
        border: solid 1px #e4e4e4;
        border-radius: 5px;
    }
    .basetitle{
        display: flex;
        align-items: flex-end;
    }
    .cname{
        margin-left: 20px;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .cname>div:first-child{
        font-size: 24px;
        margin-bottom: 5px;

    }
    .cname>div:last-child{
        font-size: 14px;
        color: #888;
    }
    .edit{
        color: #555;
        margin-left: 40px;
        height: 60px;
        display: flex;
        align-items: center;
    }
    .para {
        margin-top: 20px;
        font-size: 14px;
        word-wrap: break-word;
        color: #333;
        margin-bottom: 15px;
        text-indent: 2em;
        line-height: 24px;
        zoom: 1;
    }
    .para-title.level-2 {
        display: block;
        border-left: 12px solid #4F9CEE;
        height: 24px;
        line-height: 24px;
        font-size: 22px;
        font-weight: 400;

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
        min-height: 400px;
        max-height: 90%;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
    }

</style>
