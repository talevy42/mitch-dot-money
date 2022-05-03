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
	scp -r build/* ${REMOTE_LOC}:/var/www/mitchofarrell.money/html/

deploy-text:
	npm run build
	rsync -rav -e ssh --include='*', --exclude='*.png' --exclude='*.svg' --exclude='*.jpg' build/* ${REMOTE_LOC}:/var/www/mitchofarrell.money/html/
