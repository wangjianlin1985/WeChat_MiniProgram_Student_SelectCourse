var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scoreId: 0, //记录编号
    studentObj: "", //学生
    courseObj: "", //课程
    scoreValue: "", //成绩得分
    studentEvaluate: "", //学生评价
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var scoreId = params.scoreId
    var url = config.basePath + "api/scoreInfo/get/" + scoreId
    utils.sendRequest(url, {}, function (scoreInfoRes) {
      wx.stopPullDownRefresh()
      self.setData({
        scoreId: scoreInfoRes.data.scoreId,
        studentObj: scoreInfoRes.data.studentObj.studentName,
        courseObj: scoreInfoRes.data.courseObj.courseName,
        scoreValue: scoreInfoRes.data.scoreValue,
        studentEvaluate: scoreInfoRes.data.studentEvaluate,
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

