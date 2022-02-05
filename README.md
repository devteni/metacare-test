# metacare-test
# Installation guide.
1. Clone the project
  
  `git clone https://github.com/devteni/metacare-test.git`
 
2. Cd into the directory and install all dependencies.
```
  cd metacare-test
  yarn install
```

3. Run migration.
` yarn run migrate `

4. Seed the database.
` yarn run db:seed`

5. Generate Prisma.
` yarn run prisma:generate`

6. Run watch.
` yarn run watch`

6. Start the server.
` yarn run dev `

## API url.
http://localhost:8000/ -- endpoint
http://localhost:8000/docs -- Documentation
