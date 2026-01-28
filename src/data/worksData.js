// 작업물 데이터 정의
// BASE_URL을 사용하여 경로를 동적으로 생성 (빌드 시 자동으로 base 경로가 적용됨)
const BASE_URL = import.meta.env.BASE_URL || '/';
const getAssetPath = (path) => {
  // 이미 BASE_URL로 시작하는 경우 그대로 반환 (중복 방지)
  if (path.startsWith(BASE_URL)) {
    return path;
  }
  // 이미 절대 경로로 시작하는 경우 BASE_URL 추가
  if (path.startsWith('/')) {
    return BASE_URL + path.slice(1); // 앞의 '/' 제거 후 BASE_URL 추가
  }
  return BASE_URL + path;
};

export const worksData = {
    1: {
        id: 1,
        title: "투비소프트에이엑스 홈페이지 리뉴얼",
        period: "2024.08 ~ 2024.11",
        tags: ["스크롤 인터렉션", "PHP"],
        description: "투비소프트에이엑스 기업 홈페이지 반응형 리뉴얼 프로젝트",
        thumbnail: getAssetPath("/assets/img/logo-tba.png"),
        // siteUrl: "https://www.tobesoftax.com/front/html/main/main.php",
        logo: getAssetPath("/assets/img/logo-tba.png"),
        skillPercentage: "100%",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "html", label: "HTML5", icon: getAssetPath("/assets/img/logo-html.png") },
                    { key: "sass", label: "Sass", icon: getAssetPath("/assets/img/logo-sass.png") },
                    { key: "jquery", label: "jQuery", icon: getAssetPath("/assets/img/logo-jquery.png") },
                    { key: "gulp", label: "Gulp", icon: getAssetPath("/assets/img/logo-gulp.png") },
                    { key: "php", label: "php", icon: getAssetPath("/assets/img/logo-php.png") },
                    { key: "xd", label: "Adobe XD", icon: getAssetPath("/assets/img/logo-xd.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "<span>공통 UI 컴포넌트</span> 구조를 정의하고, 이를 기준으로 UI 마크업을 구성",
                    "기획·디자인 단계부터 참여하여 UI/UX 방향성 협의",
                    "인터렉션 라이브러리 <span>GSAP</span>, <span>Lenis</span>를 사용하여 애니메이션 구현",
                    "<span>반응형</span> 적용으로 다양한 디바이스 지원",
                    "게시판 및 문의사항 기능을 <span>PHP</span> 기반 내부 관리자 시스템과 연동하여 유지보수 개선",
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-tba.gif"), alt: "투비소프트에이엑스 홈페이지 리뉴얼 미리보기 1" },
        ],
        useSwiper: false,
    },
    2: {
        id: 2,
        title: "농협물류채용 웹 구축",
        period: "2023.12 ~ 2024.04",
        tags: ["SEO", "jQuery"],
        description: "농협물류채용 웹 서비스 구축 프로젝트",
        thumbnail: getAssetPath("/assets/img/logo-nh.png"),
        siteUrl: "#",
        logo: getAssetPath("/assets/img/logo-nh.png"),
        skillPercentage: "100%",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "html", label: "HTML5", icon: getAssetPath("/assets/img/logo-html.png") },
                    { key: "sass", label: "Sass", icon: getAssetPath("/assets/img/logo-sass.png") },
                    { key: "jquery", label: "jQuery", icon: getAssetPath("/assets/img/logo-jquery.png") },
                    { key: "gulp", label: "Gulp", icon: getAssetPath("/assets/img/logo-gulp.png") },
                    { key: "xd", label: "Adobe XD", icon: getAssetPath("/assets/img/logo-xd.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "<span>공통 UI 컴포넌트</span> 구조를 정의하고, 이를 기준으로 UI 마크업을 구성",
                    "인터렉션 라이브러리 <span>GSAP</span> 를 사용하여 애니메이션 구현",
                    "로그인, 회원가입, 채용 신청 등 <span>채용 프로세스</span> 흐름에 따른 화면 구현",
                    "유지보수 및 추가 개선 작업 지원"
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-nh1.gif"), alt: "농협물류채용 홈페이지 구축 미리보기 1" },
            { type: "image", src: getAssetPath("/assets/img/preview-nh2.gif"), alt: "농협물류채용 홈페이지 구축 미리보기 2" },
        ],
        useSwiper: true,
    },
    3: {
        id: 3,
        title: "트랜스코스모스코리아 홈페이지 리뉴얼",
        period: "2023.05 ~ 2023.07",
        tags: ["반응형", "스크롤 인터렉션"],
        description: "트랜스코스모스코리아 기업 홈페이지 반응형 리뉴얼 프로젝트",
        thumbnail: getAssetPath("/assets/img/logo-tck.png"),
        siteUrl: "#",
        logo: getAssetPath("/assets/img/logo-tck.png"),
        skillPercentage: "80% / 퍼블리싱 리딩 역할 수행",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "html", label: "HTML5", icon: getAssetPath("/assets/img/logo-html.png") },
                    { key: "sass", label: "Sass", icon: getAssetPath("/assets/img/logo-sass.png") },
                    { key: "jquery", label: "jQuery", icon: getAssetPath("/assets/img/logo-jquery.png") },
                    { key: "js", label: "JavaScript", icon: getAssetPath("/assets/img/logo-js.png") },
                    { key: "gulp", label: "Gulp", icon: getAssetPath("/assets/img/logo-gulp.png") },
                    { key: "figma", label: "Figma", icon: getAssetPath("/assets/img/logo-figma.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "<span>공통 UI 컴포넌트</span> 구조를 정의하고, 이를 기준으로 UI 마크업을 구성",
                    "인터렉션 라이브러리 <span>GSAP</span>를 사용하여 애니메이션 구현",
                    "<span>반응형</span> 적용으로 다양한 디바이스 지원",
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-tck.gif"), alt: "트랜스코스모스코리아 홈페이지 리뉴얼 미리보기 1" },
        ],
        useSwiper: false,
    },

    4: {
        id: 4,
        title: "Prutas Panalo 필리핀 로또 앱 구축",
        period: "2024.08 ~ 2024.12",
        tags: ["React", "Sass"],
        description: "필리핀 로또 앱 서비스 구축 프로젝트",
        thumbnail: getAssetPath("/assets/img/logo-pp.png"),
        siteUrl: "#",
        logo: getAssetPath("/assets/img/logo-pp.png"),
        skillPercentage: "100%",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "react", label: "React", icon: getAssetPath("/assets/img/logo-react.png") },
                    { key: "sass", label: "Sass", icon: getAssetPath("/assets/img/logo-sass.png") },
                    { key: "git", label: "Git", icon: getAssetPath("/assets/img/logo-git.png") },
                    { key: "xd", label: "Adobe XD", icon: getAssetPath("/assets/img/logo-xd.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "<span>React</span> 기반 공통 컴포넌트를 활용해 화면 전반의 퍼블리싱을 수행",
                    "<span>Sass 구조화</span> 로 UI 일관성 강화",
                    "기존 데이터 구조를 고려한 <span>마크업 개선</span>으로 유지보수성 확보",
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-pp1.png"), alt: "Prutas Panalo 필리핀 로또 앱 구축 미리보기 1" },
            { type: "image", src: getAssetPath("/assets/img/preview-pp2.png"), alt: "Prutas Panalo 필리핀 로또 앱 구축 미리보기 2" },
        ],
        useSwiper: true,
    },
    5: {
        id: 5,
        title: "삼성카드 웹·앱 고도화",
        period: "2021.07 ~ 2022.07",
        tags: ["Vue.js", "Sass",],
        description: "삼성카드 개인카드 웹·앱 서비스 고도화 프로젝트",
        thumbnail: getAssetPath("/assets/img/logo-ss.png"),
        siteUrl: "#",
        logo: getAssetPath("/assets/img/logo-ss.png"),
        skillPercentage: "80%",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "vue", label: "Vue", icon: getAssetPath("/assets/img/logo-vue.png") },
                    { key: "html", label: "HTML5", icon: getAssetPath("/assets/img/logo-html.png") },
                    { key: "sass", label: "Sass", icon: getAssetPath("/assets/img/logo-sass.png") },
                    { key: "git", label: "Git", icon: getAssetPath("/assets/img/logo-git.png") },
                    { key: "zeplin", label: "Zeplin", icon: getAssetPath("/assets/img/logo-zeplin.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "<span>웹표준</span> 및 <span>접근성</span> 기준을 준수한 UI 고도화 작업 수행",
                    "<span>Vue.js</span> 기반 공통 컴포넌트를 활용해 페이지 단위 화면 퍼블리싱 수행",
                   "데이터 바인딩·이벤트 연결 및 화면 동작에 필요한 스크립트를 구현",
                    "<span>Sass 구조화</span> 로 UI 일관성 강화",
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-ss1.gif"), alt: "삼성카드 개인카드 웹·앱 고도화 미리보기 1" },
            { type: "image", src: getAssetPath("/assets/img/preview-ss2.gif"), alt: "삼성카드 개인카드 웹·앱 고도화 미리보기 2" },
        ],
        useSwiper: true,
    },
    6: {
        id: 6,
        title: "신한은행 앱 리뉴얼",
        period: "2022.09 ~ 2023.04",
        tags: ["이벤트 페이지", "유지보수"],
        description: "신한은행 앱 머니버스 채널 리뉴얼 프로젝트",
        thumbnail: getAssetPath("/assets/img/logo-sh.png"),
        siteUrl: "#",
        logo: getAssetPath("/assets/img/logo-sh.png"),
        skillPercentage: "60%",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "html", label: "HTML5", icon: getAssetPath("/assets/img/logo-html.png") },
                    { key: "css", label: "CSS3", icon: getAssetPath("/assets/img/logo-css.png") },
                    { key: "js", label: "JavaScript", icon: getAssetPath("/assets/img/logo-js.png") },
                    { key: "jquery", label: "jQuery", icon: getAssetPath("/assets/img/logo-jquery.png") },
                    { key: "git", label: "Git", icon: getAssetPath("/assets/img/logo-git.png") },
                    { key: "zeplin", label: "Zeplin", icon: getAssetPath("/assets/img/logo-zeplin.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "운영 중 발생한 UI 이슈 개선 및 서비스 품질 유지",
                    "매월 진행되는 <span>이벤트 팝업</span> UI 퍼블리싱 지속 진행",
                    "<span>테스트 단말</span>을 활용해 실제 앱 환경 기준 UI 검증 및 이슈 반영",
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-sh1.png"), alt: "신한은행 앱 리뉴얼 미리보기 1" },
            { type: "image", src: getAssetPath("/assets/img/preview-sh2.png"), alt: "신한은행 앱 리뉴얼 미리보기 2" },
            { type: "image", src: getAssetPath("/assets/img/preview-sh3.png"), alt: "신한은행 앱 리뉴얼 미리보기 3" },
            { type: "image", src: getAssetPath("/assets/img/preview-sh4.png"), alt: "신한은행 앱 리뉴얼 미리보기 4" },
            { type: "image", src: getAssetPath("/assets/img/preview-sh5.png"), alt: "신한은행 앱 리뉴얼 미리보기 5" },
            { type: "image", src: getAssetPath("/assets/img/preview-sh6.png"), alt: "신한은행 앱 리뉴얼 미리보기 6" },
            { type: "image", src: getAssetPath("/assets/img/preview-sh7.png"), alt: "신한은행 앱 리뉴얼 미리보기 7" },
        ],
        useSwiper: true,
    },
    7: {
        id: 7,
        title: "현대백화점 면세점 웹·모바일 리뉴얼",
        period: "2023.07 ~ 2023.08",
        tags: ["Markup", "Sass"],
        description: [
            "현대백화점 면세점 웹·모바일 서비스 리뉴얼 프로젝트",
            "주문·결제, 여권·출국 정보 화면 개선",
        ],
        thumbnail: getAssetPath("/assets/img/logo-hd.png"),
        siteUrl: "#",
        logo: getAssetPath("/assets/img/logo-hd.png"),
        skillPercentage: "100%",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "html", label: "HTML5", icon: getAssetPath("/assets/img/logo-html.png") },
                    { key: "sass", label: "Sass", icon: getAssetPath("/assets/img/logo-sass.png") },
                    { key: "git", label: "Git", icon: getAssetPath("/assets/img/logo-git.png") },
                    { key: "gulp", label: "gulp", icon: getAssetPath("/assets/img/logo-gulp.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "<span>공통 UI 컴포넌트</span> 구조를 정의하고, 이를 기준으로 UI 마크업을 구성",
                    "<span>웹·모바일</span> 환경 전반의 퍼블리싱 수행",
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-hd.gif"), alt: "현대백화점 면세점 홈페이지 리뉴얼 미리보기 1" },
            { type: "image", src: getAssetPath("/assets/img/preview-hd1.png"), alt: "현대백화점 면세점 홈페이지 리뉴얼 미리보기 2" },
            { type: "image", src: getAssetPath("/assets/img/preview-hd2.png"), alt: "현대백화점 면세점 홈페이지 리뉴얼 미리보기 3" },
            { type: "image", src: getAssetPath("/assets/img/preview-hd3.png"), alt: "현대백화점 면세점 홈페이지 리뉴얼 미리보기 4" },
            { type: "image", src: getAssetPath("/assets/img/preview-hd4.png"), alt: "현대백화점 면세점 홈페이지 리뉴얼 미리보기 5" },
            { type: "image", src: getAssetPath("/assets/img/preview-hd5.png"), alt: "현대백화점 면세점 홈페이지 리뉴얼 미리보기 6" },
        ],
        useSwiper: true,
    },
    8: {
        id: 8,
        title: "DXChart 홈페이지 구축",
        period: "2023.09 ~ 2023.11",
        tags: ["Nexacro", "UX/UI"],
        description: "DXChart 홈페이지 웹·모바일 구축 프로젝트",
        thumbnail: getAssetPath("/assets/img/logo-dxc.png"),
        siteUrl: "#",
        logo: getAssetPath("/assets/img/logo-dxc.png"),
        skillPercentage: "100%",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "nexacro", label: "Nexacro", icon: getAssetPath("/assets/img/logo-nexacro.png") },
                    { key: "css", label: "CSS3", icon: getAssetPath("/assets/img/logo-css.png") },
                    { key: "figma", label: "Figma", icon: getAssetPath("/assets/img/logo-figma.png") },
                    { key: "photoshop", label: "Photoshop", icon: getAssetPath("/assets/img/logo-pt.png") },
                    { key: "eclipse", label: "Eclipse", icon: getAssetPath("/assets/img/logo-eclipse.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "<span>Nexacro<span> 환경 제약을 고려한 화면 퍼블리싱 수행",
                    "<span>공통 UI 컴포넌트</span> 구조를 정의하고, 이를 기준으로 UI 마크업을 구성",
                    "<span> 차트 UI의 구조</span> 및 표현 방식을 함께 논의하여, 차트 갤러리, 메뉴얼 페이지 개선 작업 수행"
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-dx1.gif"), alt: "DXChart 홈페이지 구축 미리보기 1" },
            { type: "image", src: getAssetPath("/assets/img/preview-dx2.gif"), alt: "DXChart 홈페이지 구축 미리보기 2" },
        ],
        useSwiper: true,
    },
    9: {
        id: 9,
        title: "풀무원 푸드머스 톡톡 웹·앱 리뉴얼",
        period: "2025.03 ~ 2025.08",
        tags: ["Nexacro", "UX/UI"],
        description: "풀무원 푸드머스 톡톡 웹·앱 서비스 리뉴얼 프로젝트",
        thumbnail: getAssetPath("/assets/img/logo-toktok.png"),
        siteUrl: "#",
        logo: getAssetPath("/assets/img/logo-toktok.png"),
        skillPercentage: "100%",
        sections: [
            {
                title: "사용기술",
                type: "stack",
                items: [
                    { key: "nexacro", label: "Nexacro", icon: getAssetPath("/assets/img/logo-nexacro.png") },
                    { key: "css", label: "CSS3", icon: getAssetPath("/assets/img/logo-css.png") },
                    { key: "figma", label: "Figma", icon: getAssetPath("/assets/img/logo-figma.png") },
                    { key: "photoshop", label: "Photoshop", icon: getAssetPath("/assets/img/logo-pt.png") },
                    { key: "eclipse", label: "Eclipse", icon: getAssetPath("/assets/img/logo-eclipse.png") },
                ],
            },
            {
                title: "작업내용",
                type: "list",
                items: [
                    "<span>Nexacro</span> 환경 제약을 고려한 화면 퍼블리싱 수행",
                    "기존 레거시 화면 구조를 개선해 <span>유지보수성과 UI 일관성</span> 향상",
                    "UI/UX 설계 단계에서 부터 구현 가능성과 안정성을 고려한 화면 구성 기준 적용",
                    "<span>테스트 단말</span>을 활용해 실제 앱 환경 기준으로 UI 동작 검증 및 개선 사항 반영",
                ],
            },
        ],
        previewImages: [
            { type: "image", src: getAssetPath("/assets/img/preview-toktok.png"), alt: "풀무원 푸드머스 톡톡 리뉴얼 미리보기 1" },
        ],
        useSwiper: false,
    },
};
