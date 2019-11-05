<template>
  <div class="wrapper">
    <HomeHeader/>
    <HomeAside/>
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          <small>众包公司员工异常生产数据预警>><b>整体分析</b></small>
        </h1>
      </section>
      <section class="content">
        <template>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="450">
            <el-table-column
              fixed
              prop="date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="province"
              label="省份"
              width="100">
            </el-table-column>
            <el-table-column
              prop="city"
              label="市区"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="邮编"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                   slot="reference"
                   size="mini"
                   type="danger"
                   @click.native.prevent="handleDelete(scope.$index, tableData)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

        </template>
      </section>



      <!-- 编辑窗口 -->
      <el-dialog
        title="编辑"
        :visible.sync="editFormVisible"
      >
        <el-form
          :model="editForm"
          ref="editForm"
        >
          <el-form-item
            label="日期"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.data"
              placeholder="请输入日期"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="姓名"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.name"
              autocomplete="off"
              placeholder="请输入姓名"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="年龄"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.age"
              autocomplete="off"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="省份"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.province"
              autocomplete="off"
              placeholder="请输入省份"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="市区"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.city"
              autocomplete="off"
              placeholder="请输入市区"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="地址"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.address"
              autocomplete="off"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮编"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.postalCode"
              autocomplete="off"
              placeholder="请输入邮编"
              maxlength="6"
            ></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="cancel()">取消</el-button>
          <el-button
            type="primary"
            v-on:click="sumbitEditRow()"
            :loading="addLoading"
          >确定</el-button>
        </div>

      </el-dialog>



    </div>
    <HomeFoot/>
  </div>
</template>
<script>
  import HomeHeader from '@/common/header/Header.vue'
  import HomeAside from '@/common/aside/aside'
  import HomeFoot from '@/common/foot/Foot'
  export default {
    name: 'home',
    components: {
      'HomeHeader': HomeHeader,
      'HomeAside': HomeAside,
      'HomeFoot': HomeFoot,
    },
    data() {
      return {
          // visible: false,
        checked: true,
        tableform: [],
        formLabelWidth: '120px',
        editFormVisible: false,//是否显示编辑窗口
        editForm: [],
        radio: 1,
        tableData: [{
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },methods: {
      //编辑数据
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        _index = index;
        // console.log(index)
        // console.log(_index)
        //取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
      },
      //保存编辑
      sumbitEditRow() {
        var editData = _index;
        this.tableform[editData].name = this.editForm.name;
        this.tableform[editData].age = this.editForm.age;
        this.tableform[editData].radio = this.editForm.radio;
        this.tableform[editData].data = this.editForm.data;
        this.tableform[editData].address = this.editForm.address;
        this.editFormVisible = false;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err
          })
        })
      },
    }
  }

</script>
<style>

</style>
