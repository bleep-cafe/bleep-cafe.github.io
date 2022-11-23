#!/usr/bin/env sh

# Abort on errors
set -e

npm run build

# Navigate into the build output directory
cd dist

# Because we're force-pushing every time we build, we'll also need to remember
# to recreate the .nojekylland CNAME files. 
echo > .nojekyll
echo 'www.bleep.cafe' > CNAME

# We don't care about the history on `main`. Each build we'll init a "new" repo
# and force push it.
git init
git checkout -B main
git add -A
git commit -m ':rocket: Deploy to gh-pages.'
git push -f https://github.com/bleep-cafe/bleep-cafe.github.io.git main

cd -

# Clean up build files once we're done.
rm -rf dist
