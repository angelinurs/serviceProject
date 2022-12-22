package com.carutil.rest.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carutil.rest.service.BBsService;
import com.carutil.rest.util.FileRenameUtil;
import com.carutil.rest.vo.BBsVO;
import com.carutil.rest.vo.ImgVO;

// ui 를 활용할 nextjs 와의 충돌 설정
@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/rest/bbs")
public class BBsController {

    @Autowired
    private BBsService b_service;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private ServletContext application;

    private String img_path = "/resources/editor_img";

    // @RequestMapping(value = "/write", method = RequestMethod.POST)
    @RequestMapping("/write")
    public Map<String, String> signup(String subject, String id, String nick, String content, String file_name,
            String ori_name,
            String write_date, String ip, String bname) {

        // request parameter check code
        StringBuilder sb = new StringBuilder();
        sb.append("subject : ").append(subject).append("\n")
                .append("id : ").append(id).append("\n")
                .append("nick : ").append(nick).append("\n")
                .append("content : ").append(content).append("\n")
                .append("file_name : ").append(file_name).append("\n")
                .append("ori_name : ").append(ori_name).append("\n")
                .append("write_date : ").append(write_date).append("\n")
                .append("ip : ").append(ip).append("\n")
                .append("bname : ").append(bname).append("\n");

        System.out.println(sb.toString());

        // insert 준비
        BBsVO vo = new BBsVO(
                null,
                subject,
                id,
                nick,
                content,
                file_name,
                ori_name,
                write_date,
                ip,
                null,
                bname,
                null,
                null,
                null);

        int succ = b_service.write(vo);

        // respoonse signup result
        Map<String, String> map = new HashMap<>();

        if (succ != 0) {
            map.put("succ", "1");
        } else {
            map.put("fail", "0");
        }

        return map;
    }

    // BBS Image upload
    // github : springLegacyTest/springLagacyBBS 참조
    @RequestMapping("/saveImage")
    public Map<String, String> saveImage(ImgVO vo) {
        Map<String, String> map = new HashMap<>();

        MultipartFile mf = vo.getS_file();

        String fname = null;

        System.out.println(fname);
        System.out.println(mf);
        System.out.println(mf.getSize());

        if (mf != null && mf.getSize() > 0) {
            String realPath = application.getRealPath(img_path);

            fname = mf.getOriginalFilename();

            fname = FileRenameUtil.checkSameFileName(fname, realPath);

            try {
                mf.transferTo(new File(realPath, fname));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        String path = request.getContextPath();

        map.put("path", path + img_path);
        map.put("fname", fname);

        return map;
    }
}
