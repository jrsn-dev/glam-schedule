import axios from 'axios';
import { Professional, Service } from './data';
import { User } from '../types/auth';

const API_BAR_URL = 'http://localhost:8000/api';

export const api = {
    login: async (username: string, password: string): Promise<{ user: User, token: string }> => {
        const response = await axios.post(`${API_BAR_URL}/login/`, { username, password });
        return response.data;
    },

    getProfessionals: async (): Promise<Professional[]> => {
        const response = await axios.get(`${API_BAR_URL}/professionals/`);
        return response.data;
    },

    getProfessionalBySlug: async (slug: string): Promise<Professional | undefined> => {
        const response = await axios.get(`${API_BAR_URL}/professionals/${slug}/`);
        return response.data;
    },

    getServices: async (gender?: 'male' | 'female'): Promise<Service[]> => {
        const params = gender ? { gender } : {};
        const response = await axios.get(`${API_BAR_URL}/services/`, { params });
        return response.data;
    },

    createBooking: async (bookingData: any): Promise<{ success: boolean; id: string }> => {
        // Ensure data is sent with correct field names for the updated serializer
        const response = await axios.post(`${API_BAR_URL}/bookings/`, bookingData);
        return { success: true, id: response.data.id };
    },

    getBookings: async (params?: any): Promise<any[]> => {
        const response = await axios.get(`${API_BAR_URL}/bookings/`, { params });
        return response.data;
    },

    deleteBooking: async (id: string): Promise<void> => {
        await axios.delete(`${API_BAR_URL}/bookings/${id}/`);
    },

    updateProfessional: async (slug: string, data: any): Promise<Professional> => {
        const response = await axios.patch(`${API_BAR_URL}/professionals/${slug}/`, data);
        return response.data;
    },

    createProfessional: async (data: Professional): Promise<Professional> => {
        const response = await axios.post(`${API_BAR_URL}/professionals/`, data);
        return response.data;
    },

    deleteProfessional: async (slug: string): Promise<void> => {
        await axios.delete(`${API_BAR_URL}/professionals/${slug}/`);
    },

    createService: async (data: Service): Promise<Service> => {
        const response = await axios.post(`${API_BAR_URL}/services/`, data);
        return response.data;
    },

    updateService: async (id: string, data: any): Promise<Service> => {
        const response = await axios.patch(`${API_BAR_URL}/services/${id}/`, data);
        return response.data;
    },

    deleteService: async (id: string): Promise<void> => {
        await axios.delete(`${API_BAR_URL}/services/${id}/`);
    },

    updateBooking: async (id: string, data: any): Promise<any> => {
        const response = await axios.patch(`${API_BAR_URL}/bookings/${id}/`, data);
        return response.data;
    },

    // New profile management methods
    updateUserProfile: async (userId: number, data: any): Promise<any> => {
        const response = await axios.patch(`${API_BAR_URL}/users/${userId}/`, data);
        return response.data;
    },

    getUserProfile: async (userId: number): Promise<any> => {
        const response = await axios.get(`${API_BAR_URL}/users/${userId}/`);
        return response.data;
    },

    uploadGalleryImage: async (slug: string, file: File): Promise<any> => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.post(`${API_BAR_URL}/professionals/${slug}/upload_gallery_image/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    deleteGalleryImage: async (id: number): Promise<void> => {
        await axios.delete(`${API_BAR_URL}/gallery/${id}/`);
    },

    getUnavailableSlots: async (slug: string, date: string): Promise<string[]> => {
        const response = await axios.get(`${API_BAR_URL}/professionals/${slug}/unavailable_slots/`, {
            params: { date }
        });
        return response.data.unavailable_slots;
    }
};
