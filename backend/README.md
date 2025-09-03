# backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

in .env file MONGO_URI = 'your db url'

for testing purpose run a docker container

docker run --name mongoose -p 27017:27017 mongo

then,
MONGO_URI=mongodb://localhost:27017/ai-ticket

This project was created using `bun init` in bun v1.1.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
