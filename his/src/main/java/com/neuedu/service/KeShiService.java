package com.neuedu.service;

import java.util.List;

import com.neuedu.po.DepartmentPO;
import com.neuedu.vo.DepartmentVO;

public interface KeShiService {
	//删除科室
	public int deleteDept(int deptid);
	//新增科室
	public int insertDept(DepartmentVO vo);
	//修改科室
	public int updateDept(DepartmentVO vo);
	//条件查询
	public List<DepartmentPO> getSomeDept(DepartmentVO vo);
	//获取主键最大值
	public int getMaxDeptID();
}
