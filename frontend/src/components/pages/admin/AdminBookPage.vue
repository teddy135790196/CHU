<template>
<div class="container">
    <BookInsertArea :books="books"/>
<BookTablesArea :books="books"/>
</div>
</template>
<script>
import BookTablesArea from '@/components/areas/admin/BookTablesArea.vue';
import BookInsertArea from '@/components/areas/admin/BookInsertArea.vue';

export default{
    name: 'AdminBookPage',
    components:{BookTablesArea,BookInsertArea},
    data(){
        return{books:[]}
        
    },mounted(){
        //元件掛載後自動抓資料
        this.fetchBooks();
    },methods:{
        async fetchBooks(){
            try{
                const products=
                await this.$axios.get('/api/azureDB/products');
                this.books=products.data;
            }catch(e){
                //發生錯誤時印出錯誤訊息到主控台
                console.error('書本讀取錯誤:',e);
            }
        }
    }
}
</script>