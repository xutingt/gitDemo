package com.neuedu.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuedu.mapper.PlanMapper;
import com.neuedu.po.DepartmentPO;
import com.neuedu.po.RulePO;
import com.neuedu.po.SchedulingPO;
import com.neuedu.po.UserPO;
import com.neuedu.service.PlanService;
import com.neuedu.vo.MakeRuleTableVO;
import com.neuedu.vo.PaibanxinxiVO;
import com.neuedu.vo.PlanSelectVO;

@Service
public class PlanServiceImpl implements PlanService{
	
	@Autowired
	private PlanMapper planMapper;
	@Override
	public List<DepartmentPO> selectDept() {
		System.out.println("....PlanServiceImpl......selectDept()......");
		List<DepartmentPO> list = null;
		try {
			list = planMapper.selectDept();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	@Override
	public List<UserPO> select(PlanSelectVO vo) {
		System.out.println("...PlanServiceImpl......select().......");
		List<UserPO> list = null;
		try {
			list = planMapper.select(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	@Override
	public int insertRule(PaibanxinxiVO vo) {
		System.out.println("......PlanServiceImpl......insertRule().........");
		int count = -1;
		try {
			count = planMapper.insertRule(vo);
			System.out.println("try count:" + count);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}
	@Override
	public List<RulePO> selectRuleList(int DeptId) {
		System.out.println(".....PlanServiceImpl......selectRuleList()...........");
		List<RulePO> list = null;
		try {
			list = planMapper.selectRuleList(DeptId);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("service List<RulePO>.size:" + list.size());
		return list;
	}
	@Override
	public int insertWorkday(MakeRuleTableVO vo) {
		System.out.println("......PlanServiceImpl......makeWorkday().........");
		int count = -1;
		try {
			planMapper.deleteSched(vo);
			count = planMapper.insertWorkday(vo);
			System.out.println("try count:" + count);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}
	@Override
	public List<SchedulingPO> selectSchedul(MakeRuleTableVO vo) {
		System.out.println("......PlanServiceImpl......selectSchedul().........");
		List<SchedulingPO> list = null;
		try {
			list = planMapper.selectSchedul(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
}
