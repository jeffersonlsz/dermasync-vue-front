<template>
    <BaseLayout>
    <div class="cadastro-view">
        <h1>Cadastro</h1>
        <p>Bem-vindo à página de cadastro. Preencha os campos abaixo para criar sua conta.</p>
        <form @submit.prevent="handleSubmit">
            <!-- Name field removed as requested -->
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <div>
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="form.password" required />
            </div>
            
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
            </div>

            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Cadastrando...' : 'Cadastrar' }}
            </button>
        </form>
    </div>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '../layouts/BaseLayout.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
    email: "",
    password: "",
});

const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

async function handleSubmit() {
    errorMessage.value = '';
    successMessage.value = '';
    isLoading.value = true;

    try {
        const result = await authStore.register({
            email: form.email,
            password: form.password
        });

        if (result.autoLogin) {
            successMessage.value = 'Cadastro realizado com sucesso! Redirecionando...';
            setTimeout(() => {
                router.push('/dashboard'); // Or home '/'
            }, 1500);
        } else {
            successMessage.value = 'Cadastro realizado com sucesso! Por favor, faça login.';
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = 'Erro ao realizar cadastro. Tente novamente.';
        }
        console.error(error);
    } finally {
        isLoading.value = false;
    }
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

.cadastro-view button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.alert {
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
}

.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
</style>