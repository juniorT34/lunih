
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

3. Third, run the development server:

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

## Pages or routes : 
- / : home page
- /sign-up : sign up page
- /sign-in : sign in page
- /onboard : for onboarding or selecting user type and asking basic information about user.
- /hub : project submission page
- /dashboard : user information including post information, profile, etc...

