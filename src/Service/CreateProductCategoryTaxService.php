<?php

namespace App\Service;

use App\DataTransferObject\CreateProductCategoryTaxDTO;
use App\Persistence\Entity\ProductCategoryTax;
use App\Persistence\Repository\ProductCategoryTaxRepository;
use Doctrine\ORM\Exception\ORMException;

class CreateProductCategoryTaxService
{
    public function __construct(
        private readonly ProductCategoryTaxRepository $productCategoryTaxRepository,
    ) {
    }

    /**
     * @param CreateProductCategoryTaxDTO $input
     * @return void
     */
    public function execute(CreateProductCategoryTaxDTO $input): void
    {
        $tax = new ProductCategoryTax();
        $tax->setDescription($input->description);
        $tax->setPercent($input->percent);
        $this->productCategoryTaxRepository->save($tax);
    }
}