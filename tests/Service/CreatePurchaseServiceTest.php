<?php

namespace Service;

use App\DataTransferObject\CreatePurchasedProductDTO;
use App\DataTransferObject\CreatePurchaseDTO;
use App\Exception\DomainException;
use App\Exception\ResourceNotFoundException;
use App\Exception\ValidationException;
use App\Persistence\Entity\Product;
use App\Persistence\Entity\ProductCategory;
use App\Persistence\Entity\ProductCategoryTax;
use App\Persistence\Repository\ProductRepository;
use App\Persistence\Repository\PurchasedProductRepository;
use App\Persistence\Repository\PurchaseRepository;
use App\Service\CreatePurchaseService;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

class CreatePurchaseServiceTest extends TestCase
{
    /**
     * @return void
     * @throws Exception
     * @throws ResourceNotFoundException
     * @throws ValidationException
     */
    public function testShouldThrowExceptionWhenProductNotFound(): void
    {
        $productRepository = $this->createMock(ProductRepository::class);
        $purchasedProductRepository = $this->createMock(PurchasedProductRepository::class);
        $purchaseRepository = $this->createMock(PurchaseRepository::class);
        $service = new CreatePurchaseService($productRepository, $purchasedProductRepository, $purchaseRepository);
        $productOne = new CreatePurchasedProductDTO(1, 1);
        $input = new CreatePurchaseDTO([$productOne]);
        $this->expectException(ResourceNotFoundException::class);
        $this->expectExceptionMessage("Product $productOne->id not found");
        $productRepository->method('find')->willReturn(null);
        $service->execute($input);
    }

    /**
     * @return void
     * @throws Exception
     * @throws ResourceNotFoundException
     * @throws ValidationException
     */
    public function testShouldThrowExceptionWhenProductStockIsInsufficient(): void
    {
        $productRepository = $this->createMock(ProductRepository::class);
        $purchasedProductRepository = $this->createMock(PurchasedProductRepository::class);
        $purchaseRepository = $this->createMock(PurchaseRepository::class);
        $service = new CreatePurchaseService($productRepository, $purchasedProductRepository, $purchaseRepository);
        $productOne = new CreatePurchasedProductDTO(1, 1);
        $input = new CreatePurchaseDTO([$productOne]);
        $this->expectException(DomainException::class);
        $this->expectExceptionMessage("Product $productOne->id has insufficient stock");
        $product = $this->createMock(Product::class);
        $product->method('getId')->willReturn($productOne->id);
        $product->method('getStock')->willReturn(0);
        $productRepository->method('find')->willReturn($product);
        $service->execute($input);
    }

    /**
     * @return void
     * @throws DomainException
     * @throws Exception
     * @throws ResourceNotFoundException
     * @throws ValidationException
     */
    public function testShouldCreatePurchase(): void
    {
        $productRepository = $this->createMock(ProductRepository::class);
        $purchasedProductRepository = $this->createMock(PurchasedProductRepository::class);
        $purchaseRepository = $this->createMock(PurchaseRepository::class);
        $service = new CreatePurchaseService($productRepository, $purchasedProductRepository, $purchaseRepository);
        $taxOne = $this->createMock(ProductCategoryTax::class);
        $taxOne->method('getPercent')->willReturn(0.1);
        $taxTwo = $this->createMock(ProductCategoryTax::class);
        $taxTwo->method('getPercent')->willReturn(0.2);
        $categoryOne = $this->createMock(ProductCategory::class);
        $categoryOne->method('getTax')->willReturn($taxOne);
        $categoryTwo = $this->createMock(ProductCategory::class);
        $categoryTwo->method('getTax')->willReturn($taxTwo);
        $input = new CreatePurchaseDTO([
            new CreatePurchasedProductDTO(1, 1),
            new CreatePurchasedProductDTO(2, 2),
            new CreatePurchasedProductDTO(3, 3),
        ]);
        $productOne = new Product();
        $productOne->setId($input->products[0]->id);
        $productOne->setPrice(10.00);
        $productOne->setStock(1);
        $productOne->setCategory($categoryOne);
        $productTwo = new Product();
        $productTwo->setId($input->products[1]->id);
        $productTwo->setPrice(20.00);
        $productTwo->setStock(2);
        $productTwo->setCategory($categoryTwo);
        $productThree = new Product();
        $productThree->setId($input->products[2]->id);
        $productThree->setPrice(30.00);
        $productThree->setStock(3);
        $productThree->setCategory($categoryOne);
        $productRepository->method('find')->willReturnOnConsecutiveCalls($productOne, $productTwo, $productThree);
        $purchaseRepository->expects($this->once())->method('save')->with($this->callback(function ($purchase) {
            $this->assertCount(3, $purchase->getProducts());
            $this->assertEquals(140.00, $purchase->getTotal());
            $this->assertEquals(18, $purchase->getTax());
            return true;
        }));
        $productRepository->expects($this->exactly(3))->method('save')->with($this->callback(function ($product) {
            $this->assertEquals(0, $product->getStock());
            return true;
        }));
        $service->execute($input);
    }
}
