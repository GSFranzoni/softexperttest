<?php

namespace App\Http\Controller;

use App\DataTransferObject\CreateProductCategoryTaxDTO;
use App\DataTransferObject\UpdateProductCategoryTaxDTO;
use App\Exception\ValidationException;
use App\Persistence\Repository\ProductCategoryTaxRepository;
use App\Service\CreateProductCategoryTaxService;
use App\Service\UpdateProductCategoryTaxService;
use Doctrine\ORM\Exception\ORMException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;

class ProductCategoryTaxController
{
    /**
     * @var ProductCategoryTaxRepository
     */
    private ProductCategoryTaxRepository $repository;

    /**
     * @var CreateProductCategoryTaxService
     */
    private CreateProductCategoryTaxService $createTaxService;

    /**
     * @var UpdateProductCategoryTaxService
     */
    private UpdateProductCategoryTaxService $updateTaxService;

    /**
     */
    public function __construct()
    { // Todo: Inject dependencies
        $this->repository = new ProductCategoryTaxRepository();
        $this->createTaxService = new CreateProductCategoryTaxService($this->repository);
        $this->updateTaxService = new UpdateProductCategoryTaxService($this->repository);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function index(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $taxes = $this->repository->findAll();
        $response->getBody()->write(json_encode([
            'taxes' => $taxes,
        ]));
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

            $input = new CreateProductCategoryTaxDTO(
                description: $data['description'] ?? '',
                percent: $data['percent'] ?? 0,
            );

            $this->createTaxService->execute($input);
        } catch (ValidationException $e) {
            $response->getBody()->write(json_encode([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ]));
            return $response->withStatus(400);
        }

        return $response->withStatus(201);
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
        $tax = $this->repository->find($id);
        if (!$tax) {
            $response->getBody()->write(json_encode([
                'message' => 'Tax not found',
            ]));
            return $response->withStatus(404);
        }
        $response->getBody()->write(json_encode($tax));
        return $response->withStatus(200);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function update(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $body = $request->getParsedBody();

        $id = (int)$args['id'];

        try {
            $this->updateTaxService->execute(new UpdateProductCategoryTaxDTO(
                id: $id,
                description: $body['description'] ?? '',
                percent: $body['percent'] ?? 0,
            ));
        } catch (ValidationException $e) {
            $response->getBody()->write(json_encode([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ]));
            return $response->withStatus(400);
        } catch (Throwable $e) {
            $response->getBody()->write(json_encode([
                'message' => 'Internal server error',
            ]));
            return $response->withStatus(500);
        }

        return $response->withStatus(204);
    }
}