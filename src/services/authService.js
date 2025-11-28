export async function login(email, senha) {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Falha no login');
    }

    return response.json();
}