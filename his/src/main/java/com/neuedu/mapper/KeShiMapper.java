package com.neuedu.mapper;

import java.sql.SQLException;
import java.util.List;

import com.neuedu.po.DepartmentPO;
import com.neuedu.vo.DepartmentVO;

public interface KeShiMapper {
	//查询科室有无医生
	public int checkedUser(int deptid) throws SQLException;
	//查询科室有无患者未看诊结束
	public int checkedRegister(int deptid) throws SQLException;
	//删除科室
	public int deleteDept(int deptid) throws SQLException;
	//新增科室
	public int insertDept(DepartmentVO vo) throws SQLException;
	//修改科室
	public int updateDept(DepartmentVO vo) throws SQLException;
	//条件查询
	public List<DepartmentPO> getSomeDept(DepartmentVO vo) throws SQLException;
	//获取主键最大值
	public int getMaxDeptID() throws SQLException;
	
}
