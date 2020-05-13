package com.query.companys.Util;

import java.io.*;

public class SaveJsonToFile {
    public void saveJsonToFile(String fileName,String data){
        File file=new File("src/main/resources/static/Json"+fileName+".json");
        BufferedWriter writer = null;
        //如果文件不存在，则新建一个
        if(!file.exists()){
            try {
                file.createNewFile();
                System.out.println("新建文件成功");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //写入
        try {
            System.out.println("ssssss");
//            FileWriter fw=new FileWriter(file,false);
            writer = new BufferedWriter(new FileWriter(file,false));
            writer.write(data);
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if(writer != null){
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        System.out.println("文件写入成功！");
    }
}
