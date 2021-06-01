cd build
git init
git remote add origin https://github.com/kinsun852/typeorm.git
git add .
git commit -am "deploy"
git push --force origin dist
rm -rf .git
cd ..