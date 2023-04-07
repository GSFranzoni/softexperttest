<?php

use Slim\Factory\AppFactory;
use Symfony\Component\Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = new Dotenv();

$dotenv->load(__DIR__ . '/../.env');

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$app->addRoutingMiddleware();

$app->addErrorMiddleware(true, true, true);

$api = require __DIR__ . '/../routes/api.php';

$cors = require __DIR__ . '/../bootstrap/cors/index.php';

$cors($app);

$app->group('/api', fn(Slim\Routing\RouteCollectorProxy $group) => $api($group));

$app->run();