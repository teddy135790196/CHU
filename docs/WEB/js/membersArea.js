// 設定選單與內容區塊的預設狀態
function initializeMenu() {
    // 取得所有CLASS有包含 menu-item || selectContent 的標籤組成集合
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.selectContent');

    // 預設menuItems集合的第一個加上active這個CLASS
    menuItems[0].classList.add('active');
    // 遍歷sections集合，
    sections.forEach((section, index) => {
        section.style.display = index === 0 ? 'block' : 'none';
    });
}

// 點選不同選單時，切換顯示對應內容區塊
function bindMenuEvents() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.selectContent');

    // 遍歷menuItems集合，item代表集合內的每個標籤
    menuItems.forEach(item => {

        // 為每個標籤註冊點擊事件
        item.addEventListener('click', function () {
            // 再次遍歷menuItems集合，將裡面的每個標籤(i)的active這個CLASS移除
            menuItems.forEach(i => i.classList.remove('active'));

            // 只為觸發點擊事件的這個標籤的CLASS加上active
            // active主要為了CSS，並不影響內容的顯示與隱藏
            this.classList.add('active');


            // 取得這個標籤HTML內的data-section自訂屬性內容
            const sectionId = this.dataset.section;
            // 遍歷sections集合，判斷section的ID有沒有符合上方取得的自訂屬性來顯示或隱藏
            sections.forEach(section => {
                section.style.display = section.id === sectionId ? 'block' : 'none';
            });
        });
    });
}


// 動態更新"查看個人資料"位置
function updateAccordionMargin() {
    // 選取一個 .row 類別的元素，它是 .userInformation 類別元素內部的子元素。
    const rowElement = document.querySelector('.userInformation .row');     
    const accordion = document.querySelector('.accordion-custom');
    if (!rowElement || !accordion) return;

    // 取得 .row 元素的實際高度（包含 padding，但不包含 margin）
    const rowHeight = rowElement.offsetHeight;
    const dynamicMargin = Math.max(-rowHeight / 3, -40);

    // 設定 CSS 變數
    if (window.innerWidth >= 768) {
        accordion.style.setProperty('--dynamic-margin', `${dynamicMargin}px`);
    } else {
        accordion.style.setProperty('--dynamic-margin', `0px`);
    }
}



// 修改資料按鈕
function setupToggleEdit(sectionId, toggleBtnId, overlayId) {
    // 為了可通用，因此取得ID設為該方法要輸入的變數
    const section = document.getElementById(sectionId);
    const toggleBtn = document.getElementById(toggleBtnId);
    const overlay = overlayId ? document.getElementById(overlayId) : null;

    // 取得有以下CLASS的標籤組成集合
    const inputs = section.querySelectorAll('.edit-input');
    const texts = section.querySelectorAll('.display-text');

    let isEditing = false;

    // 為按鈕註冊點擊事件
    toggleBtn.addEventListener('click', () => {
        // 切換編輯狀態
        isEditing = !isEditing;

        // 遍歷inputs集合，input代表其中的標籤
        inputs.forEach(input => {
            // 編輯狀態時輸入框顯示，未編輯時則隱藏
            input.style.display = isEditing ? 'block' : 'none';
            if (!isEditing) {
                // 取得input的下一個兄弟元素(就是排在input下面的標籤)
                const p = input.nextElementSibling;
                if (p) {    // 如果存在兄弟元素
                    if (input.tagName === 'SELECT') {   // 且input的type是SELECT(tagName取得的值全為大寫)
                        p.textContent = input.options[input.selectedIndex].text;
                    } else {
                        p.textContent = input.value;
                    }
                }
            }
        });

        // 遍歷texts集合，p代表其中的標籤
        texts.forEach(p => {
            // 編輯狀態時文字隱藏，未編輯時則顯示
            p.style.display = isEditing ? 'none' : 'block';
        });


        // 修改按鈕的顯示文字，未編輯時顯示自訂屬性data-edit-text的內容
        toggleBtn.textContent = isEditing ? '完成修改' : toggleBtn.getAttribute('data-edit-text');
        // 根據是否編輯決定按鈕的樣式
        toggleBtn.classList.toggle('btn-outline-primary', !isEditing);
        toggleBtn.classList.toggle('btn-primary', isEditing);


        // 該方法如果有輸入遮罩，那麼編輯狀態時顯示，否則隱藏
        if (overlay) {
            overlay.style.display = isEditing ? 'block' : 'none';
        }

        // 該方法輸入有sectionId的標籤增加editing的CLASS
        section.classList.toggle('editing', isEditing);
    });
}

// 呼叫示範
setupToggleEdit('infoSection', 'toggleEditBtn', 'overlay');
setupToggleEdit('contactSection', 'toggleContactEditBtn', 'overlay');
setupToggleEdit('accountSection', 'toggleAccountEditBtn', 'overlay');
setupToggleEdit('passwordSection', 'togglePasswordEditBtn', 'overlay');



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