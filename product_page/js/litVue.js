// 小說
const lit = Vue.createApp({
  data() {
    return {
      novels: [
        {
          name: "紅樓夢",
          author: "石心寺",
          price: "750",
          url: "/product_DOTRC.html",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczPUymPfxPh2YFqzUYpfXHR7o0O1fzvZqlnFaghV_iigdqWrYaOne1IYdY25YVgEmUGYa-2_X4dvulD4OLQqqssAx2ihzFWRjuTXD8A8aFda3sHSwmYJwgg6i6XJAhqiuCXrVw0LJVcuoYrgkMDYsvmg=w460-h580-s-no-gm?authuser=0",
        },
        {
          name: "春水遊鯉",
          author: "清笛吹夜",
          price: "499",
          url: "#",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczPCJ8LWZwCLfW0LwgECfUmMgButp2CMOa17kc4eBt128WVN6o82cHp8jd1okvUF_Oolhvm3PvqcqrJgkhXyY2ZniTBkKj98QCQWsEGPqV_8qXY6r0opOCNOLOWzq4jqXekt4dO1U5Z25f5ZG61cab5O=w460-h580-s-no-gm?authuser=0",
        },
        {
          name: "焰心",
          author: "虛白",
          price: "748",
          url: "#",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczMvIxjPNQ8qqDjisgG-Y5cWUlrZyGAXxn7i3HPHk4JnQJckLHA4IvWXN42ncgR682KQqPQksnPpttlq2EapM_WV3Chl50Q4kPb719UCk9uBQgykIEteUFCcq4a3dJ60DTGZD3Jo2-VM6goQKe0w-tUX=w460-h580-s-no-gm?authuser=0",
        },
        {
          name: "聖堂騎士",
          author: "虛白",
          price: "711",
          url: "#",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczP8FyFOY-KTN7PbR3Cka22b-k2107k88E3ynVca64N8UJJkn_1Ks7Lo85LPQqBmGRXQlIfQZnqCCy6tUdV8Bom18eF62BAiBg1ZO_LcDqGd3UjFJbcEjmpsQKcORR_qfYeFjDV-4Siw2WZqs6rJ2hVa=w460-h580-s-no-gm?authuser=0",
        },
        {
          name: "只有我知道那河裡有什麼",
          author: "趙文生",
          price: "771",
          url: "#",
          autUrl: "#",
          imgUrl: "https://images.plurk.com/50mPmDQHeQevxXRp2RolF8.png",
        },
        {
          name: "星界先鋒",
          author: "虛白",
          price: "711",
          url: "#",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczNI8yPBvbuyfH4APmE1RUGq0buKttiLttVLkHwdiOkLDwe4HsH4g2Q46Cqdajf2Pk5-Jhvd2LRBzVArMb3pvfBjubLqVhIBB3kTAmKad2U4lAEbLxAPG_P254_2FLQMA5W7SEUWkDZpR3iEGGCKQMZn=w460-h580-s-no-gm?authuser=0",
        },
        {
          name: "冬日翠峰",
          author: "清笛吹夜",
          price: "499",
          url: "#",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczOTbPPf1mw8a5enAzOrpZbWwQrblIVdAdDNhkdY-gr42oqpNaL933LiRphFkP4YZmB1t7ApkR0ZrqgVVsyzsgQ-0B1UEp-MsTNDIuFchnCJ8rXvbDhUBFHos0SiSq67GNCv6DFaaadAJa8OdWfdQZWM=w460-h580-s-no-gm?authuser=0",
        },
        {
          name: "若是明天我們會見面",
          author: "袁子涵",
          price: "818",
          autUrl: "#",
          url: "#",
          imgUrl: "https://images.plurk.com/1S1mrYKvyGadaoCkRZMWtv.jpg",
        },
        {
          name: "夏木幽亭",
          author: "清笛吹夜",
          price: "499",
          url: "#",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczOAv8iBs3DOiDpLSwhoQyinHiR3IN688C0xKlSt5llQM5mDR13BIWz06KCrENX3OXmyKKth_MIAODt_jELUaNhGZ6-dQ8nt5SoBtf2zN8kwcsEJqwSDk-MjDOMQ0D2X5Lc3lq3wvUkj6t8gLwx56t-a=w460-h580-s-no-gm?authuser=0",
        },
        {
          name: "三國演義",
          author: "黃問游",
          price: "540",
          url: "#",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczN1nCBb0efX7PhLSHew8d5_wC32hipYvmUa8JOPLzB2e2oMNi6obo8ctyXxDbj81hh9SHZA-LwpVFzYbPS4Cpc_Z2W0lar0TGuiYyOFpHYdRbQ90uG3xyCS85oONUOyX9wq0l6hgNl1Y71bN4BtQaab=w460-h580-s-no-gm?authuser=0",
        },
        {
          name: "秋山煙嵐",
          author: "清笛吹夜",
          price: "499",
          url: "#",
          autUrl: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczN5I0cA84A3a9sQUyWTFBq0_iewuhH0M-kHLkUMAcvd3EbLElImVF_QJGN3uBk71cQdRB1ytboS9tKRDQo0SbmUzkYjw916pHrpQ6lH-Hax6MUyfJScN1BZtJerujkVRz8PnQC4HwhnVeubt5n0RwDV=w460-h580-s-no-gm?authuser=0",
        },
      ],
    };
  },
});
lit.mount("#app");
// 
// 
// 
//你可能會喜歡
const litLike = Vue.createApp({
  data() {
    return {
      novels: [
        {
          書名: "秋山煙嵐",
          作者: "",
          簡介: "秋意蕭瑟，落葉紛飛。為了躲避追蹤，阿鯉與畫師輾轉來到了一片被煙霧繚繞的秋山之中。在這裡，他們暫時獲得了喘息之機，卻也感受到了前所未有的孤寂。畫師的身世之謎逐漸清晰，卻也指向更加令人震驚的真相。阿鯉的身世也並非她所認為的那般簡單。秋山的寒意，如同他們內心的不安與迷茫。他們開始懷疑身邊的一切，甚至彼此之間也產生了隔閡。在漫山紅葉的映襯下，他們的愛情如同秋日的落葉般，面臨著凋零的危機。他們能否在迷霧中堅守彼此的真心，找到最終的真相？",
          價格: "",
          url: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczN5I0cA84A3a9sQUyWTFBq0_iewuhH0M-kHLkUMAcvd3EbLElImVF_QJGN3uBk71cQdRB1ytboS9tKRDQo0SbmUzkYjw916pHrpQ6lH-Hax6MUyfJScN1BZtJerujkVRz8PnQC4HwhnVeubt5n0RwDV=w460-h580-s-no-gm?authuser=0",
        },
        {
          書名: "三國演義",
          作者: "",
          簡介: "《三國演義》是一部波瀾壯闊的歷史演義小說，講述了東漢末年，天下大亂，魏、蜀、吳三國鼎立，最終歸晉的近百年歷史。本書以劉備、關羽、張飛桃園結義為開端，透過一系列經典戰役和智謀對決，如官渡之戰、赤壁之戰、空城計等，展現了曹操、劉備、孫權等各路英雄豪傑的雄才大略與爾虞我詐。書中不僅刻畫了眾多傳奇人物的鮮明個性，更蘊含著豐富的軍事策略、政治權謀和人生哲理。它既是歷史的縮影，也是一部對忠義、背叛、智慧與勇氣進行深度探討的巨著，引領讀者領略那個風雲變幻的時代。",
          價格: "",
          url: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczN1nCBb0efX7PhLSHew8d5_wC32hipYvmUa8JOPLzB2e2oMNi6obo8ctyXxDbj81hh9SHZA-LwpVFzYbPS4Cpc_Z2W0lar0TGuiYyOFpHYdRbQ90uG3xyCS85oONUOyX9wq0l6hgNl1Y71bN4BtQaab=w460-h580-s-no-gm?authuser=0",
        },
        {
          書名: "春水遊鯉",
          作者: "",
          簡介: "江南水鄉，春意初萌，萬物復甦。故事的主人公阿鯉，是個在碧波蕩漾的湖畔長大的純真少女，她的靈動如同初春的魚兒般自由自在。然而，一場突如其來的變故，讓她原本寧靜的生活掀起波瀾。一位身世成謎的年輕畫師，帶著一幅殘缺的畫卷來到她的家鄉，畫中隱藏著一段與阿鯉身世息息相關的秘密。在春日美景的掩映下，兩人命運般地相遇，懵懂的情愫在彼此心中悄然滋長。但隨著秘密逐漸浮出水面，他們不僅要面對家族的恩怨糾葛，更要承受命運的捉弄。春水初生，情亦萌動，這段在江南煙雨中展開的緣分，將如何經受住重重考驗？",
          價格: "",
          url: "#",
          imgUrl:
            "https://lh3.googleusercontent.com/pw/AP1GczPCJ8LWZwCLfW0LwgECfUmMgButp2CMOa17kc4eBt128WVN6o82cHp8jd1okvUF_Oolhvm3PvqcqrJgkhXyY2ZniTBkKj98QCQWsEGPqV_8qXY6r0opOCNOLOWzq4jqXekt4dO1U5Z25f5ZG61cab5O=w460-h580-s-no-gm?authuser=0",
        },
      ],
    };
  }
});
litLike.mount("#youMaybeLike");


const sameAut = Vue.createApp({
  data() {
    return {
      novels: []}}});
sameAut.mount('#sameAut');
