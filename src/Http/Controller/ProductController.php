<?php

namespace App\Http\Controller;

use App\DataTransferObject\CreateProductDTO;
use App\Exception\ValidationException;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductRepository;
use App\Service\CreateProductService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductController
{
    /**
     * @var ProductRepository
     */
    private ProductRepository $productRepository;

    /**
     * @var ProductCategoryRepository
     */
    private ProductCategoryRepository $productCategoryRepository;

    /**
     * @var CreateProductService
     */
    private CreateProductService $createProductService;

    /**
     */
    public function __construct(
    ) {
        $this->productRepository = new ProductRepository();
        $this->productCategoryRepository = new ProductCategoryRepository();
        $this->createProductService = new CreateProductService($this->productRepository, $this->productCategoryRepository);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function index(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $products = $this->productRepository->findAll();
        $response->getBody()->write(json_encode([
            'products' => $products,
        ]));
        return $response->withStatus(200);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function store(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $data = $request->getParsedBody();

            $input = new CreateProductDTO(
                name: $data['name'] ?? '',
                description: $data['description'] ?? '',
                price: $data['price'] ?? 0,
                stock: $data['stock'] ?? 0,
                productCategoryId: $data['productCategoryId'] ?? 0
            );

            $this->createProductService->execute($input);
        }
        catch (ValidationException $e) {
            $response->getBody()->write(json_encode([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ]));
            return $response->withStatus(400);
        }
        catch (\Throwable $e) { // Todo: create error handler middleware
            $response->getBody()->write(json_encode([
                'message' => 'Internal server error'
            ]));
            return $response->withStatus(500);
        }

        $response->getBody()->write(json_encode([
            'message' => 'Product created successfully'
        ]));

        return $response->withStatus(201); // Todo: replace magic number
    }
}