import axios from "axios";

const API_URL = "https://your-api-endpoint.com";

/**
 * Отправка данных формы для создания задачи
 * @param {Object} taskData - Данные задачи
 * @param {string} token - Токен авторизации
 */
export async function createTask(taskData, token) {
  try {
    const response = await axios.post(`${API_URL}/create-task`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Ошибка соединения" };
  }
}
