https://crontab.cronhub.io/

gh run list --limit 393 --json databaseId --jq '.[].databaseId' | xargs -I {} sh -c 'echo y | gh run delete {}'