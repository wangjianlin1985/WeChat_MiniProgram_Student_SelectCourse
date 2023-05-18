var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryViewHidden: true, //是否隐藏查询条件界面
    studentNumber: "", //学号查询关键字
    studentName: "", //姓名查询关键字
    classObj_Index:"0", //图书分类查询条件
    classInfos: [{"classNumber":"","className":"不限制"}],
    studentBirthday: "", //出生日期查询关键字
    students: [], //界面显示的学生信息列表数据
    page_size: 8, //每页显示几条数据
    page: 1,  //当前要显示第几页
    totalPage: null, //总的页码数
    loading_hide: true, //是否隐藏加载动画
    nodata_hide: true, //是否隐藏没有数据记录提示
  },

  // 加载学生信息列表
  listStudent: function () {
    var self = this
    var url = config.basePath + "api/student/list"
    //如果要显示的页码超过总页码不操作
    if(self.data.totalPage != null && self.data.page > self.data.totalPage) return
    self.setData({
      loading_hide: false,  //显示加载动画
    })
    //提交查询参数到服务器查询数据列表
    utils.sendRequest(url, {
      "studentNumber": self.data.studentNumber,
      "studentName": self.data.studentName,
      "classObj.classNumber": self.data.classInfos[self.data.classObj_Index].classNumber,
      "studentBirthday": self.data.studentBirthday,
      "page": self.data.page,
      "rows": self.data.page_size,
    }, function (res) { 
      wx.stopPullDownRefresh()
      setTimeout(function () {  
        self.setData({
          students: self.data.students.concat(res.data.list),
          totalPage: res.data.totalPage,
          loading_hide: true
        })
      }, 500)
      //如果当前显示的是最后一页，则显示没数据提示
      if(self.data.page == self.data.totalPage) {
        self.setData({
          nodata_hide: false,
        })
      }
    })
  },

  //显示或隐藏查询视图切换
  toggleQueryViewHide: function () {
    this.setData({
      queryViewHidden: !this.data.queryViewHidden,
    })
  },

  //点击查询按钮的事件
  queryStudent: function(e) {
    var self = this
    self.setData({
      page: 1,
      totalPage: null,
      students: [],
      loading_hide: true, //隐藏加载动画
      nodata_hide: true, //隐藏没有数据记录提示 
      queryViewHidden: true, //隐藏查询视图
    })
    self.listStudent()
  },

  //查询参数出生日期选择事件
  bind_studentBirthday_change: function (e) {
    this.setData({
      studentBirthday: e.detail.value
    })
  },
  //清空查询参数出生日期
  clear_studentBirthday: function (e) {
    this.setData({
      studentBirthday: "",
    })
  },

  //绑定查询参数输入事件
  searchValueInput: function (e) {
    var id = e.target.dataset.id
    if (id == "studentNumber") {
      this.setData({
        "studentNumber": e.detail.value,
      })
    }

    if (id == "studentName") {
      this.setData({
        "studentName": e.detail.value,
      })
    }

  },

  //查询参数所在班级选择事件
  bind_classObj_change: function(e) {
    this.setData({
      classObj_Index: e.detail.value
    })
  },

  init_query_params: function() { 
    var self = this
    var url = null
    //初始化所在班级下拉框
    url = config.basePath + "api/classInfo/listAll"
    utils.sendRequest(url,null,function(res){
      wx.stopPullDownRefresh();
      self.setData({
        classInfos: self.data.classInfos.concat(res.data),
      })
    })
  },

  //删除学生信息记录
  removeStudent: function (e) {
    var self = this
    var studentNumber = e.currentTarget.dataset.studentnumber
    wx.showModal({
      title: '提示',
      content: '确定要删除studentNumber=' + studentNumber + '的记录吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var url = config.basePath + "api/student/delete/" + studentNumber
          utils.sendRequest(url, null, function (res) {
            wx.stopPullDownRefresh();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 500
            })
            //删除学生信息后客户端同步删除数据
            var students = self.data.students;
            for (var i = 0; i < students.length; i++) {
              if (students[i].studentNumber == studentNumber) {
                students.splice(i, 1)
                break
              }
            }
            self.setData({ students: students })
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listStudent()
    this.init_query_params()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    self.setData({
      page: 1,  //显示最新的第1页结果
      students: [], //清空学生信息数据
      nodata_hide: true, //隐藏没数据提示
    })
    self.listStudent()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this
    if (self.data.page < self.data.totalPage) {
      self.setData({
        page: self.data.page + 1, 
      })
      self.listStudent()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})

