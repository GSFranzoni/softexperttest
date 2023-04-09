<?php

namespace Service;

use App\DataTransferObject\CreateProductDTO;
use App\Exception\ResourceNotFoundException;
use App\Exception\ValidationException;
use App\Persistence\Entity\ProductCategory;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductRepository;
use App\Service\CreateProductService;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

class CreateProductServiceTest extends TestCase
{
    /**
     * @return void
     * @throws Exception
     * @throws ValidationException
     */
    public function testShouldThrowExceptionIfCategoryDoesNotExist(): void
    {
        $productRepository = $this->createMock(ProductRepository::class);
        $categoryRepository = $this->createMock(ProductCategoryRepository::class);
        $input = new CreateProductDTO('name', 'description', 10, 10, 1);
        $service = new CreateProductService($productRepository, $categoryRepository);
        $categoryRepository->method('find')->willReturn(null)->with($input->productCategoryId);
        $productRepository->expects($this->never())->method('save');
        $this->expectException(ResourceNotFoundException::class);
        $this->expectExceptionMessage('Category not found');
        $service->execute($input);
    }

    /**
     * @return void
     * @throws Exception
     * @throws ResourceNotFoundException
     * @throws ValidationException
     */
    public function testShouldCreateProduct(): void
    {
        $productRepository = $this->createMock(ProductRepository::class);
        $categoryRepository = $this->createMock(ProductCategoryRepository::class);
        $input = new CreateProductDTO('name', 'description', 10, 10, 1);
        $service = new CreateProductService($productRepository, $categoryRepository);
        $category = $this->createMock(ProductCategory::class);
        $category->method('getId')->willReturn($input->productCategoryId);
        $categoryRepository->method('find')->willReturn($category);
        $productRepository->expects($this->once())->method('save')->with($this->callback(function ($product) use ($input) {
            return $product->getName() === $input->name
                && $product->getDescription() === $input->description
                && $product->getPrice() === $input->price
                && $product->getStock() === $input->stock
                && $product->getCategory()->getId() === $input->productCategoryId;
        }));
        $service->execute($input);
    }
}
