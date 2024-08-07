PGDMP     $    "                x            d1c041fls51j9l     12.2 (Ubuntu 12.2-2.pgdg16.04+1)    12.3 !    %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    8405799    d1c041fls51j9l    DATABASE     �   CREATE DATABASE d1c041fls51j9l WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE d1c041fls51j9l;
                qujtvikdqqxonx    false            )           0    0    DATABASE d1c041fls51j9l    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE d1c041fls51j9l FROM PUBLIC;
                   qujtvikdqqxonx    false    3880            *           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO qujtvikdqqxonx;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   qujtvikdqqxonx    false    3            +           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO qujtvikdqqxonx;
                   postgres    false    651            �            1259    11630550    fav_id_fav_seq    SEQUENCE     w   CREATE SEQUENCE public.fav_id_fav_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.fav_id_fav_seq;
       public          qujtvikdqqxonx    false            �            1259    11630566    favorite    TABLE     �   CREATE TABLE public.favorite (
    fav_id bigint DEFAULT nextval('public.fav_id_fav_seq'::regclass) NOT NULL,
    user_id bigint NOT NULL,
    recipe_id bigint NOT NULL
);
    DROP TABLE public.favorite;
       public         heap    qujtvikdqqxonx    false    206            �            1259    11650513    follow    TABLE     f   CREATE TABLE public.follow (
    follow_user bigint NOT NULL,
    follow_following bigint NOT NULL
);
    DROP TABLE public.follow;
       public         heap    qujtvikdqqxonx    false            �            1259    11093944    recipes    TABLE     �   CREATE TABLE public.recipes (
    id_recipes integer,
    nama_recipes text,
    deskripsi_recipes text,
    bahan_recipes text,
    instruksi_recipes text,
    id_users integer
);
    DROP TABLE public.recipes;
       public         heap    qujtvikdqqxonx    false            �            1259    11094015    recipes_id_recipes_seq    SEQUENCE        CREATE SEQUENCE public.recipes_id_recipes_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.recipes_id_recipes_seq;
       public          qujtvikdqqxonx    false    204            ,           0    0    recipes_id_recipes_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.recipes_id_recipes_seq OWNED BY public.recipes.id_recipes;
          public          qujtvikdqqxonx    false    205            �            1259    11655258    share_id_share_seq    SEQUENCE     {   CREATE SEQUENCE public.share_id_share_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.share_id_share_seq;
       public          qujtvikdqqxonx    false            �            1259    11655267    share    TABLE     �   CREATE TABLE public.share (
    share_id bigint DEFAULT nextval('public.share_id_share_seq'::regclass) NOT NULL,
    share_user_id_source bigint NOT NULL,
    share_user_id_dest bigint NOT NULL,
    share_recipe_id bigint NOT NULL
);
    DROP TABLE public.share;
       public         heap    qujtvikdqqxonx    false    209            �            1259    8528652    users    TABLE       CREATE TABLE public.users (
    tipe_users smallint,
    saldo_users integer,
    password_users character(255),
    nama_users text,
    email_users character(255),
    api_key character(255),
    api_hit integer,
    id_users bigint NOT NULL,
    gambar_users character(255)
);
    DROP TABLE public.users;
       public         heap    qujtvikdqqxonx    false            �            1259    11091318    users_id_users_seq    SEQUENCE     {   CREATE SEQUENCE public.users_id_users_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.users_id_users_seq;
       public          qujtvikdqqxonx    false    202            -           0    0    users_id_users_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.users_id_users_seq OWNED BY public.users.id_users;
          public          qujtvikdqqxonx    false    203            �           2604    11107571    recipes id_recipes    DEFAULT     x   ALTER TABLE ONLY public.recipes ALTER COLUMN id_recipes SET DEFAULT nextval('public.recipes_id_recipes_seq'::regclass);
 A   ALTER TABLE public.recipes ALTER COLUMN id_recipes DROP DEFAULT;
       public          qujtvikdqqxonx    false    205    204            �           2604    11091320    users id_users    DEFAULT     p   ALTER TABLE ONLY public.users ALTER COLUMN id_users SET DEFAULT nextval('public.users_id_users_seq'::regclass);
 =   ALTER TABLE public.users ALTER COLUMN id_users DROP DEFAULT;
       public          qujtvikdqqxonx    false    203    202                      0    11630566    favorite 
   TABLE DATA           >   COPY public.favorite (fav_id, user_id, recipe_id) FROM stdin;
    public          qujtvikdqqxonx    false    207   �#                  0    11650513    follow 
   TABLE DATA           ?   COPY public.follow (follow_user, follow_following) FROM stdin;
    public          qujtvikdqqxonx    false    208   $                 0    11093944    recipes 
   TABLE DATA           z   COPY public.recipes (id_recipes, nama_recipes, deskripsi_recipes, bahan_recipes, instruksi_recipes, id_users) FROM stdin;
    public          qujtvikdqqxonx    false    204   <$       "          0    11655267    share 
   TABLE DATA           d   COPY public.share (share_id, share_user_id_source, share_user_id_dest, share_recipe_id) FROM stdin;
    public          qujtvikdqqxonx    false    210   C>                 0    8528652    users 
   TABLE DATA           �   COPY public.users (tipe_users, saldo_users, password_users, nama_users, email_users, api_key, api_hit, id_users, gambar_users) FROM stdin;
    public          qujtvikdqqxonx    false    202   r>       .           0    0    fav_id_fav_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.fav_id_fav_seq', 3, true);
          public          qujtvikdqqxonx    false    206            /           0    0    recipes_id_recipes_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.recipes_id_recipes_seq', 1, false);
          public          qujtvikdqqxonx    false    205            0           0    0    share_id_share_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.share_id_share_seq', 2, true);
          public          qujtvikdqqxonx    false    209            1           0    0    users_id_users_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.users_id_users_seq', 41, true);
          public          qujtvikdqqxonx    false    203            �           2606    11630571    favorite favorite_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY (fav_id);
 @   ALTER TABLE ONLY public.favorite DROP CONSTRAINT favorite_pkey;
       public            qujtvikdqqxonx    false    207            �           2606    11650626    follow follow_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (follow_user, follow_following);
 <   ALTER TABLE ONLY public.follow DROP CONSTRAINT follow_pkey;
       public            qujtvikdqqxonx    false    208    208            �           2606    11655272    share share_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.share
    ADD CONSTRAINT share_pkey PRIMARY KEY (share_id);
 :   ALTER TABLE ONLY public.share DROP CONSTRAINT share_pkey;
       public            qujtvikdqqxonx    false    210            �           2606    11091322    users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_users);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            qujtvikdqqxonx    false    202                  x�3�4�424516����� J]             x�3�4�2�4����� ��            x��\͒�F�>�OQv�'�1A�o����Զ4�H�V�3�ݘK�,�P� ��E�|�'��l���m��{�y=�~�Y�RS?�e�P����ߗY	E������1���kԋ������8+���Yvc
{����*^,K51�UeKU.�������ť)
������\f�F��J��(kt1]��Bͳ������CV��X5Ɛ�����%M�j������9��c.T6Wy��&N�g���ј��u�=]vm �~v�C��¯"/�10j�[T�/y��5�q�ƨ��0+����ĥ^ũ���S��v�C��uYa�$�.��^�+�ʠ��$�VSVg[eI|�QqҦq+cuZ?�9�Z�?�*��2�P����YR�N�X�eƚ�ړ���$�4�*��l�bb�������mV%3��ꅎS���Vз�����:V�c�]�m�$:�鼎Wx�A��i�*��$�].���Yj������@�)�o�{03C�FS+�gY��U�q��L����ٮ�g�@��&z�'D�N3��/�e��_?xИ�3�VdE�@�!�g�2Al�"H�:�A�Fg_�;�x�c�S˦&N�������������,I�*�A4Q��,�^� ���s�{�]�,p���6�1�El�m��v�8)�ԟx�v �5ɗ��W1���ӊ`����V�c�8��ʨ�hb���ʢ��c�����M\,��;3��`W�.,�Ů���մ����`� ⱛAE<��r3v?�Qc��A��"�S8���
[��.��S��5��k�V�ﬠ̍I�ҩL�Q�y��P	�b�홎~_ѝ�zD�<��G:��2��A8�"Kf&U�"�My'�L�a��l�����U�H� ����c�o8�N���}֋z���zR�IŉI��	(1�~RCjXBxHH�,]�_��@����)�-h��y���Xo�~ԉ�w�Q�Q�	g.R�;�����)Ε�^$���q�78�k�AضWß��Lp�VQ�D�i�]C��%�qbB�YRX/e���jI�*p���շU��M�o��{[RL�i�xz��3�=�a;�V���������:�r��c�V6�8��LU88�G�T��dvjR�����I���Ϯib�DB��t�B�����iF0��ln��B�C��c�ˍR/d�>Mh`�	�$�$��� iủ�c�geB�k0i�?�8��4�������VqPYm�N����`rc�`��uG#B:�z��w���M��R�`r��ˇo~�W�����O�o~��ݷ.d����-�J�U�-�\p�xht	{���.�l.DQ����'��+�O�6�&���o��I�?��m\C�wj��z�҉�M���-(3�+~�l�?�~z_�?r���>�Yw����iշ<���;��{�U=�q^F*�R�	"a�Zf70�l��� ��t||�(h8��?�gj��&��ڶ�V�``op�D|������"!;�����tJ�B�q*(�\�" �����)k��f�������S
%X��W��b��),`�ʺA�hK�rV�~�qS�VŌd���2��	�]@o�����s-������E��s"%O�l��xB�����W4��X��u�߂D�I��nR�-"<�K�8���TD��O��}�0 �ќُ�Y���@�7EV؄#@x�Š!x^v��o��GJ�
g�yX�_�L��I,@������y�\.R.3�b��L=��먗&'���ؑ{��
��<v[�X��Ҽ�h�V�0�gY��璍�kw�q���S4�����=��������2��c�$�sB�S��,C�bǻ�>���j��q���jb˸�+�8�`�G��K�k�{br��n�/�4� 5H/��� a��1�w��=X�7I:��6��gľ3
 B�q`b�BY�}��=�vh�TP���`�Č��k���;ꏖR��e�/!����=�q��	�FOlpm�L` ��^����T���!��h���k!�����L������6�=����i�>�x��?RH�F`�.�<`���h0�s�b ǌG ��֢��D���!�5�Z��S~�[h��[n5��.�\N�_�"*O
�*�Y
>W�na{x����<#�g� �խa���G0+�՛������ �,49#3�K]�L�0!�4Ʈ�� ��d	0�H����m��Og�vOK�� 
��I�md��!nA��=���_���
�-ܦo3bX���=@9��0�&�C��"�j!GIň��kV�}|v\utjDȥ�� \}�
�-kvQI_)fr,\H��sJ7�C�b%uI���sCXSy��Rc^���ܿ0���@&m�a�T�`j&d�2U���%�K��!h ��n]y�1��-T�}*�~�$��8k��+*%-��Xy�#�B�\yy�����V��ez�!����.i��fӸ���(n�X�D@;�m�Tph��g����7��l6��<�LΑ�":6��/����7���f��g>\�Km����lo��W6w����%fo�����\�w�$��:w�����=�1����#��zFZ����m[L��7�3�H��p8��ɝ�-(u�J�^~�Rg��ݢ{m�Uv�-:�?�6{�)��j޻�۹�2X	(0���/�9YgO�^�(=�
��� <2l=��\��Fc�Z�ʝ�yĩ���e0���7�)�(���~� A��G	b$��;gw�4
{P?�G���Js�[T+#�}��� ���|MƸ�>�o3NV�_�:fO�Sb����&��E��`@U�,%�F�m�Y��-5��-�#",������̠9	�SN����� =J���/�H��>�ɐf=�̗�Zs>!����l��@�)�w&=oʎ�D�� <�1��h���h��9O�g��q��i�*�l�(�����1̧��f t�"�0;WrKQ��xr���U�2�������9x�'>�.�<��bǑ�,�b��ތr[��Ĭw��A��#�����\�^3�ذu/t�^�鿄q�ޗ�Nn�#�E�΄����젏���qY� ?wk��,71�t2���K���w�J�+�z��k�����9
�'>.��BO��	l��q��\��qp	����<�~���SΔ�%Ƞ3�u��^��B�v1E��Я	<a���q��n�h�[!�V߱(�׭0�x� </X���>�m"o�C�`�07�Hb��r����хz����Q\~����FX.���8E�(E���Q���D0͸���k5��;%�#��"��S�1"Yp�0��Yl���oHs��ax��$|�r�FcW��k�.�T��@W·�h0
��+<�}$;�}��q�Խ�8���]^4f:m�tF�V���c�6KD��h�=ZC��ö�e��y��`��T�Z䇆R^���a��3e&!��T4�i�V����8TÉ������Fn�2���<�Q�� ���(�8k'����R}� ��n��b�BF�`�1�3�fW�'QKK�E^��x�e�I�����u=8��˥��=���A�@�����Ϊj~���͌EQ���K<��)�ҪHw���di[�|7�+����_�Q�0�rz���67N��XՖ��T�z6fce�d�M�� ��6n�$V�ܜc���o�N���kW4�s:�r�I��j��h��ŕi2�ƹ0���٠u��/u�.�6	��!�wpȬս�
�~�G��sd��Oc�7��Ro'f�y�>�?�	�^6o���ށƇ�w#�[� �*��cE�#h9��m�F[ݭ��<�k��+wo��w�Z��e����T��S�����������MH�,����d�dkEEM*۾�z4��MS���2�\���;�_߽R�<#�u:��to��r0ᮐ�������BF5}��?-�+x�"X���W��/%�2�v���^���ٍgU�CoH�����>}:fϑ��X�*M���l^�4�����w �	  �X^S_�k��.�E}[K}��zR�#x�[}xP��J`멙�߽}�i��8�O�h�|ܯ��{��������z����.�H�OAjR�n�ou�^�g�����*����T4�JC
��r݅��c0	�"�ߺ��eq�(걫���]x]9� �l9�����5ЮE�uܮ���yG'֑�&k��Iav�	���ܬMwɾָ9�M�1N6ug�>oS��{$�L��ʌ�F}\�{m:)�5�����m늀�YʆD~<�ݱťl�䤚Pĩr��t�� %��`���#�:K�6NPT����|���,��SE�]����=Mw*�Rt���)q�l��CQ�㹯/xKf�3�����H�ԍ.\^��ˁ"%��/xQ+x���;�wj^�sK�Ȇ�aF$/��庠�)�8�7t_Y���H����0��p�u�����Ѵ2�1GB��mή*���+%Պg�$YKխ��YLDQ
�Q��;k=6eYM���nI�.W�]�Ҫ���#��A�&="���:mR�9��Wb.3`|�b̍����p�p����ʢ����@N�c���z[�w��a�����t�����s�t�r�{���,�?*?[W���}�G9��I}����`'��ڛm���e;vE����h<腣�1s.4��4R��h�΍�vY �s�A���Q��u�Kͧ�ҜΧ��1׍ER��Y��x�q��v6�+���+��j���YV��
q4���r�J��إΉ�h±�C��o]x앷�&@6�(�[M��������8nEo3���t��o�S�ŖT�C�����7Z��S�1��Ƅ$�KP��ȶz�9�F�M����Y)_b0S�X3�%񏕙�tx����]��	*XE]3�3m��J���'��^��k]��u��|�3��Qb*���R������r���a�?:tIz����x�����s*���Z����}��\�Q����-�-2��{s�R/M�[���R�c�D.V�w�OY� �L�Ej���b	�����M�����٦����X�}>�x�ԝ,
���-C������C��}������|�u?1��0�1%�/]NA1�.Z�0e@��`t6�����e���)��g�G��{ �ѵ����?|�Z�!����w�v�g�^�.Ž������
�s~vI�:S�'wս���t_=�^��t�w��w�����.��Q>��E���%�޹"�����x
��.�uZ�sF~�M#rl�8H�o2oq5�sf]/1b[i��~璻߽�K�e/�p�쎺纺T>�x��_A�u�V#���bx+}�ݖ����wT�5b6�ǫ����B�L7�]�-_�{�����m�B����k?j�~��YcR��T�)|�Up�f�����@��H�JA�\R+x>�|
���[����뛗%o��y���/�7�l���|����q륻<���n�|)������sC6B���7�w^����.�k��t/�A~'���(�`��+ŏ��oGwl�:X��Šӿ+�}8��#�t�����N���k�D[�H5���䆫[�{��\�:��H���'\q|�<�1���r��nwA�;,���?�1�Ӡ���� ߾�)0yl�(��go[�D��4_Ծ�r�*��s�~"_Q����6>���%�|+S��C�Ju�����M�u�=��]Q��V>��n?�˟���O��y.m:/*jIN�����JN���])g�PN����Y��"j>s��4���"Wz�W|Kӻ��MI�f���LW��~&�֠ѦJwP=dܾ[��h��NG,ߴ�oͶ�a�8M�b�v[t��<+�^W�(G���֣j����z��)��n�n�����o���NX�C�~:��@��@�����2uv����^N����ϩv{КY����_"�O��4�8y'���Or	�G�w��p4p�����r�\���bԂU�w�lX5Q��<�r��K�u�(zusy�j��$�kz�;^����\���-!�{e,�-��;��qzܖ�	���h1h����M����o
bI�m%�w���F����U�e��Oo���ow_�1}�n��$17��Gכ����b��j���}�k����!��973J�)D�z|�亍����}JP]��iv���K�yRYA!޳�v��r����.ᖭ�)�'w<e|Gx���ܗ
�n�f�ķ�������y�s)�7�am�����q-M3�����$̫ث��̕���U8w}����`�l�W�nl돓\U�}�`K/�\�&u���]ݍ_�dުjV��wiv�v[B��f�闓�d٦���}D�7�[�m��`tm.��x��h�k����b��&�`N���6'���(=����pu`��1PI#����?P���&��b3�׼�o��f�r�E��-Ga/�Z�"����jщl���ڋxr+�,��ݳp|��g��x|���i����A+�+�Դ����n�X��������>�s��>�??�̧      "      x�3�4�4�424516�2@\'F��� H��         �  x���R�0��ۧ�	��M��3����z�m)L�|������o�]����7K�m�!��9�z���e7]��C�;p��a��{y��A��o���dfm/�� �B�[�;

N��ls_J�.N؁����Jև���.g���QP �ܒ��Էļ������Z��Ǿ��QP ���+�5؉09���աs>O݌^y��p��&��0Q��f'_�Zj�i�d��D�h�De�|flNԌ���?�o>���Hv��P��*��󩞿.t7�;P�|'���QP�Jč3�(	;�����FC���P(�((x't{�T���r[4�������&1s�((�V�ZQ���,.���j.��v���>�J3֚��*��`!�6/�^��?;� `e�����v��n?��!X     