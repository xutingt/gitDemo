package com.neuedu.controller;

import java.net.http.HttpResponse;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neuedu.po.DepartmentPO;
import com.neuedu.po.UserPO;
import com.neuedu.service.SystemService;
import com.neuedu.vo.LoginVO;

import net.sf.json.JSONObject;

@Controller
public class SystemHandler {
	@Autowired
	private SystemService systemService;
	
	@RequestMapping("/login.do")
	@ResponseBody
	public int doLogin(LoginVO vo,HttpSession session) {
		System.out.println("....SystemHandler.......doLogin()...........");
		System.out.println(vo.getUserName());
		System.out.println(vo.getPassword());
		UserPO po = systemService.doLogin(vo);
		if(po == null) {
			po = new UserPO();
			po.setUserType(-1);
		}else {
			session.setAttribute("online", po);
		}
		System.out.println("SystemHandler :" + po.getUserType());
		return po.getUserType();
	}
	@RequestMapping(value="/kaishi/selectDept.do",method = RequestMethod.GET, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String selectDept( String constantName){
		System.out.println("....SystemHandler...selectDept().........");
		List<DepartmentPO> list = systemService.selectDept(constantName);
		System.out.println("controller list getConstantName:"+list.get(0).getConstantName());
		JSONObject obj = new JSONObject();
		obj.put("code", 0);
		obj.put("msg", "");
		obj.put("count", 1000);
		obj.put("data", list);
		return obj.toString();
	}
	@RequestMapping(value="/kaishi/selectAllDept.do",method = RequestMethod.GET, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String selectAllDept(){
		System.out.println("....SystemHandler...selectAllDept().........");
		List<DepartmentPO> list = systemService.selectAllDept();
//		JSONObject obj = new JSONObject();
		JSONObject obj = new JSONObject();
		obj.put("code", 0);
		obj.put("msg", "");
		obj.put("count", 1000);
		obj.put("data", list);
		return obj.toString();
	}
	
	
}
