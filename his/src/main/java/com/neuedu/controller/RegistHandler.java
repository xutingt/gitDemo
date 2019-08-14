package com.neuedu.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neuedu.po.ConstantitemPO;
import com.neuedu.po.DepartmentPO;
import com.neuedu.po.RegistLevelPO;
import com.neuedu.po.RegisterPO;
import com.neuedu.po.UserPO;
import com.neuedu.service.RegistService;
import com.neuedu.vo.MakeRuleTableVO;

@Controller
public class RegistHandler {
	
	@Autowired
	private RegistService registService;
	
	//获取科室分类
	@RequestMapping("/registration/getDeptType.do")
	@ResponseBody
	public List<ConstantitemPO> getDateType(){
		System.out.println("....RegistHandler....getDateType()...");
		List<ConstantitemPO> list= registService.getDeptType();
		if(list == null) {
			System.out.println("Handler ConstantitemPOlist为空");
		}else {
			System.out.println("Handler ConstantitemPOlist.size():"+ list.size());
		}
		return list;
	}
	//获取科室类别
	@RequestMapping("/registration/getDeptTypeClass.do")
	@ResponseBody
	public List<DepartmentPO> getDateTypeClass(Integer deptCategoryID){
		System.out.println("....RegistHandler....getDateTypeClass()...");
		System.out.println("deptCategoryID:" + deptCategoryID);
		List<DepartmentPO> list= registService.getDeptTypeClass(deptCategoryID);
		if(list == null) {
			System.out.println("Handler DepartmentPOlist为空");
		}else {
			System.out.println("Handler DepartmentPOlist.size():"+ list.size());
		}
		return list;
	}
	
	//获取挂号类别
	@RequestMapping("/registration/getRegistType.do")
	@ResponseBody
	public List<RegistLevelPO> getRegistType(){
		System.out.println("....RegistHandler....getRegistType()...");
		
		List<RegistLevelPO> list= registService.getRegistType();
		if(list == null) {
			System.out.println("Handler RegistLevelPOlist为空");
		}else {
			System.out.println("Handler RegistLevelPOlist.size():"+ list.size());
		}
		return list;
	}
	//获取挂号费用
	@RequestMapping("/registration/getRegistFee.do")
	@ResponseBody
	public int getRegistFee(Integer registTypeID){
		System.out.println("....RegistHandler....getRegistFee()...");
		int fee = registService.getRegistFee(registTypeID);
		System.out.println("Handler fee :" + fee);
		return fee;
	}
	//获取可以挂号医生
	@RequestMapping("/registration/selectDoc.do")
	@ResponseBody
	public List<UserPO> selectDoc(MakeRuleTableVO vo){
		System.out.println("....RegistHandler....selectDoc()...");
		System.out.println("vo.getDeptID():"+ vo.getDeptID());
		System.out.println("vo.getNoon():"+ vo.getNoon());
		System.out.println("vo.getRegistLeID():"+ vo.getRegistLeID());
		System.out.println("vo.getSchedDate():"+ vo.getSchedDate());
		List<UserPO> list = registService.selectDoc(vo);
		return list;
	}
	//获取服务器时间
	@RequestMapping("/registration/getCurrentTime.do")
	@ResponseBody
	public Date getCurrentTime(){
		return new Date();
	}
	
	//新增患者挂号信息表
	@RequestMapping("/registration/regist/insertRegist.do")
	@ResponseBody
	public int insertRegist(RegisterPO po,HttpSession session){
		System.out.println("....RegistHandler....insertRegist()...");	
		UserPO online = (UserPO)session.getAttribute("online");
		po.setRegisterID(online.getID());
		po.setRegistTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		System.out.println(po.getRegistTime());
		System.out.println(po.getIsBook());
		int  count = registService.insertRegist(po);
		return count;
	}
	
}
