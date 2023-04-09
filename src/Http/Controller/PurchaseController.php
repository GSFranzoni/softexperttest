<?php

namespace App\Http\Controller;

use App\DataTransferObject\CreatePurchasedProductDTO;
use App\DataTransferObject\CreatePurchaseDTO;
use App\Exception\ValidationException;
use App\Persistence\Repository\ProductRepository;
use App\Persistence\Repository\PurchasedProductRepository;
use App\Persistence\Repository\PurchaseRepository;
use App\Service\CreatePurchaseService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;

class PurchaseController
{
    /**
     * @var CreatePurchaseService
     */
    private CreatePurchaseService $createPurchaseService;

    /**
     * @var ProductRepository
     */
    private ProductRepository $productRepository;

    /**
     * @var PurchaseRepository
     */
    private PurchaseRepository $purchaseRepository;

    /**
     * @var PurchasedProductRepository
     */
    private PurchasedProductRepository $purchasedProductRepository;

    /**
     */
    public function __construct() { // Todo: Inject dependencies
        $this->productRepository = new ProductRepository();
        $this->purchaseRepository = new PurchaseRepository();
        $this->purchasedProductRepository = new PurchasedProductRepository();
        $this->createPurchaseService = new CreatePurchaseService($this->productRepository, $this->purchasedProductRepository, $this->purchaseRepository);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function index(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $purchases = $this->purchaseRepository->findAll();
        $response->getBody()->write(json_encode([
            'purchases' => $purchases,
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
        $body = $request->getParsedBody();

        try {
            $products = [];

            foreach ($body['products'] ?? [] as $product) {
                $products[] = new CreatePurchasedProductDTO(
                    id: $product['id'] ?? null,
                    quantity: $product['quantity'] ?? null,
                );
            }

            $input = new CreatePurchaseDTO($products);

            $this->createPurchaseService->execute($input);
        }
        catch (ValidationException $e) {
            $response->getBody()->write(json_encode([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ]));
            return $response->withStatus(400);
        }
        catch (Throwable $e) { // Todo: create error handler middleware
            $response->getBody()->write(json_encode([
                'message' => $e->getMessage(),
            ]));
            return $response->withStatus(500);
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
        $purchase = $this->purchaseRepository->find($args['id']);
        if (empty($purchase)) {
            $response->getBody()->write(json_encode([
                'message' => 'Purchase not found',
            ]));
            return $response->withStatus(404);
        }
        $response->getBody()->write(
            json_encode($purchase)
        );
        return $response->withStatus(200);
    }
}