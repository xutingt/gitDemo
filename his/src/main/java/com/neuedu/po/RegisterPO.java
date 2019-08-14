package com.neuedu.po;


public class RegisterPO {
	private int	ID;						//ID主键
    private String CaseNumber;			//病历号
    private String RealName;			//姓名
    private int Gender;					//性别
    private String IDnumber;			//身份证号
    private String BirthDate;			//出生日期
    private int Age;					//年龄
    private String AgeType;				//年龄类型 岁 月 天
    private String HomeAddress;			//家庭住址
    private String VisitDate;			//本次看诊日期
    private String Noon;				//午别 上午/下午
    private int DeptID;					//本次挂号科室ID
    private int UserID;					//本次挂号医生ID
    private int RegistLeID;				//本次挂号级别ID
    private int SettleID;				//结算类别ID
    private String IsBook;				//病历本要否 是/否
    private String RegistTime;			//挂号时间
    private int RegisterID;				//挂号员ID
    private int VisitState;				//本次看诊状态
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getCaseNumber() {
		return CaseNumber;
	}
	public void setCaseNumber(String caseNumber) {
		CaseNumber = caseNumber;
	}
	public String getRealName() {
		return RealName;
	}
	public void setRealName(String realName) {
		RealName = realName;
	}
	public int getGender() {
		return Gender;
	}
	public void setGender(int gender) {
		Gender = gender;
	}
	public String getIDnumber() {
		return IDnumber;
	}
	public void setIDnumber(String iDnumber) {
		IDnumber = iDnumber;
	}
	public String getBirthDate() {
		return BirthDate;
	}
	public void setBirthDate(String birthDate) {
		BirthDate = birthDate;
	}
	public int getAge() {
		return Age;
	}
	public void setAge(int age) {
		Age = age;
	}
	public String getAgeType() {
		return AgeType;
	}
	public void setAgeType(String ageType) {
		AgeType = ageType;
	}
	public String getHomeAddress() {
		return HomeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		HomeAddress = homeAddress;
	}
	public String getVisitDate() {
		return VisitDate;
	}
	public void setVisitDate(String visitDate) {
		VisitDate = visitDate;
	}
	public String getNoon() {
		return Noon;
	}
	public void setNoon(String noon) {
		Noon = noon;
	}
	public int getDeptID() {
		return DeptID;
	}
	public void setDeptID(int deptID) {
		DeptID = deptID;
	}
	public int getUserID() {
		return UserID;
	}
	public void setUserID(int userID) {
		UserID = userID;
	}
	public int getRegistLeID() {
		return RegistLeID;
	}
	public void setRegistLeID(int registLeID) {
		RegistLeID = registLeID;
	}
	public int getSettleID() {
		return SettleID;
	}
	public void setSettleID(int settleID) {
		SettleID = settleID;
	}
	public String getIsBook() {
		return IsBook;
	}
	public void setIsBook(String isBook) {
		IsBook = isBook;
	}
	public String getRegistTime() {
		return RegistTime;
	}
	public void setRegistTime(String registTime) {
		RegistTime = registTime;
	}
	public int getRegisterID() {
		return RegisterID;
	}
	public void setRegisterID(int registerID) {
		RegisterID = registerID;
	}
	public int getVisitState() {
		return VisitState;
	}
	public void setVisitState(int visitState) {
		VisitState = visitState;
	}
}
