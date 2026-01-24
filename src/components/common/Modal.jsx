import { useEffect } from "react";
import TopNav from "../layout/TopNav";

export default function Modal({ isOpen, onClose, children, modalId }) {
    useEffect(() => {
        // ESC 키로 모달 닫기
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        // 모달이 열려있을 때 body 스크롤 방지
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleEscape);
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    // 배경 클릭 시 닫기 (Swiper 영역은 제외)
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`detail-modal-wrap ${isOpen ? "open" : ""}`}
            id={modalId}
        >
            <div className="detail-modal-inner" onClick={handleBackdropClick}>
                <div className="modal-nav-wrap">
                    <div className="modal-nav-inner">
                        <a className="modal-btn-close" href="#" onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}>
                            X
                        </a>
                    </div>
                </div>
                <div className="modal-contents">
                    {children}
                </div>
            </div>
        </div>
    );
}
