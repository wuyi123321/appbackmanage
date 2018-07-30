<template>
    <div class="personManage">
        <div class="acItHeader">
            <div class="left-img">
                <img :src="actimg" width="100%" height="100%"/>
            </div>
            <div class="right-content">
                <div class="itemTitle">{{activeItem.acName}}</div>
                <ul>
                    <li>报名时间：{{activeItem.signUpStartStr}}至{{activeItem.signUpEndStr}}</li>
                    <li>活动时间：{{activeItem.hostStartStr}}至{{activeItem.hostEndStr}}</li>
                    <li>活动地点：{{activeItem.area}}</li>
                    <li>参加人员：{{activeItem.objectNameStr}}</li>
                    <li>报名成功/人数上限：0/{{activeItem.ceilNumber}}</li>
                </ul>
            </div>
            <div class="">
                <el-button @click="uppageshow"> 修改</el-button>
            </div>
        </div>
        <div class="contentTitle">
            <span>活动详情</span>
        </div>
       <div v-html="activeItem.acIntroduce" class="itemContent">

       </div>
        <div class="bgedit" v-show="bgshow">
            <div class="bgcontent">
                <el-form  :model="form" ref="ruleForm"  :rules="rules" label-width="120px">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(1)" >确认新增</el-button>
                        <el-button type="primary" @click="onSubmit(2)" >暂存</el-button>
                        <el-button @click="bgshow = false">取消</el-button>
                    </el-form-item>
                    <el-form-item label="活动名称" prop="acName">
                        <el-input v-model="form.acName" ></el-input>
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
    import { mapGetters } from 'vuex'
    import actimg from "src/assets/active.png"
    import { VueEditor } from 'vue2-editor'
    import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
    export default {
        components: {ElButton},
        data: function(){
            return {
                bgshow:false,
                actimg:actimg,
                content:"",
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
        computed: {
            // 使用对象展开运算符将 getter 混入 computed 对象中
            ...mapGetters('active', {
                activeItem: 'getactiveItem',
            })
        },
        watch:{

        },
        created:function () {
            this.getaEbleList();
        },


        methods:{
            uppageshow:function () {
                this.bgshow = true;

            },
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
        }
    }
</script>

<style scoped>
    .acItHeader{
        padding-top: 30px;
        padding-left: 50px;
        padding-right: 50px;
        padding-bottom: 5px;
        display: flex;
        border-bottom: solid 1px #eee;
    }

    .left-img{
        width: 300px;
        height: 180px;
    }
    .right-content{
        margin-left: 10px;
    }
   .itemContent{
       padding-top: 20px;
       padding-left: 50px;
       padding-right: 50px;
       padding-bottom: 20px;
   }
.itemTitle{
    height: 40px;
    font-size: 20px;
    color: #000;
    font-weight: 600;
}
    .right-content ul li{
        height: 25px;
        color: #888;
    }
    .contentTitle {
        padding-top: 20px;
        padding-left: 50px;
        padding-right: 50px;
        padding-bottom: 20px;
        font-size: 22px;
        color: #20a0ff;
        background-color: #eee;
        border-left: solid 5px #20a0ff;
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
</style>
