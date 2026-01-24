import { useState, Fragment, useEffect } from "react";
import Modal from "../common/Modal.jsx";
import { worksData } from "../../data/worksData.js";

export default function Works() {
    const [selectedWork, setSelectedWork] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Swiper 초기화
    useEffect(() => {
        if (isModalOpen && selectedWork && selectedWork.useSwiper) {
            // swiper.min.js가 window.Swiper로 로드되어야 함
            setTimeout(() => {
                if (window.Swiper) {
                    new window.Swiper('.swiper-container', {
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                }
            }, 100);
        }
    }, [isModalOpen, selectedWork]);

    const handleWorkClick = (workId) => {
        const workData = worksData[workId];
        if (workData) {
            setSelectedWork(workData);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedWork(null);
    };

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
        <>
            <section id="works" className="content-section">
                <div className="inner">
                    {/* <h5>Works</h5> */}
                    <div className="title--marquee">
                        <div className="marquee-nav">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <p key={i} aria-hidden="true">
                                    Works !
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="work-grid">
                        {Object.values(worksData).map((work) => (
                            <div
                                key={work.id}
                                className="work-item"
                                data-work={work.id}
                                onClick={() => handleWorkClick(work.id)}
                            >
                                <div className="work-image">
                                    <img
                                        src={work.thumbnail}
                                        alt={work.title}
                                    />
                                </div>
                                <div className="work-content">
                                    <strong>{work.title}</strong>
                                    {work.text && (
                                        <p className="work-detail">{work.text}</p>
                                    )}
                                    {work.tags && work.tags.length > 0 && (
                                        <div className="work-tags">
                                            {work.tags.map((tag, i) => (
                                                <span key={i}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} modalId="work-modal">
                {selectedWork && (
                    <>
                        <div className="modal-inner__top">
                            {selectedWork.logo && (
                                <span className="works-logo">
                                    <img src={selectedWork.logo} alt={`${selectedWork.title} 로고`} />
                                </span>
                            )}
                            <div className="modal-title">
                                <h2>{selectedWork.title}:</h2>
                                <div className="modal-subtext">
                                    {selectedWork.period && <span className="period">({selectedWork.period})</span>}
                                    {/* <div className="modal-subtext-links">
                                        {selectedWork.siteUrl && (
                                            <a
                                                href={selectedWork.siteUrl}
                                                className="modal_site_go"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                사이트 보기
                                            </a>
                                        )}
                                    </div> */}
                                    {/* 작업기여도 */}
                                    <p className="skill-text">작업기여도
                                        <span className="skill-percentage">100%</span>
                                    </p>
                                    {selectedWork.description && (
                                        <p className="detail-text">{selectedWork.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedWork.sections && selectedWork.sections.length > 0 && (
                            <div className="modal-inner-content">
                                {selectedWork.sections.map((section, sectionIndex) => {
                                    const sectionTitles = ["주요역할", "이렇게 개선되었어요!", "미리보기"];
                                    return (
                                        <div key={sectionIndex}>
                                            <h5>{sectionTitles[sectionIndex]}</h5>
                                            {section.items && section.items.length > 0 && (
                                                <div className="">
                                                    {section.items.map((item, itemIndex) => (
                                                        <p key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {selectedWork.previewImages && selectedWork.previewImages.length > 0 && (
                            <div className="modal-inner-preview">
                                {selectedWork.useSwiper ? (
                                    // Swiper 사용
                                    <div className="swiper-container">
                                        <div className="swiper-wrapper">
                                            {selectedWork.previewImages.map((preview, index) => (
                                                <div key={index} className="swiper-slide">
                                                    {preview.type === "image" ? (
                                                        <img src={preview.src} alt={preview.alt || `미리보기 ${index + 1}`} />
                                                    ) : (
                                                        <video src={preview.src} controls>
                                                            <source src={preview.src} type="video/mp4" />
                                                            브라우저가 비디오 태그를 지원하지 않습니다.
                                                        </video>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="swiper-pagination"></div>
                                        <div className="swiper-button-prev"></div>
                                        <div className="swiper-button-next"></div>
                                    </div>
                                ) : (
                                    // 단일 이미지
                                    selectedWork.previewImages.map((preview, index) => (
                                        <div key={index} className="preview-item">
                                            {preview.type === "image" ? (
                                                <img src={preview.src} alt={preview.alt || `미리보기 ${index + 1}`} />
                                            ) : (
                                                <video src={preview.src} controls>
                                                    <source src={preview.src} type="video/mp4" />
                                                    브라우저가 비디오 태그를 지원하지 않습니다.
                                                </video>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </Modal>
        </>
    );
}
