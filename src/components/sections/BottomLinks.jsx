export default function BottomLinks() {
    return (
        <>
            <section id="bottomLinks" style={{ background: '#ffffff' }} className="content-section">
                <div className="inner">
                    <div className="title--email">
                        <a href="#site_work" className="split char">gohhaneul@gmail.com</a>
                        <span className="bubble-text">Thank you for visiting!</span>
                    </div>
                </div>
                <div className="info">
                    <p className="copyRight-text">2025 © Goh Haneul's portfolio</p>
                    <div className="info-inner">
                        <a
                            href="javascript:void(0)"
                            disabled
                            style={{
                                color: '#b0b0b0',
                                pointerEvents: 'none',
                                cursor: 'not-allowed',
                            }}
                        >
                            Resume
                        </a>
                        <a href="https://gohneul-log.vercel.app/" target="_blank" rel="noreferrer">Blog</a>
                        <a href="https://github.com/ha-nuru" target="_blank" rel="noreferrer">Github</a>
                    </div>
                </div>
            </section>
        </>
    );
}

