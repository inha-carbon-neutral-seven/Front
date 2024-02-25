# 📈소매업자를 위한 데이터 분석 서비스

## 프로젝트 소개

비버.ai는 소매업자들이 데이터를 기반으로 더 정확한 비즈니스 결정을 내릴 수 있도록 지원하는 데이터 분석 서비스입니다. 분석한 데이터 분석을 간단하고 직관적인 llm과 결합시켜 제공함으로써, 사용자가 데이터에서 의미 있는 인사이트를 쉽게 추출할 수 있도록 돕습니다. 이 서비스는 특히 데이터 분석에 익숙하지 않은 소매업자들에게 맞춤화되어 있으며, 비즈니스 운영에 필요한 정보를 시각적으로 표현하여 제공합니다.

## 팀원 구성 및 역할 분담

|                                                                 **서강문**                                                                  |                                                                  **백범성**                                                                  |                                                               **최승혁**                                                                |                                                              **강민우**                                                              |                                                                 **최보근**                                                                  |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/100016044?v=4" height=150 width=150> <br/> @KangmoonSeo](https://github.com/KangmoonSeo) | [<img src="https://avatars.githubusercontent.com/u/80192345?v=4" height=150 width=150> <br/> @highcloud100](https://github.com/highcloud100) | [<img src="https://avatars.githubusercontent.com/u/117180508?v=4" height=150 width=150> <br/> @ColdTbrew](https://github.com/ColdTbrew) | [<img src="https://avatars.githubusercontent.com/u/69228100?v=4" height=150 width=150> <br/> @hemaher0](https://github.com/hemaher0) | [<img src="https://avatars.githubusercontent.com/u/136104922?v=4" height=150 width=150> <br/> @ChoiBoKeun1](https://github.com/ChoiBoKeun1) |
|                                  팀장<br/> 웹 서버 개발 </br> LLM 결합 로직 개발</br> 모델 서버 관리 </br>                                  |                                       웹 개발 환경 구축</br> 개발 CI/CD 관리 </br> 모델 서버 및 최적화                                       |                                     오픈 소스 모델 평가<br> LLM 로직 개발 지원 </br> 모델 서버 관리                                     |                       클라이언트 개발 </br> 대시보드 기획 </br> 대시보드 인터페이스 제작</br> 형태소 분석 기획                       |                                  클라이언트 개발</br> 클라이언트 프로젝트 관리 </br> 채팅 인터페이스 제작                                   |

## 개발 기간

2023.09.26~2024.02.27

## 서비스 아키텍처

<img src="https://raw.githubusercontent.com/inha-carbon-neutral-seven/beaver-web-client/38a00bd4a568ac22022d60abc8eee145ee76b663/src/image/Architecture.png"/>

## 프론트 엔드 개발 환경

### 채택 기술

- 기본적인 웹 구조를 위한 HTML
- 반응형 UI을 위한 <a href="https://tailwindcss.com/">Tailwind CSS</a>
- 사용자 인터페이스 구축을 위한 <a href="https://react.dev/">React</a>
- 아이콘 사용을 위한 <a href="https://fontawesome.com/">Fontawesome</a>
- 데이터 시각화를 위한 <a href="https://apexcharts.com/">ApexChart.js</a>
- 복잡한 데이터 테이블 관리를 위한 <a href="https://mui.com/x/react-data-grid/">MUI X Data Grid</a>
- 문서 뷰어 기능을 위한 <a href="https://www.npmjs.com/package/@cyntler/react-doc-viewer">DocViewer.js</a>

### 채택한 개발 기술의 이유

- React
  - 컴포넌트 기반 아키텍처를 통해, 재사용 가능한 UI 구성 요소를 생성함으로써 개발 효율성을 크게 향상시키고, 애플리케이션의 유지보수를 용이하게 합니다. 또한, 가상 DOM을 사용하여 실제 DOM의 업데이트를 최적화하므로, 사용자 경험을 개선합니다.
- Redux
  - 전역 상태 관리 라이브러리로서, React 컴포넌트 간의 상태 공유 문제를 해결합니다. 복잡한 애플리케이션에서도 일관된 상태를 유지하며, 디버깅과 테스트가 용이합니다.
- Tailwind CSS
  - 유틸리티-퍼스트 접근 방식을 채택하여, 개발자가 빠르게 반응형 디자인을 구현할 수 있게 해주며, 맞춤형 디자인을 쉽게 적용할 수 있습니다. 복잡한 CSS를 직접 작성하는 대신, 필요한 스타일을 HTML 요소에 직접 적용함으로써 개발 시간을 단축합니다.
- FontAwesome
  - 방대한 아이콘 컬렉션을 제공함으로써, 웹 애플리케이션에 필요한 다양한 아이콘을 손쉽게 찾아 사용할 수 있습니다. 이는 UI의 시각적 appeal과 사용자 경험을 향상시킵니다.
- ApexCharts.js
  - 동적 데이터 시각화를 위한 강력한 라이브러리입니다. 사용하기 쉽고, 다양한 유형의 차트와 그래프를 지원하여, 데이터를 직관적으로 표현할 수 있게 합니다. 또한, 고도로 커스터마이즈할 수 있어, 애플리케이션의 디자인과 완벽하게 일치시킬 수 있습니다.
- MUI X React Data Grid
  - 대규모 데이터셋을 관리하고 표시하는 데 최적화된 컴포넌트입니다. 필터링, 정렬, 페이징과 같은 고급 기능을 내장하고 있어, 사용자가 데이터를 쉽게 탐색하고 분석할 수 있습니다.
