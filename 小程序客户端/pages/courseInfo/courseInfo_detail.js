var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    courseNumber: "", //课程编号
    courseName: "", //课程名称
    teacherObj: "", //上课老师
    courseTime: "", //上课时间
    coursePlace: "", //上课地点
    courseScore: "", //课程学分
    courseMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var courseNumber = params.courseNumber
    var url = config.basePath + "api/courseInfo/get/" + courseNumber
    utils.sendRequest(url, {}, function (courseInfoRes) {
      wx.stopPullDownRefresh()
      self.setData({
        courseNumber: courseInfoRes.data.courseNumber,
        courseName: courseInfoRes.data.courseName,
        teacherObj: courseInfoRes.data.teacherObj.teacherName,
        courseTime: courseInfoRes.data.courseTime,
        coursePlace: courseInfoRes.data.coursePlace,
        courseScore: courseInfoRes.data.courseScore,
        courseMemo: courseInfoRes.data.courseMemo,
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  }

})

