import { useEffect, useState } from "react";
import WorkModal from "./WorkModal.jsx";
import { worksData } from "../../data/worksData.js";

export default function AboutGh() {
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);

  const recentWork = worksData[1];

  useEffect(() => {
    // AboutGh DOM이 실제로 그려진 이후 Swiper 초기화
    requestAnimationFrame(() => {
      if (typeof window.legacyIndex6Init === "function") {
        window.legacyIndex6Init();
      }
    });

    return () => {
      // AboutGh unmount 시 Swiper 재초기화 방지용
      // (필요하면 legacyIndex6Cleanup 만들어도 됨)
    };
  }, []);

  return (
    <>
    <section id="About_gh">
      {/* <div className="about_swiper_wrap swiper-container">
        <div className="swiper-wrapper about_cont">
          <div className="about_swiper swiper-slide">
            <p>
              자강불식의 마인드로
              <br />
              꾸준히 도전하는
              <br />
              웹 퍼블리셔 고하늘 입니다.
            </p>

            <div className="explain_tag">
              <span>진짜 성실함</span>
              <span>제2의 유노윤호</span>
              <span>끈기</span>
              <span>일본어 꽤 함</span>
              <span>볼매</span>
              <span>영어 좋아함</span>
              <span>매직팬티 버금가는 흡수력</span>
            </div>

            <div className="about_me_imogi" />
          </div>

          <div className="about_swiper swiper-slide center_align_inner upadate_site_slide">
            <p>최근 작업물</p>
            <button
              type="button"
              className="about_tri2"
              onClick={() => setIsWorkModalOpen(true)}
            >
              더 알아보기
            </button>
          </div>

          <div className="about_swiper swiper-slide center_align_inner">
            <span className="about_lock_ico">
              <img src="assets/img/lock-story.png" alt="unlock 아이콘" />
            </span>
            <p className="about_my_st_t">제 이야기를 들어주세요.</p>
            <button
              type="button"
              className="about_tri1"
              onClick={() => setIsStoryModalOpen(true)}
            >
              더 알아보기
            </button>
          </div>
        </div>

        <div className="swiper-pagination about_pig" />
      </div> */}

      {/* Work Modal */}
      {/* <WorkModal
        isOpen={isWorkModalOpen}
        onClose={() => setIsWorkModalOpen(false)}
        workData={recentWork}
      /> */}
    </section>
    <section></section>
    </>
  );
}
