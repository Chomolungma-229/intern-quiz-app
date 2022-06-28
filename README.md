# intern-quiz-app

## localでの起動の仕方

Dockerを起動する

```
docker-compose up
```

Containerに入る

```
docker-compose exec node bash
```

Angularを起動する

```
cd app
ng serve --host 0.0.0.0 --disable-host-check
```
