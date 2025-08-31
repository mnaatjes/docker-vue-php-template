<template>
    <div class="profile--card">
        <b>Name:</b>
        <p>{{ userName }}</p>
        <b>Age:</b>
        <p>{{ userAge }}</p>
    </div>
    
</template>

<script>
    export default {
        props: {
            userName: String,
            userAge: Number
        }
    };
</script>

<style scoped>
    .profile--card {
        border-radius: 1rem;
        border: 1px solid grey;
        width: 300px;
        margin: 1rem auto;
        padding: 1rem;
        transition: all 0.2s ease-in-out;

        display: grid;
        grid-row: repeat(2, 1fr);
        grid-column: repeat(2, 1fr);
        grid-auto-flow: column;
        align-items: center;
    }
    .profile--card:hover{box-shadow: 1px 2px 0 1px rgba(0, 0, 0, 0.2);}
    .profile--card b ,
    .profile--card p {display: block;}
</style>