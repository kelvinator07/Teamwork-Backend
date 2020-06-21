  /**
 * Create Users Table DROP TABLE IF EXISTS users
 */
export const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR (255) NOT NULL,
  firstName VARCHAR (255) NOT NULL,
  lastName VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  gender VARCHAR (255) NOT NULL,
  jobRole VARCHAR (255) NOT NULL,
  department VARCHAR (255) NOT NULL,
  address VARCHAR (255) NOT NULL,
  avatarUrl VARCHAR (255) NOT NULL,
  userRole VARCHAR (255) NOT NULL,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL
  )
  `;
  
/**
 * Create Articles Table
 */
export const createArticleTable = `CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description text NOT NULL,
  authorId INTEGER NOT NULL,
  category VARCHAR(255) NOT NULL,
  share VARCHAR(255) NOT NULL,
  createdat timestamp with time zone,
  updatedat timestamp with time zone,
  FOREIGN KEY (authorId) REFERENCES users (id)
)`;

/**
* Create Gifs Table
*/
export const createGifTable = `CREATE TABLE IF NOT EXISTS gifs (
  id SERIAL PRIMARY KEY,
  authorId INTEGER NOT NULL,
  title VARCHAR(255),
  imageurl VARCHAR(255),
  share VARCHAR(255),
  createdAt timestamp with time zone,
  updatedAt timestamp with time zone,
  FOREIGN KEY (authorId) REFERENCES users (id)
)`;

/**
* Create Comments Table
*/
export const createCommentTable = `CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  description text,
  authorId INTEGER NOT NULL,
  postId INTEGER NOT NULL,
  createdAt timestamp with time zone,
  updatedAt timestamp with time zone,
  FOREIGN KEY (authorId) REFERENCES users (id),
  FOREIGN KEY (postId) REFERENCES articles (id),
)`;

// FOREIGN KEY (postId) REFERENCES gifs (id)

// export const alterCommentTable = `CREATE TABLE IF NOT EXISTS comments (
//   FOREIGN KEY (authorId) REFERENCES users (id),
//   FOREIGN KEY (postId) REFERENCES articles (id),
//   FOREIGN KEY (postId) REFERENCES gifs (id)

//   ALTER TABLE comments ADD CONSTRAINT authorId FOREIGN KEY (authorId) REFERENCES users (id);
//   ALTER TABLE comments ADD CONSTRAINT comments_postId_fkey FOREIGN KEY (postId) REFERENCES articles (id);
//   ALTER TABLE comments ADD CONSTRAINT comments_postId_fkey1 FOREIGN KEY (postId) REFERENCES gifs (id);

// )`;

// export const insertMessages = `
// INSERT INTO messages(name, message)
// VALUES ('chidimo', 'first message'),
//       ('orji', 'second message')
// `;

// CREATE TABLE documents (
// 	document_id serial PRIMARY KEY,
// 	header_text VARCHAR (255) NOT NULL,
// 	posting_date DATE NOT NULL DEFAULT CURRENT_DATE
// );

// export const dropMessagesTable = 'DROP TABLE messages';
