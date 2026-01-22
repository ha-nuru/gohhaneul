export default function BottomLinks() {
    return (
        <>
            {/* 첫 번째 섹션: 이미지 컨테이너 */}
            <section id="sub_bott">
                <nav className="nav_scroll">
                    <div className="nav_W scroll-nav">
                        <a href="#sub_bott">about</a>
                        <a href="#About_gh" className="sec2_imogi">
                            goh ha-neul
                        </a>
                        <a href="#site_work">work</a>
                    </div>
                </nav>
                <div className="img_cont_box">
                    <div className="img_cont sr-only">고하늘 사진 모음</div>
                    <div className="img_cont_txt">
                        <div className="marquee-nav">
                            <span className="plus">+</span>
                            <span className="mov_txt1" aria-hidden="true">
                                challenging
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt2" aria-hidden="true">
                                socialable
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt3" aria-hidden="true">
                                true·hearted
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt1" aria-hidden="true">
                                challenging
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt2" aria-hidden="true">
                                socialable
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt3" aria-hidden="true">
                                true·hearted
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt1" aria-hidden="true">
                                challenging
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt2" aria-hidden="true">
                                socialable
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt3" aria-hidden="true">
                                true·hearted
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt1" aria-hidden="true">
                                challenging
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt2" aria-hidden="true">
                                socialable
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt3" aria-hidden="true">
                                true·hearted
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt1" aria-hidden="true">
                                challenging
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt2" aria-hidden="true">
                                socialable
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt3" aria-hidden="true">
                                true·hearted
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt1" aria-hidden="true">
                                challenging
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt2" aria-hidden="true">
                                socialable
                            </span>
                            <span className="plus">+</span>
                            <span className="mov_txt3" aria-hidden="true">
                                true·hearted
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* <div className="link_profi">
          <div className="marquee-nav">
            <a href="#a" aria-hidden="true">
              check my resume !
            </a>
            <a href="#a" aria-hidden="true">
              check my e-mail !
            </a>
            <a href="#a" aria-hidden="true">
              check my github !
            </a>
            <a href="#a" aria-hidden="true">
              check my gitbook !
            </a>
            <a href="#a" aria-hidden="true">
              check my resume !
            </a>
            <a href="#a" aria-hidden="true">
              check my e-mail !
            </a>
            <a href="#a" aria-hidden="true">
              check my github !
            </a>
            <a href="#a" aria-hidden="true">
              check my gitbook !
            </a>
            <a href="#a" aria-hidden="true">
              check my resume !
            </a>
            <a href="#a" aria-hidden="true">
              check my e-mail !
            </a>
            <a href="#a" aria-hidden="true">
              check my github !
            </a>
            <a href="#a" aria-hidden="true">
              check my gitbook !
            </a>
          </div>
        </div> */}


            <section id="skillM_section">
                <div className="skillM_t">
                    <a href="#site_work">Contact Me!</a>
                    {/* <div className="see_ani ir_pm" /> */}
                </div>
                <div className="profile-links">
                    <div className="eg_link_profi">
                        <a
                            href="https://mail.google.com/mail/u/0/#inbox"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src="assets/img/social-mail.png" alt="메일 아이콘" />
                        </a>
                        <a
                            href="http://gkdk4195.cafe24.com/publisher_resume.pdf"
                            target="_blank"
                            className="resume_ico"
                            rel="noreferrer"
                        >
                            <img src="assets/img/social-resume.png" alt="이력서 아이콘" />
                        </a>
                        <a href="https://github.com/ha-nuru" target="_blank" rel="noreferrer">
                            <img src="assets/img/social-github.png" alt="깃헙 아이콘" />
                        </a>
                        <a
                            href="https://gkdk4195.gitbook.io/ha/"
                            className="git_book_ico"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src="assets/img/social-gitbook.png" alt="깃북 아이콘" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

