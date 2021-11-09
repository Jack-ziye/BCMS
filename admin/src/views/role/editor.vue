<template>
  <div class="editor">
    <div class="letf">
      <el-page-header @back="goBack()"></el-page-header>
      <div class="content">
        <el-form
          ref="ruleform"
          :model="model"
          label-position="right"
          @submit.native.prevent="saveData()"
        >
          <el-form-item label="用户名" prop="username">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.image" :src="model.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="model.phone"></el-input>
          </el-form-item>
          <el-form-item label="管理员">
            <el-switch v-model="model.admin"> </el-switch>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="model.date"
              type="date"
              format="yyyy / MM / dd "
              value-format="yyyy/MM/dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  created() {
    this.id && this.getData();
  },
  methods: {
    goBack() {
      history.back();
    },
    async getData() {
      const { data } = await this.$http.get(`getRole/${this.id}`);
      this.model = data;
    },
    async saveData() {
      if (this.id) await this.$http.put("updataRole", this.model);
      else await this.$http.post("addRole", this.model);
      history.back();
    },
    afterUpload(res) {
      this.$set(this.model, "image", res.url);
    },
  },
};
</script>


<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  .letf,
  .right {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
  }
}

$page_height: 0.3125rem /* 60/192 */;
::v-deep .el-page-header {
  height: $page_height;
  line-height: $page_height;
  padding-left: 0.104167rem /* 20/192 */;
  .el-page-header__title {
    font-size: 0.125rem /* 24/192 */;
  }
  i {
    font-size: 0.15625rem /* 30/192 */;
  }
}

.letf {
  border-right: solid 1px #dcdfe6;

  .content {
    width: 100%;
    height: calc(100% - #{$page_height});
    border: solid 1px #fff;
    padding: 0.208333rem /* 40/192 */;
  }
}

::v-deep .el-form-item {
  $width: 0.78125rem /* 150/192 */;
  .el-form-item__error {
    font-size: 0.087848rem;
    margin-top: 0.029283rem;
    padding: 0;
  }
  .el-form-item__label {
    width: $width;
    display: inline-block;
    height: 0.3125rem /* 60/192 */;
    line-height: 0.3125rem /* 60/192 */;
    float: none;
    padding: 0px 0.104167rem /* 20/192 */;
    font-size: 0.104167rem /* 20/192 */;
  }
  .el-form-item__content {
    display: inline-block;
    width: calc(100% - #{$width * 2});
    .el-input {
      font-size: 0.102489rem;
      .el-input__inner {
        height: 0.292826rem;
        line-height: 0.292826rem;
        border: none;
        border-bottom: solid 1px #dcdfe6;
        border-radius: 0;
        background-color: transparent;
        padding: 0px 0.078125rem /* 15/192 */;
        letter-spacing: 2px;
        &:focus {
          border-bottom: solid 1px #000;
        }
      }
    }
  }
}

.right {
  padding: 0.520833rem /* 100/192 */;
}

::v-deep .avatar-uploader {
  width: 100%;
  height: 100%;
  text-align: center;

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 0.520833rem /* 100/192 */;
    height: 0.520833rem /* 100/192 */;
    line-height: 0.520833rem /* 100/192 */;
    text-align: center;
  }
  .avatar {
    width: 0.520833rem /* 100/192 */;
    height: 0.520833rem /* 100/192 */;
    display: block;
  }
}
</style>
