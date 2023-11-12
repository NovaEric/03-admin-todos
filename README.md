# Steps to run app

## Development

1. Start Database
``` docker compose up -d ```

2. Rename .env.template to .env
3. Fix enviroment variables values. 
4. Seed [database](http://localhost:3000/api/seed)



### Prisma Commands
```
npx prisma init 
npx prisma migrate dev
npx prisma generate
```
## Production

## Stage