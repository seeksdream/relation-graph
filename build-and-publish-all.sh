#bash
# Build all
cd ~/relation-graph/assembly-line
# Clone sourcecode
echo '-----------------[Clone Sourcecode]----------------------'
sh clone-project.sh
echo 'Sourcecode is ready!'
echo '-----------------[Build]----------------------'
sh build-for-npm-vue2.sh
echo 'Vue2 NPM package is ready!'
sh build-for-npm-vue3.sh
echo 'Vue3 NPM package is ready!'
sh build-for-npm-react.sh
echo 'React NPM package is ready!'
echo '-----------------[Sigin]----------------------'
echo 'Sigin to npm...'
# Sigin to npm
sh login-to-npm.sh
echo 'Sigin to npm success!'
# Publish all
echo '-----------------[publish]----------------------'
sh publish-vue2-to-npm.sh
echo 'relation-graph-vue2 publish success!'
sh publish-vue3-to-npm.sh
echo 'relation-graph-vue3 publish success!'
sh publish-react-to-npm.sh
echo 'relation-graph-react publish success!'
sh publish-main-to-npm.sh
echo 'relation-graph publish success!'
