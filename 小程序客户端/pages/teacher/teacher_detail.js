var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    teacherNumber: "", //教师编号
    teacherName: "", //教师姓名
    teacherSex: "", //性别
    teacherBirthday: "", //出生日期
    teacherArriveDate: "", //入职日期
    teacherCardNumber: "", //身份证号
    teacherPhone: "", //联系电话
    teacherPhotoUrl: "", //教师照片
    teacherAddress: "", //家庭地址
    teacherMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var teacherNumber = params.teacherNumber
    var url = config.basePath + "api/teacher/get/" + teacherNumber
    utils.sendRequest(url, {}, function (teacherRes) {
      wx.stopPullDownRefresh()
      self.setData({
        teacherNumber: teacherRes.data.teacherNumber,
        teacherName: teacherRes.data.teacherName,
        teacherSex: teacherRes.data.teacherSex,
        teacherBirthday: teacherRes.data.teacherBirthday,
        teacherArriveDate: teacherRes.data.teacherArriveDate,
        teacherCardNumber: teacherRes.data.teacherCardNumber,
        teacherPhone: teacherRes.data.teacherPhone,
        teacherPhoto: teacherRes.data.teacherPhoto,
        teacherPhotoUrl: teacherRes.data.teacherPhotoUrl,
        teacherAddress: teacherRes.data.teacherAddress,
        teacherMemo: teacherRes.data.teacherMemo,
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