- React DocViewer
  - 다양한 형식의 문서를 웹 애플리케이션 내에서 직접 렌더링하고 표시할 수 있게 해주는 도구입니다. 이를 통해 사용자는 별도의 소프트웨어 설치 없이도 문서 내용을 쉽게 접근하고 열람할 수 있습니다.

## 서비스 아키텍처

<img src="https://raw.githubusercontent.com/inha-carbon-neutral-seven/beaver-web-client/38a00bd4a568ac22022d60abc8eee145ee76b663/src/image/Architecture.png"/>

## 프론트 엔드 개발 환경

### 채택 기술

- 기본적인 웹 구조를 위한 HTML
- 반응형 UI을 위한 <a href="https://tailwindcss.com/">Tailwind CSS</a>
- 사용자 인터페이스 구축을 위한 <a href="https://react.dev/">React</a>
- 아이콘 사용을 위한 <a href="https://fontawesome.com/">Fontawesome</a>
- 데이터 시각화를 위한 <a href="https://apexcharts.com/">ApexChart.js</a>
- 복잡한 데이터 테이블 관리를 위한 <a href="https://mui.com/x/react-data-grid/">MUI X Data Grid</a>
- 문서 뷰어 기능을 위한 <a href="https://www.npmjs.com/package/@cyntler/react-doc-viewer">DocViewer.js</a>

### 채택한 개발 기술의 이유

- React
  - 컴포넌트 기반 아키텍처를 통해, 재사용 가능한 UI 구성 요소를 생성함으로써 개발 효율성을 크게 향상시키고, 애플리케이션의 유지보수를 용이하게 합니다. 또한, 가상 DOM을 사용하여 실제 DOM의 업데이트를 최적화하므로, 사용자 경험을 개선합니다.
- Redux
  - 전역 상태 관리 라이브러리로서, React 컴포넌트 간의 상태 공유 문제를 해결합니다. 복잡한 애플리케이션에서도 일관된 상태를 유지하며, 디버깅과 테스트가 용이합니다.
- Tailwind CSS
  - 유틸리티-퍼스트 접근 방식을 채택하여, 개발자가 빠르게 반응형 디자인을 구현할 수 있게 해주며, 맞춤형 디자인을 쉽게 적용할 수 있습니다. 복잡한 CSS를 직접 작성하는 대신, 필요한 스타일을 HTML 요소에 직접 적용함으로써 개발 시간을 단축합니다.
- FontAwesome
  - 방대한 아이콘 컬렉션을 제공함으로써, 웹 애플리케이션에 필요한 다양한 아이콘을 손쉽게 찾아 사용할 수 있습니다. 이는 UI의 시각적 appeal과 사용자 경험을 향상시킵니다.
- ApexCharts.js
  - 동적 데이터 시각화를 위한 강력한 라이브러리입니다. 사용하기 쉽고, 다양한 유형의 차트와 그래프를 지원하여, 데이터를 직관적으로 표현할 수 있게 합니다. 또한, 고도로 커스터마이즈할 수 있어, 애플리케이션의 디자인과 완벽하게 일치시킬 수 있습니다.
- MUI X React Data Grid
  - 대규모 데이터셋을 관리하고 표시하는 데 최적화된 컴포넌트입니다. 필터링, 정렬, 페이징과 같은 고급 기능을 내장하고 있어, 사용자가 데이터를 쉽게 탐색하고 분석할 수 있습니다.
- React DocViewer
  - 다양한 형식의 문서를 웹 애플리케이션 내에서 직접 렌더링하고 표시할 수 있게 해주는 도구입니다. 이를 통해 사용자는 별도의 소프트웨어 설치 없이도 문서 내용을 쉽게 접근하고 열람할 수 있습니다.

## 코드 구현

<a href="https://github.com/inha-carbon-neutral-seven/beaver-web-client/wiki/%EC%BD%94%EB%93%9C-%EA%B5%AC%ED%98%84-%EC%9D%98%EB%8F%84-%EB%B0%8F-%EC%A0%95%EB%A6%AC"><--코드 설명--></a>

## 클라이언트 실행 방법

1. 레포지토리를 로컬 시스템으로 복제합니다.

```bash
git clone https://github.com/inha-carbon-neutral-seven/beaver-web-client.git
```

2. 프로젝트 디렉토리로 이동합니다.

```bash
cd beaver-web-client
```

3. 필요한 패키지를 설치합니다.

```bash
npm install
```

4. 애플리케이션을 시작합니다.

```bash
npm start
```

## 페이지 및 화면 구성

### 랜딩 페이지

<img src="https://github.com/inha-carbon-neutral-seven/beaver-web-client/blob/master/src/image/repo_images/Beaver%20Landing%20Page.JPG?raw=true" width="60%"/>

### 메인 페이지

<img src="https://github.com/inha-carbon-neutral-seven/beaver-web-client/blob/master/src/image/repo_images/Beaver%20chat.JPG?raw=true" width="40%" style="margin-right: 10px;" /> <img src="https://github.com/inha-carbon-neutral-seven/beaver-web-client/blob/master/src/image/repo_images/Beaver%20Sidebar.JPG?raw=true" width="40%" />

## 주요 기능 소개

### 다크 모드 지원

<img src="https://github.com/inha-carbon-neutral-seven/beaver-web-client/blob/master/src/image/repo_images/Beaver%20DarkMode%20Sidebar.JPG?raw=true" width="80%"/>

### 문서, 테이블 뷰어, 요약 문서, 데이터 시각화

<img src="https://github.com/inha-carbon-neutral-seven/beaver-web-client/blob/master/src/image/repo_images/document.webp?raw=true" width="80%"/>

### 테이블 데이터 분석

<img src="https://github.com/inha-carbon-neutral-seven/beaver-web-client/blob/master/src/image/repo_images/full.webp?raw=true" width="80%"/>
