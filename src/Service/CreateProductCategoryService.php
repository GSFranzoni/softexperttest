<?php

namespace App\Service;

use App\Persistence\Entity\ProductCategory;
use App\DataTransferObject\CreateProductCategoryDTO;
use App\Persistence\Entity\ProductCategoryTax;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductCategoryTaxRepository;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\Exception\ORMException;

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
     * @throws ORMException
     */
    public function execute(CreateProductCategoryDTO $input): void
    {
        /** @var ProductCategoryTax $tax */
        $tax = $this->productCategoryTaxRepository->getById($input->taxId);
        if (empty($tax)) {
            throw new EntityNotFoundException('Tax not found');
        }
        $category = new ProductCategory();
        $category->setDescription($input->description);
        $category->setTax($tax);
        $this->productCategoryRepository->save($category);
    }
}