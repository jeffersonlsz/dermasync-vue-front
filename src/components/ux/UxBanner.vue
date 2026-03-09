<template>
    <div :class="['alert', alertClass, 'mb-3', 'd-flex', 'align-items-center']" role="alert">
        <span>{{ message }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    severity: {
        type: String,
        required: true,
        validator: (value) => ['info', 'warning', 'error', 'success'].includes(value)
    },
    message: {
        type: String,
        required: true
    }
});

const alertClass = computed(() => {
    switch (props.severity) {
        case 'info': return 'alert-info';
        case 'warning': return 'alert-warning';
        case 'error': return 'alert-danger'; // Bootstrap uses alert-danger for errors
        case 'success': return 'alert-success';
        default: return 'alert-secondary';
    }
});
</script>

<style scoped>
/* Scoped styles if needed, but relying on Bootstrap as requested */
</style>
