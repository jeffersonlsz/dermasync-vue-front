import axios from "axios";
import { useAuthStore } from "../stores/auth";
import router from "../router";

const API_BASE = "http://localhost:8000" || import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// instância limpa para refresh (sem interceptors do `api`)
const refreshClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// ---------- Request interceptor (adiciona Authorization + logs) ----------
api.interceptors.request.use(
  (config) => {
    try {
      const authStore = useAuthStore();
      const token = authStore?.accessToken;

      // Debug amigável (não logar token completo por segurança)
      console.debug("[DERMASYNC][API] Request ->", {
        url: `${config.baseURL || ""}${config.url}`,
        method: config.method,
        hasToken: !!token,
        // mostramos apenas prefixo do token para depuração
        tokenPrefix: token ? `${token.substring(0, 20)}...` : null,
      });

      if (token) {
        // garante que headers existe
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err) {
      console.error("[DERMASYNC][API] Erro no request interceptor", err);
      return config;
    }
  },
  (error) => {
    console.error("[DERMASYNC][API] Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ---------- Response interceptor (tratamento de 401 + refresh) ----------
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se não houver response (timeout / network / CORS) apenas rejeita
    if (!error.response) {
      console.error("[DERMASYNC][API] No response from server:", error);
      return Promise.reject(error);
    }

    // debug resposta
    console.debug("[DERMASYNC][API] Response error:", {
      status: error.response.status,
      url: originalRequest?.url,
      data: error.response.data,
    });

    // lidando com 401: tentar refresh (apenas uma vez por request)
    if (error.response.status === 401 && !originalRequest._retry) {
      // marca tentativa
      originalRequest._retry = true;

      const authStore = useAuthStore();

      // se já está sendo feito refresh, enfileira a promise
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // após refresh bem sucedido, atualiza header e re-executa
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // se não há refresh token -> logout imediato
      const refreshToken = authStore?.refreshToken;
      if (!refreshToken) {
        console.warn("[DERMASYNC][API] 401 e sem refresh token -> logout");
        authStore.logout?.();
        router.push("/login");
        return Promise.reject(error);
      }

      isRefreshing = true;
      console.info("[DERMASYNC] REFRESH ATTEMPT");

      try {
        // chama endpoint de refresh usando a instância limpa
        const resp = await refreshClient.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newAccess = resp.data?.access_token ?? resp.data?.accessToken ?? resp.data?.access_token;
        const newRefresh = resp.data?.refresh_token ?? resp.data?.refreshToken ?? resp.data?.refresh_token;

        if (!newAccess) {
          throw new Error("Refresh não retornou access_token");
        }

        // atualiza store (assume métodos setTokens / logout existem)
        if (typeof authStore.setTokens === "function") {
          authStore.setTokens(newAccess, newRefresh || refreshToken);
        } else {
          // fallback: atribui diretamente (menos ideal)
          authStore.accessToken = newAccess;
          if (newRefresh) authStore.refreshToken = newRefresh;
        }

        processQueue(null, newAccess);

        // atualiza header e reexecuta a requisição original
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("[DERMASYNC] Refresh failed:", refreshError);
        processQueue(refreshError, null);
        // limpa estado e redireciona
        try {
          authStore.logout?.();
        } catch (e) {
          console.warn("[DERMASYNC] logout erro:", e);
        }
        router.push("/login");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // se não for 401 ou já retryou -> propaga o erro
    return Promise.reject(error);
  }
);

export default api;
