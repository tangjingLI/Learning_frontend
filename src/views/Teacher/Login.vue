<template>
  <div class="login">

    <div class="logo">
      <img src="../../assets/logo.png" id="token">
      <p>个性化学习过程管理与推荐系统</p>
    </div>

    <div id="box">
      <div id="b1">
        <img src="../../assets/login_teacher.jpg" id="image">
      </div>

      <div id="b2">
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
        >
          <a-form-item class="top">
            <h1>教师端登录</h1>
          </a-form-item>
          <a-form-item class="text">
            <a-input
                v-decorator="[
                  'phone',
                  { rules: [
                      { required: true, message: '不能为空' },
                      { pattern: /^[1][3-9][0-9]{9}$/, message: '请输入正确手机号'}
                      ] },
                ]"
                placeholder="手机号"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item class="text">
            <a-input-password
                v-decorator="[
                  'password',
                  { rules: [
                      { required: true, message: '不能为空' },
                      {pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,message: '请输入6-16位密码，必须包含英文字母和数字'}
                      ] },
                ]"
                type="password"
                placeholder="密码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
            </a-input-password>
          </a-form-item>
          <a-form-item class="bottom">
            <a-button type="primary" html-type="submit" class="login-form-button">
              登录
            </a-button>
          </a-form-item>
        </a-form>

      </div>
    </div>
  </div>

</template>

<script>
import {login} from "../../api/login";

export default {
  name: "Login",
  data() {
    return {}
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async(err, values) => {
        if (!err) {
          console.log(values);
          let response = await login(values.phone, values.password);
          if (response.code==0) {
            console.log(response.data)
            window.sessionStorage.setItem('isLogin', 'true');
            await this.$store.dispatch('asyncUpdateTeacher', {phone: values.phone, id: response.data.id});
            await this.$router.push('/teacher');
            this.$message.success('欢迎登录');
          } else {
            this.$message.warning("手机号或密码错误");
            this.form.resetFields();
          }
        }
      });
    }
  }
}
</script>


<style scoped>
.logo {
  width: 500px;
  height: 60px;
  position: fixed;
  top: 8%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  margin: 50px auto;
  overflow: auto;
}

#box {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 70px;
  box-shadow: 2px 2px 10px #939393;
  width: 900px;
  height: 450px;
  display: inline-block;
  margin: 0 auto;
  overflow: auto;
}

#b1 {
  width: 50%;
  height: 100%;
  float: left;
}

#b2 {
  width: 50%;
  height: 100%;
  margin-left: 50%;
}

#image {
  height: 100%;
  width: 100%;
}

#token {
  width: 50px;
  float: left;
  margin-right: 15px;
}

.logo p {
  font-weight: bold;
  font-size: 30px;
  margin: 5px auto;
}

#components-form-demo-normal-login {
  width: 90%;
  float: right;
  margin-right: 5%;
  margin-top: 5%;
}

#components-form-demo-normal-login .text {
  margin-top: 30px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .bottom {
  margin-top: 10px;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
  height: 10%;
  box-shadow: 0 3px 2px #e0dfdf;
  border-radius: 70px;
  text-decoration: none;
  text-transform: uppercase;
  background-color: #409eff;
  color: white;
  padding: 5px 12px;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  font-weight: bolder;
  transition-duration: 0.4s;
  cursor: pointer;
  margin-top: 40px;
  /*position: relative;*/
  /*left: 50%;*/
  /*top: 40%;*/
  /*transform: translate(-50%, -50%);*/
  border: none;
}

.top h1 {
  text-align: center;
  margin-top: 30px;
  color: #4A5252;
  font-size: 28px;
  font-weight: bolder;
}

</style>