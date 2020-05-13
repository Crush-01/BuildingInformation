package com.query.companys.Service;

import com.query.companys.Dao.CompanyMapper;
import com.query.companys.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    @Autowired
    CompanyMapper mapper;

    public boolean dropTable(){
        return mapper.dropTable();
    }
    public boolean creatTable(){
        return mapper.creatTable();
    }
    //    筛选条件查询公司列表
    public List<Company> SelectToCompanyList(String qymc){
        return mapper.SelectToCompanyList(qymc);
    }
    //    筛选查询结果插入公司列表
    public boolean insertCompanyList(List<Company> list){
        return mapper.insertCompanyList(list);
    }

    //根据企业名称查询企业信息
    public HB_qyxx SelectCompanyByName(String qymc){
        return mapper.SelectCompanyByName(qymc);
    }

    //企业编号查询企业资质信息
    public List<HB_qyzzxx> qyzzxxByNumber(String qybh){
        return mapper.qyzzxxByNumber(qybh);
    }
    //企业编号查询企业工程项目列表
    public List<HB_gcxm> gcxmByNumber(String qybh){
        return mapper.gcxmByNumber(qybh);
    }
    //项目编号查询工程项目详情
    public HB_gcxmxq gcxmXQBynumber(String xmbh){
        return mapper.gcxmXQBynumber(xmbh);
    }
    //项目编号查询招投标列表
    public List<HB_ztb> ztbList(String xmbh){
        return mapper.ztbList(xmbh);
    }
    //招投标详情
    public HB_ztb ztbXQByNumber(String ztbhjbm){
        return mapper.ztbXQByNumber(ztbhjbm);
    }
    //项目编号查询合同备案列表
    public List<HB_htba> htbaList(String xmbh){
        return mapper.htbaList(xmbh);
    }
    //合同备案详情
    public HB_htba htbaXQByNumber(String htbabh){
        return mapper.htbaXQByNumber(htbabh);
    }
    //施工许可列表
    public List<HB_sgxk> sgxkList(String xmbh){
        return mapper.sgxkList(xmbh);
    }
    //施工许可详情
    public HB_sgxk sgxkXQByNumber(String sgxkzbh){
        return mapper.sgxkXQByNumber(sgxkzbh);
    }
    //竣工验收备案列表
    public List<HB_jgysba> jgysbaList(String xmbh){
        return mapper.jgysbaList(xmbh);
    }
    //竣工验收备案详情
    public HB_jgysba jgysbaXQByNumber(String jgysbahjbm){
        return mapper.jgysbaXQByNumber(jgysbahjbm);
    }
    //人员注册信息列表
    public List<HB_ryzcxx> ryzcxxList(String qybh){
        return mapper.ryzcxxList(qybh);
    }
    //人员非注册信息列表
    public List<HB_ryfzcxx> ryfzcxxList(String qybh){
        return mapper.ryfzcxxList(qybh);
    }

    //筛选
    public List<Company> search(Search search){
        return mapper.search(search);
    }
    public int companyListCount(){
        return mapper.companyListCount();
    }
    //    得到公司列表
    public List<Company> getCompanyList(int pageStart,int limit){
        return mapper.getCompanyList(pageStart, limit);
    }
    //根据企业名称查询企业信息
    public HB_qyxx SelectCompanyByQYBH(String qymbh){
        return mapper.SelectCompanyByQYBH(qymbh);
    }
}
