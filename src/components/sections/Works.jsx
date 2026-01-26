import { useState, Fragment, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import Modal from "../common/Modal.jsx";
import { worksData } from "../../data/worksData.js";

export default function Works() {
    const [selectedWork, setSelectedWork] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const swiperInstanceRef = useRef(null);
    const timeoutRef = useRef(null);

    // Swiper 초기화 및 cleanup
    useEffect(() => {
        // cleanup 함수: 기존 인스턴스와 timeout 정리
        const cleanup = () => {
            // 기존 timeout이 있으면 취소
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            // 기존 Swiper 인스턴스가 있으면 정리
            if (swiperInstanceRef.current) {
                try {
                    swiperInstanceRef.current.destroy(true, true);
                } catch (error) {
                    console.warn('Swiper 인스턴스 정리 중 오류:', error);
                }
                swiperInstanceRef.current = null;
            }

            // DOM에 남아있는 Swiper 인스턴스도 확인하여 정리
            const container = document.querySelector('.swiper-container');
            if (container && container.swiper) {
                try {
                    container.swiper.destroy(true, true);
                    container.swiper = null;
                } catch (error) {
                    console.warn('DOM의 Swiper 인스턴스 정리 중 오류:', error);
                }
            }
        };

        // 먼저 기존 인스턴스 정리
        cleanup();

        if (isModalOpen && selectedWork && selectedWork.useSwiper) {
            // swiper.min.js가 window.Swiper로 로드되어야 함
            // DOM이 완전히 렌더링될 때까지 대기
            timeoutRef.current = setTimeout(() => {
                const container = document.querySelector('.swiper-container');
                
                if (!container || !window.Swiper) {
                    return;
                }

                // 추가 안전 체크: container에 이미 Swiper 인스턴스가 있는지 확인
                if (container.swiper) {
                    try {
                        container.swiper.destroy(true, true);
                        container.swiper = null;
                    } catch (error) {
                        console.warn('기존 Swiper 인스턴스 정리 중 오류:', error);
                    }
                }

                // ref에도 인스턴스가 남아있으면 정리
                if (swiperInstanceRef.current) {
                    try {
                        swiperInstanceRef.current.destroy(true, true);
                    } catch (error) {
                        console.warn('Ref의 Swiper 인스턴스 정리 중 오류:', error);
                    }
                    swiperInstanceRef.current = null;
                }

                // 새 Swiper 인스턴스 생성
                try {
                    swiperInstanceRef.current = new window.Swiper('.swiper-container', {
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
                } catch (error) {
                    console.error('Swiper 인스턴스 생성 중 오류:', error);
                    swiperInstanceRef.current = null;
                }
            }, 100);
        }

        // cleanup 함수: 컴포넌트 언마운트 또는 의존성 변경 시 실행
        return cleanup;
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
                                        <span className="skill-percentage">
                                            {selectedWork.skillPercentage ? selectedWork.skillPercentage : "100%"}
                                        </span>
                                    </p>
                                    {selectedWork.description && (
                                        <p className="detail-text">{selectedWork.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {((selectedWork.sections && selectedWork.sections.length > 0) ||
                            (selectedWork.previewImages && selectedWork.previewImages.length > 0)) && (
                                <div className="modal-inner-content">
                                    {selectedWork.sections && selectedWork.sections.length > 0 && (
                                        <>
                                            {selectedWork.sections.map((section, sectionIndex) => {
                                                const sectionTitles = ["사용기술", "작업내용", "이렇게 개선되었어요!"];
                                                const items = section.items || [];

                                                return (
                                                    <div key={sectionIndex}>
                                                        <h5>{section.title ?? sectionTitles[sectionIndex]}</h5>

                                                        {items.length > 0 && (
                                                            <div className="teck-list">
                                                                {section.type === "stack" ? (
                                                                    //  "사용기술" 같은 스택 섹션은 아이콘 리스트로 렌더
                                                                    <ul className="tech-item">
                                                                        {items.map((tech, itemIndex) => (
                                                                            <li key={tech.key ?? itemIndex}>
                                                                                <img src={tech.icon} alt={tech.label} />
                                                                                <em>{tech.label}</em>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    // HTML 문자열을 DOMPurify로 sanitize하여 안전하게 렌더링
                                                                    items.map((item, itemIndex) => {
                                                                        // DOMPurify로 HTML sanitize (XSS 방지)
                                                                        const sanitizedHTML = DOMPurify.sanitize(item, {
                                                                            ALLOWED_TAGS: ['span', 'strong', 'em', 'b', 'i', 'u', 'br'],
                                                                            ALLOWED_ATTR: ['class', 'style']
                                                                        });
                                                                        
                                                                        return (
                                                                            <p 
                                                                                key={itemIndex} 
                                                                                dangerouslySetInnerHTML={{ __html: sanitizedHTML }} 
                                                                            />
                                                                        );
                                                                    })
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}

                                    {selectedWork.previewImages && selectedWork.previewImages.length > 0 && (
                                        <div>
                                            <h5>미리보기</h5>
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
                                </div>
                            )}

                    </>
                )}
            </Modal>
        </>
    );
}
