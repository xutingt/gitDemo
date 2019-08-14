package com.neuedu.mapper;

import java.sql.SQLException;
import java.util.List;

import com.neuedu.po.DepartmentPO;
import com.neuedu.po.UserPO;
import com.neuedu.vo.LoginVO;

public interface SystemMapper {
	
	public UserPO doLogin(LoginVO vo) throws SQLException;
	
	public List<DepartmentPO> selectDept(String constantName) throws SQLException;
	
	public List<DepartmentPO> selectAllDept() throws SQLException;
}
