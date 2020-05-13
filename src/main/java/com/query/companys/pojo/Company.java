package com.query.companys.pojo;

public class Company {
    private String id;
    private String qybh;
    private String qymc;
    private String qywydm;
    private String fddbr;
    private String xzq;

    @Override
    public String toString() {
        return "Company{" +
                "id='" + id + '\'' +
                ", qybh='" + qybh + '\'' +
                ", qymc='" + qymc + '\'' +
                ", qywydm='" + qywydm + '\'' +
                ", fddbr='" + fddbr + '\'' +
                ", xzq='" + xzq + '\'' +
                '}';
    }

    public String getQybh() {
        return qybh;
    }

    public void setQybh(String qybh) {
        this.qybh = qybh;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQymc() {
        return qymc;
    }

    public void setQymc(String qymc) {
        this.qymc = qymc;
    }

    public String getQywydm() {
        return qywydm;
    }

    public void setQywydm(String qywydm) {
        this.qywydm = qywydm;
    }

    public String getFddbr() {
        return fddbr;
    }

    public void setFddbr(String fddbr) {
        this.fddbr = fddbr;
    }

    public String getXzq() {
        return xzq;
    }

    public void setXzq(String xzq) {
        this.xzq = xzq;
    }
}
