package com.query.companys.pojo;

public class ScreenForm {
    private String qymc;
    private String province;
    private String city;
    private String area;
    private String capital;
    private String techniqueClassify;
    private String techniqueLevel;
    private String peoplePosition;
    private String peopleLevel;
    private String peoplePositionClassify;
    private String peopleNum;
    private String tenderArea;
    private String tenderMoney;
    private String keywords;
    private String conditions;

    @Override
    public String toString() {
        return "ScreenForm{" +
                "qymc='" + qymc + '\'' +
                ", province='" + province + '\'' +
                ", city='" + city + '\'' +
                ", area='" + area + '\'' +
                ", capital='" + capital + '\'' +
                ", techniqueClassify='" + techniqueClassify + '\'' +
                ", techniqueLevel='" + techniqueLevel + '\'' +
                ", peoplePosition='" + peoplePosition + '\'' +
                ", peopleLevel='" + peopleLevel + '\'' +
                ", peoplePositionClassify='" + peoplePositionClassify + '\'' +
                ", peopleNum='" + peopleNum + '\'' +
                ", tenderArea='" + tenderArea + '\'' +
                ", tenderMoney='" + tenderMoney + '\'' +
                ", keywords='" + keywords + '\'' +
                ", conditions='" + conditions + '\'' +
                '}';
    }

    public String getQymc() {
        return qymc;
    }

    public void setQymc(String qymc) {
        this.qymc = qymc;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCapital() {
        return capital;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

    public String getTechniqueClassify() {
        return techniqueClassify;
    }

    public void setTechniqueClassify(String techniqueClassify) {
        this.techniqueClassify = techniqueClassify;
    }

    public String getTechniqueLevel() {
        return techniqueLevel;
    }

    public void setTechniqueLevel(String techniqueLevel) {
        this.techniqueLevel = techniqueLevel;
    }

    public String getPeoplePosition() {
        return peoplePosition;
    }

    public void setPeoplePosition(String peoplePosition) {
        this.peoplePosition = peoplePosition;
    }

    public String getPeopleLevel() {
        return peopleLevel;
    }

    public void setPeopleLevel(String peopleLevel) {
        this.peopleLevel = peopleLevel;
    }

    public String getPeoplePositionClassify() {
        return peoplePositionClassify;
    }

    public void setPeoplePositionClassify(String peoplePositionClassify) {
        this.peoplePositionClassify = peoplePositionClassify;
    }

    public String getPeopleNum() {
        return peopleNum;
    }

    public void setPeopleNum(String peopleNum) {
        this.peopleNum = peopleNum;
    }

    public String getTenderArea() {
        return tenderArea;
    }

    public void setTenderArea(String tenderArea) {
        this.tenderArea = tenderArea;
    }

    public String getTenderMoney() {
        return tenderMoney;
    }

    public void setTenderMoney(String tenderMoney) {
        this.tenderMoney = tenderMoney;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getConditions() {
        return conditions;
    }

    public void setConditions(String conditions) {
        this.conditions = conditions;
    }
}
