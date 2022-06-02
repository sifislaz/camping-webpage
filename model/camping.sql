--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-06-02 09:56:24

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
-- TOC entry 3360 (class 1262 OID 16394)
-- Name: Camping; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Camping" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE "Camping" OWNER TO postgres;

\connect "Camping"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16395)
-- Name: ADMIN; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ADMIN" (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(80) NOT NULL
);


ALTER TABLE public."ADMIN" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16460)
-- Name: ADMIN_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."ADMIN" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ADMIN_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 16400)
-- Name: CLIENT; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CLIENT" (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(80) NOT NULL,
    email character varying(50) NOT NULL,
    firstname character varying(30) NOT NULL,
    lastname character varying(30) NOT NULL,
    mobile character varying(10) NOT NULL,
    address character varying(30),
    address_num character varying(4),
    zip character varying(5)
);


ALTER TABLE public."CLIENT" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16461)
-- Name: CLIENT_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."CLIENT" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."CLIENT_id_seq"
    START WITH 2
    INCREMENT BY 1
    MINVALUE 2
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 16425)
-- Name: RATING; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RATING" (
    id integer NOT NULL,
    comment character varying(250) NOT NULL,
    client_id integer
);


ALTER TABLE public."RATING" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16462)
-- Name: RATING_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."RATING" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."RATING_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 16405)
-- Name: RESERVATION; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RESERVATION" (
    id integer NOT NULL,
    checkin date NOT NULL,
    checkout date NOT NULL,
    situation character varying(20) NOT NULL,
    no_of_people integer NOT NULL,
    client_id integer NOT NULL,
    reservation_date date NOT NULL
);


ALTER TABLE public."RESERVATION" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16463)
-- Name: RESERVATION_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."RESERVATION" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."RESERVATION_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 16445)
-- Name: RESERVES; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RESERVES" (
    reservation_id integer NOT NULL,
    space_id integer NOT NULL,
    checkin date NOT NULL,
    checkout date NOT NULL
);


ALTER TABLE public."RESERVES" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16415)
-- Name: SPACE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SPACE" (
    id integer NOT NULL,
    location integer NOT NULL,
    no_of_people integer NOT NULL,
    admin_id integer NOT NULL
);


ALTER TABLE public."SPACE" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16464)
-- Name: SPACE_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."SPACE" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."SPACE_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3344 (class 0 OID 16395)
-- Dependencies: 209
-- Data for Name: ADMIN; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ADMIN" (id, username, password) FROM stdin;
1	admin	$2b$10$geCSjN78b2Tkp1UMfMvFBeHOEupgOJvAhHCblcDeZWBQyUlrRnLLG
\.


--
-- TOC entry 3345 (class 0 OID 16400)
-- Dependencies: 210
-- Data for Name: CLIENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CLIENT" (id, username, password, email, firstname, lastname, mobile, address, address_num, zip) FROM stdin;
2	mikroszaios	$2b$10$b.zFzy9wv2jdFANu/3Smx.dPsgLzDzoRalkJjh/6alWOJl07M4RwC	test@bloco.gr	tasos	koustas	6969696969	\N	\N	\N
3	babalos	$2b$10$IdiJY2xpNVxU83Az5zwIo.WH5u7bdWilRQ3S1AmFuhjZ9UEHV7G/u	babalos@babalos.com	Babis	Babi	6965482225	\N	\N	\N
8	asteios	$2b$10$4gHHB8znSR6fqIZIOvdJ/O2yaqcIHs1XukCepmICy5Lvkff48BbmW	pap@pap.com	nnnn	aaaassy	678123456	\N	\N	\N
\.


--
-- TOC entry 3348 (class 0 OID 16425)
-- Dependencies: 213
-- Data for Name: RATING; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RATING" (id, comment, client_id) FROM stdin;
\.


--
-- TOC entry 3346 (class 0 OID 16405)
-- Dependencies: 211
-- Data for Name: RESERVATION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RESERVATION" (id, checkin, checkout, situation, no_of_people, client_id, reservation_date) FROM stdin;
1	2022-07-25	2022-07-29	WAITING	4	2	2022-06-01
\.


--
-- TOC entry 3349 (class 0 OID 16445)
-- Dependencies: 214
-- Data for Name: RESERVES; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RESERVES" (reservation_id, space_id, checkin, checkout) FROM stdin;
1	1	2022-07-25	2022-07-29
\.


--
-- TOC entry 3347 (class 0 OID 16415)
-- Dependencies: 212
-- Data for Name: SPACE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SPACE" (id, location, no_of_people, admin_id) FROM stdin;
1	200	2	1
2	200	2	1
\.


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 215
-- Name: ADMIN_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ADMIN_id_seq"', 1, true);


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 216
-- Name: CLIENT_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CLIENT_id_seq"', 11, true);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 217
-- Name: RATING_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RATING_id_seq"', 1, false);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 218
-- Name: RESERVATION_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RESERVATION_id_seq"', 1, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 219
-- Name: SPACE_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SPACE_id_seq"', 2, true);


--
-- TOC entry 3189 (class 2606 OID 16399)
-- Name: ADMIN ADMIN_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ADMIN"
    ADD CONSTRAINT "ADMIN_pkey" PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 16404)
-- Name: CLIENT CLIENT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CLIENT"
    ADD CONSTRAINT "CLIENT_pkey" PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 16429)
-- Name: RATING RATING_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RATING"
    ADD CONSTRAINT "RATING_pkey" PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 16409)
-- Name: RESERVATION RESERVATION_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_pkey" PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 16449)
-- Name: RESERVES RESERVES_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RESERVES"
    ADD CONSTRAINT "RESERVES_pkey" PRIMARY KEY (reservation_id, space_id);


--
-- TOC entry 3195 (class 2606 OID 16419)
-- Name: SPACE SPACE_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SPACE"
    ADD CONSTRAINT "SPACE_pkey" PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 16465)
-- Name: RATING RATING_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RATING"
    ADD CONSTRAINT "RATING_client_id_fkey" FOREIGN KEY (client_id) REFERENCES public."CLIENT"(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;


--
-- TOC entry 3203 (class 2606 OID 16450)
-- Name: RESERVES RESERVES_reservation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RESERVES"
    ADD CONSTRAINT "RESERVES_reservation_id_fkey" FOREIGN KEY (reservation_id) REFERENCES public."RESERVATION"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3204 (class 2606 OID 16455)
-- Name: RESERVES RESERVES_space_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RESERVES"
    ADD CONSTRAINT "RESERVES_space_id_fkey" FOREIGN KEY (space_id) REFERENCES public."SPACE"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3201 (class 2606 OID 16420)
-- Name: SPACE admin; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SPACE"
    ADD CONSTRAINT admin FOREIGN KEY (admin_id) REFERENCES public."ADMIN"(id) ON UPDATE CASCADE ON DELETE SET DEFAULT;


--
-- TOC entry 3200 (class 2606 OID 16410)
-- Name: RESERVATION client id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "client id" FOREIGN KEY (client_id) REFERENCES public."CLIENT"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-06-02 09:56:24

--
-- PostgreSQL database dump complete
--

