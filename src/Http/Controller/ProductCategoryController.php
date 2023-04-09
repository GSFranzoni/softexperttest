<?php

namespace App\Http\Controller;

use App\DataTransferObject\CreateProductCategoryDTO;
use App\Exception\ValidationException;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductCategoryTaxRepository;
use App\Service\CreateProductCategoryService;
use Doctrine\ORM\Exception\ORMException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductCategoryController
{
    /**
     * @var ProductCategoryRepository
     */
    private ProductCategoryRepository $repository;

    /**
     * @var CreateProductCategoryService
     */
    private CreateProductCategoryService $createProductCategoryService;

    /**
     * @var ProductCategoryTaxRepository
     */
    private ProductCategoryTaxRepository $productCategoryTaxRepository;

    /**
     */
    public function __construct() { // Todo: Inject dependencies
        $this->repository = new ProductCategoryRepository();
        $this->productCategoryTaxRepository = new ProductCategoryTaxRepository();
        $this->createProductCategoryService = new CreateProductCategoryService($this->repository, $this->productCategoryTaxRepository);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function index(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $categories = $this->repository->findAll();
        $response->getBody()->write(json_encode([
            'categories' => $categories,
        ]));
        return $response->withStatus(200);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = (int)$args['id'];
        $product = $this->repository->find($id);
        $response->getBody()->write(json_encode($product));
        return $response->withStatus(200);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     * @throws ORMException
     */
    public function store(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $data = $request->getParsedBody();

            $input = new CreateProductCategoryDTO(
                description: $data['description'] ?? '',
                taxId: $data['taxId'] ?? 0,
            );

            $this->createProductCategoryService->execute($input);
        }
        catch (ValidationException $e) {
            $response->getBody()->write(json_encode([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ]));
            return $response->withStatus(400);
        }

        return $response->withStatus(201);
    }
}