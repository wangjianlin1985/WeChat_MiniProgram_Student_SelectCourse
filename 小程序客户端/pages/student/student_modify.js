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
    classObj_Index: "0", //所在班级
    classInfos: [],
    studentBirthday: "", //出生日期
    studentState: "", //政治面貌
    studentPhoto: "upload/NoImage.jpg", //学生照片
    studentPhotoUrl: "",
    studentPhotoList: [],
    studentTelephone: "", //联系电话
    studentEmail: "", //学生邮箱
    studentQQ: "", //联系qq
    studentAddress: "", //家庭地址
    studentMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择出生日期事件
  bind_studentBirthday_change: function (e) {
    this.setData({
      studentBirthday: e.detail.value
    })
  },
  //清空出生日期事件
  clear_studentBirthday: function (e) {
    this.setData({
      studentBirthday: "",
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
          loadingHide: false, 
        });

        utils.sendUploadImage(config.basePath + "upload/image", tempFilePaths[0], function (res) {
          wx.stopPullDownRefresh()
          setTimeout(function () {
            self.setData({
              studentPhoto: res.data,
              loadingHide: true
            })
          }, 200)
        })
      }
    })
  },

  //所在班级修改事件
  bind_classObj_change: function (e) {
    this.setData({
      classObj_Index: e.detail.value
    })
  },

  //提交服务器修改学生信息信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/student/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var studentlist_page = pages[pages.length - 2];
      var students = studentlist_page.data.students
      for(var i=0;i<students.length;i++) {
        if(students[i].studentNumber == res.data.studentNumber) {
          students[i] = res.data
          break
        }
      }
      studentlist_page.setData({students:students})
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
    var studentNumber = params.studentNumber
    var url = config.basePath + "api/student/get/" + studentNumber
    utils.sendRequest(url, {}, function (studentRes) {
      wx.stopPullDownRefresh()
      self.setData({
        studentNumber: studentRes.data.studentNumber,
        studentName: studentRes.data.studentName,
        studentPassword: studentRes.data.studentPassword,
        studentSex: studentRes.data.studentSex,
        classObj_Index: 1,
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

      var classInfoUrl = config.basePath + "api/classInfo/listAll" 
      utils.sendRequest(classInfoUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          classInfos: res.data,
        })
        for (var i = 0; i < self.data.classInfos.length; i++) {
          if (studentRes.data.classObj.classNumber == self.data.classInfos[i].classNumber) {
            self.setData({
              classObj_Index: i,
            });
            break;
          }
        }
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

