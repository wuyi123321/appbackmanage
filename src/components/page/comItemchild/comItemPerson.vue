<template>
    <div class="personManage">

        <!--<el-button type="primary" @click="bgshow = true">添加人员</el-button>-->
        <div style="height: 20px"></div>

        <el-tabs v-model="activeName">
            <el-tab-pane label="本部成员" name="first">
                <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="cName"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="cUserNo"
                    label="工号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="jName"
                    label="职位">
                </el-table-column>
                <el-table-column
                    prop="pName"
                    label="审核状态">
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                    <template slot-scope="scope">

                        <el-button @click="handleClick(scope.row)" type="text">信息</el-button>
                        <el-button @click="changeapplyshow(scope.row)" type="text">简历</el-button>
                        <el-button type="text" @click="setmanage(scope.row)">设置权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
                <el-pagination
                    layout="prev, pager, next,sizes"
                    @current-change="changePage"
                    @size-change="changSize"
                    :page-size="pageSize"

                    :page-sizes="[10, 15, 20]"
                    :total="totalPage">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="全部成员" name="second">
                <el-button type="primary" @click="addbutton">添加人员</el-button>
                <div style="height: 20px"></div>
                <el-table
                :data="tableDataAll"
                style="width: 100%"
            >
                <el-table-column
                    prop="cName"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="cUserNo"
                    label="工号"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="性别">
                    <template slot-scope="scope">
                       <span v-if="scope.row.gender==2">女</span>
                       <span v-else="">男</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dept"
                    label="部门">
                </el-table-column>


                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">

                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
                        <el-button type="text" @click="setenter(scope.row)">拉入本社</el-button>
                    </template>
                </el-table-column>
            </el-table>
                <el-pagination
                    layout="prev, pager, next,sizes"
                    @current-change="changePageall"
                    @size-change="changSizeall"
                    :page-size="allpageSize"
                    :page-sizes="[10, 15, 20]"
                    :total="alltotalPage">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
        <div class="bgedit" v-show="bgshow">
            <div class="bgcontent">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户工号">
                        <el-input v-model="form.cUserNo" v-if="typeButton == 'upuser'" disabled=""></el-input>
                        <el-input v-model="form.cUserNo" v-if="typeButton == 'adduser'" >
                            <el-button slot="append" icon="search" @click="getSapmess"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.cName"></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="所在部门">
                        <el-input v-model="form.dept"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.gender">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="民族">
                        <el-input  v-model="form.national"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.telPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯">
                        <el-input  v-model="form.nativePlace"></el-input>
                    </el-form-item>
                    <el-form-item label="微信号">
                        <el-input  v-model="form.weixinNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input  v-model="form.cNickName"></el-input>
                    </el-form-item>
                    <el-form-item label="短号">
                        <el-input  v-model="form.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="证件照">
                        <div class="photo">
                            <img :src="form.cmFile.fUrl" width="100%" height="100%" v-if="form.cmFile">
                            <input  type="file" @change="changefile('file','cmFile')" ref="file" accept="image/*" class="imginput"></input>
                        </div>
                    </el-form-item>
                    <el-form-item label="图像">
                        <div class="photo">
                            <img :src="form.cPhotoFile.fUrl" width="100%" height="100%" v-if="form.cmFile">
                            <input  type="file" @change="changefile('photo','cPhotoFile')" ref="photo" accept="image/*"  class="imginput"></input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-if="typeButton == 'upuser'" @click="onSubmit('updateCMUser.json')">确认修改</el-button>
                        <el-button type="primary" v-if="typeButton == 'adduser'" @click="onSubmit('insertCMUser.json')">确认新增</el-button>
                        <el-button @click="bgshow = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="bgedit" v-show="upJob">
            <div class="bgcontent">
                <el-form ref="form" :model="jobform" label-width="80px">
                    <el-form-item label="用户工号">
                        <el-input v-model="jobform.cUserNo" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="jobform.cName" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-select v-model="jobform.jId" placeholder="请选择">
                            <el-option
                                v-for="item in joblist"
                                :key="item.jId"
                                :label="item.jName"
                                :value="item.jId">
                            </el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-if="typeButton == 'upjob'" @click="upperJob">确认修改</el-button>
                        <el-button type="primary" v-if="typeButton == 'enter'" @click="entersuss">确认拉入</el-button>
                        <el-button @click="upJob = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <applytable v-show="applyshow" @changeapplyshow="changeapplyshow"></applytable>
    </div>

</template>

