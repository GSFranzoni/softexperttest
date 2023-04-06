<?php

use App\Http\Controller\ProductCategoryController;
use App\Http\Controller\ProductCategoryTaxController;
use App\Http\Controller\ProductController;
use App\Http\Controller\PurchaseController;

return function (Slim\Routing\RouteCollectorProxy $group) {
    $group->group('/products', function (Slim\Routing\RouteCollectorProxy $group) {
        $group->get('', [ProductController::class, 'index']);
        $group->post('', [ProductController::class, 'store']);
        $group->group('/categories', function (Slim\Routing\RouteCollectorProxy $group) {
            $group->group('/taxes', function (Slim\Routing\RouteCollectorProxy $group) {
                $group->get('', [ProductCategoryTaxController::class, 'index']);
                $group->post('', [ProductCategoryTaxController::class, 'store']);
            });
            $group->get('', [ProductCategoryController::class, 'index']);
            $group->get('/{id}', [ProductCategoryController::class, 'show']);
            $group->post('', [ProductCategoryController::class, 'store']);
        });
    });
    $group->group('/purchases', function (Slim\Routing\RouteCollectorProxy $group) {
        $group->get('', [PurchaseController::class, 'index']);
        $group->post('', [PurchaseController::class, 'store']);
    });
};