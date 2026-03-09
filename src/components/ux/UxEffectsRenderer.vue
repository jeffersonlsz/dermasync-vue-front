<template>
    <div class="ux-effects-renderer">
        <template v-for="(effect, index) in effects" :key="index">
            <UxBanner v-if="effect.channel === 'banner'" :severity="effect.severity" :message="effect.message" />
        </template>
    </div>
</template>

<script setup>
import UxBanner from './UxBanner.vue';

defineProps({
    effects: {
        type: Array,
        default: () => []
    }
});
</script>
