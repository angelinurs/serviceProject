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
> 1. - submit content( include upload image ) to rest server
