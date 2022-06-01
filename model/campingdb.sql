PGDMP     *                    z           Camping    14.3    14.3 %               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16394    Camping    DATABASE     m   CREATE DATABASE "Camping" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "Camping";
                postgres    false            �            1259    16395    ADMIN    TABLE     �   CREATE TABLE public."ADMIN" (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(80) NOT NULL
);
    DROP TABLE public."ADMIN";
       public         heap    postgres    false            �            1259    16460    ADMIN_id_seq    SEQUENCE     �   ALTER TABLE public."ADMIN" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ADMIN_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            �            1259    16400    CLIENT    TABLE     �  CREATE TABLE public."CLIENT" (
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
    DROP TABLE public."CLIENT";
       public         heap    postgres    false            �            1259    16461    CLIENT_id_seq    SEQUENCE     �   ALTER TABLE public."CLIENT" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."CLIENT_id_seq"
    START WITH 2
    INCREMENT BY 1
    MINVALUE 2
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            �            1259    16425    RATING    TABLE     ~   CREATE TABLE public."RATING" (
    id integer NOT NULL,
    comment character varying(250) NOT NULL,
    client_id integer
);
    DROP TABLE public."RATING";
       public         heap    postgres    false            �            1259    16462    RATING_id_seq    SEQUENCE     �   ALTER TABLE public."RATING" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."RATING_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213            �            1259    16405    RESERVATION    TABLE       CREATE TABLE public."RESERVATION" (
    id integer NOT NULL,
    checkin date NOT NULL,
    checkout date NOT NULL,
    situation character varying(20) NOT NULL,
    no_of_people integer NOT NULL,
    client_id integer NOT NULL,
    reservation_date date NOT NULL
);
 !   DROP TABLE public."RESERVATION";
       public         heap    postgres    false            �            1259    16463    RESERVATION_id_seq    SEQUENCE     �   ALTER TABLE public."RESERVATION" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."RESERVATION_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            �            1259    16445    RESERVES    TABLE     �   CREATE TABLE public."RESERVES" (
    reservation_id integer NOT NULL,
    space_id integer NOT NULL,
    checkin date NOT NULL,
    checkout date NOT NULL
);
    DROP TABLE public."RESERVES";
       public         heap    postgres    false            �            1259    16415    SPACE    TABLE     �   CREATE TABLE public."SPACE" (
    id integer NOT NULL,
    location integer NOT NULL,
    no_of_people integer NOT NULL,
    admin_id integer NOT NULL
);
    DROP TABLE public."SPACE";
       public         heap    postgres    false            �            1259    16464    SPACE_id_seq    SEQUENCE     �   ALTER TABLE public."SPACE" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."SPACE_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212                      0    16395    ADMIN 
   TABLE DATA                 public          postgres    false    209   �)                 0    16400    CLIENT 
   TABLE DATA                 public          postgres    false    210   L*                 0    16425    RATING 
   TABLE DATA                 public          postgres    false    213   �+                 0    16405    RESERVATION 
   TABLE DATA                 public          postgres    false    211   ,                 0    16445    RESERVES 
   TABLE DATA                 public          postgres    false    214   �,                 0    16415    SPACE 
   TABLE DATA                 public          postgres    false    212   G-       !           0    0    ADMIN_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."ADMIN_id_seq"', 1, true);
          public          postgres    false    215            "           0    0    CLIENT_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."CLIENT_id_seq"', 11, true);
          public          postgres    false    216            #           0    0    RATING_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."RATING_id_seq"', 1, false);
          public          postgres    false    217            $           0    0    RESERVATION_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."RESERVATION_id_seq"', 1, true);
          public          postgres    false    218            %           0    0    SPACE_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."SPACE_id_seq"', 2, true);
          public          postgres    false    219            u           2606    16399    ADMIN ADMIN_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."ADMIN"
    ADD CONSTRAINT "ADMIN_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."ADMIN" DROP CONSTRAINT "ADMIN_pkey";
       public            postgres    false    209            w           2606    16404    CLIENT CLIENT_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."CLIENT"
    ADD CONSTRAINT "CLIENT_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."CLIENT" DROP CONSTRAINT "CLIENT_pkey";
       public            postgres    false    210            }           2606    16429    RATING RATING_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."RATING"
    ADD CONSTRAINT "RATING_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."RATING" DROP CONSTRAINT "RATING_pkey";
       public            postgres    false    213            y           2606    16409    RESERVATION RESERVATION_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."RESERVATION" DROP CONSTRAINT "RESERVATION_pkey";
       public            postgres    false    211                       2606    16449    RESERVES RESERVES_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."RESERVES"
    ADD CONSTRAINT "RESERVES_pkey" PRIMARY KEY (reservation_id, space_id);
 D   ALTER TABLE ONLY public."RESERVES" DROP CONSTRAINT "RESERVES_pkey";
       public            postgres    false    214    214            {           2606    16419    SPACE SPACE_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."SPACE"
    ADD CONSTRAINT "SPACE_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."SPACE" DROP CONSTRAINT "SPACE_pkey";
       public            postgres    false    212            �           2606    16465    RATING RATING_client_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RATING"
    ADD CONSTRAINT "RATING_client_id_fkey" FOREIGN KEY (client_id) REFERENCES public."CLIENT"(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 J   ALTER TABLE ONLY public."RATING" DROP CONSTRAINT "RATING_client_id_fkey";
       public          postgres    false    213    3191    210            �           2606    16450 %   RESERVES RESERVES_reservation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RESERVES"
    ADD CONSTRAINT "RESERVES_reservation_id_fkey" FOREIGN KEY (reservation_id) REFERENCES public."RESERVATION"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public."RESERVES" DROP CONSTRAINT "RESERVES_reservation_id_fkey";
       public          postgres    false    3193    211    214            �           2606    16455    RESERVES RESERVES_space_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RESERVES"
    ADD CONSTRAINT "RESERVES_space_id_fkey" FOREIGN KEY (space_id) REFERENCES public."SPACE"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."RESERVES" DROP CONSTRAINT "RESERVES_space_id_fkey";
       public          postgres    false    3195    214    212            �           2606    16420    SPACE admin    FK CONSTRAINT     �   ALTER TABLE ONLY public."SPACE"
    ADD CONSTRAINT admin FOREIGN KEY (admin_id) REFERENCES public."ADMIN"(id) ON UPDATE CASCADE ON DELETE SET DEFAULT;
 7   ALTER TABLE ONLY public."SPACE" DROP CONSTRAINT admin;
       public          postgres    false    212    3189    209            �           2606    16410    RESERVATION client id    FK CONSTRAINT     �   ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "client id" FOREIGN KEY (client_id) REFERENCES public."CLIENT"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public."RESERVATION" DROP CONSTRAINT "client id";
       public          postgres    false    211    3191    210               �   x�%�M�0 ໿�E$�KA'?�.t�M��9]f�E�_�����#�&5���ֺ���`���$ǡ�����k�W@�1��_x�R(�$G9X�fY��`�b��p6F#� ۝p��r���._�ͪ��Żǁ�P^���w#�$2W{MӾ�]0�         �  x�Ւmo�0���)�
�V�Bq��4�־�l�����O?��m����|����t��(L�xP8�@��+�f /�݀[�@ɬ�a���RE�kǔ`MK���1|U\�t�iZfR�?v�����^�>��9�yO`1���'���i^
Ya*dK�MH���&1�Iu�p�N��j[	?��W�	��JĘ���k���2���ޓ�u�>��ab%�M�^��29Jꤖ����,�����K���,�7��O�PJ���T���ܵ��S�0���z$]R��ΐO����?��EﱭZ�G>���.�0��*>P9�!t�T��[��>){��#��%qw��^PtH�����
���]���h|v�C�^���e�_�b���N[�6)��znZ���;�F�'��         
   x���             �   x�M���0���+������~=	�Ԅm=�E#q����Y�w��#�c&�P�C7^]�g;Vd��t��#��z��k�h#�K������&;e�F�I�Uk�t�ՠ��{%�Ҫ�3Fv��_��G(��	�C�F��8Y�h���͔����"��Wq�������:�         k   x���v
Q���W((M��L�S
r���+)h���%�d���g��($&��Y���ٙyPF~i��B��O�k�����������#�,�5���� ��!�         |   x���v
Q���W((M��L�S
ptvUR��L�Q��ON,����Q�ˏ�O�/H�/�I�QHL��̋�L�T�s
�t��sW�q�Us�	u���
�:
F@BG�PӚ˓��Z�� ��A�     