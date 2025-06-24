import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from "../../api/endpoints";

export const loginUser = createAsyncThunk(
    ENDPOINTS.AUTH.LOGIN,
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const result = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, { email, password });
            return result.data.token;

        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
)

export const signupUser = createAsyncThunk(
    ENDPOINTS.AUTH.SINGUP,
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const result = await axiosInstance.post(ENDPOINTS.AUTH.SINGUP, { email, password });
            return result.data.token;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || 'Singup Failed')
        }
    }
)

const tokenFromStorage = localStorage.getItem('token');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: tokenFromStorage || null,
        isAuthenticated: !!tokenFromStorage
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload);
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }

})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;