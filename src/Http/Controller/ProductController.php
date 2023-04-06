<?php

namespace App\Http\Controller;

use App\Persistence\Entity\Product;
use App\Persistence\EntityManager\EntityManagerFactory;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Exception\ORMException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductController
{
    /**
     * @var EntityRepository
     */
    private EntityRepository $repository;

    /**
     * @throws Exception
     * @throws ORMException
     */
    public function __construct(
    ) {
        $this->repository = EntityManagerFactory::getEntityManager()->getRepository(Product::class);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function index(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $products = $this->repository->findAll();
        $response->getBody()->write(json_encode($products));
        return $response->withStatus(200);
    }
}