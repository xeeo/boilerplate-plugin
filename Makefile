NAME=xeeo/<%= appName %>
VERSION=latest

test:
	./node_modules/.bin/mocha -w -d --recursive;
cover:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- test -R spec
build:	install
	make cover
clean: 
	rm -fv npm-shrinkwrap.json
	rm -rfv ./node_modules
	npm install
	npm shrinkwrap
install:
	rm -rfv ./node_modules
	npm install
run:
	docker build -t $(NAME):$(VERSION) -f docker/Dockerfile .
	docker run -it -v $$(pwd):/opt/app/current -p 8000:8000 -p 5858:5858 -e DEBUG=true -e NODE_ENV=dev $(NAME):$(VERSION) make test

.PHONY: test dover build install clean run
