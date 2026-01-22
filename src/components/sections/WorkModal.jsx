import { useEffect, useRef } from "react";
import Modal from "../common/Modal.jsx";

export default function WorkModal({ isOpen, onClose, workData }) {
  if (!workData) return null;

  // workData 구조 예시:
  // {
  //   id: 1,
  //   title: "병원홈페이지 리뉴얼",
  //   period: "about 3days",
  //   tags: ["#cross browsing", "#rwd", "#외주 프로젝트"],
  //   siteUrl: "http://example.com",
  //   logo: "assets/img/work-cellting.jpg",
  //   skills: [
  //     { name: "코딩", rating: 4 }
  //   ],
  //   description: [
  //     "전반적인 사이트 마크업, 웹표준, 크로스 브라우징 준수",
  //     "Slick.js slider 사용, slick custome을 하여 다양한 효과 표현",
  //     "순수 css를 사용한 animation 효과 표현"
  //   ],
  //   previewImages: [
  //     { pc: "inner_modal_slider1", mobile: "inner_modal_slider1" },
  //     { pc: "inner_modal_slider2", mobile: "inner_modal_slider2" },
  //     { pc: "inner_modal_slider3", mobile: "inner_modal_slider3" }
  //   ]
  // }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i}>
          <img
            src={
              i < rating
                ? "assets/img/rating-star-filled.png"
                : "assets/img/rating-star-empty.png"
            }
            alt=""
          />
        </span>
      );
    }
    return stars;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalId="work-modal">
      <div className="modal_top_inner modal_inner">
        {workData.logo && (
          <span className="update_modal_logo">
            <img src={workData.logo} alt={`${workData.title} 로고`} />
          </span>
        )}
        <div className="modal-title">
          <h5>{workData.title}:</h5>
          <div className="modal-subtext">
            {workData.period && <span>({workData.period})</span>}
            <div>
              <div>
                {workData.tags &&
                  workData.tags.map((tag, index) => (
                    <p key={index}>{tag}</p>
                  ))}
              </div>
              <div>
                {workData.siteUrl && (
                  <a
                    href={workData.siteUrl}
                    className="modal_site_go"
                    target="_blank"
                    rel="noreferrer"
                  >
                    사이트 보기
                  </a>
                )}
                <a href="#site_work" className="modal_site_go" onClick={onClose}>
                  다른 작업물 보기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {workData.skills && workData.skills.length > 0 && (
        <div className="modal_bottom_inner modal_inner clearfix">
          <h6>사용기술</h6>
          {workData.skills.map((skill, index) => (
            <div key={index} className="rating-section">
              <div className="star_wrap">
                <p>{skill.name}:</p>
                {renderStars(skill.rating)}
              </div>
            </div>
          ))}
          {workData.description && (
            <div>
              {workData.description.map((desc, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: desc }} />
              ))}
            </div>
          )}
        </div>
      )}

    </Modal>
  );
}
