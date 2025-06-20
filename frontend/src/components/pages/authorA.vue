<template>
    <router-link :to="`/author/${encodeURIComponent(name)}`">
<slot />
</router-link>
</template>
<script>
export default{
    name:"author_a",
    props:["name"]
};</script>