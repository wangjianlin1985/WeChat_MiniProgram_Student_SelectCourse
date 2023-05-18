package com.chengxusheji.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.chengxusheji.utils.ExportExcelUtil;
import com.chengxusheji.utils.UserException;
import com.chengxusheji.service.CourseSelectService;
import com.chengxusheji.po.CourseSelect;
import com.chengxusheji.service.CourseInfoService;
import com.chengxusheji.po.CourseInfo;
import com.chengxusheji.service.StudentService;
import com.chengxusheji.po.Student;

//CourseSelect管理控制层
@Controller
@RequestMapping("/CourseSelect")
public class CourseSelectController extends BaseController {

    /*业务层对象*/
    @Resource CourseSelectService courseSelectService;

    @Resource CourseInfoService courseInfoService;
    @Resource StudentService studentService;
	@InitBinder("studentObj")
	public void initBinderstudentObj(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("studentObj.");
	}
	@InitBinder("courseObj")
	public void initBindercourseObj(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("courseObj.");
	}
	@InitBinder("courseSelect")
	public void initBinderCourseSelect(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("courseSelect.");
	}
	/*跳转到添加CourseSelect视图*/
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public String add(Model model,HttpServletRequest request) throws Exception {
		model.addAttribute(new CourseSelect());
		/*查询所有的CourseInfo信息*/
		List<CourseInfo> courseInfoList = courseInfoService.queryAllCourseInfo();
		request.setAttribute("courseInfoList", courseInfoList);
		/*查询所有的Student信息*/
		List<Student> studentList = studentService.queryAllStudent();
		request.setAttribute("studentList", studentList);
		return "CourseSelect_add";
	}

