package com.query.companys.pojo;

public class HB_qyzzxx {
    private String zsbh;//证书编号
    private String zzmc;//资质名称
    private String dj;//等级
    private String fzrq;//发证日期
    private String zsyxjzrq;//证书有效截止日期
    private String fzjg;//发证机关

    @Override
    public String toString() {
        return "HB_qyzzxx{" +
                "zsbh='" + zsbh + '\'' +
                ", zzmc='" + zzmc + '\'' +
                ", dj='" + dj + '\'' +
                ", fzrq='" + fzrq + '\'' +
                ", zsyxjzrq='" + zsyxjzrq + '\'' +
                ", fzjg='" + fzjg + '\'' +
                '}';
    }

    public String getZsbh() {
        return zsbh;
    }

    public void setZsbh(String zsbh) {
        this.zsbh = zsbh;
    }

    public String getZzmc() {
        return zzmc;
    }

    public void setZzmc(String zzmc) {
        this.zzmc = zzmc;
    }

    public String getDj() {
        return dj;
    }

    public void setDj(String dj) {
        this.dj = dj;
    }

    public String getFzrq() {
        return fzrq;
    }

    public void setFzrq(String fzrq) {
        this.fzrq = fzrq;
    }

    public String getZsyxjzrq() {
        return zsyxjzrq;
    }

    public void setZsyxjzrq(String zsyxjzrq) {
        this.zsyxjzrq = zsyxjzrq;
    }

    public String getFzjg() {
        return fzjg;
    }

    public void setFzjg(String fzjg) {
        this.fzjg = fzjg;
    }
}
