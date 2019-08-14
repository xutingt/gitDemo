package com.neuedu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neuedu.po.ConstantitemPO;
import com.neuedu.po.UserPO;
import com.neuedu.service.UserService;
import com.neuedu.vo.UserInfoVO;

@Controller
public class UserHandler {
	
	@Autowired
	private UserService userService;
	
	//获取全部用户列表
	@RequestMapping("/base/UserMapper/selectAllUser.do")
	@ResponseBody
	public List<UserPO> selectAllUser(){
		System.out.println("....UserHandler.........selectAllUser()...............");
		List<UserPO> list = userService.selectAllUser();
		return list;
	}
	//条件查询
	@RequestMapping("/base/UserMapper/getSomeUser.do")
	@ResponseBody
	public List<UserPO> getSomeUser(UserInfoVO vo){
		System.out.println("....UserHandler.........getSomeUser()...............");		
		List<UserPO> list = userService.getSomeUser(vo);
		return list;
	}
	//新增用户
	@RequestMapping("/base/UserMapper/insertUser.do")
	@ResponseBody
	public int insertUser(UserInfoVO vo){
		System.out.println("....UserHandler.........insertUser()...............");	
		int count = userService.insertUser(vo);
		return count;
	}
	//修改用户信息
	@RequestMapping("/base/UserMapper/updateUser.do")
	@ResponseBody
	public int updateUser(UserInfoVO vo) {
		System.out.println("....UserHandler.........updateUser()...............");	
		int count = userService.updateUser(vo);
		return count;		
	}
	//删除用户
	@RequestMapping("/base/UserMapper/delectUser.do")
	@ResponseBody
	public int delectUser(int id) {
		System.out.println("....UserHandler.........delectUser()...............");	
		int count = userService.delectUser(id);
		return count;
	}
	//获取医生职称
	@RequestMapping("/base/UserMapper/getDocTitle.do")
	@ResponseBody
	public List<ConstantitemPO> getDocTitle(){
		System.out.println("....UserHandler.........getDocTitle()...............");	
		List<ConstantitemPO> list = userService.getDocTitle();
		return list;
	}
	
}
