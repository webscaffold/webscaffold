echo "Cloning LICENSE to babel packages"
cat LICENSE.txt
ls -db ./packages/*/ | egrep -v '.*packages?$' | xargs -n 1 cp LICENSE.txt
