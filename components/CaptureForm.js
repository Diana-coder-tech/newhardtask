import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function CaptureForm() {
  const { register, handleSubmit, reset } = useForm();
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) setToken(savedToken);
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/create-task",
        {
          title: data.title,
          description: data.description,
          tags: data.tags.split(","),
          budget_from: Number(data.budget_from),
          budget_to: Number(data.budget_to),
          deadline_days: Number(data.deadline_days),
          number_of_reminders: Number(data.number_of_reminders),
          private_content: data.private_content || null,
          is_hard: data.is_hard === "true",
          all_auto_responses: data.all_auto_responses === "true",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Задача успешно опубликована!");
        reset();
      } else {
        throw new Error("Ошибка публикации");
      }
    } catch (error) {
      alert(`Ошибка: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Создание задачи</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Заголовок" className="w-full p-2 border rounded" required />
        <textarea {...register("description")} placeholder="Описание" className="w-full p-2 border rounded" required />
        <input {...register("tags")} placeholder="Теги (через запятую)" className="w-full p-2 border rounded" required />
        <input type="number" {...register("budget_from")} placeholder="Бюджет от" className="w-full p-2 border rounded" required />
        <input type="number" {...register("budget_to")} placeholder="Бюджет до" className="w-full p-2 border rounded" required />
        <input type="number" {...register("deadline_days")} placeholder="Дедлайн (дни)" className="w-full p-2 border rounded" required />
        <input type="number" {...register("number_of_reminders")} placeholder="Кол-во напоминаний" className="w-full p-2 border rounded" required />
        <select {...register("is_hard")} className="w-full p-2 border rounded">
          <option value="true">Сложная</option>
          <option value="false">Обычная</option>
        </select>
        <select {...register("all_auto_responses")} className="w-full p-2 border rounded">
          <option value="true">Автоответы вкл.</option>
          <option value="false">Автоответы выкл.</option>
        </select>
        <textarea {...register("private_content")} placeholder="Приватное содержимое (опционально)" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Опубликовать задачу
        </button>
      </form>
    </div>
  );
}
