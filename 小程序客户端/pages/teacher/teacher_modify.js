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
    teacherPhoto: "upload/NoImage.jpg", //教师照片
    teacherPhotoUrl: "",
    teacherPhotoList: [],
    teacherAddress: "", //家庭地址
    teacherMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择出生日期事件
  bind_teacherBirthday_change: function (e) {
    this.setData({
      teacherBirthday: e.detail.value
    })
  },
  //清空出生日期事件
  clear_teacherBirthday: function (e) {
    this.setData({
      teacherBirthday: "",
    });
  },

  //选择入职日期事件
  bind_teacherArriveDate_change: function (e) {
    this.setData({
      teacherArriveDate: e.detail.value
    })
  },
  //清空入职日期事件
  clear_teacherArriveDate: function (e) {
    this.setData({
      teacherArriveDate: "",
    });
  },

  //选择教师照片上传
  select_teacherPhoto: function (e) {
    var self = this
    wx.chooseImage({
      count: 1,   //可以上传一张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        self.setData({
          teacherPhotoList: tempFilePaths,
          loadingHide: false, 
        });

        utils.sendUploadImage(config.basePath + "upload/image", tempFilePaths[0], function (res) {
          wx.stopPullDownRefresh()
          setTimeout(function () {
            self.setData({
              teacherPhoto: res.data,
              loadingHide: true
            })
          }, 200)
        })
      }
    })
  },

  //提交服务器修改教师信息信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/teacher/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var teacherlist_page = pages[pages.length - 2];
      var teachers = teacherlist_page.data.teachers
      for(var i=0;i<teachers.length;i++) {
        if(teachers[i].teacherNumber == res.data.teacherNumber) {
          teachers[i] = res.data
          break
        }
      }
      teacherlist_page.setData({teachers:teachers})
      setTimeout(function () {
        wx.navigateBack({})
      }, 500) 
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

})

