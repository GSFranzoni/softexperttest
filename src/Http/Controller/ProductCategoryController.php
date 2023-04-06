<?php

namespace App\Http\Controller;

use App\DataTransferObject\CreateProductCategoryDTO;
use App\Exception\ValidationException;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Service\CreateProductCategoryService;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
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
     */
    public function __construct() { // Todo: Inject dependencies
        $this->repository = new ProductCategoryRepository();
        $this->createProductCategoryService = new CreateProductCategoryService($this->repository);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function index(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $page = (int) ($request->getQueryParams()['page'] ?? 1);
        $limit = (int) ($request->getQueryParams()['limit'] ?? 10);
        $categories = $this->repository->getAll($page, $limit);
        $total = $this->repository->count();
        $response->getBody()->write(json_encode([
            'data' => $categories,
            'pages' => ceil($total / $limit),
        ]));
        return $response->withStatus(200);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = (int) $args['id'];
        $product = $this->repository->getById($id);
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
                tax: $data['tax'] ?? 0
            );

            $this->createProductCategoryService->execute($input);

            return $response->withStatus(201);
        }
        catch (ValidationException $e) {
            $response->getBody()->write(json_encode([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ]));
            return $response->withStatus(400);
        }
    }
}