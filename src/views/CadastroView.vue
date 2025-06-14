<template>
    <BaseLayout>
    <div class="cadastro-view">
        <h1>Cadastro</h1>
        <p>Bem-vindo à página de cadastro. Preencha os campos abaixo para criar sua conta.</p>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name">Nome:</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <div>
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="form.password" required />
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '../layouts/BaseLayout.vue';

import { reactive } from 'vue';

const form = reactive({
    name: "",
    email: "",
    password: "",
});

function handleSubmit() {
    console.log("Form submitted:", form);
    // Add your form submission logic here
}
</script>

<style scoped>
.cadastro-view {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.cadastro-view h1 {
    text-align: center;
    margin-bottom: 20px;
}

.cadastro-view form div {
    margin-bottom: 15px;
}

.cadastro-view label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.cadastro-view input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.cadastro-view button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.cadastro-view button:hover {
    background-color: #0056b3;
}
</style>