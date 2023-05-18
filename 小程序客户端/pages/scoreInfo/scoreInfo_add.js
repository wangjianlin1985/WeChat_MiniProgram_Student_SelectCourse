var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scoreId: 0, //记录编号
    studentObj_Index: "0", //学生
    students: [],
    courseObj_Index: "0", //课程
    courseInfos: [],
    scoreValue: "", //成绩得分
    studentEvaluate: "", //学生评价
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //初始化下拉框的信息
  init_select_params: function () { 
    var self = this;
    var url = null;
    url = config.basePath + "api/courseInfo/listAll";
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      self.setData({
        courseInfos: res.data,
      });
    });
    url = config.basePath + "api/student/listAll";
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      self.setData({
        students: res.data,
      });
    });
  },
  //学生改变事件
  bind_studentObj_change: function (e) {
    this.setData({
      studentObj_Index: e.detail.value
    })
  },

  //课程改变事件
  bind_courseObj_change: function (e) {
    this.setData({
      courseObj_Index: e.detail.value
    })
  },

  /*提交添加成绩信息到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/scoreInfo/add";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        scoreId: 0,
        studentObj_Index: "0",
        courseObj_Index: "0",
    scoreValue: "",
    studentEvaluate: "",
        loadingHide: true,
        loadingText: "网络操作中。。",
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init_select_params();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync('authToken');
    if (!token) {
      wx.navigateTo({
        url: '../mobile/mobile',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})

