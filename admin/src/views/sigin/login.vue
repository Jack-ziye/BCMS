<template>
  <div class="login">
    <div class="box">
      <div class="left">
        <div class="contert">{{ text }}</div>
      </div>
      <div class="right" :class="{ logintype: logintype }">
        <div class="title">SIGN IN</div>
        <div class="content">
          <div class="cont">
            <el-form
              :model="model2"
              :rules="rules2"
              ref="ruleForm2"
              @submit.native.prevent="logining('ruleForm2')"
            >
              <el-form-item prop="phone">
                <el-input
                  type="text"
                  ref="phone"
                  v-model="model2.phone"
                  prefix-icon="el-icon-mobile"
                  placeholder="请输入手机号"
                  @focus="clearVali('ruleForm2', 'phone')"
                  @input="isphone('model2', 'phone', model2.phone)"
                />
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  type="text"
                  v-model="model2.code"
                  prefix-icon="el-icon-key"
                  placeholder="请输入验证码"
                  @focus="clearVali('ruleForm2', 'code')"
                />
                <span @click="getCode()">{{ msg }}</span>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="isagree">同意此协议</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit"
                  >立即登录
                </el-button>
              </el-form-item>
            </el-form>
            <div class="typebtn" @click="cleardata()">其他方式登录</div>
          </div>

          <div class="cont">
            <el-form
              :model="model"
              :rules="rules"
              ref="ruleForm"
              status-icon
              @submit.native.prevent="logining('ruleForm')"
            >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  prefix-icon="el-icon-user"
                  v-model="model.username"
                  ref="username"
                  placeholder="请输入账号/手机号"
                  @focus="clearVali('ruleForm', 'username')"
                  @input="isphone('model', 'username', model.username)"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="model.password"
                  placeholder="请输入密码"
                  @focus="clearVali('ruleForm', 'password')"
                />
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="commit">记住账号</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit"
                  >立即登录
                </el-button>
              </el-form-item>
            </el-form>
            <div class="typebtn" @click="cleardata()">其他方式登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logintype: false,
      commit: false,
      isagree: false,
      msg: "获取验证码",
      isgetcode: false,
      text: "",
      model: {},
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 12, message: "长度3-12个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度6-18个字符", trigger: "blur" },
        ],
      },
      model2: {},
      rules2: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, message: "输入错误", trigger: "blur" },
        ],
        code: { required: true, message: "请输入验证码", trigger: "blur" },
      },
    };
  },
  created() {
    this.text =
      "外界的事物不会永远地满足你的需求，它们只会暂时地和表面上地满足你，但是你也许要多次体验这些失望后，才能认识到这些事实。事物和生活条件可以给你快乐，但它无法给你喜悦。喜悦是你内在宁静状态的关键部分；它是你的自然状态，不是努力才能获得的。";
  },
  methods: {
    clearVali(val, pro) {
      this.$refs[val].clearValidate(pro);
    },
    cleardata() {
      if (this.logintype) {
        this.model = {};
        this.$refs.ruleForm.clearValidate();
        setTimeout(() => {
          this.$refs.username.focus();
        }, 400);
      } else {
        this.model2 = {};
        this.$refs.ruleForm2.clearValidate();
        setTimeout(() => {
          this.$refs.phone.focus();
        }, 400);
      }
      this.logintype = !this.logintype;
    },
    isphone(ref, name, data) {
      if ((data[0] >= "0" && data[0] <= "9") || ref == "model2") {
        if (data[data.length - 1] < "0" || data[data.length - 1] > "9") {
          this[ref][name] = data.substring(0, data.length - 1);
        } else if (data.length > 11) {
          this[ref][name] = data.substring(0, 11);
        }
      }
    },
    logining(val) {
      this.$refs[val].validate(async (valid) => {
        if (valid) {
          let res = "";
          if (this.logintype) {
            res = await this.$http.post("phonelogin", this.model2);
          } else {
            res = await this.$http.post("login", this.model);
          }
          sessionStorage.token = res.data.token;
          const loading = this.$loading({
            lock: true,
            text: "正在登陆中，请稍候",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          this.$nextTick(() => {
            this.$router.push("/home");
            loading.close();
          });
        }
      });
    },
    getCode() {
      this.$refs["ruleForm2"].validateField("phone", async (val) => {
        if (val == "") {
          if (this.isgetcode) return;
          this.isgetcode = true;
          await this.$http.post("getCode", this.model2);
          let i = 0;
          this.msg = 59 - i + "s后重新获取";
          let t = setInterval(() => {
            this.msg = 58 - i + "s后重新获取";
            if (i++ == 59) {
              this.msg = "重新获取";
              this.isgetcode = false;
              clearInterval(t);
            }
          }, 1000);
        }
      });
    },
  },
  mounted() {
    this.$refs.username.focus();
  },
};
</script>

<style lang="scss" scoped>
.login {
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  .box {
    width: 5.124451rem;
    height: 3.29429rem;
    min-width: 520px;
    min-height: 340px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px #9b9b9b;
    display: flex;
  }
}

.left {
  width: 50%;
  height: 100%;
  position: relative;
  background: url("../../assets/book.jpg") center center no-repeat;
  background-size: 100% 100%;

  .contert {
    width: 100%;
    height: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    color: #000;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 0.146413rem;
    padding: 0.366032rem;
    font-family: "华文行楷";
    text-indent: 2em;
    line-height: 1.5em;
    word-wrap: break-word;
  }
}

.right {
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;

  $title_h: 0.585652rem;
  .title {
    width: 100%;
    height: $title_h;
    min-height: 50px;
    text-align: center;
    display: flex;
    flex-direction: column-reverse;
    font-size: 0.219619rem;
    font-weight: bold;
    letter-spacing: 0.029283rem;
    color: rgba(0, 102, 204, 0.6);
    text-shadow: 1px 2px 6px #fff, 0 0 0 #000, 1px 2px 6px #fff;
    user-select: none;
  }

  .content {
    height: calc(100% - 0.585652rem);
    position: relative;

    .cont {
      width: 100%;
      height: 100%;
      position: absolute;
      padding: 0.146413rem 0.366032rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: left 0.4s;
      &:nth-child(1) {
        left: -100%;
        span {
          right: 0px;
          position: absolute;
          color: blue;
          user-select: none;
        }
      }
      &:nth-child(2) {
        left: 0%;
      }
    }

    .typebtn {
      margin: 0px auto;
      padding: 0.043924rem 0px;
      font-size: 0.102489rem;
      user-select: none;
      cursor: pointer;
      &:hover {
        color: blue;
      }
    }
  }
}

.logintype {
  .content {
    .cont:nth-child(1) {
      left: 0%;
    }
    .cont:nth-child(2) {
      left: 100%;
    }
  }
}

::v-deep .el-button {
  width: 100%;
  height: 0.292826rem;
  min-height: 30px;
  border: none;
  font-size: 0.11713rem;
  letter-spacing: 1px;
  font-weight: bold;
  color: rgba(0, 102, 204, 0.4);
  background-image: linear-gradient(#6dd5ed, #2193b0);
  text-shadow: 1px 2px 6px #409eff, 0 0 0 #000, 1px 2px 6px #409eff;
}

::v-deep .el-input {
  font-size: 0.102489rem;
  .el-input__inner {
    height: 0.292826rem;
    line-height: 0.292826rem;
    // padding: 0;
    border: none;
    border-bottom: solid 1px #dcdfe6;
    border-radius: 0;
  }
}

::v-deep .el-form-item {
  margin-bottom: 0.175695rem;

  .el-form-item__error {
    font-size: 0.087848rem;
    margin-top: 0.029283rem;
    padding: 0;
  }
  .el-form-item__content {
    .el-checkbox {
      .el-checkbox__label {
        font-size: 0.102489rem;
      }
    }
  }
}
</style>
