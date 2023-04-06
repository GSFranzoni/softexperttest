#!/usr/bin/make

# choco install make

.DEFAULT_GOAL := help

help:  ## Display this help
	@echo "Help"

##@ Initialize work

init: ## Start a new develop environment
	$(MAKE) dev
	$(MAKE) install
	$(MAKE) fresh

##@ Docker actions

dev: ## Start containers detached
	docker-compose up -d

logs: ## Show the output logs
	docker-compose logs

log: ## Open the logs and follow the news
	docker-compose logs --follow

restart: ## Restart the app container
	docker-compose restart softexpert_server

##@ Bash controls

bash: ## Start nginx bash
	docker-compose exec softexpert_server bash

nginx: ## Start nginx bash
	docker-compose exec softexpert_server bash

mysql: ## Start mysql bash
	docker-compose exec softexpert_mysql bash

exec: ## Start bash
	docker-compose exec softexpert_server $(cmd)