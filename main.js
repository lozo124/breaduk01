document.addEventListener('DOMContentLoaded', function() {

  // ========== 动态时间（只显示日期，不显示城市） ==========
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-GB', options);
    dateElement.textContent = formattedDate;
  }

  // ========== Load more comments 按钮 ==========
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      loadMoreBtn.textContent = 'No more comments';
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.6';
    });
  }

});

// ========== 滚动35%弹窗 ==========
function createPopup() {
  const overlay = document.createElement('div');
  overlay.id = 'popupOverlay';
  overlay.innerHTML = `
    <div style="
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        background: white;
        border-radius: 12px;
        width: 88%;
        max-width: 400px;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      ">
        <!-- 绿色标题栏 -->
        <div style="
          background: #3aaf4e;
          color: white;
          font-weight: bold;
          font-size: 18px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <span>⏱ LIMITED TIME</span>
          <span id="closePopup" style="cursor:pointer; font-size:20px;">✕</span>
        </div>
        <!-- 内容区 -->
        <div style="padding: 20px; text-align: center;">
          <img src="img/pop.webp"
            style="
              width: 200px;
              height: 200px;
              object-fit: cover;
              border-radius: 8px;
              display: block;
              margin: 0 auto 16px auto;
            "
          />
          <div style="font-size:20px; font-weight:bold; margin-bottom:6px;">
            Get Your 50% Off Today!
          </div>
          <div style="font-size:14px; color:#555; margin-bottom:20px;">
            Get yours for 50% OFF Today only
          </div>
          <a href="https://track.healthdeepinsight.com/click" style="
            display: block;
            background: #3aaf4e;
            color: white;
            font-weight: bold;
            font-size: 16px;
            padding: 14px;
            border-radius: 8px;
            text-decoration: none;
            letter-spacing: 1px;
          ">Claim Your Special Price Now →</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById('closePopup').addEventListener('click', function() {
    overlay.style.display = 'none';
  });
    // ✅ 弹窗插入 DOM 后，通知 MaxConv 重新扫描处理新链接
  if (typeof window.maxconv === 'function') {
    window.maxconv('scan');
  }
}

// 滚动监听：到35%触发一次
let popupShown = false;
window.addEventListener('scroll', function() {
  if (popupShown) return;
  const scrolled = window.scrollY + window.innerHeight;
  const total = document.body.scrollHeight;
  if (scrolled / total >= 0.35) {
    popupShown = true;
    createPopup();
  }
});
