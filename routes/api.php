<?php

use App\Http\Controller\AuthController;
use App\Http\Controller\ProductCategoryController;
use App\Http\Controller\ProductCategoryTaxController;
use App\Http\Controller\ProductController;
use App\Http\Controller\PurchaseController;
use App\Http\Controller\UserController;
use App\Http\Middleware\AuthenticateMiddleware;
use App\Persistence\Enums\UserRole;

return function (Slim\Routing\RouteCollectorProxy $group) {
    $group->group('/products', function (Slim\Routing\RouteCollectorProxy $group) {
        $group->get('', [ProductController::class, 'index']);
        $group->post('', [ProductController::class, 'store']);
        $group->group('/categories', function (Slim\Routing\RouteCollectorProxy $group) {
            $group->group('/taxes', function (Slim\Routing\RouteCollectorProxy $group) {
                $group->get('', [ProductCategoryTaxController::class, 'index']);
                $group->get('/{id}', [ProductCategoryTaxController::class, 'show']);
                $group->post('', [ProductCategoryTaxController::class, 'store']);
                $group->put('/{id}', [ProductCategoryTaxController::class, 'update']);
            });
            $group->get('', [ProductCategoryController::class, 'index']);
            $group->get('/{id}', [ProductCategoryController::class, 'show']);
            $group->post('', [ProductCategoryController::class, 'store']);
        });
    })->add(new AuthenticateMiddleware(UserRole::REGULAR));

    $group->group('/purchases', function (Slim\Routing\RouteCollectorProxy $group) {
        $group->get('', [PurchaseController::class, 'index']);
        $group->post('', [PurchaseController::class, 'store']);
        $group->get('/{id}', [PurchaseController::class, 'show']);
    })->add(new AuthenticateMiddleware(UserRole::REGULAR));

    $group->group('/users', function (Slim\Routing\RouteCollectorProxy $group) {
        $group->get('', [UserController::class, 'index']);
        $group->get('/{id}', [UserController::class, 'show']);
        $group->post('', [UserController::class, 'store']);
        $group->put('/{id}', [UserController::class, 'update']);
        $group->delete('/{id}', [UserController::class, 'destroy']);
    })->add(new AuthenticateMiddleware(UserRole::ADMIN));

    $group->group('/auth', function (Slim\Routing\RouteCollectorProxy $group) {
        $group->post('/login', [AuthController::class, 'login']);
        $group->post('/register', [AuthController::class, 'register'])
            ->add(new AuthenticateMiddleware(UserRole::ADMIN));
        $group->get('/me', [AuthController::class, 'me'])
            ->add(new AuthenticateMiddleware(null));
    });
};