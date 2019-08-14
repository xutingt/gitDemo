package com.neuedu.service;

import java.util.List;

import com.neuedu.po.DepartmentPO;
import com.neuedu.po.RulePO;
import com.neuedu.po.SchedulingPO;
import com.neuedu.po.UserPO;
import com.neuedu.vo.MakeRuleTableVO;
import com.neuedu.vo.PaibanxinxiVO;
import com.neuedu.vo.PlanSelectVO;

public interface PlanService {
	//获取临床科室
	public List<DepartmentPO> selectDept();
	//获取对应科室，挂号级别的门诊医生
	public List<UserPO> select(PlanSelectVO vo);
	//新增排班规则
	public int insertRule(PaibanxinxiVO vo);
	//获取排班数据
	public List<RulePO> selectRuleList(int DeptId);
	//创建排班
	public int insertWorkday(MakeRuleTableVO vo);
	//查询排班
	public List<SchedulingPO> selectSchedul(MakeRuleTableVO vo);
}
