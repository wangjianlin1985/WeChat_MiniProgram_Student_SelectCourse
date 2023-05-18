var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentNumber: "", //学号
    studentName: "", //姓名
    studentPassword: "", //密码
    studentSex: "", //性别
    classObj: "", //所在班级
    studentBirthday: "", //出生日期
    studentState: "", //政治面貌
    studentPhotoUrl: "", //学生照片
    studentTelephone: "", //联系电话
    studentEmail: "", //学生邮箱
    studentQQ: "", //联系qq
    studentAddress: "", //家庭地址
    studentMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var studentNumber = params.studentNumber
    var url = config.basePath + "api/student/get/" + studentNumber
    utils.sendRequest(url, {}, function (studentRes) {
      wx.stopPullDownRefresh()
      self.setData({
        studentNumber: studentRes.data.studentNumber,
        studentName: studentRes.data.studentName,
        studentPassword: studentRes.data.studentPassword,
        studentSex: studentRes.data.studentSex,
        classObj: studentRes.data.classObj.className,
        studentBirthday: studentRes.data.studentBirthday,
        studentState: studentRes.data.studentState,
        studentPhoto: studentRes.data.studentPhoto,
        studentPhotoUrl: studentRes.data.studentPhotoUrl,
        studentTelephone: studentRes.data.studentTelephone,
        studentEmail: studentRes.data.studentEmail,
        studentQQ: studentRes.data.studentQQ,
        studentAddress: studentRes.data.studentAddress,
        studentMemo: studentRes.data.studentMemo,
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

