import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Чтобы понимать JSON в body
app.use(cookieParser()); // Чтобы читать куки

// Настройка CORS (чтобы фронт на порту 5173 мог общаться с бэком на 5000)
app.use(cors({
    origin: 'http://localhost:5173', // Адрес нашего Vite фронтенда
    credentials: true // Разрешаем куки
}));

// Подключение маршрутов
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});