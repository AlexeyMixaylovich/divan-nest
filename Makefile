build:
	docker build -t divans-img .
run:
	docker run -d -p 3000:3000 -p 27017:27017 -e PORT=3000 --rm --name divans divans-img
stop:
	docker stop divans
logs:
	docker logs -f divans
