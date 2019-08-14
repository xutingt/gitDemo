package com.neuedu.mapper;

import java.sql.SQLException;
import java.util.List;

import com.neuedu.po.ConstantitemPO;
import com.neuedu.po.DepartmentPO;
import com.neuedu.po.RegistLevelPO;
import com.neuedu.po.RegisterPO;
import com.neuedu.po.UserPO;
import com.neuedu.vo.MakeRuleTableVO;

public interface RegistMapper {
	//获取科室分类
	public List<ConstantitemPO> getDeptType() throws SQLException; 
	//获取科室类别
	public List<DepartmentPO> getDeptTypeClass(int deptCategoryID) throws SQLException;
	//获取挂号类别
	public List<RegistLevelPO> getRegistType() throws SQLException;
	//获取挂号费用
	public int getRegistFee(int registTypeID) throws SQLException;
	//获取可挂号医生
	public List<UserPO> selectDoc(MakeRuleTableVO vo) throws SQLException;
	//新增患者挂号信息表
	public int insertRegist(RegisterPO po) throws SQLException;
	
}
