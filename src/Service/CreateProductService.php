<?php

namespace App\Service;

use App\DataTransferObject\CreateProductDTO;
use App\Exception\ResourceNotFoundException;
use App\Persistence\Entity\Product;
use App\Persistence\Entity\ProductCategory;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductRepository;

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
     * @throws ResourceNotFoundException
     */
    public function execute(CreateProductDTO $input): void
    {
        /** @var ?ProductCategory $category */
        $category = $this->productCategoryRepository->find($input->productCategoryId);
        if (is_null($category)) {
            throw new ResourceNotFoundException("Category not found");
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