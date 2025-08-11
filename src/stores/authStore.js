import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const isAuthenticated = computed(() => user.value !== null);

  function setUser(u) {
    user.value = u;
  }

  function logout() {
    user.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  return { user, isAuthenticated, setUser, logout };
});
