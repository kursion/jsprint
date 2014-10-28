build:
	@echo "Build the project (BRUNCH)"
	@./node_modules/brunch/bin/brunch build
watch:
	@echo "Running the watcher (BRUNCH)"
	@./node_modules/brunch/bin/brunch watch --server
install:
	#@echo "Installing brunch & bower (NPM)"
	#@sudo npm install -g brunch
	#@sudo npm install -g bower
	@echo "Installing brunch dependencies (NPM)"
	@npm install
	@bower install
clean:
	@cd release/;rm -rf *;cd ..
