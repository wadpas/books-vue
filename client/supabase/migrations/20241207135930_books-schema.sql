drop table if exists books;

create table 
    books (
        id bigint primary key generated always as identity not null,
        created_at timestamptz default now() not null,
        title text unique not null,
        slug text unique not null,
        author text not null,
        description text not null,
        genre text array default array[]::text[] not null,
        year numeric(4) not null check (year > 0 and year < 9999),
        cover text not null,
        average_rating float,
        num_comments int  
    );