# Steps to run app

## Development

1. Start Database
``` docker compose up -d ```
2. Rename .env.template to .env
3. Fix enviroment variables values.
4. Run ``` npm install ```
5. Run ``` npm run dev ``` 
6. Run Prisma commands: ``` npx prisma migrate dev ``` &  ```npx prisma generate```
7. Seed [database](http://localhost:3000/api/seed)

### Note: Default User
__username__ root
__password__ root

### Prisma Commands
```
npx prisma init 
npx prisma migrate dev
npx prisma generate
```
## Production

## Stage