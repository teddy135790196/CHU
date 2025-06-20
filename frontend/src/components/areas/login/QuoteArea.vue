<template>
  <div class="quotations quotations-anime mt-auto" v-if="content">
    <div class="quote" :class="{ show: isShow }" v-html="content.quote"></div>
    <div class="author" :class="{ show: isShow }">{{ content.author }}</div>
  </div>
</template>

<script>
export default {
  name: 'QuoteArea',
  props: {
    isShow: Boolean
  },
  data() {
    return {
      quotes: [
        {
          quote: "秦時明月漢時關，一片孤城萬仞山。<br>蓬山此去無多路，輕舟已過萬重山。",
          author: "？？？",
        },
        {
          quote: "罔談彼短，靡恃己長。信使可覆，器欲難量。<br>禍因惡積，福緣善慶。尺璧非寶，寸陰是競。",
          author: "周興嗣《千字文．節選》",
        },
        {
          quote: "溫溫恭人，如集於木。<br>惴惴小心，如臨於谷。<br>戰戰兢兢，如履薄冰。",
          author: "佚名《詩經．節選》",
        },
        {
          quote: "蒹葭蒼蒼，白露為霜。所謂伊人，在水一方。<br>蒹葭萋萋，白露未晞。所謂伊人，在水之湄。<br>蒹葭采采，白露未已。所謂伊人，在水之涘。",
          author: "佚名《詩經．節選》",
        },
        {
          quote: "鶴鳴於九皋，聲聞於天。<br>魚在於渚，或潛在淵。<br>樂彼之園，爰有樹檀，其下維谷。<br>他山之石，可以攻玉。",
          author: "佚名《詩經．鶴鳴》",
        },
        {
          quote: "勸君莫惜金縷衣，勸君惜取少年時；<br>花開堪折直須折，莫待無花空折枝。",
          author: "佚名《金縷衣》",
        },
        {
          quote: "學而時習之，不亦說乎？<br>有朋自遠方來，不亦樂乎？<br>人不知而不愠，不亦君子乎？",
          author: "子曰《論語．節選》",
        },
        {
          quote: "杳冥冥兮羌晝晦，東風飄兮神靈雨。<br>留靈修兮憺忘歸，歲既晏兮孰華予？",
          author: "屈原《九歌．山鬼．節選》",
        },
        {
          quote: "老驥伏櫪，志在千里。烈士暮年，壯心不已。<br>盈縮之期，不但在天。養怡之福，可得永年。",
          author: "曹操《龜雖壽．節選》",
        },
        {
          quote: "東臨碣石，以觀滄海。水何澹澹，山島竦峙。<br>日月之行，若出其中。星漢燦爛，若出其裏。",
          author: "曹操《觀滄海．節選》",
        },
        {
          quote: "青青子衿，悠悠我心。但為君故，沉吟至今。<br>呦呦鹿鳴，食野之苹。我有嘉賓，鼓瑟吹笙。",
          author: "曹操《短歌行．節選》",
        },
        {
          quote: "援琴鳴弦發清商，短歌微吟不能長<br>明月皎皎照我床，星漢西流夜未央<br>牽牛織女遙相望，爾獨何辜限河梁",
          author: "曹丕《燕歌行（一）．節選》",
        },
        {
          quote: "休迅飛鳧，飄忽若神。凌波微步，羅襪生塵。<br>動無常則，若危若安。進止難期，若往若還。<br>轉眄流精，光潤玉顏。含辭未吐，氣若幽蘭。",
          author: "曹植《洛神賦．節選》",
        },
        {
          quote: "非淡泊無以明志，非寧靜無以致遠<br>非學無以廣才，非志無以成學",
          author: "諸葛亮《誡子書．節選》",
        },
        {
          quote: "綠螘新醅酒，紅泥小火爐。<br>晚來天欲雪，能飲一杯無？",
          author: "白居易《問劉十九》",
        },
        {
          quote: "離離原上草，一歲一枯榮。野火燒不盡，春風吹又生。<br>遠芳侵古道，晴翠接荒城。又送王孫去，萋萋滿別情。",
          author: "白居易《賦得古原草送別》",
        },
        {
          quote: "花間一壺酒，獨酌無相親。<br>舉杯邀明月，對影成三人。<br>月既不解飲，影徒隨我身。<br>暫伴月將影，行樂須及春。",
          author: "李白《月下獨酌．節選》",
        },
        {
          quote: "人生得意須盡歡，莫使金樽空對月。<br>天生我材必有用，千金散盡還復來。<br>與君歌一曲，請君為我側耳聽：<br>五花馬，千金裘，呼兒將出換美酒，與爾同銷萬古愁。",
          author: "李白《將進酒．節選》",
        },
        {
          quote: "錦瑟無端五十弦，一弦一柱思華年。<br>莊生曉夢迷蝴蝶，望帝春心托杜鵑。<br>滄海月明珠有淚，藍田日暖玉生煙。<br>此情可待成追憶，只是當時已惘然。",
          author: "李商隱《錦瑟》",
        },
        {
          quote: "丞相祠堂何處尋，錦官城外柏森林。<br>映階碧草自春色，隔葉黃鸝空好音。<br>三顧頻繁天下計，兩朝開濟老臣心。<br>出師未捷身先死，長使英雄淚滿襟。",
          author: "杜甫《蜀相》",
        },
        {
          quote: "結廬在人境，而無車馬喧。<br>問君何能爾？心遠地自偏。<br>采菊東籬下，悠然見南山。<br>山氣日夕佳，飛鳥相與還。",
          author: "陶淵明《飲酒》",
        },
        {
          quote: "春花秋月何時了，往事知多少！<br>小樓昨夜又東風，故國不堪回首月明中。<br>雕欄玉砌應猶在，只是朱顏改。<br>問君能有幾多愁？恰似一江春水向東流。",
          author: "李煜《虞美人》",
        },
        {
          quote: "東風夜放花千樹，更吹落、星如雨。<br>蛾兒雪柳黃金縷，笑語盈盈暗香去。<br>眾裡尋他千百度；<br>驀然回首，那人卻在，燈火闌珊處。",
          author: "辛棄疾《青玉案．節選》",
        },
        {
          quote: "亂石崩云，驚濤拍岸，卷起千堆雪。<br>江山如畫，一時多少豪杰！<br>故國神游，多情應笑我，早生華發。<br>人間如夢，一樽還酹江月。",
          author: "蘇軾《赤壁懷古．節選》",
        },
        {
          quote: "明月幾時有？把酒問青天。<br>不知天上宮闕，今夕是何年？<br>起舞弄清影，何似在人間？<br>但願人長久，千里共嬋娟。",
          author: "蘇軾《水調歌頭．節選》",
        },
        {
          quote: "十年生死兩茫茫，不思量，自難忘。<br>千里孤墳，無處話凄涼。<br>夜來幽夢忽還鄉，小軒窗，正梳妝，<br>相顧無言，惟有淚千行。",
          author: "蘇軾《江城子．節選》",
        },
        {
          quote: "昨夜雨疏風驟，濃睡不消殘酒。<br>試問卷簾人，卻道海棠依舊。<br>知否，知否？應是綠肥紅瘦。",
          author: "李清照《如夢令》",
        },
      ],
      content: null
    };
  },
  mounted() {
    this.content = this.getRandomItem(this.quotes);

    // 彩蛋：如果選到了第一個元素（索引 0），則重新隨機選擇
    if (this.quotes.indexOf(this.content) === 0) {
      this.content = this.getRandomItem(this.quotes);
    }
  },
  methods: {
    getRandomItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
};
</script>


<style scoped>
/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

/* 名言引用 */
.quotations {
  font-family: '標楷體';
  margin: 0 auto;

  /* 引用區塊樣式 */
  .quote {
    border-left: 2.4px solid var(--quote-text-color);
    padding-left: 0.5em;
    background-color: var(--main-back-color-transluc);

    font-size: 18px;
    font-style: italic;
    color: var(--quote-text-color);
    line-height: 1.6;
  }

  /* 作者 */
  .author {
    margin: 0;
    margin-top: 5px;

    font-size: 16px;
    text-align: right;
    color: var(--quote-text-color);
    display: inline-block;

    /* 偽樣式 —— */
    &::before {
      content: "——";
      margin-right: 4px;
    }
  }
}

/* 【名言引用-動畫 (讓引用區淡入顯示，避免元素區塊一開始突兀出現展開) */
.quotations-anime {

  /* 名言先出現 */
  .quote {
    /* 透明 */
    opacity: 0;
    /* 指定透明：淡入效果	ease:常見預設值，慢 - 快 - 慢 */
    transition: opacity 1.5s ease 2.0s;
  }

  /* 作者再出來 */
  .author {
    opacity: 0;
    transition: opacity 1s ease 2.5s;
  }

  /* JS加入的樣式，用以啟動上方動畫效果 */
  .show {
    /* 顯示 */
    opacity: 1;
  }

}

/* 動畫】 */




/* ========================================
   xxl: ≥ 1400px (大桌機、4K 螢幕)
   container 寬度: 1320px
======================================== */
@media (min-width: 1400px) {

  /* 名言引用 */
  .quotations {

    /* 引用區塊樣式 */
    .quote {
      font-size: 20px;
      line-height: 1.6;
    }

    /* 作者 */
    .author {
      font-size: 18px;
    }
  }

}




/* ========================================
   xl: 1200px ~ 1399px (一般桌機)
   container 寬度: 1140px
======================================== */
@media (min-width: 1200px) and (max-width: 1399px) {

  /* 名言引用 */
  .quotations {

    /* 引用區塊樣式 */
    .quote {
      font-size: 18px;
      line-height: 1.6;
    }

    /* 作者 */
    .author {
      font-size: 16px;
    }
  }
}




/* ========================================
   lg: 992px ~ 1199px (小型桌機、橫向大型平板)
   container 寬度: 960px
======================================== */
@media (min-width: 992px) and (max-width: 1199px) {

  /* 名言引用 */
  .quotations {

    /* 引用區塊樣式 */
    .quote { 
      font-size: 16.2px;
      line-height: 1.6;
    }

    /* 作者 */
    .author {
      font-size: 15.7px;
    }
  }
}




/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {

  /* 名言引用 */
  .quotations {

    /* 引用區塊樣式 */
    .quote {
      font-size: 12.9px;
      line-height: 1.6;
    }

    /* 作者 */
    .author {
      font-size: 12px;
    }
  }
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {

  /* 名言引用 */
  .quotations {

    /* 引用區塊樣式 */
    .quote {
      margin-top: 60px;
      font-size: 14.6px;
      line-height: 1.6;
    }
  
    /* 作者 */
    .author {
      font-size: 13.8px;
    }
  }
}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {

  /* 名言引用 */
  .quotations {
    
    /* 引用區塊樣式 */
    .quote {
      margin-top: 40px;
      font-size: 15.4px;
      line-height: 1.4;
    }

    /* 作者 */
    .author {
      font-size: 14.8px;
    }
  }
}
</style>