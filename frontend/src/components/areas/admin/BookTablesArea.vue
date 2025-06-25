<template>
    <div class="row">
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <th>書號id</th>
                    <th>書名</th>
                    <th>簡介</th>
                    
                </tr>
            </thead>
            <tbody>

                <tr v-for="(n, index) in books" :key="index">
                    <td>{{ n.ISBN_id }}</td>
                    <td>{{ n.name }}</td>
                    <td>{{ n.description }}</td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        books:{type:Array,required: true}//required: true保證必須傳入prop，否則警告
    },
     data() {
        return {}
    }
}
</script>