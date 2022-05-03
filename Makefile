.PHONY: deploy

deploy:
	git pull
	npm install
	npm run build
	rm -rf /var/www/mitch-money-html
	cp -R build /var/www/mitch-money-html

convert-donors-csv:
	npx gulp convertToJson

deploy-mitch:
	npm run build
	scp -r build/* root@137.184.11.62:/var/www/mitchofarrell.money/html/
