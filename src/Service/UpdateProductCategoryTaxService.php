<?php

namespace App\Service;

use App\DataTransferObject\UpdateProductCategoryTaxDTO;
use App\Exception\ResourceNotFoundException;
use App\Persistence\Entity\ProductCategoryTax;
use App\Persistence\Repository\ProductCategoryTaxRepository;

class UpdateProductCategoryTaxService
{
    public function __construct(
        private readonly ProductCategoryTaxRepository $productCategoryTaxRepository,
    ) {
    }

    /**
     * @param UpdateProductCategoryTaxDTO $input
     * @return void
     * @throws ResourceNotFoundException
     */
    public function execute(UpdateProductCategoryTaxDTO $input): void
    {
        /** @var ProductCategoryTax $tax */
        $tax = $this->productCategoryTaxRepository->find($input->id);
        if (empty($tax)) {
            throw new ResourceNotFoundException("Tax not found");
        }
        $tax->setDescription($input->description);
        $tax->setPercent($input->percent);
        $this->productCategoryTaxRepository->save($tax);
    }
}