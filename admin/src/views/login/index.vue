<!--<template>-->
  <!--<div class="login-container">-->
    <!--<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">-->

      <!--<div class="title-container">-->
        <!--<h3 class="title">Login Form</h3>-->
      <!--</div>-->

      <!--<el-form-item prop="username">-->
        <!--<span class="svg-container">-->
          <!--<svg-icon icon-class="user" />-->
        <!--</span>-->
        <!--<el-input-->
          <!--ref="username"-->
          <!--v-model="loginForm.username"-->
          <!--placeholder="Username"-->
          <!--name="username"-->
          <!--type="text"-->
          <!--tabindex="1"-->
          <!--autocomplete="on"-->
        <!--/>-->
      <!--</el-form-item>-->

      <!--<el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>-->
        <!--<el-form-item prop="password">-->
          <!--<span class="svg-container">-->
            <!--<svg-icon icon-class="password" />-->
          <!--</span>-->
          <!--<el-input-->
            <!--:key="passwordType"-->
            <!--ref="password"-->
            <!--v-model="loginForm.password"-->
            <!--:type="passwordType"-->
            <!--placeholder="Password"-->
            <!--name="password"-->
            <!--tabindex="2"-->
            <!--autocomplete="on"-->
            <!--@keyup.native="checkCapslock"-->
            <!--@blur="capsTooltip = false"-->
            <!--@keyup.enter.native="handleLogin"-->
          <!--/>-->
          <!--<span class="show-pwd" @click="showPwd">-->
            <!--<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
          <!--</span>-->
        <!--</el-form-item>-->
      <!--</el-tooltip>-->

      <!--<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>-->

    <!--</el-form>-->


  <!--</div>-->
<!--</template>-->

<template>
  <div class="wrapper">
    <div class="left">
      <div class="left-pic" />
    </div>
    <div class="right">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left">
        <div class="title">{{ name }}</div>
        <el-form-item prop="username">
          <el-input
            ref="name"
            v-model="loginForm.username"
            autofocus="autofocus"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="请输入用户名"
            @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            name="password"
            auto-complete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="submit-btn"
            @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="copyright">
        由火创科技提供技术支持。<br>
        <a
          target="_blank"
          href="http://www.5kcrm.com">©2020 火创</a>
      </div>
    </div>

    <img
      :src="logo"
      class="logo" >
  </div>
</template>


<script>
  import { validUsername } from '@/utils/validate'
  // import SocialSign from './components/SocialSignin'

  export default {
    name: 'Login',
    // components: { SocialSign },
    data() {

      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不可少于6位数'))
        } else {
          callback()
        }
      }
      return {
        name:'果划算后台',
        loginForm: {
          username: 'admin',
          password: '12345678'
        },
        loginRules: {
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      checkCapslock({ shiftKey, key } = {}) {
        if (key && key.length === 1) {
          if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
            this.capsTooltip = true
          } else {
            this.capsTooltip = false
          }
        }
        if (key === 'CapsLock' && this.capsTooltip === true) {
          this.capsTooltip = false
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({ path: '/order/install', query: this.otherQuery })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>


<style lang="scss" scoped>
  $dark_gray: #ccc;
  $light_gray: #333;
  $login_theme: #00aaee;

  /deep/ input {
    border: 0 none;
    background-color: white;
    -webkit-appearance: none;
    &:-webkit-autofill {
      background-image: none;
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      -webkit-text-fill-color: $light_gray !important;
    }
  }
  /deep/ .el-input__inner {
    height: 40px;
    padding: 0 12px;
    background-color: white;
    border: 0 none;
    border-bottom: 1px solid #e6e6e6 !important;
  }
  /deep/ .el-form-item__error {
    left: 12px;
  }
  .wrapper {
    position: relative;
    width: 100%;
    min-width: 1300px;
    display: flex;
    height: 100%;
    .left {
      width: 68%;
      .left-pic {
        width: 100%;
        height: 100%;
        background: url('../../assets/img/login/login.png') no-repeat center;
        background-size: cover;
      }
    }
    .right {
      position: relative;
      width: 32%;
      background-color: #fff;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 6%;
      .el-form {
        width: 70%;
        .title {
          font-size: 26px;
          color: $light_gray;
          margin: 0 auto 50px;
          text-align: center;
        }
        .submit-btn {
          width: 100%;
          line-height: 2;
          font-size: 16px;
          color: white;
          border-radius: 3px;
          background-color: $login_theme;
          display: block;
        }
        .el-button {
          border: 0 none;
        }
        .action-control {
          color: #999;
          /deep/ .el-checkbox {
            .el-checkbox__label {
              color: #999;
            }
            .el-checkbox__input.is-checked .el-checkbox__inner {
              background-color: $login_theme;
              border-color: $login_theme;
            }
          }

          .forget {
            cursor: pointer;
            float: right;
          }
        }
      }

      .register {
        width: 70%;
        padding-top: 30px;
        color: $light_gray;
        border-top: 1px solid #e6e6e6;
        text-align: center;
        margin-top: 28px;
        .register-btn {
          color: $login_theme;
          cursor: pointer;
        }
      }

      .copyright {
        width: 92%;
        position: absolute;
        bottom: 2%;
        color: #d0d0d0;
        font-size: 12px;
        text-align: center;
        line-height: 1.5;
      }
    }

    .logo {
      position: absolute;
      left: 60px;
      top: 50px;
      width: 180px;
      height: 48px;
      z-index: 200;
    }
  }
</style>
