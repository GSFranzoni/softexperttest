<?php

namespace App\Service;

use App\Data\Entity\ProductCategory;
use App\DataTransferObject\CreateProductCategoryDTO;
use App\Exception\ValidationException;
use App\Persistence\Repository\ProductCategoryRepository;
use Doctrine\ORM\Exception\ORMException;

class CreateProductCategoryService
{
    public function __construct(
        private readonly ProductCategoryRepository $productCategoryRepository
    ) {
    }

    /**
     * @param CreateProductCategoryDTO $input
     * @return void
     * @throws ORMException
     */
    public function execute(CreateProductCategoryDTO $input): void
    {
        $category = new ProductCategory(
            description: $input->description,
            tax: $input->tax,
        );
        $this->productCategoryRepository->save($category);
    }
}