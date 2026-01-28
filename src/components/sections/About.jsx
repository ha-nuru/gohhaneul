export default function About() {
    return (
        <section id="about" className="content-section">
            <div className="inner">
                <h5>About</h5>
                <div className="about-image-wrap">
                    <div className="about-image">
                        <span className="sr-only">나</span>
                    </div>
                </div>
                <strong className="title--about split word">Yes I can do!</strong>
                <div className="text--about-inner split line">
                    <p className="text--about">
                        <span>안녕하세요, 웹 퍼블리셔 고하늘입니다.</span>
                        <span>HTML, CSS, JavaScript를 기반으로 웹 접근성과 웹 표준을 고려한 UI를 구현하고 있습니다.</span>
                    </p>
                    <p className="text--about">
                        <span>디자인의 의도를 이해하고 화면에 자연스럽게 녹여내는 과정을 좋아하며,</span>
                        <span>사용자가 편하게 느낄 수 있는 UI를 만드는 데 관심이 많습니다.</span>
                    </p>
                    <p className="text--about">
                        <span>
                            또한 React 환경에서 컴포넌트 단위로 UI를 구성하는 방식을 익히며 경험을 쌓아가고 있고,</span>
                        <span>그 과정의 결과물로 현재 이 포트폴리오를 구현해 보았습니다.</span>
                    </p>
                    <p className="text--about">
                        <span>항상 더 나은 방법을 탐구하고 고민하며,</span> 
                        <span>소통을 통해 완성도를 높여가는 과정을 중요하게 생각합니다.</span>
                    </p>
                </div>
                <a className="btn-more-about" href="https://foam-tractor-439.notion.site/2ef7f9b0909c80eba254c3b8e32e6b5b" target="_blank" rel="noreferrer">more about me<span>!</span></a>
            </div>

        </section>
    );
}
