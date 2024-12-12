drop table if exists comments;

create table 
    comments (
        id bigint primary key generated always as identity not null,
        created_at timestamptz default now() not null,
        profile_id uuid references profiles (id) on delete cascade not null,
        book_id bigint references books (id) default null,
        rating float check(rating > 1.0 and rating < 5.0) not null,
        text text not null
    );