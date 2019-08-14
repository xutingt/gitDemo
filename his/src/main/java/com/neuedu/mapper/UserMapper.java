package com.neuedu.mapper;

import java.sql.SQLException;
import java.util.List;

import com.neuedu.po.ConstantitemPO;
import com.neuedu.po.UserPO;
import com.neuedu.vo.UserInfoVO;

public interface UserMapper {
	//获取全部用户列表
	public List<UserPO> selectAllUser() throws SQLException;
	//条件查询
	public List<UserPO> getSomeUser(UserInfoVO vo) throws SQLException;
	//新增用户
	public int insertUser(UserInfoVO vo) throws SQLException;
	//修改用户信息
	public int updateUser(UserInfoVO vo) throws SQLException;
	//删除用户
	public int delectUser(int id) throws SQLException;
	//获取医生职称
	public List<ConstantitemPO> getDocTitle() throws SQLException;
	
	
}
