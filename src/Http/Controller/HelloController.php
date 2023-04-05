<?php

namespace App\Http\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class HelloController
{
    public function hello(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $name = $args['name'];
        $response->getBody()->write(
            json_encode(['message' => "Hello, $name"])
        );
        return $response->withStatus(200);
    }
}