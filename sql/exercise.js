const Database = require("better-sqlite3");

const db = new Database("communityhub.db");

// 1. Create posts table
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
  );
`);

// 2. Insert at least 3 posts
const insertPost = db.prepare(`
  INSERT INTO posts (author, title, likes)
  VALUES (?, ?, ?)
`);

const posts = [
  ["maisori", "Hello SQL", 3],
  ["amina", "Joins are fun", 7],
  ["maisori", "Second post", 1],
];

for (const post of posts) {
  insertPost.run(...post);
}

// 3. SELECT all posts ordered by likes descending
console.log("\n--- All Posts (Most Likes First) ---");

const allPosts = db
  .prepare("SELECT * FROM posts ORDER BY likes DESC")
  .all();

console.table(allPosts);

// 4. SELECT posts by one author
console.log("\n--- Posts by maisori ---");

const authorPosts = db
  .prepare("SELECT * FROM posts WHERE author = ?")
  .all("maisori");

console.table(authorPosts);

// 5. Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL
  );
`);

// 6. Insert users
const insertUser = db.prepare(`
  INSERT INTO users (username, email)
  VALUES (?, ?)
`);

const users = [
  ["maisori", "maisori@example.com"],
  ["amina", "amina@example.com"],
];

for (const user of users) {
  insertUser.run(...user);
}

// 7. JOIN posts with users
console.log("\n--- Posts with User Information ---");

const joinedPosts = db
  .prepare(`
    SELECT
      posts.title,
      posts.likes,
      users.username,
      users.email
    FROM posts
    JOIN users
      ON posts.author = users.username
    ORDER BY posts.likes DESC
  `)
  .all();

console.table(joinedPosts);

db.close();