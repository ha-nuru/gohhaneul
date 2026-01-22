import { useState } from "react";
import WorkModal from "./WorkModal.jsx";
import { worksData } from "../../data/worksData.js";

export default function Works() {
  const [selectedWork, setSelectedWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <section id="sub_works" className="content-section">
        <div className="inner">
          <h5>Works</h5>
          <div className="work-grid">
            <div
              className="work-item"
              data-work="1"
              onClick={() => handleWorkClick(1)}
            >
              <div className="work-image">
                <img src="assets/img/work-tobysoftax.jpg" alt="투비소프트에이엑스 반응형 리뉴얼" />
              </div>
              <div className="work-content">
                <h3>투비소프트에이엑스 반응형 리뉴얼</h3>
                <p>Web | 퍼블리싱 · SEO · PHP · 반응형 · GSAP · Lenis</p>
              </div>
            </div>
            <div
              className="work-item"
              data-work="2"
              onClick={() => handleWorkClick(2)}
            >
              <div className="work-image">
                <img src="assets/img/work-hansol.jpg" alt="한솔 CSR 사이트" />
              </div>
              <div className="work-content">
                <h3>한솔 CSR 사이트</h3>
                <p>Web | 기업 사이트 · 반응형 · jQuery</p>
              </div>
            </div>
            <div
              className="work-item"
              data-work="3"
              onClick={() => handleWorkClick(3)}
            >
              <div className="work-image">
                <img src="assets/img/work-starbucks.jpg" alt="스타벅스 클론" />
              </div>
              <div className="work-content">
                <h3>스타벅스 클론</h3>
                <p>Web | 클론코딩 · 인터랙티브 · GSAP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        workData={selectedWork}
      />
    </>
  );
}
