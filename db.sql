-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `comment-section`;
USE `comment-section`;

-- Drop the table if it exists (optional)
DROP TABLE IF EXISTS `users`;

-- Create the users table
CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    parent_id INT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign keys
    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_comments_parent
        FOREIGN KEY (parent_id) REFERENCES comments(comment_id)
        ON DELETE CASCADE
);
CREATE TABLE votes (
    vote_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Relationships
    CONSTRAINT fk_vote_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_vote_comment FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,

    -- Prevent same user from voting more than once on the same comment
    CONSTRAINT unique_user_comment UNIQUE (user_id, comment_id)
);

