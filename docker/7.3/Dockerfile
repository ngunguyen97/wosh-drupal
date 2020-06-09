FROM ubuntu:bionic
MAINTAINER haivo <hai.vo@kyanon.digital>

ENV OS_LOCALE="en_US.UTF-8"
RUN apt-get update && apt-get install -y locales && locale-gen ${OS_LOCALE}
ENV LANG=${OS_LOCALE} \
    LANGUAGE=${OS_LOCALE} \
    LC_ALL=${OS_LOCALE} \
    DEBIAN_FRONTEND=noninteractive

ENV APACHE_CONF_DIR=/etc/apache2 \
    PHP_CONF_DIR=/etc/php/7.3 \
    PHP_DATA_DIR=/var/lib/php


RUN	\
	BUILD_DEPS='software-properties-common' \
    && dpkg-reconfigure locales \
	&& apt-get install --no-install-recommends -y $BUILD_DEPS \
	&& add-apt-repository -y ppa:ondrej/php \
	&& add-apt-repository -y ppa:ondrej/apache2 \
	&& apt-get update \
    && apt-get install -y apt-transport-https gnupg autoconf automake libtool gcc g++ make libc-dev pkg-config

RUN apt-get update \
    && apt-get install -y curl vim git apache2 libapache2-mod-php7.3 \
    && apt-get install -y --allow-unauthenticated php7.3-cli php7.3-dev php7.3-readline php7.3-mbstring php7.3-zip php7.3-intl php7.3-xml php7.3-json php7.3-curl php7.3-gd php7.3-pgsql php7.3-mysql php-pear php7.3-pdo

# install pre requisites
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y DEBIAN_FRONTEND=noninteractive \
        apt-get install --no-install-recommends --no-install-suggests -y \
        msodbcsql17 mssql-tools unixodbc-dev locales

# install driver sqlsrv
RUN pecl install sqlsrv
RUN pecl install pdo_sqlsrv

RUN printf "; priority=20\nextension=sqlsrv.so\n" > /etc/php/7.3/mods-available/sqlsrv.ini
RUN printf "; priority=30\nextension=pdo_sqlsrv.so\n" > /etc/php/7.3/mods-available/pdo_sqlsrv.ini
RUN phpenmod -v 7.3 sqlsrv pdo_sqlsrv

#RUN echo "extension=sqlsrv.so" >> /etc/php/7.3/apache2/php.ini
#RUN echo "extension=pdo_sqlsrv.so" >> /etc/php/7.3/apache2/php.ini
#RUN echo "extension=sqlsrv.so" >> /etc/php/7.3/cli/php.ini
#RUN echo "extension=pdo_sqlsrv.so" >> /etc/php/7.3/cli/php.ini

RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
RUN exec bash

COPY web /var/www/web/
COPY entrypoint.sh /sbin/entrypoint.sh

RUN \
    # Apache settings
    cp /dev/null ${APACHE_CONF_DIR}/conf-available/other-vhosts-access-log.conf \
    && rm ${APACHE_CONF_DIR}/sites-enabled/000-default.conf ${APACHE_CONF_DIR}/sites-available/000-default.conf \
    && a2dismod mpm_event\
    && a2enmod rewrite php7.3 mpm_prefork\
	# Install composer
	&& curl -sS https://getcomposer.org/installer | php -- --version=1.9.0 --install-dir=/usr/local/bin --filename=composer \
	# Cleaning
	&& apt-get purge -y --auto-remove $BUILD_DEPS \
	&& apt-get autoremove -y \
	&& rm -rf /var/lib/apt/lists/* \
	# Forward request and error logs to docker log collector
	&& ln -sf /dev/stdout /var/log/apache2/access.log \
	&& ln -sf /dev/stderr /var/log/apache2/error.log \
	&& chmod 755 /sbin/entrypoint.sh \
	&& chown www-data:www-data ${PHP_DATA_DIR} -Rf

COPY ./configs/apache2.conf ${APACHE_CONF_DIR}/apache2.conf
COPY ./configs/app.conf ${APACHE_CONF_DIR}/sites-enabled/app.conf
COPY ./configs/php.ini  ${PHP_CONF_DIR}/apache2/conf.d/custom.ini

WORKDIR /var/www/web/

EXPOSE 80 443

# By default, simply start apache.
CMD ["/sbin/entrypoint.sh"]
