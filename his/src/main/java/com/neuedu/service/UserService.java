package com.neuedu.service;


import java.util.List;

import com.neuedu.po.ConstantitemPO;
import com.neuedu.po.UserPO;
import com.neuedu.vo.UserInfoVO;

public interface UserService {
	//获取全部用户列表
	public List<UserPO> selectAllUser();
	//条件查询
	public List<UserPO> getSomeUser(UserInfoVO vo);
	//新增用户
	public int insertUser(UserInfoVO vo);
	//修改用户信息
	public int updateUser(UserInfoVO vo);
	//删除用户
	public int delectUser(int id);
	//获取医生职称
	public List<ConstantitemPO> getDocTitle();
}
