package com.neuedu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neuedu.po.DepartmentPO;
import com.neuedu.service.KeShiService;
import com.neuedu.vo.DepartmentVO;

import net.sf.json.JSONObject;

@Controller
public class KeShiHandler {
	
	@Autowired
	private KeShiService keShiService;
	
	@RequestMapping("/base/KeShiMapper/deleteDept.do")
	@ResponseBody
	public int deleteDept(int deptid) {
		System.out.println(".....KeShiHandler......deleteDept().......");
		System.out.println(deptid);
		int count = keShiService.deleteDept(deptid);
		return count;
	}
	
	@RequestMapping("/base/KeShiMapper/insertDept.do")
	@ResponseBody
	public int insertDept(DepartmentVO vo) {
		System.out.println(".....KeShiHandler......insertDept().......");
		System.out.println("vo.getDeptCode()" + vo.getDeptCode());
		System.out.println("vo.getDeptName()"+ vo.getDeptName());
		System.out.println("vo.getDeptCategoryID()" + vo.getDeptCategoryID());
		System.out.println("vo.getDeptType()" + vo.getDeptType());
		int count = keShiService.insertDept(vo);
		return count;
	}
	
	@RequestMapping("/base/KeShiMapper/updateDept.do")
	@ResponseBody
	public int updateDept(DepartmentVO vo) {
		System.out.println(".....KeShiHandler......updateDept().......");
		System.out.println("vo.getDeptCode()" + vo.getDeptCode());
		System.out.println("vo.getDeptName()"+ vo.getDeptName());
		System.out.println("vo.getDeptCategoryID()" + vo.getDeptCategoryID());
		System.out.println("vo.getDeptType()" + vo.getDeptType());
		int count = keShiService.updateDept(vo);
		return count;
	}
	
	@RequestMapping(value="/base/KeShiMapper/getSomeDept.do",method = RequestMethod.GET, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getSomeDept(DepartmentVO vo) {
		System.out.println(".....KeShiHandler......getSomeDept().......");
		System.out.println("vo.getDeptCode()" + vo.getDeptCode());
		System.out.println("vo.getDeptName()"+ vo.getDeptName());
		System.out.println("vo.getDeptCategoryID()" + vo.getDeptCategoryID());
		System.out.println("vo.getDeptType()" + vo.getDeptType());
		List<DepartmentPO> list = keShiService.getSomeDept(vo);
		JSONObject obj = new JSONObject();
		obj.put("code", 0);
		obj.put("msg", "");
		obj.put("count", 1000);
		obj.put("data", list);
		return obj.toString();
	}
	
	@RequestMapping("/base/KeShiMapper/getMaxDeptID.do")
	@ResponseBody
	public int getMaxDeptID() {
		System.out.println(".....KeShiHandler......getMaxDeptID().......");
		int deptID = keShiService.getMaxDeptID();
		return deptID;
	}
	
	
	
}
