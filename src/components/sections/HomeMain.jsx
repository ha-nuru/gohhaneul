import TopNav from "../layout/TopNav.jsx";
import BannerMarquee from "../common/BannerMarquee.jsx";

export default function HomeMain() {
    return (
        <section id="home" className="home-main">
            <div className="move_wave_bg">
                <div className="container">
                    <TopNav />

                    <div className="home-content">
                        <div className="emoji-home marquee">
                            <p>
                                <span className="sr-only">움직이는 이모지</span>
                            </p>
                            <div className="wink" />
                        </div>
                        <div className="emoji-text">
                            <strong className="about-headline yo">PUBLISHER</strong>
                            <strong className="about-headline yo">IS MY PASSION</strong>
                        </div>
                        <a href="#about" className="arrow-link-down">
                            <span>&gt;</span>
                        </a>
                    </div>
                </div>

                <BannerMarquee
                    wrapperClassName="banner banner-left"
                    itemClassName="banner-text banner-text-left"
                    text="publisher"
                    count={16}
                />
                <BannerMarquee
                    wrapperClassName="banner banner-right"
                    itemClassName="banner-text banner-text-right"
                    text="good publisher"
                    count={18}
                />
                <BannerMarquee
                    wrapperClassName="banner banner-bottom-marquee"
                    itemClassName="banner-text banner-text-bottom"
                    text="hello world"
                    count={21}
                />
            </div>
        </section>
    );
}

