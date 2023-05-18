package com.chengxusheji.mapper;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.chengxusheji.po.CourseSelect;

public interface CourseSelectMapper {
	/*添加学生选课信息*/
	public void addCourseSelect(CourseSelect courseSelect) throws Exception;

	/*按照查询条件分页查询学生选课记录*/
	public ArrayList<CourseSelect> queryCourseSelect(@Param("where") String where,@Param("startIndex") int startIndex,@Param("pageSize") int pageSize) throws Exception;

	/*按照查询条件查询所有学生选课记录*/
	public ArrayList<CourseSelect> queryCourseSelectList(@Param("where") String where) throws Exception;

	/*按照查询条件的学生选课记录数*/
	public int queryCourseSelectCount(@Param("where") String where) throws Exception; 

	/*根据主键查询某条学生选课记录*/
	public CourseSelect getCourseSelect(int selectId) throws Exception;

	/*更新学生选课记录*/
	public void updateCourseSelect(CourseSelect courseSelect) throws Exception;

	/*删除学生选课记录*/
	public void deleteCourseSelect(int selectId) throws Exception;

}
