create table `rooms`
(
    name         varchar(36) primary key,
    password     varchar(16)                        not null,
    size         int      default 0                 not null,
    creationDate datetime default CURRENT_TIMESTAMP not null
);

create table `members`
(
    id       varchar(36) primary key,
    name     varchar(36) not null,
    roomName varchar(36),
    foreign key (roomName) references `rooms` (name)
);

create table `messages`
(
    id           int auto_increment primary key,
    content      varchar(256)                       not null,
    creationDate datetime default CURRENT_TIMESTAMP not null,
    memberId     varchar(36),
    foreign key (memberId) references `members` (id)
);