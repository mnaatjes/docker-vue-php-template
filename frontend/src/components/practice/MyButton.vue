<template>
    <div class="btn__container">
        <button class="btn--main" @click="$emit('button-click')">Testing...</button>
        <small style="color: tomato;">{{  currLetter }}</small>
    </div>
</template>

<script>
    export default {
        // Properties
        props: {
            currLetter: String
        }
    };
</script>

<style>
    .btn__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }
</style>