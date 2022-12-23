package com.carutil.rest.util;

import java.io.File;

public class FileRenameUtil {
    public static String checkSameFileName(String filename, String path) {
        int period = filename.lastIndexOf(".");

        String fname = filename.substring(0, period);
        String suffix = filename.substring(period);

        int idx = 0;

        String saveFilename = path + System.getProperty("file.separator") + filename;

        System.out.println("saveFilename : " + saveFilename);

        File f = new File(saveFilename);

        while (f != null && f.exists()) {
            StringBuilder sb = new StringBuilder();
            sb.append(fname).append(idx++).append(suffix);

            filename = sb.toString();

            saveFilename = path + System.getProperty("file.separator") + filename;

            f = new File(saveFilename);
        }

        return filename;
    }
}
