Vamboo Store
============

[![SensioLabsInsight](https://insight.sensiolabs.com/projects/1940740e-9fe0-498e-8962-024b173a29c0/mini.png)](https://insight.sensiolabs.com/projects/1940740e-9fe0-498e-8962-024b173a29c0)
[![Latest Stable Version](https://poser.pugx.org/elcodi/vamboo-store/v/stable.png)](https://packagist.org/packages/elcodi/vamboo-store)
[![Total Downloads](https://poser.pugx.org/elcodi/vamboo-store/downloads.png)](https://packagist.org/packages/elcodi/vamboo-store)
[![Latest Unstable Version](https://poser.pugx.org/elcodi/vamboo-store/v/unstable.png)](https://packagist.org/packages/elcodi/vamboo-store)
[![License](https://poser.pugx.org/elcodi/elcodi/license.png)](https://packagist.org/packages/elcodi/elcodi)
[![Powered By Elcodi](http://elcodi.io/static/elcodi.badge.png)](http://github.com/elcodi)

Welcome to the Vamboo Store - a fully-functional Ecommerce project
application built on Elcodi components.

1) Installing the Vamboo Store
----------------------------------

As Vamboo Store uses [Composer][2] to manage its dependencies, the recommended
way to create a new project is to use it.

If you don't have Composer yet, download it following the instructions on
http://getcomposer.org/ or just run the following command:

    curl -s http://getcomposer.org/installer | php

Then, use the `create-project` command to generate a new Vamboo Store
application:

    php composer.phar create-project elcodi/vamboo-store <path/to/install> dev-master

Composer will install Vamboo Store and all its dependencies under the
`path/to/install` directory.

2) Checking your System Configuration
-------------------------------------

Before starting coding, make sure that your local system is properly
configured for Vamboo Store.

Execute the `check.php` script from the command line:

    php app/check.php

The script returns a status code of `0` if all mandatory requirements are met,
`1` otherwise.

[1]:  http://symfony.com/doc/2.4/book/installation.html
[2]:  http://getcomposer.org/
