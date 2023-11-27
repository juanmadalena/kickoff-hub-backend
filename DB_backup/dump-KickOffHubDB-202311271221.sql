--
-- PostgreSQL database cluster dump
--

-- Started on 2023-11-27 12:21:20

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE cloud_admin;
ALTER ROLE cloud_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE fl0user;
ALTER ROLE fl0user WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE neon_superuser;
ALTER ROLE neon_superuser WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB NOLOGIN REPLICATION NOBYPASSRLS;

--
-- User Configurations
--


--
-- Role memberships
--

GRANT neon_superuser TO fl0user;
GRANT pg_read_all_data TO neon_superuser;
GRANT pg_write_all_data TO neon_superuser;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 16.0

-- Started on 2023-11-27 12:21:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2023-11-27 12:21:24

--
-- PostgreSQL database dump complete
--

--
-- Database "KickOffHubDB" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 16.0

-- Started on 2023-11-27 12:21:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2599 (class 1262 OID 16386)
-- Name: KickOffHubDB; Type: DATABASE; Schema: -; Owner: fl0user
--

CREATE DATABASE "KickOffHubDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE "KickOffHubDB" OWNER TO fl0user;

\connect "KickOffHubDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16437)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2601 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 40960)
-- Name: info_matches; Type: TABLE; Schema: public; Owner: fl0user
--

CREATE TABLE public.info_matches (
    id uuid NOT NULL,
    date date NOT NULL,
    description character varying(1000),
    duration time without time zone DEFAULT '01:00:00'::time without time zone NOT NULL,
    is_cancelled boolean DEFAULT false NOT NULL,
    is_private boolean DEFAULT false NOT NULL,
    latitude double precision NOT NULL,
    location character varying(255) NOT NULL,
    longitude double precision NOT NULL,
    max_players integer DEFAULT 14 NOT NULL,
    min_players integer DEFAULT 12 NOT NULL,
    price double precision DEFAULT 0 NOT NULL,
    "time" time(6) without time zone NOT NULL,
    id_organizer uuid NOT NULL,
    num_players integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) without time zone
);


ALTER TABLE public.info_matches OWNER TO fl0user;

--
-- TOC entry 217 (class 1259 OID 40993)
-- Name: info_ratings; Type: TABLE; Schema: public; Owner: fl0user
--

CREATE TABLE public.info_ratings (
    id uuid NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    rating real NOT NULL,
    match uuid NOT NULL,
    user_rated uuid NOT NULL,
    user_rated_by uuid NOT NULL
);


ALTER TABLE public.info_ratings OWNER TO fl0user;

--
-- TOC entry 215 (class 1259 OID 24576)
-- Name: info_users; Type: TABLE; Schema: public; Owner: fl0user
--

CREATE TABLE public.info_users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    "position" character varying(5) NOT NULL,
    secondary_positions character varying(25)[] DEFAULT '{}'::character varying(255)[],
    is_organizer boolean DEFAULT false,
    rating real,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    email character varying(100) NOT NULL,
    updated_at timestamp(6) without time zone,
    username character varying(100) NOT NULL,
    photo character varying(1000)
);


ALTER TABLE public.info_users OWNER TO fl0user;

--
-- TOC entry 218 (class 1259 OID 81936)
-- Name: rel_players_matches; Type: TABLE; Schema: public; Owner: fl0user
--

CREATE TABLE public.rel_players_matches (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "position" character varying(255) NOT NULL,
    id_match uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_user uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_retired boolean DEFAULT false,
    retired_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone
);


ALTER TABLE public.rel_players_matches OWNER TO fl0user;

--
-- TOC entry 2591 (class 0 OID 40960)
-- Dependencies: 216
-- Data for Name: info_matches; Type: TABLE DATA; Schema: public; Owner: fl0user
--

COPY public.info_matches (id, date, description, duration, is_cancelled, is_private, latitude, location, longitude, max_players, min_players, price, "time", id_organizer, num_players, created_at, updated_at) FROM stdin;
8713dcf8-f147-4e9d-9cf7-49bc52ea6164	2023-11-24	\N	00:30:00	f	f	0	Dorset Park	0	12	10	14.25	12:00:00	d397370c-d69d-4999-9932-5ecf98b298b4	0	2023-11-25 01:01:09.735674	\N
dab52f2b-af87-43f4-a412-5ddddaf5e2fa	2023-11-30	\N	00:30:00	f	f	0	Dorset Park	0	14	10	10.25	12:00:00	d397370c-d69d-4999-9932-5ecf98b298b4	0	2023-11-25 01:01:09.735674	\N
\.


