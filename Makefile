dev: ## Starts the application in development mode
	npm start

mock: ## Starts the application in development mode with the backend mocked
	REACT_APP_IS_BACKEND_MOCKED=true npm start

build:
	npm run build

serve: build
	serve -p 3000 build/