<script>

    import  applytable from  "components/pageItme/applytable.vue"
    export default {
        components:{
            applytable
        },
        data: function(){
            return {
                applyshow:false,
                typeButton:"",//upjob---修改用户权限  enter----拉入本社 upuser---修改信息 adduser---添加人员
                upJob:false,
                selpram:{},
                bgshow:false,
                tableData:[],
                tableDataAll:[],
                personMess:{},
                activeName: 'first',
                form:{
                    fGroupId:1,
                    fGroupName:1,
                    file:[],
                    photo:[],
                    cUserNo:"",
                    cName:"",
                    dept:"",
                    birthday:"",
                    gender:"1",
                    national:"",
                    telPhone:"",
                    nativePlace:"",
                    weixinNumber:"",
                    cNickName:"",
                    tel:""
                },
                joblist:[],
                jobform:{
                    jId:""
                },
                pageSize:10,
                totalPage:0,
                alltotalPage:0,
                allpageSize:10,
            }
        },

        created:function () {
            this.cid = this.$route.query.communityId;
            this.getPersonList(1);
            this.getAllPersonList();
            this.getJobList()
        },

        methods:{

            setManag:function (item) {
                console.log(item);
            },
//            申请表页面显示和隐藏
            changeapplyshow:function () {
                this.applyshow = !this.applyshow
            },
//            获取社团的权限表
            getJobList:function () {
                let vm = this;
                $.ajax({
                    url: vm.url+"community/findCMJob.json",
                    dataType: "json",
                    data: {
                        cId:vm.cid
                    } ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode==0){
                            vm.joblist = data.dataInfo.listData
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
//            文件修改 item—form的想 mes存储位置
            changefile:function (item,mes) {
                this.form[item] = [];
                console.log(this.$refs[item].files[0]);
                this.form[item].push(this.$refs[item].files[0]);
                this.form[mes].fUrl = this.getFileUrl(item);
                console.log(this.form[mes])
            },



//            根据id获取图片src
            getFileUrl:function (item) {//根据图片获取src
                let url;
                if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
                    url = this.$refs[item].value;
                } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
                    url = window.URL.createObjectURL(this.$refs[item].files.item(0));
                } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
                    url = window.URL.createObjectURL(this.$refs[item].files.item(0));
                }else {
                    url = window.webkitURL.createObjectURL(this.$refs[item].files[0]);
                }
                return url;
            },
//            获取用户信息
            handleClick(item){
                console.log(item);
                let vm = this;
                this.typeButton ="upuser";
                $.ajax({
                    url: vm.url+"community/findCMUserByUserNo.json",
                    dataType: "json",
                    data: {
                        cUserNo:item.userNo,
                        uId:item.uId
                    } ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode==0){
                            vm.bgshow = true;
                            vm.form = data.dataInfo.listData[0];
                            vm.form.cmFile.fUrl = 'http://appinter.sunwoda.com'+ vm.form.cmFile.fUrl;
                            vm.form.cPhotoFile.fUrl = 'http://appinter.sunwoda.com'+ vm.form.cPhotoFile.fUrl;
                            vm.form.file=[];
                            vm.form.photo=[];
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
//            获取成员信息
            getPersonList:function (page) {
                let vm = this;
                vm.selpram ={};
                vm.selpram.cId = vm.cid;
                vm.selpram.pId = 6;
                vm.selpram.page = page;
                vm.selpram.pageSize = vm.pageSize;

                $.ajax({
                    url: vm.url+"community/findUserJobByCId.json",
                    dataType: "json",
                    data: vm.selpram ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode==0){
                          vm.tableData = data.dataInfo.listData;
                          vm.totalPage = data.dataInfo.pageInfo.totalPage;
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
//            获取所有成员列表
            getAllPersonList:function (page) {
                let vm = this;
                vm.selpram ={};
                vm.selpram.page = page;
                vm.selpram.pageSize = vm.pageSize;
                $.ajax({
                    url: vm.url+"community/findCMUser.json",
                    dataType: "json",
                    data: vm.selpram ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode==0){
                            vm.tableDataAll = data.dataInfo.listData;
                            vm.alltotalPage = data.dataInfo.pageInfo.totalPage;
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
//            设置权限界面出来
            setmanage:function (item) {
                console.log(item);
                let vm =this;
                vm.upJob = true;
                vm.jobform.cUserNo = item.cUserNo;
                vm.jobform.cName = item.cName;
                vm.jobform.jId = item.jName;
                vm.jobform.aId = item.aId;
                vm.jobform.uId = item.uId;
                vm.jobform.cId = vm.cid;
                vm.typeButton = "upjob"
                console.log(vm.jobform);
            },
//            修改权限确定按钮
            upperJob:function () {
                let vm = this;
                $.ajax({
                    url: vm.url+"community/updateUserJob.json",
                    dataType: "json",
                    data: vm.jobform,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode==0){
                            vm.upJob = false;
                            vm.getPersonList();
                            vm.jobform = {}
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
//            拉入本社按钮
            setenter:function (item) {
                let vm = this;
                vm.jobform={
                    jId:""
                };
                vm.upJob = true;
                vm.typeButton = "enter"
                vm.jobform.cUserNo = item.cUserNo;
                vm.jobform.cName = item.cName;
                vm.jobform.jId = "";
                vm.jobform.uId = item.uId;
                vm.jobform.cId = vm.cid
                console.log(vm.jobform);
            },
//            提交拉入请求
            entersuss:function () {
                let vm = this;

                var pram =  vm.jobform;
                console.log(pram)
                if(pram.jId ==""){
                    vm.$message("请选择岗位");
                    return
                }
                pram.pId = 6;
                $.ajax({
                    url: vm.url+"community/addUserJobByAdmin.json",
                    dataType: "json",
                    data: pram ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode==0){
                            vm.upJob = false
                            vm.getPersonList(1);
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },

            changePage:function (page) {
                this.getPersonList(page);
            },
            changSize:function (size) {
                this.pageSize=size;
                this.getPersonList(1);
            },
            changePageall:function (page) {
                this.getAllPersonList(page);
            },
            changSizeall:function (size) {
                this.allpageSize=size;
                this.getAllPersonList(1);
            },
            addbutton:function () {
                console.log("aaaaa");
                this.bgshow =true;
                this.typeButton ="adduser";
                this.form={
                    fGroupId:1,
                    fGroupName:1,

                    file:[],
                    photo:[],
                    cUserNo:"",
                    cName:"",
                    dept:"",
                    birthday:"",
                    gender:"1",
                    national:"",
                    telPhone:"",
                    nativePlace:"",
                    weixinNumber:"",
                    cNickName:"",
                    tel:"",

                }

            },
//            获取用户sap信息
            getSapmess:function () {
                let vm = this;
                if(vm.form.cUserNo ==""){
                    vm.$message("工号不能为空");
                    return;
                }

                $.ajax({
                    url: vm.url+"community/findCMUserByUserNo.json",
                    dataType: "json",
                    data:{cUserNo: vm.form.cUserNo} ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        if(data.statusCode==0){
                            vm.form = data.dataInfo.listData[0];
                            vm.form.cmFile={
                                fUrl:""
                            };
                            vm.form.cPhotoFile={
                                fUrl:""
                            };
                            if(data.dataInfo.listData[0].uId != 0){
                                console.log(vm.form);
                                vm.form.cmFile.fUrl = 'http://appinter.sunwoda.com'+ vm.form.cmFile.fUrl;
                                vm.form.cPhotoFile.fUrl = 'http://appinter.sunwoda.com'+ vm.form.cPhotoFile.fUrl;
                            }
                            vm.form.file=[];
                            vm.form.photo=[];

                        }

                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
            onSubmit:function (path) {
                let vm = this;
                console.log(vm.form);
                let ctime = this.dateFns.format(this.form.birthday,"YYYY-MM");
                let formData = new FormData();
                if(vm.form.file.length !== 0){
                    formData.append('file',vm.form.file[0]);
                    formData.append('fUrl',vm.form.cmFile.fUrl);
                    if(vm.typeButton =="upuser"){
                        formData.append('cFileId',vm.form.cmFile.cFileId);
                    }
                }
                console.log("aaaaa");
                if(vm.form.photo.length !== 0){
                    formData.append('photo',vm.form.photo[0]);
                    formData.append('photoUrl',vm.form.cPhotoFile.fUrl);
                    if(vm.typeButton =="upuser"){
                        formData.append('cPhotoId',vm.form.cPhotoFile.cFileId);
                    }
                }
                formData.append('cUserNo',vm.form.cUserNo);
                formData.append('uId',vm.form.uId);
                formData.append('cName',vm.form.cName);
                formData.append('birthday',ctime);
                formData.append('dept',vm.form.dept);
                formData.append('gender',vm.form.gender);
                formData.append('national',vm.form.national);
                formData.append('telPhone',vm.form.telPhone);
                formData.append('nativePlace',vm.form.nativePlace);
                formData.append('weixinNumber',vm.form.weixinNumber);
                formData.append('cNickName',vm.form.cNickName);
                formData.append('tel',vm.form.tel);
                formData.append('fGroupId',1);
                formData.append('fGroupName',1);
                console.log(vm.form);
                $.ajax({
                    url: vm.url + "community/"+path,
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
                        if(obj.statusCode ==0){
                            vm.bgshow = false;
                            vm.getPersonList(1);
                            vm.getAllPersonList(1);
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

    .photo{
        width: 60px;
        height: 60px;
        border: solid 1px #e4e4e4;
        border-radius: 5px;
        position: relative;
    }
    .imginput{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
.personManage{
    padding: 20px;
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
    z-index: 999;
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
