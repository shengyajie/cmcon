<template>
  <div class="wrapper">
    <HomeHeader/>
    <HomeAside/>
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          <small>个人>><b>效能</b></small>
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
                <el-table-column prop="date" width="100" label="日期"></el-table-column>
                <el-table-column prop="name" width="100" label="姓名"></el-table-column>
                <el-table-column prop="Jobna" label="工号" width="80"></el-table-column>
                <el-table-column prop="number" label="电话" width="80"></el-table-column>
                <el-table-column prop="subo" label="班组" width="80"></el-table-column>
                <el-table-column
                  prop="whour"
                  label="通话时长"
                  width="80"
                  :filters="tonghuashichang"
                  :filter-method="filterWholeHour">
                </el-table-column>
                <el-table-column
                  prop="caluser"
                  label="通话利用率"
                  width="80"
                  :filters="tonghualiyonglv"
                  :filter-method="filterHour">
                </el-table-column>
                <el-table-column
                  prop="avecalti"
                  label="通话均长"
                  width="80"
                  :filters="junchang"
                  :filter-method="filterjun"
                  >
                </el-table-column>
                <el-table-column
                  prop="idletime"
                  label="空闲时长"
                  width="80"
                 >
                </el-table-column>
                <el-table-column
                  prop="thrate"
                  label="三率"
                  width="80"
                  >

                </el-table-column>
                <el-table-column
                  prop="satde"
                  label="满意度"
                  width="80"
                 >

                </el-table-column>
                <el-table-column
                prop="haupsta"
                label="挂满"
                width="80"
                >

              </el-table-column>
                <el-table-column
                  prop="fiqurera"
                  label="首问解决率"
                  width="80"
                >

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
            label="工号"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.Jobna"
              autocomplete="off"
              placeholder="请输入工号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电话"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.number"
              autocomplete="off"
              placeholder="请输入电话"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="班组"
            :label-width="formLabelWidth">
            <el-input

              v-model="editForm.subo"
              autocomplete="off"
              placeholder="请输入班组"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话时长"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.whour"
              autocomplete="off"
              placeholder="请输入通话时长"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话利用率 "
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.caluser"
              autocomplete="off"
              placeholder="请输入通话利用率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话均长"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.avecalti"
              autocomplete="off"
              placeholder="请输入通话均长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="空闲时长"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.idletime"
              autocomplete="off"
              placeholder="请输入空闲时长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="三率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.thrate"
              autocomplete="off"
              placeholder="请输入三率"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="满意度"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.satde"
              autocomplete="off"
              placeholder="请输入满意度"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="挂满"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.haupsta"
              autocomplete="off"
              placeholder="请输入挂满"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="首问解决率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.fiqurera"
              autocomplete="off"
              placeholder="请输入首问解决率"
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
              v-model="editForm.date"
              placeholder=""
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
            label="工号"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addJobna"
              autocomplete="off"
              placeholder="请输入工号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电话"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addnumber"
              autocomplete="off"
              placeholder="请输入电话"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="班组"
            :label-width="formLabelWidth">
            <el-input

              v-model="addForm.addsubo"
              autocomplete="off"
              placeholder="请输入班组"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话时长"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addwhour"
              autocomplete="off"
              placeholder="请输入通话时长"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话利用率 "
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addcaluser"
              autocomplete="off"
              placeholder="请输入通话利用率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话均长"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addavecalti"
              autocomplete="off"
              placeholder="请输入通话均长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="空闲时长"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addidletime"
              autocomplete="off"
              placeholder="请输入空闲时长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="三率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addthrate"
              autocomplete="off"
              placeholder="请输入三率"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="满意度"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addsatde"
              autocomplete="off"
              placeholder="请输入满意度"
              maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="挂满"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addhaupsta"
              autocomplete="off"
              placeholder="请输入挂满"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="首问解决率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addfiqurera"
              autocomplete="off"
              placeholder="请输入首问解决率"
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
        select:[],
        junchang:[],
        sanlv:[],
        tonghualiyonglv:[],
        tonghuashichang:[],
        manyidu:[],
        guaman:[],
        shouwenjiejuelv:[]

      };
    },
    // 调用数据
    // 调用数据
    created() {
      this._getBanZuData(),
        this._getselect()
    },
    // created: function () {
    //   var data = []
    //   let url = 'static/table.json'
    //   // console.log(Vue)
    //   let _this = this
    //   this.$http.get(url, {}).then(function (res) {
    //
    //     res = res.data
    //     console.log(res.data);
    //     for (let i = 0; i < res.data.length; i++) {
    //       var obj = {}
    //       obj.date = res.data[i].date
    //       obj.tinfo = res.data[i].tinfo
    //       obj.tnum = res.data[i].tnum
    //       obj.tcanum = res.data[i].tcanum
    //       obj.tavecalti = res.data[i].tavecalti
    //       obj.tcl = res.data[i].tcl
    //       obj.trate = res.data[i].trate
    //       obj.tbura = res.data[i].tbura
    //       obj.tthrate = res.data[i].tthrate
    //       obj.tcaluser = res.data[i].tcaluser
    //       obj.tcara = res.data[i].tcara
    //       obj.tidleti = res.data[i].tidleti
    //       obj.tsign = res.data[i].tsign
    //       data[i] = obj
    //
    //     }
    //     _this.tableData =  res.data
    //   }).catch(function (error) {
    //     console.log(error);
    //   })
    // },
    methods:{
      // 调用数据
      _getBanZuData() {
        let url = 'static/table.json'
        let _this = this
        // 调用这句的api在哪里
        _this.$http.get(url, {}).then((res) => {
          _this.tableData =  res.data.data
        }).catch((err) => {
          console.log(err);
        })
      },
      _getselect() {
        let url = 'static/select.json'
        let _this = this
        _this.$http.get(url, {}).then((res) => {
          _this.select = res.data;
          this.shicall=res.data.shicall;
          this.junchang=res.data.junchang;
          this.sanlv=res.data.sanlv;
          this.tonghualiyonglv=res.data.tonghualiyonglv;
          this.tonghuashichang=res.data.tonghuashichang;
          this.manyidu=res.data.manyidu;
          this.guaman=res.data.guaman;
          this.shouwenjiejuelv=res.data.shouwenjiejuelv;

        }).catch((err) => {
          console.log(err);
        })
      },
      // 筛选

      filterWholeHour(value, row,column) {
        let min;
        let max;
        if(value=='0<AVE<=400000'){
          min=0;max=400000;
          return row.whour>min && row.whour<max
        }else if(value=='400001<AVE<=419999'){
          min=400001;max=419999;
          return row.whour>min && row.whour<max
        }else{
          min=420000;
          return row.whour>min
        }
      },
      filterHour(value, row,column) {
        let min;
        let max;
        let ret = parseFloat(row.caluser)
        if(value === '0<AVE<=60%'){
          min = 0;
          max = 60;
          return ret > min && ret < max
        } else if (value === '80%<AVE'){
          min = 80;
          return ret > min
        } else {
          min = 60;
          max = 80;
          return ret >= min && ret <= max
        }
      },
      filterjun(value, row,column) {
        let min;
        let max;
        let ret = parseFloat(row.avecalti)
        if(value === '0<AVE<=110'){
          min = 0;
          max = 110;
          return ret > min && ret < max
        } else if (value === '141<AVE'){
          min = 141;
          return ret > min
        } else {
          min = 111;
          max = 140;
          return ret >= min && ret <= max
        }
      },
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
        this.tableData[editData].name = this.editForm.name;
        this.tableData[editData].Jobna = this.editForm.Jobna;
        this.tableData[editData].number = this.editForm.number;
        this.tableData[editData].subo = this.editForm.subo;
        this.tableData[editData].whour = this.editForm.whour;
        this.tableData[editData].caluser= this.editForm.caluser;
        this.tableData[editData].avecalti = this.editForm.avecalti;
        this.tableData[editData].idletime = this.editForm.idletime;
        this.tableData[editData].thrate = this.editForm.thrate;
        this.tableData[editData].satde = this.editForm.satde;
        this.tableData[editData].haupsta = this.editForm.haupsta;
        this.tableData[editData].fiqurera = this.editForm.fiqurera;
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
          addJobna:"",
          addnumber:"",
          addsubo:"",
          addwhour:"",
          addcaluser:"",
          addavecalti:'',
          addidletime:'',
          addthrate:"",
          addsatde:'',
          addhaupsta:"",
          addfiqurera:"",
        }
      },
      //将新增的数据添加到表格中
      sumbitAddRow() {
        this.tableData = this.tableData || [];
        this.tableData.push({
          date:this.addForm.adddate,
          name:this.addForm.addname,
          Jobna:this.addForm.addJobna,
          number:this.addForm.addnumber,
          subo:this.addForm.addsubo,
          whour:this.addForm.addwhour,
          caluser:this.addForm.addcaluser,
          avecalti:this.addForm.addavecalti,
          idletime:this.addForm.addidletime,
          thrate:this.addForm.addthrate,
          satde:this.addForm.addsatde,
          haupsta:this.addForm.addhaupsta,
          fiqurera:this.addForm.addfiqurera
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
