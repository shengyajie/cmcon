<template>
  <div class="wrapper">
    <HomeHeader/>
    <HomeAside/>
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          <small>科室及团队>><b>效能</b></small>
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
                :cell-style="{padding:'0px'}"
              >
                <el-table-column
                  prop="date"
                  width="100"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="tinfo"
                  width="100"
                  label="信息">
                </el-table-column>
                <el-table-column
                  prop="tnum"
                  width="80"
                  label="出勤人数"
                  :filters="filter"
                  :filter-method="filterHandler">
                  <!--                <template slot-scope="scope">-->
                  <!--                  {{scope.row.tnum | tnum}}-->
                  <!--                </template>-->
                </el-table-column>
                <el-table-column
                  prop="tcanum"
                  label="时call"
                  width="80">

                  <template slot-scope="scope">
                    {{scope.row.tcanum | tcanum}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tavecalti"
                  label="均长"
                  width="80"
                >
                  <template slot-scope="scope">
                    {{scope.row.tavecalti | tavecalti}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tcl"
                  label="整理率"
                  width="80"
                >
                  <template slot-scope="scope">
                    {{scope.row.tcl | tcl}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="trate"
                  label="小休率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.trate | trate}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tbura"
                  label="示忙率"
                  width="80"
                  :sortable="true" :sort-method="sortByDate1">
                  <template slot-scope="scope">
                    {{scope.row.tbura |tbura}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tthrate"
                  label="三率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.tthrate | tthrate}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tcaluser"
                  label="通话利用率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.tcaluser | tcaluser}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tcara"
                  label="呼出占比"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.tcara |tcara}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tidleti"
                  label="空闲率"
                  width="80"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.tidleti | tidleti}}
                  </template>
                </el-table-column> <el-table-column
                prop="tsign"
                label="签入次数"
                width="80"
                :sortable="true" >
                <template slot-scope="scope">
                  {{scope.row.tsign| tsign}}
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
            label="信息"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tinfo"
              autocomplete="off"
              placeholder="请输入信息"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="出勤人数"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tnum"
              autocomplete="off"
              placeholder="请输入出勤人数"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="时call"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tcanum"
              autocomplete="off"
              placeholder="请输入时call"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="工作均长"
            :label-width="formLabelWidth">
            <el-input

              v-model="editForm.tavecalti"
              autocomplete="off"
              placeholder="请输入均长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="整理率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tcl"
              autocomplete="off"
              placeholder="请输入整理率"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="小休率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.trate"
              autocomplete="off"
              placeholder="请输入小休率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="示忙率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tbura"
              autocomplete="off"
              placeholder="请输入示忙率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="三率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tthrate"
              autocomplete="off"
              placeholder="请输入三率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话利用率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tcaluser"
              autocomplete="off"
              placeholder="请输入通话利用率"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="呼出占比"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tcara"
              autocomplete="off"
              placeholder="请输入呼出占比"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="空闲率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tidleti"
              autocomplete="off"
              placeholder="请输入空闲率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="签入次数"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.tsign"
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
              v-model="addForm.adddate"
              placeholder="请输入日期"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="个人信息"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtinfo"
              autocomplete="off"
              placeholder="请输入个人信息"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="出勤人数"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtnum"
              autocomplete="off"
              placeholder="请输入出勤人数"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="时call"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtcanum"
              autocomplete="off"
              placeholder="请输入时call"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="均长"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtavecalti"
              autocomplete="off"
              placeholder="请输入均长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="整理率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtcl"
              autocomplete="off"
              placeholder="请输入整理率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="小休率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtrate"
              autocomplete="off"
              placeholder="小休率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="示忙率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtbura"
              autocomplete="off"
              placeholder="请输入示忙率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="三率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtthrate"
              autocomplete="off"
              placeholder="请输入三率"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话利用率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtcaluser"
              autocomplete="off"
              placeholder="请输入通话利用率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="呼出占比"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtcara"
              autocomplete="off"
              placeholder="请输入呼出占比"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="空闲率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtidleti"
              autocomplete="off"
              placeholder="请输入空闲率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="签入次数"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addtsign"
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
        tableData:[],
      //   tableData: [{
      //     date: '2016-05-04',
      //     tinfo: '科慧成熟会员',
      //     tnum: '93',
      //     tcanum: '20.52',
      //     tavecalti: '132',
      //     tcl: "7%",
      //     trate:"4%",
      //     tbura:"2%",
      //     tthrate:"13%",
      //     tcaluser:"77%",
      //     tcara:"2%",
      //     tidleti:"10%",
      //     tsign:"66"
      //   },
      // ],
        filter: [
          {text: '1<AVE<3', value: '1<AVE<3'},
          {text: '3<AVE<5', value: '3<AVE<5'},
          {text: '6<AVE<9', value: '6<AVE<9'}
        ]
      };
    },
    // 调用数据
    created: function () {
      var data = []
      let url = 'static/keshi.json'
      // console.log(Vue)
      let _this = this
      // 这个是可以的吧额？恩

      this.$http.get(url, {}).then(function (res) {


        res = res.data
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          var obj = {}
          obj.date = res.data[i].date
          obj.tinfo = res.data[i].tinfo
          obj.tnum = res.data[i].tnum
          obj.tcanum = res.data[i].tcanum
          obj.tavecalti = res.data[i].tavecalti
          obj.tcl = res.data[i].tcl
          obj.trate = res.data[i].trate
          obj.tbura = res.data[i].tbura
          obj.tthrate = res.data[i].tthrate
          obj.tcaluser = res.data[i].tcaluser
          obj.tcara = res.data[i].tcara
          obj.tidleti = res.data[i].tidleti
          obj.tsign = res.data[i].tsign
          data[i] = obj

        }
        _this.tableData =  res.data
      }).catch(function (error) {
        console.log(error);
      })
    },
    methods:{
      filterHandler(value, row,column) {
        let min;
        let max;
        if(value=='1<AVE<3'){
          min=1;max=3;
          return row.tnum>min && row.tnum<max
        }else if(value=='3<AVE<5'){
          min=3;max=5;
          return row.tnum>min && row.tnum<max
        }else{
          min=6;max=9;
          return row.tnum>min && row.tnum<max
        }
      },
      // dosome(){
      //
      //   // console.log(1);
      //   // const ret = this.tableData.filter((item)=>{
      //   //   return item.tnum>min&& item.tnum<max;
      //   // })
      //   let ret = this.tableData.filter(function(item,index,array){
      //     console.log(item)
      //     if(item.tnum>min && item.tnum<max){
      //       return true
      //     }else{
      //       return false
      //     }
      //
      //     // return item.tnum > min && item.tnum < max;
      //   })
      //   console.log(ret)
      //   // this.tableData=ret;
      // },
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
        this.tableData[editData].tinfo = this.editForm.tinfo;
        this.tableData[editData].tnum = this.editForm.tnum;
        this.tableData[editData].tcanum = this.editForm.tcanum;
        this.tableData[editData].tavecalti = this.editForm.tavecalti;
        this.tableData[editData].tcl = this.editForm.tcl;
        this.tableData[editData].trate= this.editForm.trate;
        this.tableData[editData].tbura = this.editForm.tbura;
        this.tableData[editData].tthrate = this.editForm.tthrate;
        this.tableData[editData].tcaluser = this.editForm.tcaluser;
        this.tableData[editData].tcara = this.editForm.tcara;
        this.tableData[editData].tidleti = this.editForm.tidleti;
        this.tableData[editData].tsign = this.editForm.tsign;
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
          addtinfo: '',
          addtnum:"",
          addtcanum:"",
          addtavecalti:"",
          addtcl:"",
          addtrate:"",
          addtbura:'',
          addtthrate:'',
          addtcaluser:"",
          addtcara:'',
          addtidleti:"",
          addtsign:"",
        }
      },
      //将新增的数据添加到表格中
      sumbitAddRow() {
        this.tableData = this.tableData || [];
        this.tableData.push({
          date:this.addForm.adddate,
          tinfo:this.addForm.addtinfo,
          tnum:this.addForm.addtnum,
          tcanum:this.addForm.addtcanum,
          tavecalti:this.addForm.addtavecalti,
          tcl:this.addForm.addtcl,
          trate:this.addForm.addtrate,
          tbura:this.addForm.addtbura,
          tthrate:this.addForm.addtthrate,
          tcaluser:this.addForm.addtcaluser,
          tcara:this.addForm.addtcara,
          satde:this.addForm.addsatde,
          tidleti:this.addForm.addtidleti,
          tsign:this.addForm.addtsign
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
