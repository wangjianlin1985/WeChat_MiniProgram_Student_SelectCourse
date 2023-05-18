var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

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

  //上课老师修改事件
  bind_teacherObj_change: function (e) {
    this.setData({
      teacherObj_Index: e.detail.value
    })
  },

  //提交服务器修改课程信息信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/courseInfo/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var courseInfolist_page = pages[pages.length - 2];
      var courseInfos = courseInfolist_page.data.courseInfos
      for(var i=0;i<courseInfos.length;i++) {
        if(courseInfos[i].courseNumber == res.data.courseNumber) {
          courseInfos[i] = res.data
          break
        }
      }
      courseInfolist_page.setData({courseInfos:courseInfos})
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
    var courseNumber = params.courseNumber
    var url = config.basePath + "api/courseInfo/get/" + courseNumber
    utils.sendRequest(url, {}, function (courseInfoRes) {
      wx.stopPullDownRefresh()
      self.setData({
        courseNumber: courseInfoRes.data.courseNumber,
        courseName: courseInfoRes.data.courseName,
        teacherObj_Index: 1,
        courseTime: courseInfoRes.data.courseTime,
        coursePlace: courseInfoRes.data.coursePlace,
        courseScore: courseInfoRes.data.courseScore,
        courseMemo: courseInfoRes.data.courseMemo,
      })

      var teacherUrl = config.basePath + "api/teacher/listAll" 
      utils.sendRequest(teacherUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          teachers: res.data,
        })
        for (var i = 0; i < self.data.teachers.length; i++) {
          if (courseInfoRes.data.teacherObj.teacherNumber == self.data.teachers[i].teacherNumber) {
            self.setData({
              teacherObj_Index: i,
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

