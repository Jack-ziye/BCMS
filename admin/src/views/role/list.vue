<template>
  <div class="list">
    <el-table :data="tableData" height="calc(100% - #{$pager_height})">
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="admin" label="管理员">
        <el-switch :value="scope.row.admin" slot-scope="scope"> </el-switch>
      </el-table-column>
      <el-table-column prop="date" label="创建时间"> </el-table-column>
      <el-table-column prop="isdisable" label="状态">
        <el-switch
          v-model="scope.row.isdisable"
          slot-scope="scope"
          @change="UpdateStatus(scope.row)"
        >
        </el-switch>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button type="text" @click="$router.push('/role/editor')">
            添加
          </el-button>
        </template>
        <template v-if="scope.row.username != 'admin'" slot-scope="scope">
          <el-button
            type="text"
            class="el-icon-edit"
            @click="$router.push(`/role/editor/${scope.row._id}`)"
          ></el-button>
          <el-button
            type="text"
            class="el-icon-delete"
            @click="delData(scope.row)"
          ></el-button>
          <!-- <el-button
            type="text"
            class="el-icon-edit"
            @click="show()"
          ></el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="100"> </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: "拼命加载中",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.$nextTick(() => {
      this.getData();
      loading.close();
    });
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get("getRole");
      this.tableData = data;
    },
    async delData(id) {
      await this.$http.delete(`delRole/${id}`);
      this.getData();
    },
    async UpdateStatus(data) {
      await this.$http.put("updataRole", data);
      this.getData();
    },
  },
};
</script>


<style lang="scss" scoped>
$rd_font_size: 0.104167rem /* 20/192 */;
$pager_height: 0.3125rem /* 60/192 */;

.list {
  width: 100%;
  height: 100%;
}

::v-deep .el-table {
  height: calc(100% - #{$pager_height});
  overflow: auto;
  .has-gutter .el-table__cell {
    color: #fff;
    background-color: #474a48;
    // text-align: center;
    padding-left: 0.104167rem /* 20/192 */;
    .cell {
      font-size: $rd_font_size;
    }
    .el-button {
      padding: 0px 0.104167rem /* 20/192 */;
      font-size: 0.104167rem /* 20/192 */;
    }
  }
  .el-table__row {
    height: 50px;
    box-sizing: border-box;
    .el-table__cell {
      padding: 0px;
      padding-left: 0.104167rem /* 20/192 */;
      // text-align: center;
    }

    .cell {
      font-size: $rd_font_size * 0.9;
    }
    .el-button {
      padding-right: 0.104167rem /* 20/192 */;
      font-size: 0.104167rem /* 20/192 */;
    }
  }
}

::v-deep .el-pagination {
  // bottom: $rd_font_size;
  width: 100%;
  height: $pager_height;
  padding: 0px;
  // position: fixed;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-pager li {
    width: $pager_height;
    height: $pager_height;
    line-height: $pager_height;
    padding: 0px 0.104167rem /* 20/192 */;
    font-size: $rd_font_size;
  }
  button {
    padding: 0px 0.104167rem /* 20/192 */;
    background-size: $rd_font_size * 2;
  }
}
</style>
