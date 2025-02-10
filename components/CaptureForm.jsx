import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

export default function CaptureForm() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/create-task", data);
      if (response.status === 200) {
        alert("Задача опубликована!");
      } else {
        alert("Ошибка при публикации.");
      }
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Создание задачи</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Заголовок</label>
          <input {...register("title")} type="text" className="w-full border rounded p-2" required />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium">Описание</label>
          <textarea {...register("description")} className="w-full border rounded p-2" required></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Теги (через запятую)</label>
          <input {...register("tags")} type="text" className="w-full border rounded p-2" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Бюджет от</label>
          <input {...register("budget_from")} type="number" className="w-full border rounded p-2" required />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Бюджет до</label>
          <input {...register("budget_to")} type="number" className="w-full border rounded p-2" required />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Дедлайн (дни)</label>
          <input {...register("deadline_days")} type="number" className="w-full border rounded p-2" required />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Кол-во напоминаний</label>
          <input {...register("number_of_reminders")} type="number" className="w-full border rounded p-2" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Сложная</label>
          <select {...register("is_hard")} className="w-full border rounded p-2">
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Автоответы</label>
          <select {...register("all_auto_responses")} className="w-full border rounded p-2">
            <option value={true}>Включены</option>
            <option value={false}>Отключены</option>
          </select>
        </div>

        <button type="submit" className="md:col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Опубликовать задачу
        </button>
      </form>
    </div>
  );
}
