<script setup lang="ts">
const props = defineProps({
    text: { type: String, default: "" },
    value: { type: String, default: undefined },

})
</script>
<template>
    <div class="grid grid-cols-2 my-3">
        <div  class="font-bold">
            {{ props.text }}
        </div>
        <div class="font-bold">
            <div v-if="props.value != undefined">
                {{ props.value }}
            </div>
            <div v-else>
                <slot>

                </slot>
            </div>

        </div>
    </div>
</template>