--
-- TOC entry 2592 (class 0 OID 40993)
-- Dependencies: 217
-- Data for Name: info_ratings; Type: TABLE DATA; Schema: public; Owner: fl0user
--

COPY public.info_ratings (id, created_at, rating, match, user_rated, user_rated_by) FROM stdin;
\.


--
-- TOC entry 2590 (class 0 OID 24576)
-- Dependencies: 215
-- Data for Name: info_users; Type: TABLE DATA; Schema: public; Owner: fl0user
--

COPY public.info_users (id, first_name, last_name, "position", secondary_positions, is_organizer, rating, created_at, email, updated_at, username, photo) FROM stdin;
a5a26205-4c86-4cde-b82b-c5c1781c877f	Andres	Aranguren	gk	{}	t	\N	\N	juanmadalena@gmail.com	\N	andresaranguren	\N
d397370c-d69d-4999-9932-5ecf98b298b4	Juan	Madalena	m	{}	t	\N	2023-11-24 01:10:09.566433	juanmadalena06@gmail.com	2023-11-24 01:10:09.566433	juanmadalena	\N
\.


--
-- TOC entry 2593 (class 0 OID 81936)
-- Dependencies: 218
-- Data for Name: rel_players_matches; Type: TABLE DATA; Schema: public; Owner: fl0user
--

COPY public.rel_players_matches (id, "position", id_match, id_user, created_at, is_retired, retired_at, updated_at) FROM stdin;
697efac4-a960-496b-bbd1-9ae164b4812f	m	8713dcf8-f147-4e9d-9cf7-49bc52ea6164	d397370c-d69d-4999-9932-5ecf98b298b4	2023-11-25 01:01:09.937953	f	\N	\N
544b6671-0517-4f25-ba37-db1e8fec3974	gk	8713dcf8-f147-4e9d-9cf7-49bc52ea6164	a5a26205-4c86-4cde-b82b-c5c1781c877f	2023-11-25 01:01:09.937953	f	\N	\N
\.


--
-- TOC entry 2437 (class 2606 OID 40972)
-- Name: info_matches info_matches_pkey; Type: CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_matches
    ADD CONSTRAINT info_matches_pkey PRIMARY KEY (id);


--
-- TOC entry 2439 (class 2606 OID 40997)
-- Name: info_ratings info_ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_ratings
    ADD CONSTRAINT info_ratings_pkey PRIMARY KEY (id);


--
-- TOC entry 2431 (class 2606 OID 24585)
-- Name: info_users info_users_pkey; Type: CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_users
    ADD CONSTRAINT info_users_pkey PRIMARY KEY (id);


--
-- TOC entry 2441 (class 2606 OID 81943)
-- Name: rel_players_matches rel_players_matches_pkey; Type: CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.rel_players_matches
    ADD CONSTRAINT rel_players_matches_pkey PRIMARY KEY (id);


--
-- TOC entry 2433 (class 2606 OID 32771)
-- Name: info_users uk_gxvqp9swyhmy9rwefa8arw5n8; Type: CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_users
    ADD CONSTRAINT uk_gxvqp9swyhmy9rwefa8arw5n8 UNIQUE (username);


--
-- TOC entry 2435 (class 2606 OID 32769)
-- Name: info_users uk_j2pk439q3fmtyyyaxc5mslj88; Type: CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_users
    ADD CONSTRAINT uk_j2pk439q3fmtyyyaxc5mslj88 UNIQUE (email);


--
-- TOC entry 2446 (class 2606 OID 81949)
-- Name: rel_players_matches fkcrviumgwn8f5nynpmb5ih6ewv; Type: FK CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.rel_players_matches
    ADD CONSTRAINT fkcrviumgwn8f5nynpmb5ih6ewv FOREIGN KEY (id_user) REFERENCES public.info_users(id);


