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

## Componentの作り方

Dockerを起動する

```
docker-compose up
```

Containerに入る

```
docker-compose exec node bash
```

Componentを作りたい階層に移動

Componentを作成する
```
ng g c コンポーネント名
```
