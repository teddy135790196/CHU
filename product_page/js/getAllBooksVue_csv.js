
// 
  const allBooks = new Vue({
        el: "#app",
        data() {
          return {
            ob: [],
            novels: [],
          };
        },
        mounted() {
          //先取得CSV資料庫資料，等取值完後再把現在顯示資料等於過去
            this.fetchData().then(() => {
            this.novels = this.ob;
            
            console.log("novels[0]=",this.novels[0]);
          });
        },
        methods: {
          async fetchData() {
            const response = await fetch("./書本表3.csv");
            //  等解碼後再取資料吧-->移至最後
            // const responseData = await response.text(); 
            
            // 編碼判斷
            // 取得該csv的二進位資料
            const csvBinary = await response.arrayBuffer(); //取二進位資料，因為text會預設是utf8，這個則是原封不動的資料
            const byte = new Uint8Array(csvBinary); //從二進位資料裡拿出一個個

            // 檢查 BOM：判斷是否為 UTF-16LE、UTF-16BE、還是預設為 UTF-8
            let encoding = "utf-8"; // 預設
            //判斷是否是utf16
            if(byte[0]=== 0xFF && byte[1]=== 0xFE){encoding="utf-16le";}
            else if(byte[0]=== 0xFE && byte[1]=== 0xFF){encoding="utf-16be";} //PapaParse 不支援be，要自己反轉

            // 解碼
            const decoder=new TextDecoder(encoding); //用什麼解碼
            const responseData=decoder.decode(csvBinary);
            const parsed = Papa.parse(responseData, {
              header: false, //但我沒有欄位就改false
              skipEmptyLines: true, // 跳過空行
              delimiter: "^" //欄位分割符號
            });
            this.ob=parsed.data.map(row=>({
                ISBN:row[0],
                name:row[5],
                author:row[6],
                price:row[11],
                imgUrl:row[13]

            }));
            // console.log(this.ob);
            // console.log(window.location.href); 
          }
        }
      });
    