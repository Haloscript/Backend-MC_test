# запуск всех конейнеров
up:
	sudo docker-compose up -d

# остановка всех конейнеров
down:
	sudo docker-compose down

#пересоздает контейнеры проекта
restart: sudo down up

#сбилдить в dev режиме
dev:
	sudo docker-compose exec node npm run dev

#сбилдить в prod режиме
prod:
	sudo docker-compose exec node npm run build
