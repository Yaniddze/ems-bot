CREATE TABLE migrations(
    Id              SERIAL      PRIMARY KEY,
    Name            VARCHAR(30) NOT NULL,
    DateExecuted    DATE        NOT NULL DEFAULT NOW()
);
