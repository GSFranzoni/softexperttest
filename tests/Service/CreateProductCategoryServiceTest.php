<?php

namespace Service;

use App\DataTransferObject\CreateProductCategoryDTO;
use App\Exception\ResourceNotFoundException;
use App\Exception\ValidationException;
use App\Persistence\Entity\ProductCategoryTax;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductCategoryTaxRepository;
use App\Service\CreateProductCategoryService;
use Doctrine\ORM\Exception\ORMException;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

class CreateProductCategoryServiceTest extends TestCase
{
    /**
     * @return void
     * @throws Exception
     * @throws ResourceNotFoundException
     * @throws ValidationException
     */
    public function testShouldThrowExceptionWhenTaxNotFound(): void
    {
        $taxRepository = $this->createMock(ProductCategoryTaxRepository::class);
        $categoryRepository = $this->createMock(ProductCategoryRepository::class);
        $input = new CreateProductCategoryDTO('description', 1);
        $service = new CreateProductCategoryService($categoryRepository, $taxRepository);
        $this->expectException(ResourceNotFoundException::class);
        $this->expectExceptionMessage('Tax not found');
        $taxRepository->method('find')->willReturn(null);
        $categoryRepository->expects($this->never())->method('save');
        $service->execute($input);
    }

    /**
     * @throws ResourceNotFoundException
     * @throws Exception
     * @throws ValidationException
     */
    public function testShouldCreateProductCategory(): void
    {
        $taxRepository = $this->createMock(ProductCategoryTaxRepository::class);
        $categoryRepository = $this->createMock(ProductCategoryRepository::class);
        $input = new CreateProductCategoryDTO('description', 1);
        $service = new CreateProductCategoryService($categoryRepository, $taxRepository);
        $tax = $this->createMock(ProductCategoryTax::class);
        $tax->method('getId')->willReturn((int) $input->taxId);
        $taxRepository->method('find')->willReturn($tax);
        $categoryRepository->expects($this->once())->method('save')->with($this->callback(function ($category) use ($input) {
            return $category->getDescription() === $input->description;
        }));
        $service->execute($input);
    }
}
