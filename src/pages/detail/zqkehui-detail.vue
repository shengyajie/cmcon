<template>
  <div class="wrapper">
    <HomeHeader/>
    <HomeAside/>
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          <small>鸿联公司员工异常生产数据预警>><b>班组排名</b></small>
        </h1>
      </section>
      <section class="content">
        <template>
          <div >
            <el-form :inline="true" style="display: flex;
    flex-direction: row;
     justify-content: flex-end;">

              <el-button  style="margin: 10px " type="primary" size="small" icon="el-icon-edit-outline"  @click="addRow()">添加</el-button>

              <el-button size="small" type="primary" style="margin: 10px" @click="download">导出数据</el-button>
              <h5 style="text-align: center; padding:15px 0px 0 20px;">搜索：</h5>
              <el-input  style="width: 200px; margin: 10px"  placeholder="请输入关键字" icon="search"  class="search"  v-model="search"></el-input>
              <!--搜索-->
            </el-form>

            <!-- 数据展示 -->
            <el-main font-size="12px">
              <el-table
                :data="tableData"
                id="tableData"
                stripe
                style="width: 100%"
                max-height="450"
                align="center"
                :row-style="{height:'20px'}"
                :cell-style="{padding:'0px'}">
                <el-table-column
                  prop="date"
                  width="100"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="subo"
                  width="100"
                  label="所属班组">
                </el-table-column>
                <el-table-column
                  prop="att"
                  width="80"
                  label="出勤人数"
                >
                </el-table-column>
                <el-table-column
                  prop="canum"
                  label="call量"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="acnum"
                  label="人均call量"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="tnum"
                  label="时call量"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="nran"
                  label="排名"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.nran | nran}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="均长"
                  label="atime"
                  width="80"
                  :sortable="true" :sort-method="sortByDate1">
                  <template slot-scope="scope">
                    {{scope.row.atime |atime}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tran"
                  label="排名"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.tran | tran}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="finra"
                  label="整理率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.finra | finra}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sbra"
                  label="小休率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.sbra |sbra}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="bra"
                  label="示忙率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.bra | bra}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="排名"
                  label="bran"
                  width="80"
                  :sortable="true" :sort-method="sortByDate1">
                  <template slot-scope="scope">
                    {{scope.row.bran |bran}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cuti"
                  label="通话利用率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.cuti | cuti}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="exra"
                  label="呼出占比（时长）"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.exra | exra}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="idra"
                  label="空闲率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.idra | idra}}
                  </template>
                </el-table-column> <el-table-column
                prop="pwh"
                label="人均工时"
                width="80"
                :sortable="true" >
                <template slot-scope="scope">
                  {{scope.row.tsign| tsign}}
                </template>
              </el-table-column>
                <el-table-column
                prop="cit"
                label="签入次数"
                width="80"
                :sortable="true" >
                <template slot-scope="scope">
                  {{scope.row.cit| cit}}
                </template>
              </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <el-button
                      width="30"
                      @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                      slot="reference"
                      width="30"
                      type="danger"
                      @click.native.prevent="handleDelete(scope.$index,tableData)">删除
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>
            </el-main>
          </div>
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
              v-model="editForm.date"
              placeholder=""
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="班组"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.subo"
              autocomplete="off"
              placeholder="请输入所属班组"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="出勤人数"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.att"
              autocomplete="off"
              placeholder="请输入出勤人数"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="call量"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.canum"
              autocomplete="off"
              placeholder="请输入call量"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="人均call量"
            :label-width="formLabelWidth">
            <el-input

              v-model="editForm.acnum"
              autocomplete="off"
              placeholder="请输入人均call量"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="时call量"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tnum"
              autocomplete="off"
              placeholder="请输入时call量"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="小休率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.nran"
              autocomplete="off"
              placeholder="请输入小休率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="均长"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.atime"
              autocomplete="off"
              placeholder="请输入均长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="排名"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tran"
              autocomplete="off"
              placeholder="请输入排名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="整理率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.finra"
              autocomplete="off"
              placeholder="请输入整理率"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="小休率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.sbra"
              autocomplete="off"
              placeholder="请输入小休率 "
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="示忙率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.bra"
              autocomplete="off"
              placeholder="请输入示忙率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="排名"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.bran"
              autocomplete="off"
              placeholder="请输入排名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话利用率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.cuti"
              autocomplete="off"
              placeholder="请输入通话利用率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="呼出占比（时长）"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.exra"
              autocomplete="off"
              placeholder="请输入呼出占比（时长）"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="空闲率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.idra"
              autocomplete="off"
              placeholder="请输入空闲率 "
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="人均工时"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.pwh"
              autocomplete="off"
              placeholder="请输入人均工时"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="签入次数"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.cit"
              autocomplete="off"
              placeholder="请输入签入次数"
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
              v-model="addForm.date"
              placeholder=""
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="信息"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addsubo"
              autocomplete="off"
              placeholder="请输入所属班组"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="出勤人数"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addatt"
              autocomplete="off"
              placeholder="请输入出勤人数"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="call量"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addcanum"
              autocomplete="off"
              placeholder="请输入call量"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="人均call量"
            :label-width="formLabelWidth">
            <el-input

              v-model="addForm.addacnum"
              autocomplete="off"
              placeholder="请输入人均call量"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="时call量"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtnum"
              autocomplete="off"
              placeholder="请输入时call量"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="排名"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addnran"
              autocomplete="off"
              placeholder="请输入排名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="均长"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addatime"
              autocomplete="off"
              placeholder="请输入均长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="排名"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtran"
              autocomplete="off"
              placeholder="请输入排名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="整理率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addfinra"
              autocomplete="off"
              placeholder="请输入整理率"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="小休率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addsbra"
              autocomplete="off"
              placeholder="请输入小休率 "
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="示忙率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addbra"
              autocomplete="off"
              placeholder="请输入示忙率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="排名"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addbran"
              autocomplete="off"
              placeholder="请输入排名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话利用率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addcuti"
              autocomplete="off"
              placeholder="请输入通话利用率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="呼出占比（时长）"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addexra"
              autocomplete="off"
              placeholder="请输入呼出占比（时长）"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="空闲率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addidra"
              autocomplete="off"
              placeholder="请输入空闲率 "
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="人均工时"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addpwh"
              autocomplete="off"
              placeholder="请输入人均工时"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="签入次数"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addcit"
              autocomplete="off"
              placeholder="请输入签入次数"
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
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
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
        search: '',
        checked: true,
        formLabelWidth: '150px',
        editFormVisible: false,//是否显示编辑窗口
        addLoading: false,
        editForm: [],
        addFormVisible: false,//是否显示新增窗口
        addForm: [],
        tableData: [{
          date: '2016-05-04',
          subo: '科慧成熟会员',
          att: '63',
          canum: '20.52',
          acnum: '132',
          nran: "2%",
          atime:"4%",
          tran:"2%",
          finra:"13%",
          sbra:"77%",
          bra:"2%",
          bran:"10%",
          cuti:"66",
          exra:"32",
          idra:"23",
          pwh:"5",
          cit:"23"
        }, {
          date: '2016-05-04',
          subo: '科慧成熟会员',
          att: '63',
          canum: '20.52',
          acnum: '132',
          nran: "2%",
          atime:"4%",
          tran:"2%",
          finra:"13%",
          sbra:"77%",
          bra:"2%",
          bran:"10%",
          cuti:"66",
          exra:"32",
          idra:"23",
          pwh:"5",
          cit:"23"
        },
          {
            date: '2016-05-04',
            subo: '科慧成熟会员',
            att: '63',
            canum: '20.52',
            acnum: '132',
            nran: "2%",
            atime:"4%",
            tran:"2%",
            finra:"13%",
            sbra:"77%",
            bra:"2%",
            bran:"10%",
            cuti:"66",
            exra:"32",
            idra:"23",
            pwh:"5",
            cit:"23"
          }, {
            date: '2016-05-04',
            subo: '科慧成熟会员',
            att: '63',
            canum: '20.52',
            acnum: '132',
            nran: "2%",
            atime:"4%",
            tran:"2%",
            finra:"13%",
            sbra:"77%",
            bra:"2%",
            bran:"10%",
            cuti:"66",
            exra:"32",
            idra:"23",
            pwh:"5",
            cit:"23"
          }, {
            date: '2016-05-04',
            subo: '科慧成熟会员',
            att: '63',
            canum: '20.52',
            acnum: '132',
            nran: "2%",
            atime:"4%",
            tran:"2%",
            finra:"13%",
            sbra:"77%",
            bra:"2%",
            bran:"10%",
            cuti:"66",
            exra:"32",
            idra:"23",
            pwh:"5",
            cit:"23"
          }]
      };
    },
    methods:{
      //编辑数据
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = this.tableData[index];
        this.currentIndex = index;
        this.editForm = Object.assign({}, row);
        _index = index;
      },
      //保存编辑
      sumbitEditRow() {
        var editData = _index;
        this.tableData[editData].date = this.editForm.date;
        this.tableData[editData].subo = this.editForm.subo;
        this.tableData[editData].att = this.editForm.att;
        this.tableData[editData].canum = this.editForm.canum;
        this.tableData[editData].acnum = this.editForm.acnum;
        this.tableData[editData].tnum = this.editForm.tnum;
        this.tableData[editData].nran= this.editForm.nran;
        this.tableData[editData].atime = this.editForm.atime;
        this.tableData[editData].tran = this.editForm.tran;
        this.tableData[editData].finra = this.editForm.finra;
        this.tableData[editData].sbra = this.editForm.sbra;
        this.tableData[editData].bra = this.editForm.bra;
        this.tableData[editData].bran = this.editForm.bran;
        this.tableData[editData].cuti = this.editForm.cuti;
        this.tableData[editData].exra = this.editForm.exra;
        this.tableData[editData].idra = this.editForm.idra;
        this.tableData[editData].pwh = this.editForm.pwh;
        this.tableData[editData].cit = this.editForm.cit;
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
          addsubo: '',
          addatt:"",
          addcanum:"",
          addacnum:"",
          addtnum:"",
          addnran:"",
          addatime:"",
          addtran:'',
          addfinra:'',
          addsbra:"",
          addbra:"",
          addbran:'',
          addcuti:"",
          addexra:"",
          addidra:"",
          addpwh:'',
          addcit:"",

        }
      },
      //将新增的数据添加到表格中
      sumbitAddRow() {
        this.tableData = this.tableData || [];
        this.tableData.push({
          date:this.addForm.adddate,
          subo:this.addForm.addsubo,
          att:this.addForm.addatt,
          canum:this.addForm.addcanum,
          acnum:this.addForm.addacnum,
          tnum:this.addForm.addtnum,
          nran:this.addForm.addnran,
          atime:this.addForm.addatime,
          tran:this.addForm.addtran,
          finra:this.addForm.addfinra,
          sbra:this.addForm.addsbra,
          bra:this.addForm.addbra,
          bran:this.addForm.addbran,
          cuti:this.addForm.addcuti,
          exra:this.addForm.addexra,
          idra:this.addForm.addidra,
          pwh:this.addForm.addpwh,
          cit:this.addForm.addcit
        })
        this.addFormVisible = false
      },
      handleDelete(index, arr) {
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
      },
      download(){
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector("#tableData"));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            "sheet.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },




      computed:{
        tableData:function(){
          var search=this.search;
          if(search){
            return  this.tableData.filter(function(dataNews){
              return Object.keys(dataNews).some(function(key){
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
              })
            })
          }
          return this.tableData
        },
        showDate(val) {
          val = val + '';
          if (val.indexOf(this.search) !== -1 && this.search !== '') {
            return val.replace(this.search, '<font color="#409EFF">' + this.search + '</font>')

          } else {
            return val
          }
        }
      }
    }
  }

</script>

<style>
  .el-table{
    font-size: 12px;
  }
  .el-table-column{
    text-align: center;
    vertical-align:center;
  }
</style>
