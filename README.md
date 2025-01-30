
This is our LIEPAJA UNIVERSITY NEW IDEA HUB(LUNIH) repository, all the codes will be on this repository, i already created a started project and some pages
like home page, next from my part will be login, sign up pages and connections to database.
The best way to work with this repository is to fork it, so you can add your own module or part of the project, and then make a pull request to that we can test it together and see if it does not break anything else in the code.
for now the repo is public, also created new branch so we can always come back to the main branch which where the clean and working code should be.
## Getting Started
### Steps for running the project
1. First, install all dependencies:

```bash
npm i --legacy-peer-deps or npm install --legacy-peer-deps
```
2. Second, get api Key from clerk @ (clerk.com)
3. for deploying the project online and being able to get the data from the clerk database(user info), we must create a webhook which can be done on the clerk platform
4. The .env and .env.local files must look like this : .env : NEXT_PUBLIC_CLERK_SIGN_IN_URL= NEXT_PUBLIC_CLERK_SIGN_UP_URL=  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL= NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=  DATABASE_URL= , .env.local : NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= CLERK_SECRET_KEY= SIGNING_SECRET=(webhook) PINATA_API_KEY= PINATA_API_SECRET= PINATA_JWT= 

5. Third, run the development server:

```bash
npm run dev
```

## About this project

The LUNIH platform, designed as a web-based collaboration hub for universities, students, companies, and guests, allows users to publish and interact with research topics, job offers, and thesis ideas. It includes various user groups (students, guests, university staff, company representatives) with specific actions (applying for posts, publishing, reviewing applications, etc.) and incorporates user and post management functionalities.

## Dependencies are libraries used in this project 
1. **Clerk** : used for authentication and user profile management
2. **Tailwind css** : Css framework used for easy web page styling
3. **React Hook Forms** : used to easier validation of forms
4. **Zod** : for form type validation
5. **lucide-react** : icon library installed alongside shadcn
6. **Shadcn-ui** : Ui library and component
7. **Prisma** : ORM for the mongodb database
8. **MongoDB**: database for storing all the data
9. **pinata**: cloud service for storing images

## Pages or routes : 
- / : home page
- /sign-up : sign up page
- /sign-in : sign in page
- /hub : project submission page
- /profile: profile page
- /dashboard : user information including post information, profile, etc...
- /dashboard/posts: posts page for the dashboard
- /dashboard/joined: joined posts for dashboard
- /dashboard/accepted: accepted posts for dashboard by admin
- /dashboard/pending: for pending posts not in dashboard not accepted by admin.

