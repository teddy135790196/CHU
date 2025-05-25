// 設定選單與內容區塊的預設狀態
function initializeMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.selectContent');
    menuItems[0].classList.add('active');
    sections.forEach((section, index) => {
        section.style.display = index === 0 ? 'block' : 'none';
    });
}

// 點選不同選單時，切換顯示對應內容區塊
function bindMenuEvents() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.selectContent');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const sectionId = this.dataset.section;
            sections.forEach(section => {
                section.style.display = section.id === sectionId ? 'block' : 'none';
            });
        });
    });
}


// 動態更新"查看個人資料"位置
function updateAccordionMargin() {
    const rowElement = document.querySelector('.userInformation .row');
    const accordion = document.querySelector('.accordion-custom');
    if (!rowElement || !accordion) return;

    const rowHeight = rowElement.offsetHeight;
    // 計算動態 margin，並設最小值為 -40
    const dynamicMargin = Math.max(-rowHeight / 3, -40);

    // 設定 CSS 變數
    if (window.innerWidth >= 768) {
        accordion.style.setProperty('--dynamic-margin', `${dynamicMargin}px`);
    } else {
        accordion.style.setProperty('--dynamic-margin', `0px`);
    }
}



// 修改資料按鈕
const toggleBtn = document.getElementById('toggleEditBtn');
const inputs = document.querySelectorAll('.edit-input');
const texts = document.querySelectorAll('.display-text');
const overlay = document.getElementById('overlay');
const infoSection = document.getElementById('infoSection');

let isEditing = false;

toggleBtn.addEventListener('click', () => {
    isEditing = !isEditing;

    inputs.forEach(input => {
        input.style.display = isEditing ? 'block' : 'none';
        if (!isEditing) {
            const p = input.nextElementSibling;
            if (p) {
                if (input.tagName === 'SELECT') {
                    p.textContent = input.options[input.selectedIndex].text;
                } else {
                    p.textContent = input.value;
                }
            }
        }
    });

    texts.forEach(p => {
        p.style.display = isEditing ? 'none' : 'block';
    });

    toggleBtn.textContent = isEditing ? '完成修改' : '修改個人資訊';

    // 控制遮罩與區塊高亮
    overlay.style.display = isEditing ? 'block' : 'none';
    infoSection.classList.toggle('editing', isEditing);
});



/****************************啟動函式*************************/


// 等待 DOM 完全載入後執行(CSS等未完成)
document.addEventListener("DOMContentLoaded", () => {
    // 選單 - 初始化
    initializeMenu();
    // 選單 - 綁定點擊事件
    bindMenuEvents();
});

// 整個網頁都加載完成後觸發。
window.addEventListener('load', () => {
    // 第一次個人資料位置
    updateAccordionMargin();
});


// 每次視窗變動啟動
window.addEventListener('resize', () => {
    // 重新分配個人資料位置
    updateAccordionMargin();
}); 