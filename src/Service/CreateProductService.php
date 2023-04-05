<?php

namespace App\Service;

use App\Data\Entity\Product;
use App\Data\Entity\ProductCategory;
use App\DataTransferObject\CreateProductDTO;
use App\Exception\InvalidDataProvided;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductRepository;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use InvalidArgumentException;

class CreateProductService
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly ProductCategoryRepository $productCategoryRepository
    ) {
    }

    /**
     * @param CreateProductDTO $input
     * @return void
     * @throws EntityNotFoundException
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function execute(CreateProductDTO $input): void
    {
        /** @var ?ProductCategory $category */
        $category = $this->productCategoryRepository->getById($input->productCategoryId);
        if (is_null($category)) {
            throw new EntityNotFoundException("Category not found");
        }
        $product = new Product(
            name: $input->name,
            description: $input->description,
            price: $input->price,
            stock: $input->stock,
            image: '',
            category: $category,
        );
        $this->productRepository->save($product);
    }
}