	/*客户端ajax方式提交添加学生选课信息*/
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(@Validated CourseSelect courseSelect, BindingResult br,
			Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		String message = "";
		boolean success = false;
		if (br.hasErrors()) {
			message = "输入信息不符合要求！";
			writeJsonResponse(response, success, message);
			return ;
		}
        courseSelectService.addCourseSelect(courseSelect);
        message = "学生选课添加成功!";
        success = true;
        writeJsonResponse(response, success, message);
	}
	/*ajax方式按照查询条件分页查询学生选课信息*/
	@RequestMapping(value = { "/list" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void list(String selectTime,@ModelAttribute("studentObj") Student studentObj,@ModelAttribute("courseObj") CourseInfo courseObj,Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		if (page==null || page == 0) page = 1;
		if (selectTime == null) selectTime = "";
		if(rows != 0)courseSelectService.setRows(rows);
		List<CourseSelect> courseSelectList = courseSelectService.queryCourseSelect(selectTime, studentObj, courseObj, page);
	    /*计算总的页数和总的记录数*/
	    courseSelectService.queryTotalPageAndRecordNumber(selectTime, studentObj, courseObj);
	    /*获取到总的页码数目*/
	    int totalPage = courseSelectService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = courseSelectService.getRecordNumber();
        response.setContentType("text/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		//将要被返回到客户端的对象
		JSONObject jsonObj=new JSONObject();
		jsonObj.accumulate("total", recordNumber);
		JSONArray jsonArray = new JSONArray();
		for(CourseSelect courseSelect:courseSelectList) {
			JSONObject jsonCourseSelect = courseSelect.getJsonObject();
			jsonArray.put(jsonCourseSelect);
		}
		jsonObj.accumulate("rows", jsonArray);
		out.println(jsonObj.toString());
		out.flush();
		out.close();
	}

	/*ajax方式按照查询条件分页查询学生选课信息*/
	@RequestMapping(value = { "/listAll" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void listAll(HttpServletResponse response) throws Exception {
		List<CourseSelect> courseSelectList = courseSelectService.queryAllCourseSelect();
        response.setContentType("text/json;charset=UTF-8"); 
		PrintWriter out = response.getWriter();
		JSONArray jsonArray = new JSONArray();
		for(CourseSelect courseSelect:courseSelectList) {
			JSONObject jsonCourseSelect = new JSONObject();
			jsonCourseSelect.accumulate("selectId", courseSelect.getSelectId());
			jsonArray.put(jsonCourseSelect);
		}
		out.println(jsonArray.toString());
		out.flush();
		out.close();
	}

	/*前台按照查询条件分页查询学生选课信息*/
	@RequestMapping(value = { "/frontlist" }, method = {RequestMethod.GET,RequestMethod.POST})
	public String frontlist(String selectTime,@ModelAttribute("studentObj") Student studentObj,@ModelAttribute("courseObj") CourseInfo courseObj,Integer currentPage, Model model, HttpServletRequest request) throws Exception  {
		if (currentPage==null || currentPage == 0) currentPage = 1;
		if (selectTime == null) selectTime = "";
		List<CourseSelect> courseSelectList = courseSelectService.queryCourseSelect(selectTime, studentObj, courseObj, currentPage);
	    /*计算总的页数和总的记录数*/
	    courseSelectService.queryTotalPageAndRecordNumber(selectTime, studentObj, courseObj);
	    /*获取到总的页码数目*/
	    int totalPage = courseSelectService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = courseSelectService.getRecordNumber();
	    request.setAttribute("courseSelectList",  courseSelectList);
	    request.setAttribute("totalPage", totalPage);
	    request.setAttribute("recordNumber", recordNumber);
	    request.setAttribute("currentPage", currentPage);
	    request.setAttribute("selectTime", selectTime);
	    request.setAttribute("studentObj", studentObj);
	    request.setAttribute("courseObj", courseObj);
	    List<CourseInfo> courseInfoList = courseInfoService.queryAllCourseInfo();
	    request.setAttribute("courseInfoList", courseInfoList);
	    List<Student> studentList = studentService.queryAllStudent();
	    request.setAttribute("studentList", studentList);
		return "CourseSelect/courseSelect_frontquery_result"; 
	}

     /*前台查询CourseSelect信息*/
	@RequestMapping(value="/{selectId}/frontshow",method=RequestMethod.GET)
	public String frontshow(@PathVariable Integer selectId,Model model,HttpServletRequest request) throws Exception {
		/*根据主键selectId获取CourseSelect对象*/
        CourseSelect courseSelect = courseSelectService.getCourseSelect(selectId);

        List<CourseInfo> courseInfoList = courseInfoService.queryAllCourseInfo();
        request.setAttribute("courseInfoList", courseInfoList);
        List<Student> studentList = studentService.queryAllStudent();
        request.setAttribute("studentList", studentList);
        request.setAttribute("courseSelect",  courseSelect);
        return "CourseSelect/courseSelect_frontshow";
	}

	/*ajax方式显示学生选课修改jsp视图页*/
	@RequestMapping(value="/{selectId}/update",method=RequestMethod.GET)
	public void update(@PathVariable Integer selectId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
        /*根据主键selectId获取CourseSelect对象*/
        CourseSelect courseSelect = courseSelectService.getCourseSelect(selectId);

        response.setContentType("text/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
		//将要被返回到客户端的对象 
		JSONObject jsonCourseSelect = courseSelect.getJsonObject();
		out.println(jsonCourseSelect.toString());
		out.flush();
		out.close();
	}

	/*ajax方式更新学生选课信息*/
	@RequestMapping(value = "/{selectId}/update", method = RequestMethod.POST)
	public void update(@Validated CourseSelect courseSelect, BindingResult br,
			Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		String message = "";
    	boolean success = false;
		if (br.hasErrors()) { 
			message = "输入的信息有错误！";
			writeJsonResponse(response, success, message);
			return;
		}
		try {
			courseSelectService.updateCourseSelect(courseSelect);
			message = "学生选课更新成功!";
			success = true;
			writeJsonResponse(response, success, message);
		} catch (Exception e) {
			e.printStackTrace();
			message = "学生选课更新失败!";
			writeJsonResponse(response, success, message); 
		}
	}
    /*删除学生选课信息*/
	@RequestMapping(value="/{selectId}/delete",method=RequestMethod.GET)
	public String delete(@PathVariable Integer selectId,HttpServletRequest request) throws UnsupportedEncodingException {
		  try {
			  courseSelectService.deleteCourseSelect(selectId);
	            request.setAttribute("message", "学生选课删除成功!");
	            return "message";
	        } catch (Exception e) { 
	            e.printStackTrace();
	            request.setAttribute("error", "学生选课删除失败!");
				return "error";

	        }

	}

	/*ajax方式删除多条学生选课记录*/
	@RequestMapping(value="/deletes",method=RequestMethod.POST)
	public void delete(String selectIds,HttpServletRequest request,HttpServletResponse response) throws IOException, JSONException {
		String message = "";
    	boolean success = false;
        try { 
        	int count = courseSelectService.deleteCourseSelects(selectIds);
        	success = true;
        	message = count + "条记录删除成功";
        	writeJsonResponse(response, success, message);
        } catch (Exception e) { 
            //e.printStackTrace();
            message = "有记录存在外键约束,删除失败";
            writeJsonResponse(response, success, message);
        }
	}

	/*按照查询条件导出学生选课信息到Excel*/
	@RequestMapping(value = { "/OutToExcel" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void OutToExcel(String selectTime,@ModelAttribute("studentObj") Student studentObj,@ModelAttribute("courseObj") CourseInfo courseObj, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
        if(selectTime == null) selectTime = "";
        List<CourseSelect> courseSelectList = courseSelectService.queryCourseSelect(selectTime,studentObj,courseObj);
        ExportExcelUtil ex = new ExportExcelUtil();
        String _title = "CourseSelect信息记录"; 
        String[] headers = { "记录id","选课学生","选择课程","选课时间"};
        List<String[]> dataset = new ArrayList<String[]>(); 
        for(int i=0;i<courseSelectList.size();i++) {
        	CourseSelect courseSelect = courseSelectList.get(i); 
        	dataset.add(new String[]{courseSelect.getSelectId() + "",courseSelect.getStudentObj().getStudentName(),courseSelect.getCourseObj().getCourseName(),courseSelect.getSelectTime()});
        }
        /*
        OutputStream out = null;
		try {
			out = new FileOutputStream("C://output.xls");
			ex.exportExcel(title,headers, dataset, out);
		    out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		*/
		OutputStream out = null;//创建一个输出流对象 
		try { 
			out = response.getOutputStream();//
			response.setHeader("Content-disposition","attachment; filename="+"CourseSelect.xls");//filename是下载的xls的名，建议最好用英文 
			response.setContentType("application/msexcel;charset=UTF-8");//设置类型 
			response.setHeader("Pragma","No-cache");//设置头 
			response.setHeader("Cache-Control","no-cache");//设置头 
			response.setDateHeader("Expires", 0);//设置日期头  
			String rootPath = request.getSession().getServletContext().getRealPath("/");
			ex.exportExcel(rootPath,_title,headers, dataset, out);
			out.flush();
		} catch (IOException e) { 
			e.printStackTrace(); 
		}finally{
			try{
				if(out!=null){ 
					out.close(); 
				}
			}catch(IOException e){ 
				e.printStackTrace(); 
			} 
		}
    }
}
