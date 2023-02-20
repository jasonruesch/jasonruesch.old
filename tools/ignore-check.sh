git log -1 --pretty=oneline --abbrev-commit | grep -e "SAVEPOINT" -e "\[skip deploy\]" -e "\[skip ci\]" && echo "🛑 - Build cancelled" && exit 0 || npx nx-ignore bills
