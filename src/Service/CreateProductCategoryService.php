<?php

namespace App\Service;

use App\DataTransferObject\CreateProductCategoryDTO;
use App\Exception\ResourceNotFoundException;
use App\Persistence\Entity\ProductCategory;
use App\Persistence\Entity\ProductCategoryTax;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductCategoryTaxRepository;

class CreateProductCategoryService
{
    public function __construct(
        private readonly ProductCategoryRepository $productCategoryRepository,
        private readonly ProductCategoryTaxRepository $productCategoryTaxRepository,
    ) {
    }

    /**
     * @param CreateProductCategoryDTO $input
     * @return void
     * @throws ResourceNotFoundException
     */
    public function execute(CreateProductCategoryDTO $input): void
    {
        /** @var ProductCategoryTax $tax */
        $tax = $this->productCategoryTaxRepository->find($input->taxId);
        if (empty($tax)) {
            throw new ResourceNotFoundException('Tax not found');
        }
        $category = new ProductCategory();
        $category->setDescription($input->description);
        $category->setTax($tax);
        $this->productCategoryRepository->save($category);
    }
}