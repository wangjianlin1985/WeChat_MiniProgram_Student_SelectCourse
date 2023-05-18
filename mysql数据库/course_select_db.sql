/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : course_select_db

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2019-10-20 16:22:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('a', 'a');

-- ----------------------------
-- Table structure for `t_classinfo`
-- ----------------------------
DROP TABLE IF EXISTS `t_classinfo`;
CREATE TABLE `t_classinfo` (
  `classNumber` varchar(20) NOT NULL COMMENT 'classNumber',
  `className` varchar(20) NOT NULL COMMENT '班级名称',
  `classSpecialFieldNumber` varchar(40) NOT NULL COMMENT '所属专业',
  `classBirthDate` varchar(20) DEFAULT NULL COMMENT '成立日期',
  `classTeacherCharge` varchar(12) DEFAULT NULL COMMENT '班主任',
  `classTelephone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `classMemo` varchar(100) DEFAULT NULL COMMENT '附加信息',
  PRIMARY KEY (`classNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_classinfo
-- ----------------------------
INSERT INTO `t_classinfo` VALUES ('BJ001', '2020级计算机3班', '计算机科学与技术', '2019-10-09', '王喜斌', '13981083412', '测试班级1');
INSERT INTO `t_classinfo` VALUES ('BJ002', '计算机4班', '计算机科学与技术', '2019-10-08', '王小明', '13980810834', '测试班级');

-- ----------------------------
-- Table structure for `t_courseinfo`
-- ----------------------------
DROP TABLE IF EXISTS `t_courseinfo`;
CREATE TABLE `t_courseinfo` (
  `courseNumber` varchar(20) NOT NULL COMMENT 'courseNumber',
  `courseName` varchar(20) NOT NULL COMMENT '课程名称',
  `teacherObj` varchar(20) NOT NULL COMMENT '上课老师',
  `courseTime` varchar(40) DEFAULT NULL COMMENT '上课时间',
  `coursePlace` varchar(40) DEFAULT NULL COMMENT '上课地点',
  `courseScore` float NOT NULL COMMENT '课程学分',
  `courseMemo` varchar(100) DEFAULT NULL COMMENT '附加信息',
  PRIMARY KEY (`courseNumber`),
  KEY `teacherObj` (`teacherObj`),
  CONSTRAINT `t_courseinfo_ibfk_1` FOREIGN KEY (`teacherObj`) REFERENCES `t_teacher` (`teacherNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_courseinfo
-- ----------------------------
INSERT INTO `t_courseinfo` VALUES ('KC001', 'php网站开发', 'TH001', '周二下午3,4节', '6A-203', '3.5', 'test');
INSERT INTO `t_courseinfo` VALUES ('KC002', '安卓app程序开发', 'TH001', '周一上午3,4节', '6A-302', '4', '测试');
INSERT INTO `t_courseinfo` VALUES ('KC003', '小程序开发入门', 'TH002', '每周三下午', '6C-302', '3.5', '必修课');

-- ----------------------------
-- Table structure for `t_courseselect`
-- ----------------------------
DROP TABLE IF EXISTS `t_courseselect`;
CREATE TABLE `t_courseselect` (
  `selectId` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `studentObj` varchar(30) NOT NULL COMMENT '选课学生',
  `courseObj` varchar(20) NOT NULL COMMENT '选择课程',
  `selectTime` varchar(20) DEFAULT NULL COMMENT '选课时间',
  PRIMARY KEY (`selectId`),
  KEY `studentObj` (`studentObj`),
  KEY `courseObj` (`courseObj`),
  CONSTRAINT `t_courseselect_ibfk_1` FOREIGN KEY (`studentObj`) REFERENCES `t_student` (`studentNumber`),
  CONSTRAINT `t_courseselect_ibfk_2` FOREIGN KEY (`courseObj`) REFERENCES `t_courseinfo` (`courseNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_courseselect
-- ----------------------------
INSERT INTO `t_courseselect` VALUES ('2', 'xs001', 'KC002', '2019-10-20 14:23:28');
INSERT INTO `t_courseselect` VALUES ('3', 'xs001', 'KC001', '2019-10-20 14:30:20');
INSERT INTO `t_courseselect` VALUES ('4', 'xs002', 'KC001', '2019-10-20 15:32:23');
INSERT INTO `t_courseselect` VALUES ('5', 'xs002', 'KC002', '2019-10-20 16:07:08');

-- ----------------------------
-- Table structure for `t_news`
-- ----------------------------
DROP TABLE IF EXISTS `t_news`;
CREATE TABLE `t_news` (
  `newsId` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录编号',
  `newsTitle` varchar(50) NOT NULL COMMENT '新闻标题',
  `newsContent` varchar(500) NOT NULL COMMENT '新闻内容',
  `newsDate` varchar(20) DEFAULT NULL COMMENT '发布日期',
  `newsPhoto` varchar(60) NOT NULL COMMENT '新闻图片',
  PRIMARY KEY (`newsId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_news
-- ----------------------------
INSERT INTO `t_news` VALUES ('1', '小程序选课app上线', '热烈庆祝基于微信小程序选课app上线了，热烈庆祝基于微信小程序选课app上线了，热烈庆祝基于微信小程序选课app上线了，热烈庆祝基于微信小程序选课app上线了', '2019-10-19', 'upload/8fdbedce-3571-4a4c-86da-a46d42567b45.jpg');
INSERT INTO `t_news` VALUES ('2', '学生使用须知', '学生第一次打开小程序，想要查询自己的选课和查询成绩的话，需要先绑定自己的学号密码哈！', '2019-10-14', 'upload/7534cf4f-297b-408b-b39a-00f3fcf5c821.jpg');

-- ----------------------------
-- Table structure for `t_scoreinfo`
-- ----------------------------
DROP TABLE IF EXISTS `t_scoreinfo`;
CREATE TABLE `t_scoreinfo` (
  `scoreId` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录编号',
  `studentObj` varchar(30) NOT NULL COMMENT '学生',
  `courseObj` varchar(20) NOT NULL COMMENT '课程',
  `scoreValue` float NOT NULL COMMENT '成绩得分',
  `studentEvaluate` varchar(30) DEFAULT NULL COMMENT '学生评价',
  PRIMARY KEY (`scoreId`),
  KEY `studentObj` (`studentObj`),
  KEY `courseObj` (`courseObj`),
  CONSTRAINT `t_scoreinfo_ibfk_1` FOREIGN KEY (`studentObj`) REFERENCES `t_student` (`studentNumber`),
  CONSTRAINT `t_scoreinfo_ibfk_2` FOREIGN KEY (`courseObj`) REFERENCES `t_courseinfo` (`courseNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_scoreinfo
-- ----------------------------
INSERT INTO `t_scoreinfo` VALUES ('1', 'xs001', 'KC001', '92', '成绩优秀，上课认真');
INSERT INTO `t_scoreinfo` VALUES ('2', 'xs002', 'KC002', '88', '还不错');
INSERT INTO `t_scoreinfo` VALUES ('3', 'xs002', 'KC001', '90', '可以的');

-- ----------------------------
-- Table structure for `t_student`
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `studentNumber` varchar(30) NOT NULL COMMENT 'studentNumber',
  `studentName` varchar(12) NOT NULL COMMENT '姓名',
  `studentPassword` varchar(30) NOT NULL COMMENT '密码',
  `studentSex` varchar(2) NOT NULL COMMENT '性别',
  `classObj` varchar(20) NOT NULL COMMENT '所在班级',
  `studentBirthday` varchar(20) DEFAULT NULL COMMENT '出生日期',
  `studentState` varchar(20) DEFAULT NULL COMMENT '政治面貌',
  `studentPhoto` varchar(60) NOT NULL COMMENT '学生照片',
  `studentTelephone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `studentEmail` varchar(30) DEFAULT NULL COMMENT '学生邮箱',
  `studentQQ` varchar(20) DEFAULT NULL COMMENT '联系qq',
  `studentAddress` varchar(100) DEFAULT NULL COMMENT '家庭地址',
  `studentMemo` varchar(100) DEFAULT NULL COMMENT '附加信息',
  `openid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`studentNumber`),
  KEY `classObj` (`classObj`),
  CONSTRAINT `t_student_ibfk_1` FOREIGN KEY (`classObj`) REFERENCES `t_classinfo` (`classNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_student
-- ----------------------------
INSERT INTO `t_student` VALUES ('xs001', '张晓霞', '123', '女', 'BJ001', '2019-10-09', '团员', 'upload/29b679ec-8924-4f5e-b812-09752589aaef.jpg', '13908920834', 'xiaoxia@163.com', '35101841', '四川成都红星路', 'test', '');
INSERT INTO `t_student` VALUES ('xs002', '张晓彤', '123', '女', 'BJ001', '2019-10-02', '团员', 'upload/68be82b5-731f-417b-87cc-a379cfba7b5e.jpg', '13980103942', 'xiaoteng@163.com', '41083442', '四川成都建设路', '测试', 'oM7Mu5XyeVJSc8roaUCRlcz_IP9k');

-- ----------------------------
-- Table structure for `t_teacher`
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher`;
CREATE TABLE `t_teacher` (
  `teacherNumber` varchar(20) NOT NULL COMMENT 'teacherNumber',
  `teacherName` varchar(12) NOT NULL COMMENT '教师姓名',
  `teacherSex` varchar(2) NOT NULL COMMENT '性别',
  `teacherBirthday` varchar(20) DEFAULT NULL COMMENT '出生日期',
  `teacherArriveDate` varchar(20) DEFAULT NULL COMMENT '入职日期',
  `teacherCardNumber` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `teacherPhone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `teacherPhoto` varchar(60) NOT NULL COMMENT '教师照片',
  `teacherAddress` varchar(100) DEFAULT NULL COMMENT '家庭地址',
  `teacherMemo` varchar(100) DEFAULT NULL COMMENT '附加信息',
  PRIMARY KEY (`teacherNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_teacher
-- ----------------------------
INSERT INTO `t_teacher` VALUES ('TH001', '张宇', '男', '2019-10-02', '2019-10-02', '513030199712113423', '13984092342', 'upload/b124a9af-8d68-4dfd-9015-0e41b8f0e5a3.jpg', '成都春熙路', 'test');
INSERT INTO `t_teacher` VALUES ('TH002', '黄蓉', '女', '2019-10-01', '2019-10-03', '513030199712114223', '13939930913', 'upload/056bb1bd-5336-491c-959e-1e72f6d22e39.jpg', '成都武侯祠', '负责的老师');
