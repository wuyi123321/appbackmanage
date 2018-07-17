<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>

    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
    .el-pagination {
        white-space: nowrap;
        padding: 2px 5px;
        color: #48576a;
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }
</style>
