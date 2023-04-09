<?php

namespace Service;

use App\DataTransferObject\UpdateProductCategoryTaxDTO;
use App\Exception\ResourceNotFoundException;
use App\Exception\ValidationException;
use App\Persistence\Entity\ProductCategoryTax;
use App\Persistence\Repository\ProductCategoryTaxRepository;
use App\Service\UpdateProductCategoryTaxService;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

class UpdateProductCategoryTaxServiceTest extends TestCase
{
    /**
     * @return void
     * @throws ResourceNotFoundException
     * @throws ValidationException
     * @throws Exception
     */
    public function testShouldThrowExceptionWhenTaxNotFound(): void
    {
        $taxRepository = $this->createMock(ProductCategoryTaxRepository::class);
        $input = new UpdateProductCategoryTaxDTO(1, 'description', 10);
        $service = new UpdateProductCategoryTaxService($taxRepository);
        $this->expectException(ResourceNotFoundException::class);
        $this->expectExceptionMessage('Tax not found');
        $taxRepository->method('find')->willReturn(null);
        $taxRepository->expects($this->never())->method('save');
        $service->execute($input);
    }

    /**
     * @return void
     * @throws ResourceNotFoundException
     * @throws ValidationException
     * @throws Exception
     */
    public function testShouldUpdateProductCategoryTax(): void
    {
        $taxRepository = $this->createMock(ProductCategoryTaxRepository::class);
        $input = new UpdateProductCategoryTaxDTO(1, 'description', 10);
        $service = new UpdateProductCategoryTaxService($taxRepository);
        $tax = $this->createMock(ProductCategoryTax::class);
        $tax->method('getId')->willReturn($input->id);
        $taxRepository->method('find')->willReturn($tax);
        $tax->expects($this->once())->method('setDescription')->with($input->description);
        $tax->expects($this->once())->method('setPercent')->with($input->percent);
        $taxRepository->expects($this->once())->method('save')->with($tax);
        $service->execute($input);
    }
}
