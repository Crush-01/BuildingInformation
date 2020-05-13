package com.query.companys.Dao;

import com.query.companys.pojo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface CompanyMapper {
    boolean dropTable();
    boolean creatTable();
    List<Company> getCompanyList(@Param("pageStart") int pageStart,@Param("limit") int limit);
    List<Company> SelectToCompanyList(String qymc);
    boolean insertCompanyList(List<Company> list);
    HB_qyxx SelectCompanyByName(String qymc);//根据企业名称查询企业信息
    HB_qyxx SelectCompanyByQYBH(String qymbh);//根据企业名称查询企业信息
    List<HB_qyzzxx> qyzzxxByNumber(String qybh);//企业编号查询企业资质信息
    List<HB_gcxm> gcxmByNumber(String qybh);//企业编号查询企业工程项目列表
    HB_gcxmxq gcxmXQBynumber(String xmbh);//项目编号查询工程项目详情
    List<HB_ztb> ztbList(String xmbh);//项目编号查询招投标列表
    HB_ztb ztbXQByNumber(String ztbhjbm);//招投标详情
    List<HB_htba> htbaList(String xmbh);//项目编号查询合同备案列表
    HB_htba htbaXQByNumber(String htbabh);//合同备案详情
    List<HB_sgxk> sgxkList(String xmbh);//施工许可列表
    HB_sgxk sgxkXQByNumber(String sgxkzbh);//施工许可详情
    List<HB_jgysba> jgysbaList(String xmbh);//竣工验收备案列表
    HB_jgysba jgysbaXQByNumber(String jgysbahjbm);//竣工验收备案详情
    List<HB_ryzcxx> ryzcxxList(String qybh);//人员注册信息列表
    List<HB_ryfzcxx> ryfzcxxList(String qybh);//人员非注册信息列表

    List<Company> search(Search search);//筛选
    int companyListCount();
}
