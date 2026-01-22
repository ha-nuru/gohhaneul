import TopNav from "../layout/TopNav.jsx";
import BannerMarquee from "../common/BannerMarquee.jsx";

export default function HomeHero() {
  return (
    <section id="home_main" className="homehero">
      <div className="Twrap move_wave_bg">
        <div className="container clearfix">
          <TopNav />

          <div className="Tbox">
            <div className="Tmogi marquee">
              <h3 className="sr-only" aria-hidden="true">
                움직이는 이모지
              </h3>
              <div className="wink" />
            </div>
            <h2 className="about-headline yo">PUBLISHER</h2>
            <h2 className="about-headline yo">IS MY PASSION</h2>
            <a href="#About_gh" className="Tarro">
              <span>&gt;</span>
            </a>
          </div>
        </div>

        <BannerMarquee
          wrapperClassName="banner banner-left"
          itemClassName="banner_text banner_text-left"
          text="publisher"
          count={16}
        />
        <BannerMarquee
          wrapperClassName="banner banner-right"
          itemClassName="banner_text banner_text-right"
          text="good publisher"
          count={18}
        />
        <BannerMarquee
          wrapperClassName="banner banner-bottom-marquee"
          itemClassName="banner_text banner_text-bottom"
          text="hello world"
          count={21}
        />
      </div>
    </section>
  );
}

