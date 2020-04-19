# запуск всех конейнеров
up:
	sudo docker-compose up -d

# остановка всех конейнеров
down:
	sudo docker-compose down

# запуск сервера
serve:
	sudo docker-compose exec node npm start

# установка зависимостей
install:
	sudo docker-compose exec node npm install
