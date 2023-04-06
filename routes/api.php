<?php

use App\Http\Controller\ProductCategoryController;
use App\Http\Controller\ProductController;

return function (Slim\Routing\RouteCollectorProxy $group) {
    $group->group('/products', function (Slim\Routing\RouteCollectorProxy $group) {
        $group->get('', [ProductController::class, 'index']);
        $group->group('/categories', function (Slim\Routing\RouteCollectorProxy $group) {
            $group->get('', [ProductCategoryController::class, 'index']);
            $group->get('/{id}', [ProductCategoryController::class, 'show']);
            $group->post('', [ProductCategoryController::class, 'store']);
        });
    });
};