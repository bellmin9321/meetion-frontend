# 📝 **Meetion**

[배포 주소](https://meetion.netlify.app)

<br />

# 💬 **프로젝트 설명**

> nextjs와 nodejs로 Notion과 구글밋을 융합한 풀스택 프로젝트입니다. 노션의 문서를 공유한 유저와 Socket을 이용하여 실시간 문서 작성 기능 및 구글밋의 화상 채팅을 적용했습니다. 백엔드는 nodejs로 개발되었고 mongoDB에 문서 및 유저 데이터를 저장했습니다. AWS EC2와 로드밸런서를 적용하여 무중단 배포 운영중입니다.  

<br />

# 🔑 **프로젝트 실행방법**

```
1. package 설치
npm i

2. .env 설정(root directory에 .env 생성)

  LOCAL_BASE_URL=http://localhost:8000/
                  -> 본인 개발서버 port로 설정
  --- 아래 설정은 본인 계정으로 직접 설정해야함 ---
  JWT_SECRET=
  GITHUB_CLIENT_ID= 
  GITHUB_CLIENT_SECRET= 
  GOOGLE_CLIENT_ID= 
  GOOGLE_CLIENT_SECRET= 
  KAKAO_CLIENT_ID= 
  KAKAO_CLIENT_SECRET= 
  NAVER_CLIENT_ID= 
  NAVER_CLIENT_SECRET= 
 

3. 실행
npm run dev

```
<br />

# 🏞️ 페이지 구성

### 로그인 페이지
<img width="800" alt="image" src="https://github.com/bellmin9321/meetion-frontend/assets/49411767/780c5958-a9e1-41f3-af98-35f3e3c8ca55">

### 메인 페이지
<img width="800" alt="image" src="https://github.com/bellmin9321/meetion-frontend/assets/49411767/493e18ad-6f02-4e16-b1ef-bce76ba81a4e">

### 공유 버튼 클릭 후 초대하고 싶은 이메일 작성 후 초대하면 아래 공유 페이지로 변경
<img width="800" alt="image" src="https://github.com/bellmin9321/meetion-frontend/assets/49411767/6c498b6c-d5f2-4417-957d-409dcaa48ad8">

### 공유 페이지(초대 유저 미접속)
<img width="800" alt="image" src="https://github.com/bellmin9321/meetion-frontend/assets/49411767/613f0e30-6b42-4e7e-a005-f731c8986392">

### 초대된 유저 입장 시 유저와 화상 채팅 화면(시크릿 모드 사용)
<img width="800" alt="image" src="https://github.com/bellmin9321/meetion-frontend/assets/49411767/0b36ae02-1d6e-4de7-a003-a0f5535a18c1">


<br />


# 🧪 Cypress 실행 방법 및 테스트

### 실행 방법
   1. 새로 터미널을 열고 아래 명령어 실행  
`npm run cypress:open`

1. 명령어 실행 후 화면 아래 순서로 실행  
 **E2E Testing** > **Chrome** > **Start E2E Testing in Chrome** > **Meetion.cy.ts**

### 테스트

1. 로그인 테스트

https://github.com/bellmin9321/meetion-frontend/assets/49411767/b8580ab6-3798-4e6d-ad71-af722e36a190

2. 페이지 생성 후 삭제 테스트

https://github.com/bellmin9321/meetion-frontend/assets/49411767/ca7a80a5-0c29-4a7a-9943-0e4929fca17e

3. 공유할 페이지 생성 후 공유 테스트

https://github.com/bellmin9321/meetion-frontend/assets/49411767/19187377-047e-4e35-8271-c948d2a938f1

<br />

# 🏠 Lighthouse 점수
<img width="500" alt="image" src="https://user-images.githubusercontent.com/49411767/233463098-f569076a-ab9c-4a88-83db-bf49c26e4e85.png">

<br />

# 🌈 기술 스택

- **Next.js**
  - 서버 사이드 렌더링(SSR)으로 데이터 pre-reloading 및 SEO 최적화
  - 페이지 기반 라우팅 시스템
  - Code Splitting (코드 분할)
- **Typescript**
  - 컴파일 과정에서 type 체크
- **Socket**, **Web-RTC**
  - 실시간 통신 및 영상 통화
- **React-query**
  - API 데이터 캐싱 및 관리
- **Recoil**
  - 보일러 플레이트 없이 전역 상태 관리
- **Tailwind**
  - class 없이 사용 가능
- **Cypress**
  - 자동화 E2E 
- **AWS EC2 & Loadbalancer**
  - HTTPS 통신 및 무중단 배포 운영

<br />

# ⭐️ 주요 기능

### 1. 공유한 유저와 실시간 문서 작성 및 화상 채팅
- 1:1 화상 채팅
- webcam On/Off, mike On/Off

  

### 2. 페이지 공유
- 해당 페이지에 이메일을 초대하여 페이지 공유(오른쪽 상단 공유 버튼 클릭 후 이메일 초대)
- 공유된 페이지 내에서 화상채팅이 가능합니다.


### 3.페이지 CRUD

<br />

# 🔥 보완할 점
- Web-RTC 화상 채팅을 1:n으로 기능 추가 필요
- 페이지의 description을 text가 아닌 Input 단위로 저장하기
- image 및 텍스트 Drag & Drop 적용
