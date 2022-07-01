-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.user
(
	id SERIAL,
    another_id integer NOT NULL,
	mode VARCHAR DEFAULT 'unauthorized',
	eyes_nubmer integer DEFAULT 2,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_user_id_key UNIQUE (user_id, bot_instance)
);

CREATE INDEX IF NOT EXISTS users_index
    ON public.users USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
