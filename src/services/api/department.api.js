import apiClient from './client';

export const departmentApi = {
  getAll: () => apiClient.get('/departments'),

  getById: (id) => apiClient.get(`/departments/${id}`),

  create: (data) => apiClient.post('/departments', data),

  update: (id, data) => apiClient.put(`/departments/${id}`, data),

  remove: (id) => apiClient.delete(`/departments/${id}`),
};