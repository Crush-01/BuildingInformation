package com.query.companys.Controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.query.companys.Service.CompanyService;
import com.query.companys.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class CompanyController {
    @Autowired
    CompanyService service;
    Company company;

    @RequestMapping("/test")
    @ResponseBody
    synchronized public String service1(@RequestBody String data, Model model)  {
        service.dropTable();
        service.creatTable();
        JSONObject jsonObject = JSON.parseObject(data);
        System.out.println(jsonObject);
        List<Company> list=new ArrayList();
        Search search=new Search();
        String qymc=jsonObject.getString("qymc");
//        String province=jsonObject.getString("province");
        String city=jsonObject.getString("city");
        String area=jsonObject.getString("area");
        String capital=jsonObject.getString("capital");
        if(!"".equals(qymc)){
            list=service.SelectToCompanyList(qymc);
        }else{
//            if(!"".equals(province))
//                search.setProvince(province);
            if(!"".equals(city)&&city.length()>=2){
                System.out.println("市："+city);
                search.setCity(city);
            }

            if(!"".equals(area)&&city.length()>=2){
                search.setArea(area);
                System.out.println("区："+area);
            }

            if(!"".equals(capital))
                search.setCapital(Integer.parseInt(capital));
            list=service.search(search);
        }

        if(list.size()>0){
            service.insertCompanyList(list);
        }
        String size=Integer.toString(service.companyListCount());
        return size;
    }

    @RequestMapping("/t")
    public String service2(Model model,String qybh){
        HB_qyxx qyxx=service.SelectCompanyByQYBH(qybh);
        System.out.println(qyxx.toString());
        List<HB_qyzzxx> list_zz=service.qyzzxxByNumber(qybh);
        List<HB_gcxm> list_gcxm=service.gcxmByNumber(qybh);
        List<HB_ryzcxx> list_zc=service.ryzcxxList(qybh);
        List<HB_ryfzcxx> list_fzc=service.ryfzcxxList(qybh);
        model.addAttribute("qyxx",qyxx);
        model.addAttribute("list_zz",list_zz);
        model.addAttribute("list_gcxm",list_gcxm);
        model.addAttribute("list_zc",list_zc);
        model.addAttribute("list_fzc",list_fzc);
        return "CompanyDetails";
    }
    @RequestMapping("gcxmXQ")
    public String service3(Model model,String xmbh){
        HB_gcxmxq gcxmxq=service.gcxmXQBynumber(xmbh);
        List<HB_ztb> list_ztb=service.ztbList(xmbh);
        List<HB_htba> list_htba=service.htbaList(xmbh);
        List<HB_sgxk> list_sgxk=service.sgxkList(xmbh);
        List<HB_jgysba> list_jgysba=service.jgysbaList(xmbh);
        System.out.println("++++"+list_jgysba.size());
        for(HB_jgysba j:list_jgysba){
            System.out.println(j.toString()+"竣工");
        }
        model.addAttribute("gcxmxq",gcxmxq);
        model.addAttribute("list_ztb",list_ztb);
        model.addAttribute("list_htba",list_htba);
        model.addAttribute("list_sgxk",list_sgxk);
        model.addAttribute("list_jgysba",list_jgysba);
        return "gcxmInfo";
    }
    @RequestMapping("ztbXQ")
    public String service4(Model model,String ztbhjbm){
        HB_ztb ztb=service.ztbXQByNumber(ztbhjbm);
        model.addAttribute("ztb",ztb);
        return "ZTB_info";
    }
    @RequestMapping("htbaXQ")
    public String service5(Model model,String htbabh){
        HB_htba htba=service.htbaXQByNumber(htbabh);
        model.addAttribute("htba",htba);
        return "HTBA_info";
    }
    @RequestMapping("sgxkXQ")
    public String service6(Model model,String sgxkzbh){
        HB_sgxk sgxk=service.sgxkXQByNumber(sgxkzbh);
        model.addAttribute("sgxk",sgxk);
        return "SGXK_info";
    }
    @RequestMapping("jgysbaXQ")
    public String service7(Model model,String jgysbahjbm){
        HB_jgysba jgysba=service.jgysbaXQByNumber(jgysbahjbm);
        model.addAttribute("jgysba",jgysba);
        return "GGYSBA_info";
    }
    @RequestMapping("getCompanyList")
    @ResponseBody
    public Map<String,Object> service8(@RequestParam(required = false,defaultValue = "1") int page,
                                       @RequestParam(required = false,defaultValue = "10") int limit){
        System.out.println("getCompanyList");
        int pageStart=(page-1)*limit;
        List<Company> list=service.getCompanyList(pageStart,limit);
        int count=service.companyListCount();
        Map<String,Object> map=new HashMap<>();
        map.put("code",0);
        map.put("msg","");
        map.put("count",count);
        map.put("data",list);
        return map;
    }
    @RequestMapping("view")
    public String service9(){
        return "CompanyList";
    }
}
