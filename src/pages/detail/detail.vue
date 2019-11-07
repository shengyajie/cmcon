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
          <el-form :inline="true">
            <el-form-item style="float: left" label="查询用户信息:">
              <el-input v-model="keyUser" placeholder="查询所需要的内容......"></el-input>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="primary" size="small" icon="el-icon-edit-outline"  @click="addRow()">添加</el-button>
            </el-form-item>
          </el-form>

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
              v-model="editForm.editdate"
              placeholder="请输入日期"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="姓名"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.editname"
              autocomplete="off"
              placeholder="请输入姓名"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="省份"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.editprovince"
              autocomplete="off"
              placeholder="请输入省份"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="市区"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.editcity"
              autocomplete="off"
              placeholder="请输入市区"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="地址"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.editaddress"
              autocomplete="off"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮编"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.editzip"
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


      <!-- 新增窗口 -->
      <el-dialog
        title="新增"
        :visible.sync="addFormVisible"
      >
        <el-form
          :model="addForm"
          ref="addForm"
        >
          <el-form-item
            label="日期"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.adddate"
              placeholder="请输入日期"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="姓名"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addname"
              autocomplete="off"
              placeholder="请输入姓名"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="省份"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addprovince"
              autocomplete="off"
              placeholder="请输入省份"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="市区"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addcity"
              autocomplete="off"
              placeholder="请输入市区"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="地址"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addaddress"
              autocomplete="off"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮编"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addzip"
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
            @click="sumbitAddRow()"
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
  var _index ;//定义一个全局变量，以获取行数据的行号
  export default {
    name: 'home',
    components: {
      'HomeHeader': HomeHeader,
      'HomeAside': HomeAside,
      'HomeFoot': HomeFoot,
    },
    data() {
      return {
        checked: true,
        formLabelWidth: '120px',
        editFormVisible: false,//是否显示编辑窗口
        addLoading: false,
        editForm: [],
        addFormVisible: false,//是否显示新增窗口
        addForm: [],
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
      },
      //保存编辑
      sumbitEditRow() {
        var editData = _index;
        this.tableData[editData].date = this.editForm.editdate;
        this.tableData[editData].name = this.editForm.editname;
        this.tableData[editData].province = this.editForm.editprovince;
        this.tableData[editData].city = this.editForm.editcity;
        this.tableData[editData].address = this.editForm.editaddress;
        this.tableData[editData].zip = this.editForm.editzip;
        this.editFormVisible = false;
      },
    cancel() {
      this.addFormVisible = false;
      this.editFormVisible = false;
    },
      //新增数据
      addRow() {
        this.addFormVisible = true;
        this.addForm = {
          adddate: '',
          addname: '',
          addprovince: '',
          addcity: '',
          addaddress:'',
          addzip:''
        }
      },
      //将新增的数据添加到表格中
      sumbitAddRow() {
        this.tableData = this.tableData || []
        this.tableData.push({
          date:this.addForm.adddate,
          name:this.addForm.addname,
          province:this.addForm.addprovince,
          city:this.addForm.addcity,
          address:this.addForm.addaddress,
          zip:this.addForm.addzip

        })
        this.addFormVisible = false
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
            message: "取消成功！"
          })
        })
      }
    }
  }

</script>
<style>

</style>
