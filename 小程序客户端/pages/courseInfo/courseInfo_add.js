var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    courseNumber: "", //课程编号
    courseName: "", //课程名称
    teacherObj_Index: "0", //上课老师
    teachers: [],
    courseTime: "", //上课时间
    coursePlace: "", //上课地点
    courseScore: "", //课程学分
    courseMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //初始化下拉框的信息
  init_select_params: function () { 
    var self = this;
    var url = null;
    url = config.basePath + "api/teacher/listAll";
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      self.setData({
        teachers: res.data,
      });
    });
  },
  //上课老师改变事件
  bind_teacherObj_change: function (e) {
    this.setData({
      teacherObj_Index: e.detail.value
    })
  },

  /*提交添加课程信息到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/courseInfo/add";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        courseNumber: "",
    courseName: "",
        teacherObj_Index: "0",
    courseTime: "",
    coursePlace: "",
    courseScore: "",
    courseMemo: "",
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

