#### # 작업 일지 22.11.22~28
> ==bulletin board 만들기==

#### # 환경 구축
> == 상세 ==
> [ editor: quill 사용 ]
> 1. react-quilljs 설치
>> - `npm i react-quilljs`
> 2. doc ref ::
>> - [https://www.npmjs.com/package/react-quilljs](https://www.npmjs.com/package/react-quilljs)

#### # 개발 순서
> __@ [rest( spring boot )]__
> 1.  create wrtieBBS request controller 
> __@ [carutil( nextjs )]__
> 1. writeBBS page
>> - design entire form page
>> - image upload component
>> - QuillJS( Web Editor ) upload component
>> - content( include upload image ) commit to rest server
> 2. listBBS page
> 3. viewBBS page
> 4. rewriteBBs Page


> 1. - design entire form page
> 1. - image upload component
>> - create select image button
>> - create preview selected image
```javascript
// path : /src/component/writeBBS
// 부분만 보기 좋게 test 용으로 만들어진 component 이며,
// 최종적으로 wrtieBBS 에 내포 됩니다.
import { useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import Image from 'next/image';

const ImageUpload = ( props ) => {
    const [ image, setImage ] = useState( null );

    const [createObjectURL, setCreateObjectURL ] = useState( null );

    // server 에 upload 되기전 preview selected image
    const uploadToClient = ( e ) => {
        if( e.target.files && e.target.files[0] ) {
            const index = e.target.files[0];

            setImage( index );
            setCreateObjectURL( URL.createObjectURL( index ) );
        }
    };

    const uploadToServer = async () => {
        const body = new FormData();
        body.append( "file", image );

        const response = await fetch( '/api/file', {
            method: 'POST',
            body
        });
    };    

    return (
        <>
        <h4>Select Image</h4>
        <Grid container spacing={2}>
            <Grid item xs={12} alignItems="center">
                {/*
                image select 여부에 따라 fake image 표시
                */}
                { createObjectURL !== null 
                ? <Image src={createObjectURL} 
                        width={350}
                        height={200}
                    />
                : <Image 
                        src='https://fakeimg.pl/200x100/?retina=1&text=No_Image&font=noto' 
                        width={350}
                        height={200}
                    />
                }
            </Grid>
            <Grid item xs={6}>
                <Button 
                    variant="contained" 
                    component="label"
                    sx={{width:170}}
                >
                    Select to Image
                    <input hidden accept="image/*" multiple type="file" onChange={uploadToClient} />
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button 
                    variant="contained" 
                    component="label"
                    className='btn btn-primary'
                    type='submit'
                    sx={{width:170}}
                    onClick={uploadToServer}
                >
                    Send to Image
                </Button>
            </Grid>
            
        </Grid>
        </>
    );
}

export default ImageUpload;
```
>> - 외부 이미지( fake image 를 사용하기 위한 domain 허용 )
```javascript
// path : next.config.js
// 설정 후 restart 필요
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // extra Image link allow
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakeimg.pl',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        destination: 'http://localhost:8080/rest/:path*',
        source: '/rest/:path*',
      },
    ];
  },
}

module.exports = nextConfig
```
> 1. - QuillJS( Web Editor ) upload component
>> [ editor: quill 사용 ]
>> - react-quilljs 설치 
>> &rarr; `npm i react-quilljs`
>> - doc ref
>> &rarr; [https://www.npmjs.com/package/react-quilljs](https://www.npmjs.com/package/react-quilljs)
> 2. - submit content( include upload image ) to rest server
>> - image uploader 구현
>> 
> 3. useQuill 적용시 useEffect 이슈 그리고 sessionLocalStorage 활용.
> 4. - save Image ( rest server : spring boot )
>> static resource 구현 ( 정적자원 ? )
>>   spring boot 는 build ( jar or war ) 로 deply 할때, 
>>   upload 된 file 등을 유지하기 위해,
>>   외부에 따로 저장공간을 지정한다.
>>   이때, 외부 공간과 project 상의 url 을 일치해주기 위해,
>>   WebMvcConfigurer 를 implements 하여 매칭해주어야 한다.
>> 

&darr; __file.properties__
```sh
# Designate path properties as url and local
# src/resources/file.properties
image.path.editor.resource=C:/study/carutil/serviceProject/uploads/images/editor/
image.path.editor.connect=/images/**
```

&darr; __WebConfig.java__
```java
// static resource matching
// src/main/java/com/carutil/rest/config/WebConfig.java
package com.carutil.rest.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@PropertySource("classpath:file.properties")
public class WebConfig implements WebMvcConfigurer {
    @Value("${image.path.editor.connect}")
    private String urlPath;
    @Value("${image.path.editor.resource}")
    private String resourcePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(urlPath)
                .addResourceLocations("file:///" + resourcePath);
    }
}
```

&darr; __FileRenameUtil.java__
```java
// to avoid same filename, create new filename
// src/main/java/com/carutil/rest/util/FileRenameUtil.java
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
```

&darr; __FileUploadPathConfig.java__
```java
// configuration file.properties
// src/main/java/com/carutil/rest/config/FileUploadPathConfig.java
package com.carutil.rest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
// classpath -> src/main/resource/
@PropertySource("classpath:file.properties")
public class FileUploadPathConfig {
    private final Environment environment;

    public String getProperty(String key) {
        return environment.getProperty(key);
    }
}
```

&darr; __FileUploadPathConfig.java__
```java
// src/main/java/com/carutil/rest/config/BBsController.java
// BBS Image upload
// github : springLegacyTest/springLagacyBBS 참조
// 필요부분만 발췌

@RequiredArgsConstructor
// ui 를 활용할 nextjs 와의 충돌 설정
@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/rest/bbs")
public class BBsController {

    @Autowired
    private BBsService b_service;

    @Autowired
    private HttpServletRequest request;

    private final FileUploadPathConfig fileUploadPathConfig;

    @RequestMapping("/saveImage")
    public Map<String, String> saveImage(ImgVO vo) {
        Map<String, String> map = new HashMap<>();

        MultipartFile mf = vo.getS_file();

        String fname = null;
        String img_resource_path = fileUploadPathConfig.getProperty("image.path.editor.resource");

        if (mf != null && mf.getSize() > 0) {
            // spring boot 에서는 application.getRealPath 보다는
            // 직접적으로 경로를 지정해주어
            // Maintenance 와 Security 에 유리하다.
            // as result, 절대경로 사용이 적극 권장된다.

            // production environment
            // String realPath = application.getRealPath(img_path);

            // development environment
            String realPath = img_resource_path;

            fname = mf.getOriginalFilename();

            fname = FileRenameUtil.checkSameFileName(fname, realPath);

            try {
                mf.transferTo(new File(realPath, fname));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // 브라우저에서 보여줄 file의 url 경로를 return 해준다.
        // 그러나 project 외부의 file 을 접근 하는 방법을 취할때는,
        // addResourceHandler 를 implement 하여 사용하는 것이 더 낫다
        // ref :: https://wildeveloperetrain.tistory.com/41
        // getContextPath() 사실상 전혀 필요 없음.
        String path = request.getContextPath();

        map.put("path", path + "/images/");
        map.put("fname", fname);
        // map.put("path", img_path);
        // map.put("fname", mf.getOriginalFilename());

        return map;
    }
}
```
> 4. - save Image ( carutil : nextJs )
>> - upload 된 이미지 url cors 문제 해결


&darr; __next.config.js__
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      // code 가 많아 실제 적용된 코드만 기재함.
      {
        destination: 'http://localhost:8080/images/:path*',
        source: '/images/:path*',
      },
    ];
  },
}

