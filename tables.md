CREATE TABLE op (
    userId varchar(255),
    username varchar(255),
    serverId varchar(255)
);

CREATE TABLE economy (
    userId varchar(255),
    username varchar(255),
    value varchar(255)
);

CREATE TABLE url (
    userId varchar(255),
	longUrl varchar(255),
    shortUrl varchar(255),
	callTime varchar(255)
);

INSERT INTO op (userId, username, serverId)
VALUES ('378581620325744652', 'djmango', '335495391711854593');

alter table economy add column lastRedeem varchar(255);
