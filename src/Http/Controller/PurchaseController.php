<?php

namespace App\Http\Controller;

use App\DataTransferObject\CreatePurchasedProductDTO;
use App\DataTransferObject\CreatePurchaseDTO;
use App\Exception\ValidationException;
use App\Persistence\Entity\Product;
use App\Persistence\Entity\Purchase;
use App\Persistence\EntityManager\EntityManagerFactory;
use App\Persistence\Repository\ProductRepository;
use App\Persistence\Repository\PurchasedProductRepository;
use App\Persistence\Repository\PurchaseRepository;
use App\Service\CreatePurchaseService;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Doctrine\Persistence\ObjectRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\ValidatorBuilder;
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
        $page = (int) ($request->getQueryParams()['page'] ?? 1);
        $limit = (int) ($request->getQueryParams()['limit'] ?? 10);
        $purchases = $this->purchaseRepository->getAll($page, $limit);
        $total = $this->purchaseRepository->count();
        $response->getBody()->write(json_encode([
            'data' => $purchases,
            'pages' => ceil($total / $limit),
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
                    productId: $product['productId'] ?? null,
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
}