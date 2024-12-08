drop table if exists comments;

create table 
    comments (
        id bigint primary key generated always as identity not null,
        created_at timestamptz default now() not null,
        rating float not null check(rating > 1 and rating < 5),
        text text not null,
        book_id bigint references books (id) default null
    );