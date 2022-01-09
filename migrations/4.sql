CREATE TABLE waitforapprove (
    Id          SERIAL          PRIMARY KEY,
    MessageId   VARCHAR(18)     NOT NULL,
    ReportId    INT             REFERENCES reports(id)
)