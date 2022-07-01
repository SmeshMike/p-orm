-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
	id SERIAL,
    user_id integer NOT NULL,
    bot_instance VARCHAR NOT NULL,
	mode VARCHAR DEFAULT 'unauthorized',
    sex VARCHAR,
	group_id VARCHAR,
	group_name VARCHAR,
    faculty VARCHAR,
	college VARCHAR,
	target_type VARCHAR,
	lng integer DEFAULT 1,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_user_id_key UNIQUE (user_id, bot_instance)
);

CREATE INDEX IF NOT EXISTS users_index
    ON public.users USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
