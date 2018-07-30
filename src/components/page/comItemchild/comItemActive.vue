<template>
    <div class="personManage">

        <el-button type="primary" @click="addbutton">添加活动</el-button>
        <el-radio class="radio" v-model="isApply" label="1">已发布</el-radio>
        <el-radio class="radio" v-model="isApply" label="2">未发布</el-radio>
        <div style="height: 20px"></div>
        <div v-if="tableData.length==0" style="text-align: center;color: #888;margin-top: 5px" >暂时没有活动，快去添加活动吧!</div>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(o, index) in tableData " :key="index" style="margin-bottom: 20px">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="actimg" class="image">
                    <div style="padding: 14px;border-bottom: solid 1px #eee">
                        <span class="actitle">{{o.acName}}</span>
                        <div class="bottom clearfix">
                            <time class="time">开始时间:{{o.hostStartStr}}</time><br>
                            <time class="time">结束时间:{{o.hostEndStr}}</time>
                            <div class="buttcon">
                                <el-button type="text" class="button" @click="goacItem(o)">查看详情</el-button>
                            </div>
                        </div>

                    </div>
                    <div style="padding: 14px;height: 18px">
                        <span>{{o.area}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="bgedit" v-show="bgshow">
            <div class="bgcontent">
                <el-form  :model="form" ref="ruleForm"  :rules="rules" label-width="120px">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(1)">确认新增</el-button>
                        <el-button type="primary" @click="onSubmit(2)" >暂存</el-button>

                        <el-button @click="bgshow = false">取消</el-button>
                    </el-form-item>
                    <el-form-item label="活动名称" prop="acName">
                        <el-input v-model="form.acName" ></el-input>
                    </el-form-item>
                    <el-form-item label="活动图片"  prop="acPIdFile">
                        <input  type="file" @change="changefile" ref="fileImgM" accept="image/*" ></input>
                    </el-form-item>
                    <el-form-item label="活动人数" prop="ceilNumber">
                        <el-input type="number"  v-model="form.ceilNumber" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="活动地点" prop="area">
                        <el-input   v-model="form.area" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="报名费用" prop="acPrice">
                        <el-input type="number"  v-model="form.acPrice" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="参赛人员"  prop="objectName">
                        <el-select v-model="form.objectName" multiple placeholder="请选择">
                            <el-option
                                v-for="item in objectNamelist"
                                :key="item.cId"
                                :label="item.cName"
                                :value="item.cId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="报名开始时间" prop="signUpStartStr">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.signUpStartStr" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="报名结束时间" prop="signUpEndStr">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.signUpEndStr" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动开始时间" prop="hostStartStr">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.hostStartStr" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动开始时间" prop="hostEndStr">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.hostEndStr" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动简介">
                        <vue-editor v-model="content"></vue-editor>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
    import actimg from "src/assets/active.png"
    import { VueEditor } from 'vue2-editor'
    import { mapMutations } from 'vuex'
    export default {
        data: function(){
            return {
                isApply:"1",
                actimg:actimg,
                selpram:{},
                bgshow:false,
                tableData:[],
                personMess:{},
                content:'<p><strong style=\"color: rgb(102, 102, 102);\">【讲座时间】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">2018年6月16日（星期六）14:30至17:00</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【讲座主题】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">溯溪知识</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【适合对象】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">户外运动爱好者</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【讲师姓名】</strong><span style=\"color: rgb(102, 102, 102);\">&nbsp;</span></p><p><span style=\"color: rgb(102, 102, 102);\">孙志宏（磨房ID：</span><strong style=\"color: rgb(102, 102, 102);\">独自等待</strong><span style=\"color: rgb(102, 102, 102);\">）</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【讲师简介】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">溪涧运动版版主</span></p><p><span style=\"color: rgb(102, 102, 102);\">深登协教练</span></p><p><span style=\"color: rgb(102, 102, 102);\">磨房讲师团成员</span></p><p><span style=\"color: rgb(102, 102, 102);\">详细个人情况：</span></p><p><a href=\"http://www.doyouhike.net/user/144298/\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">http://www.doyouhike.net/user/144298/</a></p><p><span style=\"color: rgb(102, 102, 102);\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p><strong style=\"color: rgb(102, 102, 102);\">【内容简介】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">1、认识溯溪运动</span></p><p><span style=\"color: rgb(102, 102, 102);\">2、认识溪谷</span></p><p><span style=\"color: rgb(102, 102, 102);\">3、溯溪活动准备</span></p><p><span style=\"color: rgb(102, 102, 102);\">4、溪谷行进</span></p><p><span style=\"color: rgb(102, 102, 102);\">5、风险控制</span></p><p><span style=\"color: rgb(102, 102, 102);\">6、溯溪环保</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【讲座安排】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">14:20~14:30&nbsp;签到</span></p><p><span style=\"color: rgb(102, 102, 102);\">14:30~16:30&nbsp;上课</span></p><p><span style=\"color: rgb(102, 102, 102);\">16:30~16:40清场</span></p><p><span style=\"color: rgb(102, 102, 102);\">注：准时关门上课、因考虑场地与教学质量因素，不接受空降。不属于报名名单内人员，请勿擅自进入教室。不便之处，敬请见谅！</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【讲座地点】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">越秀区东风东路801号四五八医院五楼501会议室（电梯至4楼后步行上5楼）</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【交通方式】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">公交：①锦城花园（四五八医院），步行300米</span></p><p><span style=\"color: rgb(102, 102, 102);\">地铁：①杨箕C出口，步行700米；②动物园C出口，步行900米</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【讲座费用】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">免费</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【报名须知】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">1、为避免浪费名额和资源，请勿随意报名并无故缺席。</span></p><p><span style=\"color: rgb(102, 102, 102);\">2、缺席者将被要求捐款15元进入宣导基金并可能丧失今后参加宣导活动的资格。</span></p><p><span style=\"color: rgb(102, 102, 102);\">3、上课前请关闭手机或者将手机调到震动无声状态。</span></p><p><span style=\"color: rgb(102, 102, 102);\">4、请遵守秩序，在讲座课室内不要吸烟，课后桌椅归位。</span></p><p><span style=\"color: rgb(102, 102, 102);\">5、请保管好贵重物品，以防丢失。</span></p><p><span style=\"color: rgb(102, 102, 102);\">6、所有带入教室的东西（包括产生的垃圾）请课后自行带走。</span></p><p><br></p><p><strong style=\"color: rgb(102, 102, 102);\">【磨房安全宣导小组简介】</strong></p><p><span style=\"color: rgb(102, 102, 102);\">安全宣导小组（英文全称Safety Promotion Team，简称：SPT），于2006年1月18日正式成立。安全宣导小组旨在推广户外安全理念，通过组织开展讲座、培训、户外实践等多种形式的活动，积极地传播户外安全知识，为广大户外运动爱好者提供一个学习和交流的平台。成立以来，已举办各类活动数百次，累计参加活动人员数千人次，对户外安全起到了积极的宣传和引导作用。今后，安全宣导小组仍将致力于户外安全推广工作，也希望热心的您能够加入到我们的行列，共同推动安全宣导小组的发展。</span></p>',
//          content:"",
                editorOption: {
                    // something config
                },


                form:{
                    fGroupId:"1",
                    fGroupName:"1",
                    acName:"",
                    area:"",
                    acPIdFile:[],
                    signUpStartStr:new Date(),
                    signUpEndStr:new Date(),
                    hostStartStr:new Date(),
                    hostEndStr:new Date(),
                    ceilNumber:"10",
                    acPrice:"0",
                    objectName:[]
                },
                rules:{
                    acPIdFile:{type: 'array', required: true, message: '请选择活动照片', trigger: 'change'},
                    objectName:{type: 'array', required: true, message: '请选择参加人员', trigger: 'change'},
                    acName:[ { required: true, message: '请输入活动名称', trigger: 'blur' },],
                    area:{ required: true, message: '请输入活动地点', trigger: 'blur' },
                    signUpStartStr:[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
                    signUpEndStr:{ type: 'date', required: true, message: '请选择日期', trigger: 'change' },
                    hostStartStr:{ type: 'date', required: true, message: '请选择日期', trigger: 'change' },
                    hostEndStr:{ type: 'date', required: true, message: '请选择日期', trigger: 'change' },
                    ceilNumber:{ required: true, message: '请输入参加人数', trigger: 'blur' },
                    acPrice:{  required: true, message: '请输入报名费用', trigger: 'blur' },

                },
                objectNamelist:[],
                selectJid:""

            }
        },
        components: {
            VueEditor
        },
        watch:{
            isApply:function (val,old) {
                this.getActiveList(val,1);
            }
        },
        created:function () {
            this.cid = this.$route.query.communityId;
            this.getActiveList(1,1);
            this.getaEbleList();
        },

        methods:{
            goacItem:function (item) {
                console.log(item);
                this.$router.push({path:"ActiveItem",query:{communityId:this.cid}})
                this.setactiveItem(item);
            },
            ...mapMutations("active",{
                setactiveItem: 'setactiveItem' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
            }),
            changefile:function () {
                this.form.acPIdFile = [];
                this.form.acPIdFile.push(this.$refs.fileImgM.files[0]);
                console.log(this.form.acPIdFile);
            },
            addbutton:function () {
                let vm = this;
                vm.bgshow = true;
                vm.addjob = true;
                vm.form.jName = "";
                vm.form.jLevel = 1;
                vm.form.pJId = -1;
                vm.form.jArea = "";
                vm.form.jMessage = "";
            },
            handleClick(item){
                console.log(item);
                let vm = this;
                vm.bgshow = true;
                vm.addjob = false;
                vm.form.jName = item.jName;
                vm.form.jLevel = item.jLevel;
                vm.form.pJId = item.pJId;
                vm.form.jArea = item.jArea;
                vm.form.jMessage = item.jMessage;
                vm.selectJid = item.jId;
            },
            getActiveList:function (isplay,page) {
                let vm = this;
                vm.selpram.cId = vm.cid;
                vm.selpram.page = page
                vm.selpram.acReleaseState = isplay;//是否发布  1发布 2未发布
                $.ajax({
                    url: vm.url+"community/findActivityList.json",
                    dataType: "json",
                    data: vm.selpram ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.$message(data.message);
                        if(data.statusCode==0){
                            vm.tableData = data.dataInfo.listData
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
//            获取参与对象
            getaEbleList:function () {
                let vm = this;
                $.ajax({
                    url: vm.url+"community/findActivityObject.json",
                    dataType: "json",
                    data: vm.selpram ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        vm.objectNamelist = data.dataInfo.listData;
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
            getSapmess:function () {
                let vm = this;
                $.ajax({
                    url: vm.url+"community/findUserJobByCId.json",
                    dataType: "json",
                    data: vm.form.cUserNo ,
                    type: "get",
                    success: function(data) {
                        console.log(data);
                        if(data.statusCode===0){
                        }
                    },
                    error: function() {
                        vm.$message("维护中。。。");
                        vm.refreshing = false;
                    }
                });
            },
            subgorm:function (acReleaseState) {
                let vm = this;
                let signUpStartStr = this.dateFns.format(this.form.signUpStartStr,"YYYY-MM-DD HH:mm:ss"),
                    signUpEndStr = this.dateFns.format(this.form.signUpEndStr,"YYYY-MM-DD HH:mm:ss"),
                    hostStartStr = this.dateFns.format(this.form.hostStartStr,"YYYY-MM-DD HH:mm:ss"),
                    hostEndStr = this.dateFns.format(this.form.hostEndStr,"YYYY-MM-DD HH:mm:ss");
                let formData = new FormData();
                console.log(vm.form);
                formData.append('cId',vm.cid );
                formData.append('acReleaseState',acReleaseState);
                formData.append('acName',vm.form.acName);
                formData.append('area',vm.form.area);
                formData.append('createUId',2);
                formData.append('signUpStartStr',signUpStartStr);
                formData.append('signUpEndStr',signUpEndStr);
                formData.append('hostStartStr',hostStartStr);
                formData.append('hostEndStr',hostEndStr);
                formData.append('objectName',vm.form.objectName.join(","));
                formData.append('ceilNumber',vm.form.ceilNumber);
                formData.append('fGroupId',1);
                formData.append('fGroupName',1);
                formData.append('acPrice',vm.form.acPrice);
                formData.append('acPIdFile',vm.form.acPIdFile[0]);
                formData.append('acIntroduce',vm.content);
                console.log(formData);
                $.ajax({
                    url: vm.url + "community/insertActivity.json",
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
                            vm.getActiveList(acReleaseState,1);
                        }
                        console.log(obj);
                    },
                    error:function () {
                        vm.loading = false;
                        vm.$message("上传错误");
                    }
                })
            },
            onSubmit:function (acReleaseState) {//1表示发布，2表示未
                let vm = this;
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        vm.subgorm(acReleaseState)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .image{
        height: 150px;
        width: 100%;
    }
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
        width: 960px;
        min-height: 50%;
        max-height: 90%;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        overflow-y: scroll;
    }
    .buttcon{
        position: relative;
        height: 25px;
    }
    .clearfix .button {
        position: absolute;
        right: 10px;

    }
    .clearfix time{
         font-size: 14px;
         color: #888;
    }

    .actitle{
        display: block;
        padding-bottom: 10px
    }
</style>
