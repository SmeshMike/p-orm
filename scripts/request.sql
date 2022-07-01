-- Table: public.requests

-- DROP TABLE IF EXISTS public.requests;

CREATE TABLE IF NOT EXISTS public.requests
(
    id SERIAL,
    user_id integer NOT NULL,
    bot_instance VARCHAR,
    command VARCHAR,
    req_date date NOT NULL DEFAULT CURRENT_DATE,
    req_time time NOT NULL DEFAULT CURRENT_TIME,
    CONSTRAINT requests_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users FOREIGN KEY (user_id, bot_instance)
        REFERENCES public.users (user_id, bot_instance) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)