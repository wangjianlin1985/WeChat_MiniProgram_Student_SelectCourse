var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classNumber: "", //班级编号
    className: "", //班级名称
    classSpecialFieldNumber: "", //所属专业
    classBirthDate: "", //成立日期
    classTeacherCharge: "", //班主任
    classTelephone: "", //联系电话
    classMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var classNumber = params.classNumber
    var url = config.basePath + "api/classInfo/get/" + classNumber
    utils.sendRequest(url, {}, function (classInfoRes) {
      wx.stopPullDownRefresh()
      self.setData({
        classNumber: classInfoRes.data.classNumber,
        className: classInfoRes.data.className,
        classSpecialFieldNumber: classInfoRes.data.classSpecialFieldNumber,
        classBirthDate: classInfoRes.data.classBirthDate,
        classTeacherCharge: classInfoRes.data.classTeacherCharge,
        classTelephone: classInfoRes.data.classTelephone,
        classMemo: classInfoRes.data.classMemo,
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

