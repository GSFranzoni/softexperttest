<?php

namespace App\Service;

use App\Persistence\Entity\ProductCategory;
use App\DataTransferObject\CreateProductCategoryDTO;
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
        $category = new ProductCategory();
        $category->setDescription($input->description);
        $category->setTax($input->tax);
        $this->productCategoryRepository->save($category);
    }
}