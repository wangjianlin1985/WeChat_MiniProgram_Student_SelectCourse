package com.chengxusheji.service;

import java.util.ArrayList;
import javax.annotation.Resource; 
import org.springframework.stereotype.Service;
import com.chengxusheji.po.Student;
import com.chengxusheji.po.CourseInfo;
import com.chengxusheji.po.CourseSelect;

import com.chengxusheji.mapper.CourseSelectMapper;
@Service
public class CourseSelectService {

	@Resource CourseSelectMapper courseSelectMapper;
    /*每页显示记录数目*/
    private int rows = 10;;
    public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}

    /*保存查询后总的页数*/
    private int totalPage;
    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
    public int getTotalPage() {
        return totalPage;
    }

    /*保存查询到的总记录数*/
    private int recordNumber;
    public void setRecordNumber(int recordNumber) {
        this.recordNumber = recordNumber;
    }
    public int getRecordNumber() {
        return recordNumber;
    }

    /*添加学生选课记录*/
    public void addCourseSelect(CourseSelect courseSelect) throws Exception {
    	courseSelectMapper.addCourseSelect(courseSelect);
    }

    /*按照查询条件分页查询学生选课记录*/
    public ArrayList<CourseSelect> queryCourseSelect(String selectTime,Student studentObj,CourseInfo courseObj,int currentPage) throws Exception { 
     	String where = "where 1=1";
    	if(!selectTime.equals("")) where = where + " and t_courseSelect.selectTime like '%" + selectTime + "%'";
    	if(null != studentObj &&  studentObj.getStudentNumber() != null  && !studentObj.getStudentNumber().equals(""))  where += " and t_courseSelect.studentObj='" + studentObj.getStudentNumber() + "'";
    	if(null != courseObj &&  courseObj.getCourseNumber() != null  && !courseObj.getCourseNumber().equals(""))  where += " and t_courseSelect.courseObj='" + courseObj.getCourseNumber() + "'";
    	int startIndex = (currentPage-1) * this.rows;
    	return courseSelectMapper.queryCourseSelect(where, startIndex, this.rows);
    }

    /*按照查询条件查询所有记录*/
    public ArrayList<CourseSelect> queryCourseSelect(String selectTime,Student studentObj,CourseInfo courseObj) throws Exception  { 
     	String where = "where 1=1";
    	if(!selectTime.equals("")) where = where + " and t_courseSelect.selectTime like '%" + selectTime + "%'";
    	if(null != studentObj &&  studentObj.getStudentNumber() != null && !studentObj.getStudentNumber().equals(""))  where += " and t_courseSelect.studentObj='" + studentObj.getStudentNumber() + "'";
    	if(null != courseObj &&  courseObj.getCourseNumber() != null && !courseObj.getCourseNumber().equals(""))  where += " and t_courseSelect.courseObj='" + courseObj.getCourseNumber() + "'";
    	return courseSelectMapper.queryCourseSelectList(where);
    }

    /*查询所有学生选课记录*/
    public ArrayList<CourseSelect> queryAllCourseSelect()  throws Exception {
        return courseSelectMapper.queryCourseSelectList("where 1=1");
    }

    /*当前查询条件下计算总的页数和记录数*/
    public void queryTotalPageAndRecordNumber(String selectTime,Student studentObj,CourseInfo courseObj) throws Exception {
     	String where = "where 1=1";
    	if(!selectTime.equals("")) where = where + " and t_courseSelect.selectTime like '%" + selectTime + "%'";
    	if(null != studentObj &&  studentObj.getStudentNumber() != null && !studentObj.getStudentNumber().equals(""))  where += " and t_courseSelect.studentObj='" + studentObj.getStudentNumber() + "'";
    	if(null != courseObj &&  courseObj.getCourseNumber() != null && !courseObj.getCourseNumber().equals(""))  where += " and t_courseSelect.courseObj='" + courseObj.getCourseNumber() + "'";
        recordNumber = courseSelectMapper.queryCourseSelectCount(where);
        int mod = recordNumber % this.rows;
        totalPage = recordNumber / this.rows;
        if(mod != 0) totalPage++;
    }

    /*根据主键获取学生选课记录*/
    public CourseSelect getCourseSelect(int selectId) throws Exception  {
        CourseSelect courseSelect = courseSelectMapper.getCourseSelect(selectId);
        return courseSelect;
    }

    /*更新学生选课记录*/
    public void updateCourseSelect(CourseSelect courseSelect) throws Exception {
        courseSelectMapper.updateCourseSelect(courseSelect);
    }

    /*删除一条学生选课记录*/
    public void deleteCourseSelect (int selectId) throws Exception {
        courseSelectMapper.deleteCourseSelect(selectId);
    }

    /*删除多条学生选课信息*/
    public int deleteCourseSelects (String selectIds) throws Exception {
    	String _selectIds[] = selectIds.split(",");
    	for(String _selectId: _selectIds) {
    		courseSelectMapper.deleteCourseSelect(Integer.parseInt(_selectId));
    	}
    	return _selectIds.length;
    }
}
