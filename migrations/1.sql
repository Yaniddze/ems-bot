CREATE TABLE reports(
    Id          SERIAL      PRIMARY KEY,
    MessageId   VARCHAR(18) NOT NULL,
    BadGuy      VARCHAR(18) NOT NULL,
    GoodGuy     VARCHAR(18) NOT NULL,
    DateCreate  DATE        NOT NULL,
    DateExpire  DATE        NOT NULL,
    Resolved    BOOLEAN     NOT NULL
)