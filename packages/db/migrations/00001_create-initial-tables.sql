CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    name text NOT NULL UNIQUE,
    pin text NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.account_type (
    value text PRIMARY KEY,
    comment text
);

CREATE TABLE public.accounts (
    id SERIAL PRIMARY KEY,
    type text REFERENCES public.account_type ON DELETE CASCADE NOT NULL,
    balance int NOT NULL,
    user_id int REFERENCES public.users ON DELETE CASCADE NOT NULL,
    daily_withdrawal_limit int NOT NULL
);

CREATE TABLE public.transaction_type (
    value text PRIMARY KEY,
    comment text
);

CREATE TABLE public.transactions (
    id SERIAL PRIMARY KEY,
    type text REFERENCES public.transaction_type ON DELETE CASCADE NOT NULL,
    account_id int REFERENCES public.accounts ON DELETE CASCADE,
    amount int NOT NULL CHECK(amount >= 0),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
