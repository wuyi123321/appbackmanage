<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"  unique-opened router>
            <template v-for="item in  items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item  v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-document',
                        index: 'community',
                        title: '社团管理'
                    },
//                    {
//                        icon: 'el-icon-menu',
//                        index: '2',
//                        title: '资产查询',
//                        subs: [
//                            {
//                                index: 'pdaready',
//                                title: '已盘点查询'
//                            },
//                            {
//                                index: 'pdanoready',
//                                title: '未盘点查询'
//                            },
//                            {
//                                index: 'pdamess',
//                                title: '全部资产查询'
//                            },
//                            {
//                                index: 'pdanew',
//                                title: '新增资产查询'
//                            },
//                        ]
//
//                    },

                ],
                pids:[],
                datas:[]

            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },

        mounted:function () {

        },
        methods:{
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu-vertical-demo{
        margin-top: 30px;
        margin-left: 20px;
        margin-bottom:20px;
        background: #ffffff;
        border: solid 1px #eee;
    }
    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        color: #20a0ff;
        border-right: 2px solid;
    }
</style>
