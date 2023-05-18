var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryViewHidden: true, //是否隐藏查询条件界面
    courseNumber: "", //课程编号查询关键字
    courseName: "", //课程名称查询关键字
    teacherObj_Index:"0", //图书分类查询条件
    teachers: [{"teacherNumber":"","teacherName":"不限制"}],
    courseInfos: [], //界面显示的课程信息列表数据
    page_size: 8, //每页显示几条数据
    page: 1,  //当前要显示第几页
    totalPage: null, //总的页码数
    loading_hide: true, //是否隐藏加载动画
    nodata_hide: true, //是否隐藏没有数据记录提示
  },

  // 加载课程信息列表
  listCourseInfo: function () {
    var self = this
    var url = config.basePath + "api/courseInfo/list"
    //如果要显示的页码超过总页码不操作
    if(self.data.totalPage != null && self.data.page > self.data.totalPage) return
    self.setData({
      loading_hide: false,  //显示加载动画
    })
    //提交查询参数到服务器查询数据列表
    utils.sendRequest(url, {
      "courseNumber": self.data.courseNumber,
      "courseName": self.data.courseName,
      "teacherObj.teacherNumber": self.data.teachers[self.data.teacherObj_Index].teacherNumber,
      "page": self.data.page,
      "rows": self.data.page_size,
    }, function (res) { 
      wx.stopPullDownRefresh()
      setTimeout(function () {  
        self.setData({
          courseInfos: self.data.courseInfos.concat(res.data.list),
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
  queryCourseInfo: function(e) {
    var self = this
    self.setData({
      page: 1,
      totalPage: null,
      courseInfos: [],
      loading_hide: true, //隐藏加载动画
      nodata_hide: true, //隐藏没有数据记录提示 
      queryViewHidden: true, //隐藏查询视图
    })
    self.listCourseInfo()
  },

  //绑定查询参数输入事件
  searchValueInput: function (e) {
    var id = e.target.dataset.id
    if (id == "courseNumber") {
      this.setData({
        "courseNumber": e.detail.value,
      })
    }

    if (id == "courseName") {
      this.setData({
        "courseName": e.detail.value,
      })
    }

  },

  //查询参数上课老师选择事件
  bind_teacherObj_change: function(e) {
    this.setData({
      teacherObj_Index: e.detail.value
    })
  },

  init_query_params: function() { 
    var self = this
    var url = null
    //初始化上课老师下拉框
    url = config.basePath + "api/teacher/listAll"
    utils.sendRequest(url,null,function(res){
      wx.stopPullDownRefresh();
      self.setData({
        teachers: self.data.teachers.concat(res.data),
      })
    })
  },

  selectCourseInfo: function(e) { //学生选择课程信息
    var self = this
    var courseNumber = e.currentTarget.dataset.coursenumber
    var url = config.basePath + "api/courseSelect/select/" + courseNumber
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '选课成功',
        icon: 'success',
        duration: 500
      })
    })
  },

  //删除课程信息记录
  removeCourseInfo: function (e) {
    var self = this
    var courseNumber = e.currentTarget.dataset.coursenumber
    wx.showModal({
      title: '提示',
      content: '确定要删除courseNumber=' + courseNumber + '的记录吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var url = config.basePath + "api/courseInfo/delete/" + courseNumber
          utils.sendRequest(url, null, function (res) {
            wx.stopPullDownRefresh();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 500
            })
            //删除课程信息后客户端同步删除数据
            var courseInfos = self.data.courseInfos;
            for (var i = 0; i < courseInfos.length; i++) {
              if (courseInfos[i].courseNumber == courseNumber) {
                courseInfos.splice(i, 1)
                break
              }
            }
            self.setData({ courseInfos: courseInfos })
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
    this.listCourseInfo()
    this.init_query_params()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    self.setData({
      page: 1,  //显示最新的第1页结果
      courseInfos: [], //清空课程信息数据
      nodata_hide: true, //隐藏没数据提示
    })
    self.listCourseInfo()
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
      self.listCourseInfo()
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

