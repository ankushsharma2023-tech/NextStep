# Backend setup

Create a `.env` file in this folder with your MongoDB connection and optional port. Example:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nextstep?retryWrites=true&w=majority
PORT=5000
```

Notes:
- Copy `.env.example` to `.env` and fill in values.
- Do NOT commit `.env`. The repository `.gitignore` will exclude it.
- If `.env` is not provided, the server will fall back to a local MongoDB at `mongodb://127.0.0.1:27017/nextstep`.

Start the dev server:

```
npm install
npm run dev
```
