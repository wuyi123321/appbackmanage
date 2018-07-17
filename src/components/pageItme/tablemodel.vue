<template>
    <div class="table">
        <el-table :data="tableData" border ref="multipleTable" @selection-change="handleSelectionChange" v-loading.body="loading">
            <el-table-column prop="tagNumber" label="资产编号" sortable width="120">
            </el-table-column>

            <el-table-column prop="description" label="资产说明" sortable width="230" >
            </el-table-column>

            <el-table-column prop="deviceOldSn" label="内部编号" sortable width="130" >
            </el-table-column>
            <el-table-column prop="modelNumber" label="规格型号" sortable width="200">
            </el-table-column>

            <el-table-column prop="cmaNumber" label="仪校编码" sortable width="120">
            </el-table-column>

            <el-table-column  label="是否初盘" sortable  width="120">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.invIsFinance==1">是</span>
                        <span v-else>否</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  label="是否复盘" sortable width="120">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.invIsFinanceC==1">是</span>
                        <span v-else>否</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="deviceNumber" label="资产数量" sortable width="120" >
            </el-table-column>
            <el-table-column prop="unit" label="单位" sortable width="120">
            </el-table-column>
            <el-table-column prop="localtion" label="存放地点" sortable width="120">
            </el-table-column>
            <el-table-column prop="localtionArea" label="存放位置" sortable width="120" >
            </el-table-column>
            <el-table-column prop="useDept" label="使用部门" sortable width="140" >
            </el-table-column>
            <el-table-column prop="manageDept" label="资产归属部门" sortable width="150">
            </el-table-column>
            <el-table-column prop="leaderEmp" label="使用人主管" sortable width="130">
            </el-table-column>
            <el-table-column prop="userEmp" label="使用人" sortable width="120" >
            </el-table-column>
            <el-table-column prop="createDateStr" label="录入时间" sortable width="200">
            </el-table-column>
            <el-table-column prop="invYM" label="盘点年月" sortable width="120" >
            </el-table-column>
            <el-table-column prop="createUserNO" label="录入人员" sortable width="120" >
            </el-table-column>
            <el-table-column prop="invCode" label="资产编号" sortable width="120" >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text">盘点详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="bgmess" v-show="bgshow">
            <div class="bgcontent">
                <div class="bgtitle">{{item.tagNumber}}盘点详情<p class="close" @click="bgshow = false"><i class="el-icon-close"></i></p></div>
                <div>
                    <span style="text-align: center">内容</span>
                    <span style="text-align: center">初盘</span>
                    <span style="text-align: center">复盘</span>
                </div>
                <div>
                    <span>是否盘点</span>
                    <span v-if="item.invIsFinance==1">是</span>
                    <span v-else>否</span>
                    <span v-if="item.invIsFinanceC==1">是</span>
                    <span v-else>否</span>
                </div>
                <div>
                    <span>盘点时间</span>
                    <span>{{item.invTimeStr}}</span>
                    <span>{{item.invTimeStrC}}</span>
                </div>
                <div>
                    <span>人员工号</span>
                    <span>{{item.invUserNo}}</span>
                    <span>{{item.invUserNoC}}</span>

                </div>
                <div>
                    <span>盘点状态</span>
                    <span>{{item.invStatusStr}}</span>
                    <span>{{item.invStatusStrC}}</span>
                </div>
                <div>
                    <span>是否更改标签</span>
                    <span>初盘</span>
                    <span>复盘</span>
                </div>
                <div>
                    <span>是否更改标签</span>
                    <span>{{item.nvReplaceStr}}</span>
                    <span>{{item.nvReplaceStrC}}</span>

                </div>
                <div>
                    <span>数据来源</span>
                    <span>{{item.invAdditional}}</span>
                    <span>{{item.invAdditionalC
                        }}</span>

                </div>
                <div>
                    <span>盘点部门</span>
                    <span>{{item.pdaDept}}</span>
                    <span>{{item.pdaDeptC}}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

    export default {

        components: {ElButton},
        props:{
            tableData: Array
        },
        data() {
            return {
                bgshow:false,
                loading:false,
                item:{},
            }
        },
        created(){

        },
        computed: {

        },
        watch:{

        },
        methods: {
            handleClick:function(item){
                console.log(item);
                this.bgshow = true;
                this.item = item;
            },

            handleSelectionChange:function () {

            }

        }
    }
</script>

<style scoped>
    .crumbs{
        display: flex;
        justify-content: space-between;
    }
    .pagination{
        margin-top: 20px;
        display: flex;
        height: 120px;
        justify-content: flex-end;
    }
    .grid-content{
        background-color: #bfcbd9;
        padding: 5px;
        display: flex;
        height: 40px;
    }
    .grid-content>span:first-child{
        width: 100px;
        line-height: 40px;
    }
    .grid-content>span:last-child{
        flex: 1;
        display: flex;
        align-items: center;
    }
    .bgmess{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
    .bgcontent{
        background-color: #fff;
        min-width: 550px;
    }

    .bgcontent .bgtitle{
        background-color: #20a0ff;
        color: #fff;
        line-height: 45px;
        text-align: center;
        justify-content: center;
        position: relative;
    }
    .bgtitle .close{
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        border: none;

    }
    .bgcontent>div{
        min-height: 45px;
        background-color: #afddff;
        border-bottom: solid 1px #fff;
        display: flex;

    }
    .bgcontent>div span{
        flex: 1;
        border-left: solid 1px#fff;
        line-height: 45px;
        padding-left: 12px;
        padding-right: 12px;
    }
    .bgcontent>div span:last-child{
        border-right: solid 1px#fff;
    }
</style>
