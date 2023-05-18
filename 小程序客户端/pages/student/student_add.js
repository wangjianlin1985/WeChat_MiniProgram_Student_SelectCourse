var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentNumber: "", //学号
    studentName: "", //姓名
    studentPassword: "", //密码
    studentSex: "", //性别
    classObj_Index: "0", //所在班级
    classInfos: [],
    studentBirthday: "", //出生日期
    studentState: "", //政治面貌
    studentPhoto: "upload/NoImage.jpg", //学生照片
    studentPhotoList: [],
    studentTelephone: "", //联系电话
    studentEmail: "", //学生邮箱
    studentQQ: "", //联系qq
    studentAddress: "", //家庭地址
    studentMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //初始化下拉框的信息
  init_select_params: function () { 
    var self = this;
    var url = null;
    url = config.basePath + "api/classInfo/listAll";
    utils.sendRequest(url, null, function (res) {
      wx.stopPullDownRefresh();
      self.setData({
        classInfos: res.data,
      });
    });
  },
  //所在班级改变事件
  bind_classObj_change: function (e) {
    this.setData({
      classObj_Index: e.detail.value
    })
  },

  //选择出生日期
  bind_studentBirthday_change: function (e) {
    this.setData({
      studentBirthday: e.detail.value
    })
  },
  //清空出生日期
  clear_studentBirthday: function (e) {
    this.setData({
      studentBirthday: "",
    });
  },

  /*提交添加学生信息到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/student/add";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        studentNumber: "",
    studentName: "",
    studentPassword: "",
    studentSex: "",
        classObj_Index: "0",
    studentBirthday: "",
    studentState: "",
        studentPhoto: "upload/NoImage.jpg",
        studentPhotoList: [],
    studentTelephone: "",
    studentEmail: "",
    studentQQ: "",
    studentAddress: "",
    studentMemo: "",
        loadingHide: true,
        loadingText: "网络操作中。。",
      })
    });
  },

  //选择学生照片上传
  select_studentPhoto: function (e) {
    var self = this
    wx.chooseImage({
      count: 1,   //可以上传一张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        self.setData({
          studentPhotoList: tempFilePaths,
          loadingHide: false
        });
        utils.sendUploadImage(config.basePath + "upload/image", tempFilePaths[0], function (res) {
          wx.stopPullDownRefresh()
          setTimeout(function () {
            self.setData({
              studentPhoto: res.data,
              loadingHide: true
            });
          }, 200);
        });
      }
    })
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

