var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryViewHidden: true, //是否隐藏查询条件界面
    studentObj_Index:"0", //图书分类查询条件
    students: [{"studentNumber":"","studentName":"不限制"}],
    courseObj_Index:"0", //图书分类查询条件
    courseInfos: [{"courseNumber":"","courseName":"不限制"}],
    scoreInfos: [], //界面显示的成绩信息列表数据
    page_size: 8, //每页显示几条数据
    page: 1,  //当前要显示第几页
    totalPage: null, //总的页码数
    loading_hide: true, //是否隐藏加载动画
    nodata_hide: true, //是否隐藏没有数据记录提示
  },

  // 加载成绩信息列表
  listScoreInfo: function () {
    var self = this
    var url = config.basePath + "api/scoreInfo/list"
    //如果要显示的页码超过总页码不操作
    if(self.data.totalPage != null && self.data.page > self.data.totalPage) return
    self.setData({
      loading_hide: false,  //显示加载动画
    })
    //提交查询参数到服务器查询数据列表
    utils.sendRequest(url, {
      "studentObj.studentNumber": self.data.students[self.data.studentObj_Index].studentNumber,
      "courseObj.courseNumber": self.data.courseInfos[self.data.courseObj_Index].courseNumber,
      "page": self.data.page,
      "rows": self.data.page_size,
    }, function (res) { 
      wx.stopPullDownRefresh()
      setTimeout(function () {  
        self.setData({
          scoreInfos: self.data.scoreInfos.concat(res.data.list),
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
  queryScoreInfo: function(e) {
    var self = this
    self.setData({
      page: 1,
      totalPage: null,
      scoreInfos: [],
      loading_hide: true, //隐藏加载动画
      nodata_hide: true, //隐藏没有数据记录提示 
      queryViewHidden: true, //隐藏查询视图
    })
    self.listScoreInfo()
  },

  //绑定查询参数输入事件
  searchValueInput: function (e) {
    var id = e.target.dataset.id
  },

  //查询参数学生选择事件
  bind_studentObj_change: function(e) {
    this.setData({
      studentObj_Index: e.detail.value
    })
  },

  //查询参数课程选择事件
  bind_courseObj_change: function(e) {
    this.setData({
      courseObj_Index: e.detail.value
    })
  },

  init_query_params: function() { 
    var self = this
    var url = null
    //初始化学生下拉框
    url = config.basePath + "api/student/listAll"
    utils.sendRequest(url,null,function(res){
      wx.stopPullDownRefresh();
      self.setData({
        students: self.data.students.concat(res.data),
      })
    })
    //初始化课程下拉框
    url = config.basePath + "api/courseInfo/listAll"
    utils.sendRequest(url,null,function(res){
      wx.stopPullDownRefresh();
      self.setData({
        courseInfos: self.data.courseInfos.concat(res.data),
      })
    })
  },

  //删除成绩信息记录
  removeScoreInfo: function (e) {
    var self = this
    var scoreId = e.currentTarget.dataset.scoreid
    wx.showModal({
      title: '提示',
      content: '确定要删除scoreId=' + scoreId + '的记录吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var url = config.basePath + "api/scoreInfo/delete/" + scoreId
          utils.sendRequest(url, null, function (res) {
            wx.stopPullDownRefresh();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 500
            })
            //删除成绩信息后客户端同步删除数据
            var scoreInfos = self.data.scoreInfos;
            for (var i = 0; i < scoreInfos.length; i++) {
              if (scoreInfos[i].scoreId == scoreId) {
                scoreInfos.splice(i, 1)
                break
              }
            }
            self.setData({ scoreInfos: scoreInfos })
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
    this.listScoreInfo()
    this.init_query_params()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    self.setData({
      page: 1,  //显示最新的第1页结果
      scoreInfos: [], //清空成绩信息数据
      nodata_hide: true, //隐藏没数据提示
    })
    self.listScoreInfo()
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
      self.listScoreInfo()
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

