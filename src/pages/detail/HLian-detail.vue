<template>
  <div class="wrapper">
    <HomeHeader/>
    <HomeAside/>
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          <small>鸿联公司员工异常生产数据预警>><b>整体分析</b></small>
        </h1>
      </section>
      <section class="content">
        <template>
          <div >
            <el-upload
              class="upload-demo"
              style="margin: 10px "
              action=""
              :on-change="handleChange"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :limit="limitUpload"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              :auto-upload="false">
              <el-button size="small " type="primary" ><span style="margin-top: 30px">点击上传</span></el-button>

              <!-- <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div> -->
            </el-upload>
          <el-form :inline="true" style="display: flex;
    flex-direction: row;
     justify-content: flex-end;">

              <el-button  style="margin: 10px " type="primary" size="small" icon="el-icon-edit-outline"  @click="addRow()">添加</el-button>
            <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->

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
                  width="70"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="50"
                  label="姓名"
                  >
                </el-table-column>
                <el-table-column
                  prop="Jobna"
                  label="工号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="电话"
                  width="120"
                  >
                </el-table-column>
                <el-table-column
                  prop="subo"
                  label="所属班组"
                  width="50"
                  >
                </el-table-column>
                <el-table-column
                  prop="whour"
                  label="工作时长"
                  width="57"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.whour | whour}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="calnum"
                  label="呼入量"
                  width="57"
                  :sortable="true" :sort-method="sortByDate1">
                  <template slot-scope="scope">
                    {{scope.row.calnum |calnum}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="caluser"
                  label="通话利用率"
                  width="57"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.caluser | caluser}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="avecalti"
                  label="通话均长"
                  width="57"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.avecalti | avecalti}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="idletime"
                  label="空闲时长"
                  width="57"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.idletime |idletime}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="thrate"
                  label="三率"
                  width="57"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.thrate | thrate}}
                  </template>
                </el-table-column> <el-table-column
                prop="satde"
                label="满意度"
                width="57"
                :sortable="true" >
                <template slot-scope="scope">
                  {{scope.row.satde| satde}}
                </template>
              </el-table-column>
                <el-table-column
                  prop="haupsta"
                  label="挂满"
                  width="57"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.haupsta | haupsta}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fiqurera"
                  label="首问解决率"
                  width="57"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.fiqurera | fiqurera}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="blera"
                  label="瑕疵率"
                  width="57"

                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.blera |blera}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="buinsvol"
                  label="业务办理量"
                  width="50"
                  :sortable="true" >
                  <template slot-scope="scope">
                    {{scope.row.buinsvol | buinsvol}}
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
            label="工作时长"
            :label-width="formLabelWidth">
            <el-input

              v-model="editForm.whour"
              autocomplete="off"
              placeholder="请输入工作时长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话利用率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.caluser"
              autocomplete="off"
              placeholder="请输入通话利用率"
              maxlength="8"
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
            ></el-input>
          </el-form-item>
          <el-form-item
            label="满意度"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.satde"
              autocomplete="off"
              placeholder="请输入满意度"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="挂满"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.haupsta"
              autocomplete="off"
              placeholder="请输入挂满"
              maxlength="8"
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
          <el-form-item
            label="瑕疵率"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.blera"
              autocomplete="off"
              placeholder="请输入瑕疵率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="业务办理量"
            :label-width="formLabelWidth">
            <el-input
              v-model="editForm.buinsvol"
              autocomplete="off"
              placeholder="请输入满意度"
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
            label="所属班组"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addsubo"
              autocomplete="off"
              placeholder="请输入所属班组"
            ></el-input>
          </el-form-item>
          <el-form-item
            label=""工作时长
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addwhour"
              autocomplete="off"
              placeholder="请输入工作时长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="呼入量"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addcalnum"
              autocomplete="off"
              placeholder="呼入量"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="通话利用率"
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
              maxlength="6"
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
            ></el-input>
          </el-form-item>
          <el-form-item
            label="满意度"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addsatde"
              autocomplete="off"
              placeholder="请输入满意度"
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
              placeholder="首问解决率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="瑕疵率"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addblera"
              autocomplete="off"
              placeholder="请输入瑕疵率"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="业务办理量"
            :label-width="formLabelWidth">
            <el-input
              v-model="addForm.addbuinsvol"
              autocomplete="off"
              placeholder="请输入业务办理量"
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
        limitUpload:1,
        fileTemp:null,
        file:null,
        tableData:[],
        dalen:0,
        checked: true,
        formLabelWidth: '150px',
        editFormVisible: false,//是否显示编辑窗口
        addLoading: false,
        editForm: [],
        addFormVisible: false,//是否显示新增窗口
        addForm: [],
      };
    },
    methods:{
      handleChange(file, fileList){
        this.fileTemp = file.raw;
        if(this.fileTemp){
          if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            || (this.fileTemp.type == 'application/vnd.ms-excel')){
            this.importfxx(this.fileTemp);
          } else {
            this.$message({
              type:'warning',
              message:'附件格式错误，请删除后重新上传！'
            })
          }
        } else {
          this.$message({
            type:'warning',
            message:'请上传附件！'
          })
        }
      },

      handleExceed(){
        this.$message({
          type:'warning',
          message:'超出最大上传文件数量的限制！'
        })
        return;
      },
      handleRemove(file,fileList){
        this.fileTemp = null
      },
      importfxx(obj) {
        let _this = this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据

        this.file = event.currentTarget.files[0];

        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;

        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
            //此处可对数据进行处理
            let arr = [];
            outdata.map(v => {
              let obj = {}
              obj.date = v['date']
              obj.name = v['name']
              obj.Jobna = v['Jobna']
              obj.number = v['number']
              obj.subo = v['subo']
              obj.whour = v['whour']
              obj.calnum = v['calnum']
              obj.caluser = v['caluser']
              obj.avecalti = v['avecalti']
              obj.idletime = v['idletime']
              obj.thrate = v['thrate']
              obj.satde = v['satde']
              obj.haupsta = v['haupsta']
              obj.fiqurera = v['fiqurera']
              obj.blera = v['blera']
              obj.buinsvol = v['buinsvol']
              arr.push(obj)
            });
            _this.tableData=arr;
            _this.dalen=arr.length;
            return arr;
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      //编辑数据
      handleEdit(index, row) {
        console.log(row)
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
        this.tableData[editData].calnum = this.editForm.calnum;
        this.tableData[editData].caluser= this.editForm.caluser;
        this.tableData[editData].avecalti = this.editForm.avecalti;
        this.tableData[editData].idletime = this.editForm.idletime;
        this.tableData[editData].thrate = this.editForm.thrate;
        this.tableData[editData].satde = this.editForm.satde;
        this.tableData[editData].fiqurera = this.editForm.fiqurera;
        this.tableData[editData].blera = this.editForm.blera;
        this.tableData[editData].buinsvol = this.editForm.buinsvol;
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
          addcalnum:"",
          addcaluser:'',
          addavecalti:'',
          addidletime:"",
          addthrate:'',
          addsatde:"",
          addhaupsta:"",
          addfiqurera:'',
          addblera:"",
          addbuinsvol:''
        }
      },
      //将新增的数据添加到表格中
      sumbitAddRow() {
        this.tableData = this.tableData || []
        this.tableData.push({
          date:this.addForm.adddate,
          name:this.addForm.addname,
          Jobna:this.addForm.addJobna,
          number:this.addForm.addnumber,
          subo:this.addForm.addsubo,
          whour:this.addForm.addwhour,
          calnum:this.addForm.addcalnum,
          caluser:this.addForm.addcaluser,
          avecalti:this.addForm.addavecalti,
          idletime:this.addForm.addidletime,
          thrate:this.addForm.addthrate,
          satde:this.addForm.addsatde,
          haupsta:this.addForm.addhaupsta,
          fiqurera:this.addForm.addfiqurera,
          blera:this.addForm.addblera,
          buinsvol:this.addForm.addbuinsvol

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


// 搜索
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
