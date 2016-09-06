git clone https://github.com/groupby/cdn.git ${HOME}/cdn
git clone -b gh-pages https://github.com/groupby/api-javascript.git ${HOME}/api-javascript

currentVersion=`cat package.json | jq -r .version`

cp dist/${ appNameSlug }-*.js ${HOME}/cdn/static/javascript
cp dist/${ appNameSlug }-${currentVersion}.js ${HOME}/cdn/static/javascript/${ appNameSlug }-canary.js
cp dist/${ appNameSlug }-${currentVersion}.min.js ${HOME}/cdn/static/javascript/${ appNameSlug }-canary.min.js
cp dist/${ appNameSlug }-*.js ${HOME}/api-javascript/dist
cp dist/${ appNameSlug }-${currentVersion}.js ${HOME}/api-javascript/dist/${ appNameSlug }-canary.js
cp dist/${ appNameSlug }-${currentVersion}.min.js ${HOME}/api-javascript/dist/${ appNameSlug }-canary.min.js

cd ${HOME}/cdn
git add static/javascript/${ appNameSlug }-*.js
git commit -m "Release ${ appName } v${currentVersion}"
git push

cd ${HOME}/api-javascript
git add dist/${ appNameSlug }-*.js
git commit -m "Release ${ appName } v${currentVersion}"
git push
