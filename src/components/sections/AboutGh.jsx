export default function AboutGh() {
    return (
        <section id="about" className="content-section">
            <div className="inner">
                <h5>Intro</h5>
                <div className="about-image-wrap">
                    <div className="about-image">
                        <span className="sr-only">나</span>
                    </div>
                </div>
                <strong className="title--xl title--about">Yes I can do!</strong>
                <div className="text--about-inner">
                    <p>
                        <span className="text--sm text--about">안녕하세요, 웹 퍼블리셔 고하늘입니다.</span>
                        <span className="text--sm text--about">HTML, CSS, JavaScript를 기반으로 웹 접근성과 웹 표준을 고려한 반응형 UI를 구현하고 있습니다.</span>
                    </p>
                    <p>
                        <span className="text--sm text--about">디자인의 의도를 이해하고 화면에 자연스럽게 녹여내는 과정을 좋아하며,</span>
                        <span className="text--sm text--about">사용자가 편하게 느낄 수 있는 UI를 만드는 데 관심이 많습니다.</span>
                    </p>
                    <p>
                        <span className="text--sm text--about">또한 React 환경에서 컴포넌트 단위로 UI를 구성하는 방식을 익히며 경험을 쌓아가고 있습니다.</span>
                        <span className="text--sm text--about">혼자 작업하는 것보다 함께 고민하고 소통하며 더 나은 결과를 만들어가는 과정을 중요하게 생각합니다.</span>
                    </p>
                </div>
                <a className="btn-more-about" href="">more about me<span>!</span></a>
            </div>

        </section>
    );
}
