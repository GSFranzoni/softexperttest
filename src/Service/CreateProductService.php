<?php

namespace App\Service;

use App\DataTransferObject\CreateProductDTO;
use App\Persistence\Entity\Product;
use App\Persistence\Entity\ProductCategory;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductRepository;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;

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
        $product = new Product();
        $product->setName($input->name);
        $product->setPrice($input->price);
        $product->setCategory($category);
        $product->setDescription($input->description);
        $product->setStock($input->stock);
        $product->setImage('');
        $this->productRepository->save($product);
    }
}