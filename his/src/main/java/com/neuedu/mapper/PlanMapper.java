package com.neuedu.mapper;

import java.sql.SQLException;
import java.util.List;

import com.neuedu.po.DepartmentPO;
import com.neuedu.po.RulePO;
import com.neuedu.po.SchedulingPO;
import com.neuedu.po.UserPO;
import com.neuedu.vo.MakeRuleTableVO;
import com.neuedu.vo.PaibanxinxiVO;
import com.neuedu.vo.PlanSelectVO;

public interface PlanMapper {
	//获取临床科室
	public List<DepartmentPO> selectDept() throws SQLException;
	//获取对应科室，挂号级别的门诊医生
	public List<UserPO> select(PlanSelectVO vo) throws SQLException;
	//新增排班规则
	public int insertRule(PaibanxinxiVO vo) throws SQLException;
	//获取排班数据
	public List<RulePO> selectRuleList(int DeptId) throws SQLException;
	//创建排班
	public int insertWorkday(MakeRuleTableVO vo) throws SQLException;
	//删除排班
	public int deleteSched(MakeRuleTableVO vo) throws SQLException;
	//查询排班
	public List<SchedulingPO> selectSchedul(MakeRuleTableVO vo) throws SQLException;
}
