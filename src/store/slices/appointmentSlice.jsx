import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ENDPOINTS } from "../../api/endpoints";
import axiosInstance from "../../api/axiosInstance";

export const fetchAndCreateAppointments = createAsyncThunk(
    ENDPOINTS.APPOINTMENT.GET_ALL_AND_CREATE,
    async ({type, ...rest}, { rejectWithValue }) => {
        try {
            if(type === "fetchall"){
                const result = await axiosInstance.get(ENDPOINTS.APPOINTMENT.GET_ALL_AND_CREATE);
                return result.data;
            }else{
                // create
                const { title, description, dateTime, duration, location } = rest;
                const result = await axiosInstance.post(ENDPOINTS.APPOINTMENT.GET_ALL_AND_CREATE, { title, description, dateTime, duration, location });
                return result.data;
            }
           
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Error fetching Data');
        }
    }
)

export const deleteAndEditAppointments = createAsyncThunk(
    ENDPOINTS.APPOINTMENT.DELETE_AND_UPDATE,
    async ({type, id, ...rest}, { rejectWithValue }) => {
        try {
            if (type === "delete") {
                const result = await axiosInstance.delete(ENDPOINTS.APPOINTMENT.DELETE_AND_UPDATE(id));
                return result.data;
            }else{
                // update
                const { title, description, dateTime, duration, location } = rest;
                const result = await axiosInstance.post(ENDPOINTS.APPOINTMENT.DELETE_AND_UPDATE(id), { title, description, dateTime, duration, location });
                return result.data;
            }

        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Error fetching Data');
        }
    }
)



const initialState = {
    appointments: [],
    loading: false,
    error: null
}

export const appointmentSlice = createSlice({
    name: 'appointmentSlice',
    initialState,
    reducers: {
        addAppointments: (state, action) => {
            state.appointments = action.payload
        },
        clearAppointments: (state) => {
            state.appointments = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAndCreateAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAndCreateAppointments.fulfilled, (state, action) => {
                state.loading = false;
                if(Array.isArray(action.payload)){
                    state.appointments = action.payload;
                }
            })
            .addCase(fetchAndCreateAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteAndEditAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAndEditAppointments.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteAndEditAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }

})

export const { addAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;