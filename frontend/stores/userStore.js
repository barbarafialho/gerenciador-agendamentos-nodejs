import { defineStore } from "pinia";
import userApi from "../api/userApi";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null
    }),

    actions: {
        async login(payload) {
            const res = await userApi.login(payload);
            this.token = res.data.token;
            localStorage.setItem("token", this.token);
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("token");
        }
    }
});
