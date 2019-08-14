package com.neuedu.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neuedu.po.DepartmentPO;
import com.neuedu.po.RulePO;
import com.neuedu.po.SchedulingPO;
import com.neuedu.po.UserPO;
import com.neuedu.service.PlanService;
import com.neuedu.vo.MakeRuleTableVO;
import com.neuedu.vo.PaibanxinxiVO;
import com.neuedu.vo.PlanSelectVO;

@Controller
public class PlanHandler {
	
	@Autowired
	private PlanService planService;
	
	@RequestMapping("/plan/controller/selectDept.do")
	@ResponseBody
	public List<DepartmentPO> selectDept(){
		System.out.println("....PlanHandler......selectDept()......");
		List<DepartmentPO> list = planService.selectDept();
		return list;
	}
	@RequestMapping("/plan/controller/select.do")
	@ResponseBody
	public List<UserPO> select(PlanSelectVO vo){
		System.out.println("....PlanHandler.....select()....");
		System.out.println("deptid:" + vo.getDeptId());
		System.out.println("deptid:" + vo.getRegistId());
		List<UserPO> list = planService.select(vo);
		System.out.println("handler " + list.size());
		return list;
	}
	@RequestMapping("/plan/controller/insertRule.do")
	@ResponseBody
	public int insertRule(PaibanxinxiVO vo){
		System.out.println("....PlanHandler.....insertRule()....");
		System.out.println("UserId:" + vo.getUserId());
		System.out.println("DeptId:" + vo.getDeptId());
		System.out.println("DelMark:" + vo.getDelMark());
		System.out.println("RuleName:" + vo.getRuleName());
		System.out.println("Week:" + vo.getWeek());

		int count  = planService.insertRule(vo);
		System.out.println("count:" + count);
		return count;
	}
	
	@RequestMapping("/plan/rulecontroller/selectRuleList.do")
	@ResponseBody
	public List<RulePO> selectRuleList(int DeptId){
		System.out.println("....PlanHandler.....selectRuleList()....");
		System.out.println(DeptId);
		List<RulePO> list = planService.selectRuleList(DeptId);
		System.out.println("List<RulePO>.size:" + list.size());
		return list;
	}
	@RequestMapping("/plan/scheduelingcontroller/insertWorkday.do")
	@ResponseBody
	public int insertWorkday(MakeRuleTableVO vo){
		System.out.println("....PlanHandler.....insertWorkday()....");
		int count = planService.insertWorkday(vo);
		return count;
	}
	@RequestMapping("/plan/scheduelingcontroller/selectSchedul.do")
	@ResponseBody
	public List<SchedulingPO> selectSchedul(MakeRuleTableVO vo){
		System.out.println("....PlanHandler.....selectSchedul()....");
		List<SchedulingPO> list = planService.selectSchedul(vo);
		return list;
	}
	
}
