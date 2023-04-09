<?php

namespace Service;

use App\DataTransferObject\CreateProductCategoryTaxDTO;
use App\Exception\ValidationException;
use App\Persistence\Repository\ProductCategoryTaxRepository;
use App\Service\CreateProductCategoryTaxService;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

class CreateProductCategoryTaxServiceTest extends TestCase
{

    /**
     * @return void
     * @throws ValidationException
     * @throws Exception
     */
    public function testShouldCreateProductCategoryTax(): void
    {
        $taxRepository = $this->createMock(ProductCategoryTaxRepository::class);
        $input = new CreateProductCategoryTaxDTO('description', 10);
        $service = new CreateProductCategoryTaxService($taxRepository);
        $taxRepository->expects($this->once())->method('save')->with($this->callback(function ($tax) use ($input) {
            return $tax->getDescription() === $input->description && $tax->getPercent() === $input->percent;
        }));
        $service->execute($input);
    }
}