--
-- TOC entry 2443 (class 2606 OID 41008)
-- Name: info_ratings fkdhpkcoj0a57xfvg546648qwbc; Type: FK CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_ratings
    ADD CONSTRAINT fkdhpkcoj0a57xfvg546648qwbc FOREIGN KEY (user_rated_by) REFERENCES public.info_users(id);


--
-- TOC entry 2447 (class 2606 OID 81944)
-- Name: rel_players_matches fkfy2y6sc4cmdkqvpc73artvojl; Type: FK CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.rel_players_matches
    ADD CONSTRAINT fkfy2y6sc4cmdkqvpc73artvojl FOREIGN KEY (id_match) REFERENCES public.info_matches(id);


--
-- TOC entry 2444 (class 2606 OID 41003)
-- Name: info_ratings fkm7bhmq54jublbv1756702f1y5; Type: FK CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_ratings
    ADD CONSTRAINT fkm7bhmq54jublbv1756702f1y5 FOREIGN KEY (user_rated) REFERENCES public.info_users(id);


--
-- TOC entry 2442 (class 2606 OID 57349)
-- Name: info_matches fkosd7x5sfrsluc2wy78gyeoxjh; Type: FK CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_matches
    ADD CONSTRAINT fkosd7x5sfrsluc2wy78gyeoxjh FOREIGN KEY (id_organizer) REFERENCES public.info_users(id);


--
-- TOC entry 2445 (class 2606 OID 40998)
-- Name: info_ratings fkt2o9l8qx3glejbddqdcsva1h2; Type: FK CONSTRAINT; Schema: public; Owner: fl0user
--

ALTER TABLE ONLY public.info_ratings
    ADD CONSTRAINT fkt2o9l8qx3glejbddqdcsva1h2 FOREIGN KEY (match) REFERENCES public.info_matches(id);


--
-- TOC entry 2600 (class 0 OID 0)
-- Dependencies: 2599
-- Name: DATABASE "KickOffHubDB"; Type: ACL; Schema: -; Owner: fl0user
--

GRANT ALL ON DATABASE "KickOffHubDB" TO neon_superuser;


-- Completed on 2023-11-27 12:21:30

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 16.0

-- Started on 2023-11-27 12:21:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16387)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- TOC entry 2558 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16419)
-- Name: health_check; Type: TABLE; Schema: public; Owner: cloud_admin
--

CREATE TABLE public.health_check (
    id integer NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.health_check OWNER TO cloud_admin;

--
-- TOC entry 217 (class 1259 OID 16418)
-- Name: health_check_id_seq; Type: SEQUENCE; Schema: public; Owner: cloud_admin
--

CREATE SEQUENCE public.health_check_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.health_check_id_seq OWNER TO cloud_admin;

--
-- TOC entry 2559 (class 0 OID 0)
-- Dependencies: 217
-- Name: health_check_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloud_admin
--

ALTER SEQUENCE public.health_check_id_seq OWNED BY public.health_check.id;


--
-- TOC entry 2403 (class 2604 OID 16422)
-- Name: health_check id; Type: DEFAULT; Schema: public; Owner: cloud_admin
--

ALTER TABLE ONLY public.health_check ALTER COLUMN id SET DEFAULT nextval('public.health_check_id_seq'::regclass);


--
-- TOC entry 2552 (class 0 OID 16419)
-- Dependencies: 218
-- Data for Name: health_check; Type: TABLE DATA; Schema: public; Owner: cloud_admin
--

COPY public.health_check (id, updated_at) FROM stdin;
1	2023-11-20 14:51:43.536707+00
\.


--
-- TOC entry 2560 (class 0 OID 0)
-- Dependencies: 217
-- Name: health_check_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloud_admin
--

SELECT pg_catalog.setval('public.health_check_id_seq', 1, false);


--
-- TOC entry 2406 (class 2606 OID 16425)
-- Name: health_check health_check_pkey; Type: CONSTRAINT; Schema: public; Owner: cloud_admin
--

ALTER TABLE ONLY public.health_check
    ADD CONSTRAINT health_check_pkey PRIMARY KEY (id);


-- Completed on 2023-11-27 12:21:36

--
-- PostgreSQL database dump complete
--

-- Completed on 2023-11-27 12:21:36

--
-- PostgreSQL database cluster dump complete
--

