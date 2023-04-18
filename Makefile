dev: ## Starts the application in development mode
	npm start

mock: ## Starts the application in development mode with the backend mocked
	VITE_IS_BACKEND_MOCKED=true npm start

build:
	npm run build

serve:
	npm run serve

pretty:
	npm run pretty