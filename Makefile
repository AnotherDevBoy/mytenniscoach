install:
	npm i @material-ui/core --legacy-peer-deps

style:
	npm run format

schema:
	./node_modules/supabase/bin/supabase gen types typescript --project-id ${PROJECT_ID} > ./lib/database.types.ts