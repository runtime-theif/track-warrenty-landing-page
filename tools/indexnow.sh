#!/bin/sh
# Notify Bing/Yandex (IndexNow) about every URL in sitemap.xml. Run after a deploy.
KEY=ddf7ab720ea82726ab3413db882b160d
URLS=$(grep -o '<loc>[^<]*' sitemap.xml | sed 's/<loc>//' | python3 -c 'import sys,json;print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')
curl -s -o /dev/null -w "IndexNow HTTP %{http_code}\n" -X POST https://api.indexnow.org/indexnow \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d "{\"host\":\"trackwarranty.app\",\"key\":\"$KEY\",\"keyLocation\":\"https://trackwarranty.app/$KEY.txt\",\"urlList\":$URLS}"