module.exports = nextConfig
```

&darr; __QuilBoard ( 적용된 부분만 발췌 )__
```javascript
// src/component/QuillCustomImageUpload
import fetch from 'isomorphic-unfetch';
import { useQuill } from "react-quilljs";
import { useEffect } from "react";

const SAVE_IMAGE_URL = '/rest/bbs/saveImage';

const QuillCustomImageUpload = () => {
    const { quill, quillRef } = useQuill();

    // insert image( selected by user ) to quill
    const insertToEditor = (url) => {
        const range = quill.getSelection();
        quill.insertEmbed( range.index, 'image', url );
    };

    // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc...
    // fetch ( axios 와 유사 ) 를 가지고 구현
    // async/await 구조로 구현 ( promise 구조 중간에 도입 가능 )
    const saveToServer = async ( file ) => {
        const body = new FormData();
        body.append('s_file', file );

        const res = await fetch( SAVE_IMAGE_URL, { method: 'POST', body });

        const data = await res.json();

        insertToEditor( data.path+data.fname );
    }

    // Open Dialog to select Image File
    const selectLocalImage = () => {
        const input = document.createElement( 'input' );
        input.setAttribute( 'type', 'file' );
        input.setAttribute( 'accept', 'image/*' );
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            saveToServer( file );
        };
    }

    useEffect(()=>{
        if( quill ) {
            // Add custom handler for image Upload
            quill.getModule( 'toolbar' ).addHandler( 'image', selectLocalImage );
            console.log( quill.root.innerHtml );
        }
    }, [quill]);

    return (
        <div style={{width: 500, height:300, border:'1px solid lightgray' }} >
            <div ref={quillRef} />
        </div>
    );
}

export default QuillCustomImageUpload;
```
