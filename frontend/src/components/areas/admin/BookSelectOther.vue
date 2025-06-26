<template>
    <div>
        <select v-model="selectValue">
            <option disabled value="">請選擇</option>
            <option v-for="p in options" :key="p" :value="p">{{ p }}</option>
            <option value="__OTHER__">其他</option>

        </select>
        <!-- 如果選了其他則顯示輸入框 -->
        <div v-if="selectValue === '__OTHER__'">
            <!-- __OTHER__自定義的一個特殊選項值，用來做條件判斷，你有可以改成中文，這是內部邏輯用的 -->
            <input v-model="customValue" :placeholder="placeholderStr || '請輸入'" />
        </div>

    </div>
</template>
<script>

export default {
    name: 'BookSelectOther',
    props: {
        value: String,// 用來綁 v-model
        options: { type: Array, required: true },
        placeholderStr: String
    }, data() {
        // 判斷是不是有效選項
        const isValid = this.options.includes(this.value);

        // 判斷 this.value 有沒有出現在 this.options 裡
        if (this.value === "") {

            return {
                selectValue: "",
                customValue: ""
            };
        } else {
            if (isValid === true) {
                return {
                    selectValue: this.value,
                    customValue: ""
                };
            } else {
                return {
                    selectValue: "__OTHER__", customValue: this.value
                };
            }
        }


    },
    //監聽是否有變換值
    watch: {
        //select 改變時（用 selectValue 的 watch）
        selectValue(val) {
            if (val === "__OTHER__") {
                this.$emit("input", this.customValue);
            } else {
                this.$emit("input", val);// 非其他時，自動同步選到的值
            }
        },
        //輸入框改變時（用 customValue 的 watch）
        customValue(val) {
            if (this.selectValue === "__OTHER__") {
                this.$emit("input", val);
            }
        },
        // 每次從外部傳進來的新值（v-model）變動時，就執行這段邏輯。
        value(newVal) {
            //回到預設值，若為空的話
            if (newVal === "") {
                this.selectValue = "";// ✅ 確保會回到「請選擇」
                this.customValue = "";
            } else
                if (this.options.includes(newVal)) {
                    this.selectValue = newVal;
                    this.customValue = "";
                } else {
                    this.selectValue = "__OTHER__";
                    this.customValue = newVal;
                }
        }
    }
}
</script>