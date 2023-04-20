# 📝 **Meetion**

[배포 주소](https://meetion.netlify.app)

# 💬 **프로젝트 설명**

> nextjs와 nodejs로 Notion과 구글밋을 융합한 풀스택 프로젝트입니다. 노션의 문서를 공유한 유저와 Socket을 이용하여 실시간 문서 작성 기능 및 구글밋의 화상 채팅을 적용했습니다. 백엔드는 nodejs로 개발되었고 mongoDB에 문서 및 유저 데이터를 저장했습니다. AWS EC2와 로드밸런서를 적용하여 무중단 배포 운영중입니다.

# 🔑 **프로젝트 실행방법**

```
1. package 설치
npm i

2. 실행
npm run dev
```
# 🏠 Lighthouse 점수
<img width="609" alt="image" src="https://user-images.githubusercontent.com/49411767/233463098-f569076a-ab9c-4a88-83db-bf49c26e4e85.png">

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
- **AWS EC2 & Loadbalancer**
  - HTTPS 통신 및 무중단 배포 운영

# ⭐️ 주요 기능

### 1. 공유한 유저와 실시간 문서 작성 및 화상 채팅
- 1:1 화상 채팅

  

### 2. 페이지 공유
- 해당 페이지에 이메일을 초대하여 페이지 공유


### 3.페이지 생성 / 수정 / 삭제


# 🔥 보완할 점
- Web-RTC 화상 채팅을 1:n으로 기능 추가 필요
- 페이지의 description을 text가 아닌 Input 단위로 저장하기
- image 및 텍스트 Drag & Drop 적용
