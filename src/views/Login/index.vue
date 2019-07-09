<template>
    <div class="login-container">
        <!-- appppp -->
        <el-card class="login-card">
            <img src="../../assets/iamges/logo_index.png">
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.login-container{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url('../../assets/iamges/login_bg.jpg') no-repeat center / cover;
    .login-card{
        width: 300px;
        height: 300px;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%)
    }
}
</style>
